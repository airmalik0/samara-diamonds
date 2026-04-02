import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useContacts, type Contacts } from '@/hooks/useContacts';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium tracking-wider uppercase text-muted-foreground border-b border-border pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

export function ContactsEditor() {
  const { data: contacts, isLoading } = useContacts();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Contacts | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contacts) setForm({ ...contacts });
  }, [contacts]);

  if (isLoading || !form) return <p className="text-muted-foreground">Загрузка...</p>;

  const set = (key: keyof Contacts) => (value: string) =>
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);

  const handleSave = async () => {
    setSaving(true);
    const { id, updated_at, ...fields } = form;
    const { error } = await supabase
      .from('contacts')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', 1);

    setSaving(false);
    if (error) {
      toast.error('Ошибка: ' + error.message);
    } else {
      toast.success('Контакты сохранены');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Телефон">
        <Field label="Номер" value={form.phone} onChange={set('phone')} />
        <Field label="Контактное лицо" value={form.contact_name} onChange={set('contact_name')} />
      </Section>

      <Section title="Соцсети">
        <Field label="Instagram URL" value={form.instagram_url} onChange={set('instagram_url')} />
        <Field label="Instagram @handle" value={form.instagram_handle} onChange={set('instagram_handle')} />
        <Field label="Telegram URL" value={form.telegram_url} onChange={set('telegram_url')} />
        <Field label="Telegram label" value={form.telegram_label} onChange={set('telegram_label')} />
      </Section>

      <Section title="Адрес">
        <Field label="Адрес (RU)" value={form.address_ru} onChange={set('address_ru')} />
        <Field label="Адрес (UZ)" value={form.address_uz} onChange={set('address_uz')} />
        <Field label="Адрес строка 2 (RU)" value={form.address_line2_ru} onChange={set('address_line2_ru')} />
        <Field label="Адрес строка 2 (UZ)" value={form.address_line2_uz} onChange={set('address_line2_uz')} />
      </Section>

      <Section title="Часы работы">
        <Field label="Будни (RU)" value={form.hours_weekday_ru} onChange={set('hours_weekday_ru')} />
        <Field label="Будни (UZ)" value={form.hours_weekday_uz} onChange={set('hours_weekday_uz')} />
        <Field label="Выходные (RU)" value={form.hours_weekend_ru} onChange={set('hours_weekend_ru')} />
        <Field label="Выходные (UZ)" value={form.hours_weekend_uz} onChange={set('hours_weekend_uz')} />
      </Section>

      <Section title="Карта">
        <Field label="URL карты" value={form.map_url} onChange={set('map_url')} />
        <Field label="Подпись карты (RU)" value={form.map_subtitle_ru} onChange={set('map_subtitle_ru')} />
        <Field label="Подпись карты (UZ)" value={form.map_subtitle_uz} onChange={set('map_subtitle_uz')} />
      </Section>

      <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
        {saving ? <Loader2 size={14} className="animate-spin mr-2" /> : <Save size={14} className="mr-2" />}
        Сохранить всё
      </Button>
    </div>
  );
}
