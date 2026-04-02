import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  currentUrl: string;
  storagePath: string;
  onUploaded: (url: string) => void;
  label: string;
}

export function ImageUpload({ currentUrl, storagePath, onUploaded, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Файл слишком большой (макс. 5MB)');
      return;
    }

    setUploading(true);
    const { error } = await supabase.storage
      .from('gallery')
      .upload(storagePath, file, { upsert: true });

    if (error) {
      toast.error('Ошибка загрузки: ' + error.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(storagePath);

    onUploaded(publicUrl + '?v=' + Date.now());
    setUploading(false);
    toast.success('Фото загружено');

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="relative aspect-[3/4] bg-muted rounded overflow-hidden border border-border">
        {currentUrl && (
          <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" size={24} />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/webp,image/jpeg,image/png"
        className="hidden"
        onChange={handleFile}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        <Upload size={14} className="mr-2" />
        Заменить
      </Button>
    </div>
  );
}
