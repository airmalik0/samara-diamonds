import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Upload, RefreshCw, Check, X } from 'lucide-react';

interface AiImageGeneratorProps {
  slug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (whiteUrl: string, modelUrl: string) => void;
}

type Stage = 'upload' | 'generating' | 'preview' | 'error';

const SUPABASE_URL = 'https://izebxyvfrlkvqgjwteol.supabase.co';

/** Resize image on canvas to fit within maxPx, return base64 (no prefix) + mimeType */
async function resizeAndEncode(file: File, maxPx = 1500): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (Math.max(width, height) > maxPx) {
        const scale = maxPx / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, 0.85);
      const base64 = dataUrl.split(',')[1];
      resolve({ base64, mimeType });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/** Convert base64 to Blob */
function base64ToBlob(base64: string, mimeType = 'image/png'): Blob {
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mimeType });
}

export function AiImageGenerator({ slug, open, onOpenChange, onAccept }: AiImageGeneratorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>('upload');
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [sourceData, setSourceData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [results, setResults] = useState<{ white: string; model: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const reset = () => {
    setStage('upload');
    setSourcePreview(null);
    setSourceData(null);
    setResults(null);
    setErrorMsg('');
    setUploading(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Файл слишком большой (макс. 15МБ)');
      return;
    }

    setSourcePreview(URL.createObjectURL(file));
    try {
      const encoded = await resizeAndEncode(file);
      setSourceData(encoded);
    } catch {
      toast.error('Не удалось обработать изображение');
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  const generate = async () => {
    if (!sourceData) return;

    setStage('generating');
    setErrorMsg('');

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        toast.error('Сессия истекла, перелогиньтесь');
        setStage('upload');
        return;
      }

      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          image: sourceData.base64,
          mimeType: sourceData.mimeType,
          slug,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const raw = data.error || `HTTP ${res.status}`;
        if (raw.includes('503') || raw.includes('UNAVAILABLE') || raw.includes('high demand')) {
          throw new Error('Сервер генерации изображений перегружен. Попробуйте через 2–3 минуты.');
        }
        throw new Error(raw);
      }

      setResults({ white: data.white, model: data.model });
      setStage('preview');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setErrorMsg(msg);
      setStage('error');
    }
  };

  const handleAccept = async () => {
    if (!results) return;
    setUploading(true);

    try {
      const whiteBlob = base64ToBlob(results.white);
      const modelBlob = base64ToBlob(results.model);

      const [whiteRes, modelRes] = await Promise.all([
        supabase.storage.from('gallery').upload(`${slug}-white`, whiteBlob, { upsert: true, contentType: 'image/png' }),
        supabase.storage.from('gallery').upload(`${slug}-model`, modelBlob, { upsert: true, contentType: 'image/png' }),
      ]);

      if (whiteRes.error) throw new Error('Upload white: ' + whiteRes.error.message);
      if (modelRes.error) throw new Error('Upload model: ' + modelRes.error.message);

      const whiteUrl = supabase.storage.from('gallery').getPublicUrl(`${slug}-white`).data.publicUrl + '?v=' + Date.now();
      const modelUrl = supabase.storage.from('gallery').getPublicUrl(`${slug}-model`).data.publicUrl + '?v=' + Date.now();

      onAccept(whiteUrl, modelUrl);
      toast.success('AI-фото загружены. Нажмите «Сохранить».');
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ошибка загрузки';
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm tracking-[0.15em] uppercase">
            AI-генерация фото
          </DialogTitle>
        </DialogHeader>

        {/* Stage: Upload */}
        {stage === 'upload' && (
          <div className="space-y-4">
            {sourcePreview ? (
              <div className="relative aspect-square rounded overflow-hidden border border-border bg-muted">
                <img src={sourcePreview} alt="Source" className="w-full h-full object-contain" />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full aspect-square rounded border-2 border-dashed border-border hover:border-primary/50
                           bg-muted/50 flex flex-col items-center justify-center gap-2 transition-colors"
              >
                <Upload size={32} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Загрузите фото украшения</span>
              </button>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex gap-2">
              {sourcePreview && (
                <>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => inputRef.current?.click()}>
                    Другое фото
                  </Button>
                  <Button size="sm" className="flex-1" onClick={generate} disabled={!sourceData}>
                    Сгенерировать
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Stage: Generating */}
        {stage === 'generating' && (
          <div className="space-y-4">
            {sourcePreview && (
              <div className="w-20 h-20 mx-auto rounded overflow-hidden border border-border">
                <img src={sourcePreview} alt="Source" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] rounded bg-muted animate-pulse" />
              <div className="aspect-[3/4] rounded bg-muted animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              Генерируем фото... ~15 сек
            </div>
          </div>
        )}

        {/* Stage: Preview */}
        {stage === 'preview' && results && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Белый фон</p>
                <div className="aspect-[3/4] rounded overflow-hidden border border-border bg-muted">
                  <img
                    src={`data:image/png;base64,${results.white}`}
                    alt="White background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Модель</p>
                <div className="aspect-[3/4] rounded overflow-hidden border border-border bg-muted">
                  <img
                    src={`data:image/png;base64,${results.model}`}
                    alt="Model"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleOpenChange(false)} disabled={uploading}>
                <X size={14} className="mr-1" /> Отмена
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={generate} disabled={uploading}>
                <RefreshCw size={14} className="mr-1" /> Заново
              </Button>
              <Button size="sm" className="flex-1" onClick={handleAccept} disabled={uploading}>
                {uploading ? (
                  <Loader2 size={14} className="animate-spin mr-1" />
                ) : (
                  <Check size={14} className="mr-1" />
                )}
                Использовать
              </Button>
            </div>
          </div>
        )}

        {/* Stage: Error */}
        {stage === 'error' && (
          <div className="space-y-4">
            <div className="rounded border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {errorMsg || 'Произошла ошибка при генерации'}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleOpenChange(false)}>
                <X size={14} className="mr-1" /> Закрыть
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={generate}>
                <RefreshCw size={14} className="mr-1" /> Попробовать снова
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
