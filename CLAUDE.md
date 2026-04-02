# Samara Diamonds

Ювелирный лендинг для бутика SAMAR DIAMONDS (Tashkent City Mall).

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage)
- Deployed via Lovable (lovable.app)

## Supabase

- **Project ID:** `izebxyvfrlkvqgjwteol`
- **URL:** `https://izebxyvfrlkvqgjwteol.supabase.co`
- **Region:** ap-southeast-2 (Sydney)
- **Publishable key:** `sb_publishable_M71Zyh8SH-Pmi-7Os6MkPg_XvY24IhE`
- **Legacy anon key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZWJ4eXZmcmxrdnFnand0ZW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTM5MDUsImV4cCI6MjA5MDcyOTkwNX0.ZA4uL_h0tHnffeyKJ3DcOBoYEPAOfURKzks3Lfmvayo`
> **Secret key** хранится в памяти Claude (memory), НЕ в репозитории. Используется только для серверных Admin API вызовов.

### Tables
- `gallery_items` — 6 фиксированных строк (кольца, серьги, подвески, комплекты, браслеты, колье). Поля: slug, subtitle_ru/uz, image_white, image_model, sort_order.
- `contacts` — 1 строка (id=1). Телефон, адрес, часы, соцсети (все RU/UZ).

### Storage
- Бакет `gallery` — публичный read, authenticated write. Для фото товаров.

### Auth
- Один admin user: `admin@samardiamonds.uz`
- Email зашит в коде (`src/hooks/useAuth.ts`), форма логина показывает только поле пароля
- Юзеры создаются ТОЛЬКО через Admin API (`POST /auth/v1/admin/users` с secret key), НЕ через SQL INSERT

### RLS
- Все таблицы: public SELECT, authenticated UPDATE only
- Storage: public SELECT, authenticated INSERT/UPDATE/DELETE

## Routes
- `/` — лендинг (public)
- `/admin` — панель управления (password auth)

## Architecture
- Публичные компоненты (`Gallery.tsx`, `Visit.tsx`, `Header.tsx`) используют react-query хуки (`useGalleryItems`, `useContacts`) с hardcoded fallback данными
- Админка: `src/components/admin/` — GalleryEditor, ContactsEditor, ImageUpload
- Client: `src/integrations/supabase/client.ts` (publishable key)
- Types: `src/integrations/supabase/types.ts` (auto-generated)

## Deploy
- GitHub repo: `airmalik0/samara-diamonds`
- Lovable auto-deploys on push to main
- Live URL: `bloom-page-frame.lovable.app`

## Commands
```bash
npm run dev      # dev server :8080
npm run build    # production build
npm run test     # vitest
```
