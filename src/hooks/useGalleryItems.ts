import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type GalleryItem = Tables<'gallery_items'>;

const DEFAULTS: GalleryItem[] = [
  { id: 1, slug: 'rings',     sort_order: 1, subtitle_ru: 'New Collection 2026', subtitle_uz: 'New Collection 2026',   image_white: '/gallery/rings-white.webp',     image_model: '/gallery/rings-model.webp',     updated_at: '' },
  { id: 2, slug: 'earrings',  sort_order: 2, subtitle_ru: 'Бриллиантовый блеск', subtitle_uz: 'Brilliant yorqinligi', image_white: '/gallery/earrings-white.webp',  image_model: '/gallery/earrings-model.webp',  updated_at: '' },
  { id: 3, slug: 'pendants',  sort_order: 3, subtitle_ru: 'Утончённый акцент',   subtitle_uz: "Nafis urg'u",          image_white: '/gallery/pendants-white.webp',  image_model: '/gallery/pendants-model.webp',  updated_at: '' },
  { id: 4, slug: 'sets',      sort_order: 4, subtitle_ru: 'Идеальная гармония',  subtitle_uz: "Mukammal uyg'unlik",   image_white: '/gallery/sets-white.webp',      image_model: '/gallery/sets-model.webp',      updated_at: '' },
  { id: 5, slug: 'bracelets', sort_order: 5, subtitle_ru: 'Элегантность',        subtitle_uz: 'Nafislik',             image_white: '/gallery/bracelets-white.webp', image_model: '/gallery/bracelets-model.webp', updated_at: '' },
  { id: 6, slug: 'necklaces', sort_order: 6, subtitle_ru: 'Роскошь и стиль',     subtitle_uz: 'Hashamat va uslub',    image_white: '/gallery/necklaces-white.webp', image_model: '/gallery/necklaces-model.webp', updated_at: '' },
];

export function useGalleryItems() {
  return useQuery({
    queryKey: ['gallery-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULTS,
  });
}
