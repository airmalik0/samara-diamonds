import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGalleryItems, type GalleryItem } from '@/hooks/useGalleryItems';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

const SLUG_LABELS: Record<string, string> = {
  rings: 'Кольца',
  earrings: 'Серьги',
  pendants: 'Подвески',
  sets: 'Комплекты',
  bracelets: 'Браслеты',
  necklaces: 'Колье',
};

function CardForm({ item }: { item: GalleryItem }) {
  const queryClient = useQueryClient();
  const [subtitleRu, setSubtitleRu] = useState(item.subtitle_ru);
  const [subtitleUz, setSubtitleUz] = useState(item.subtitle_uz);
  const [imageWhite, setImageWhite] = useState(item.image_white);
  const [imageModel, setImageModel] = useState(item.image_model);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSubtitleRu(item.subtitle_ru);
    setSubtitleUz(item.subtitle_uz);
    setImageWhite(item.image_white);
    setImageModel(item.image_model);
  }, [item]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('gallery_items')
      .update({
        subtitle_ru: subtitleRu,
        subtitle_uz: subtitleUz,
        image_white: imageWhite,
        image_model: imageModel,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.id);

    setSaving(false);
    if (error) {
      toast.error('Ошибка сохранения: ' + error.message);
    } else {
      toast.success(`${SLUG_LABELS[item.slug] || item.slug} сохранено`);
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
    }
  };

  const hasChanges =
    subtitleRu !== item.subtitle_ru ||
    subtitleUz !== item.subtitle_uz ||
    imageWhite !== item.image_white ||
    imageModel !== item.image_model;

  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {item.sort_order}. {SLUG_LABELS[item.slug] || item.slug}
        </h3>
        <Button size="sm" onClick={handleSave} disabled={saving || !hasChanges}>
          {saving ? <Loader2 size={14} className="animate-spin mr-2" /> : <Save size={14} className="mr-2" />}
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground">Подпись (RU)</label>
          <Input value={subtitleRu} onChange={(e) => setSubtitleRu(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Подпись (UZ)</label>
          <Input value={subtitleUz} onChange={(e) => setSubtitleUz(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ImageUpload
          currentUrl={imageWhite}
          storagePath={`${item.slug}-white`}
          onUploaded={setImageWhite}
          label="Фото (белый фон)"
        />
        <ImageUpload
          currentUrl={imageModel}
          storagePath={`${item.slug}-model`}
          onUploaded={setImageModel}
          label="Фото (модель)"
        />
      </div>
    </div>
  );
}

export function GalleryEditor() {
  const { data: items, isLoading } = useGalleryItems();

  if (isLoading) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-4">
      {items?.map((item) => <CardForm key={item.id} item={item} />)}
    </div>
  );
}
