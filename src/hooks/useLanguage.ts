import { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'ru' | 'uz';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Header nav
  'nav.collections': { ru: 'Коллекции', uz: 'Kolleksiyalar' },
  'nav.about': { ru: 'О нас', uz: 'Biz haqimizda' },
  'nav.gallery': { ru: 'Галерея', uz: 'Galereya' },
  'nav.contacts': { ru: 'Контакты', uz: 'Kontaktlar' },

  // Hero
  'hero.overline': { ru: 'Tashkent City Mall', uz: 'Tashkent City Mall' },
  'hero.headline1': { ru: 'Бриллианты,', uz: 'Brilliantlar,' },
  'hero.headline2': { ru: 'достойные', uz: 'munosib' },
  'hero.headline3': { ru: 'каждой.', uz: 'har biringizga.' },
  'hero.subtitle': {
    ru: '750+ изделий из белого золота с бриллиантами мирового класса. Всё в наличии, всё сразу.',
    uz: '750+ oq oltin buyumlar jahon darajasidagi brilliantlar bilan. Hammasi mavjud, hammasi bir joyda.',
  },
  'hero.cta.visit': { ru: 'Посетить бутик', uz: 'Butikka tashrif' },
  'hero.cta.call': { ru: 'Позвонить', uz: 'Qo\'ng\'iroq' },

  // Features
  'features.overline': { ru: 'Почему мы', uz: 'Nega biz' },
  'features.title1': { ru: 'Три причины', uz: 'Uchta sabab' },
  'features.title2': { ru: 'выбрать нас', uz: 'bizni tanlash' },
  'features.diamonds.title': { ru: 'Бриллианты мирового класса', uz: 'Jahon darajasidagi brilliantlar' },
  'features.diamonds.desc': {
    ru: 'Только сертифицированные камни высочайшего качества. Каждый бриллиант проходит строгий отбор — безупречная огранка, чистота и сияние, которое невозможно не заметить.',
    uz: 'Faqat eng yuqori sifatli sertifikatlangan toshlar. Har bir brilliant qat\'iy tanlovdan o\'tadi — benuqson kesim, tozalik va siz sezmay qolmaslik mumkin bo\'lmagan yorqinlik.',
  },
  'features.gold.title': { ru: '750+ изделий в наличии', uz: '750+ buyum mavjud' },
  'features.gold.desc': {
    ru: 'Белое и жёлтое золото 750 пробы. Кольца, серьги, подвески, браслеты, колье — всё в наличии и готово стать вашим. Без ожидания, без предзаказа.',
    uz: '750 probali oq va sariq oltin. Uzuklar, sirg\'alar, kulonlar, bilaguzuklar, marjonlar — hammasi mavjud va sizniki bo\'lishga tayyor. Kutmasdan, oldindan buyurtmasiz.',
  },
  'features.price.title': { ru: 'Лучшие цены', uz: 'Eng yaxshi narxlar' },
  'features.price.desc': {
    ru: 'Прямые поставки из Италии без посредников. Эксклюзивные модели по справедливой цене — роскошь, которая доступна.',
    uz: 'Italiyadan vositachilarsiz to\'g\'ridan-to\'g\'ri yetkazib berish. Adolatli narxdagi eksklyuziv modellar — hamyonbop hashamat.',
  },

  // Gallery
  'gallery.overline': { ru: 'Витрина', uz: 'Vitrina' },
  'gallery.title': { ru: 'Галерея', uz: 'Galereya' },
  'gallery.rings': { ru: 'Кольца', uz: 'Uzuklar' },
  'gallery.rings.sub': { ru: 'New Collection 2026', uz: 'New Collection 2026' },
  'gallery.earrings': { ru: 'Серьги', uz: 'Sirg\'alar' },
  'gallery.earrings.sub': { ru: 'Бриллиантовый блеск', uz: 'Brilliant yorqinligi' },
  'gallery.pendants': { ru: 'Подвески', uz: 'Kulonlar' },
  'gallery.pendants.sub': { ru: 'Утончённый акцент', uz: 'Nafis urg\'u' },
  'gallery.sets': { ru: 'Комплекты', uz: 'Komplektlar' },
  'gallery.sets.sub': { ru: 'Идеальная гармония', uz: 'Mukammal uyg\'unlik' },
  'gallery.bracelets': { ru: 'Браслеты', uz: 'Bilaguzuklar' },
  'gallery.bracelets.sub': { ru: 'Элегантность', uz: 'Nafislik' },
  'gallery.necklaces': { ru: 'Колье', uz: 'Marjonlar' },
  'gallery.necklaces.sub': { ru: 'Роскошь и стиль', uz: 'Hashamat va uslub' },

  // Visit
  'visit.overline': { ru: 'Ждём вас', uz: 'Sizni kutamiz' },
  'visit.title1': { ru: 'Посетите', uz: 'Tashrif buyuring' },
  'visit.title2': { ru: 'бутик', uz: 'butikka' },
  'visit.address.label': { ru: 'Адрес', uz: 'Manzil' },
  'visit.address.line1': { ru: 'Tashkent City Mall, 1 этаж', uz: 'Tashkent City Mall, 1-qavat' },
  'visit.address.line2': { ru: 'г. Ташкент, ул. Ботир Закиров, 7', uz: 'Toshkent sh., Botir Zokirov ko\'ch., 7' },
  'visit.hours.label': { ru: 'Часы работы', uz: 'Ish vaqti' },
  'visit.hours.weekday': { ru: 'Пн — Чт: 10:00 — 23:00', uz: 'Du — Pa: 10:00 — 23:00' },
  'visit.hours.weekend': { ru: 'Пт — Вс: 10:00 — 00:00', uz: 'Ju — Ya: 10:00 — 00:00' },
  'visit.phone.label': { ru: 'Телефон', uz: 'Telefon' },
  'visit.social.label': { ru: 'Социальные сети', uz: 'Ijtimoiy tarmoqlar' },
  'visit.map.subtitle': { ru: '1 этаж, бутик SAMAR Italy', uz: '1-qavat, SAMAR Italy butigi' },
  'visit.map.button': { ru: 'Показать на карте', uz: 'Xaritada ko\'rsatish' },

  // Footer
  'footer.copyright': { ru: '© 2026 SAMAR DIAMONDS', uz: '© 2026 SAMAR DIAMONDS' },
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  toggle: () => {},
  t: (key: string) => key,
});

export function useLanguageProvider() {
  const [lang, setLang] = useState<Lang>('ru');

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'ru' ? 'uz' : 'ru'));
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return { lang, toggle, t };
}

export function useLanguage() {
  return useContext(LanguageContext);
}
