import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Contacts = Tables<'contacts'>;

const DEFAULTS: Contacts = {
  id: 1,
  phone: '+998935557555',
  contact_name: 'Sara',
  instagram_url: 'https://www.instagram.com/samardiamonds/',
  instagram_handle: '@samardiamonds',
  telegram_url: 'https://t.me/samar_diamonds',
  telegram_label: 'Telegram',
  address_ru: 'Tashkent City Mall, 1 этаж',
  address_uz: 'Tashkent City Mall, 1-qavat',
  address_line2_ru: 'г. Ташкент, ул. Ботир Закиров, 7',
  address_line2_uz: "Toshkent sh., Botir Zokirov ko'ch., 7",
  hours_weekday_ru: 'Пн — Чт: 10:00 — 23:00',
  hours_weekday_uz: 'Du — Pa: 10:00 — 23:00',
  hours_weekend_ru: 'Пт — Вс: 10:00 — 00:00',
  hours_weekend_uz: 'Ju — Ya: 10:00 — 00:00',
  map_url: 'https://www.tcmall.uz/en/scheme?location=s151',
  map_subtitle_ru: '1 этаж, бутик SAMAR Italy',
  map_subtitle_uz: '1-qavat, SAMAR Italy butigi',
  updated_at: '',
};

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', 1)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULTS,
  });
}
