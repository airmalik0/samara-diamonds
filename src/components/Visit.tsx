import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { useContacts } from '@/hooks/useContacts';
import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

export function Visit() {
  const { t, lang } = useLanguage();
  const { data: c } = useContacts();

  if (!c) return null;

  const l = <T,>(ru: T, uz: T) => (lang === 'ru' ? ru : uz);

  return (
    <section id="visit" className="py-20 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t('visit.overline')}
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium">
              {t('visit.title1')} <em className="font-normal italic text-primary/70">{t('visit.title2')}</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Info */}
          <div className="space-y-8">
            <ScrollReveal delay={100}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                  <MapPin size={18} strokeWidth={1} className="text-primary/70" />
                </div>
                <div>
                  <h3 className="text-sm tracking-[0.15em] uppercase font-medium font-['Inter',sans-serif]">
                    {t('visit.address.label')}
                  </h3>
                  <p className="mt-2 text-muted-foreground font-light">
                    {l(c.address_ru, c.address_uz)}
                    <br />
                    {l(c.address_line2_ru, c.address_line2_uz)}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                  <Clock size={18} strokeWidth={1} className="text-primary/70" />
                </div>
                <div>
                  <h3 className="text-sm tracking-[0.15em] uppercase font-medium font-['Inter',sans-serif]">
                    {t('visit.hours.label')}
                  </h3>
                  <p className="mt-2 text-muted-foreground font-light">
                    {l(c.hours_weekday_ru, c.hours_weekday_uz)}
                    <br />
                    {l(c.hours_weekend_ru, c.hours_weekend_uz)}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                  <Phone size={18} strokeWidth={1} className="text-primary/70" />
                </div>
                <div>
                  <h3 className="text-sm tracking-[0.15em] uppercase font-medium font-['Inter',sans-serif]">
                    {t('visit.phone.label')}
                  </h3>
                  <a
                    href={`tel:${c.phone}`}
                    className="mt-2 block text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                  >
                    {c.phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}
                  </a>
                  <p className="text-sm text-muted-foreground/60 mt-1">{c.contact_name}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                  <Instagram size={18} strokeWidth={1} className="text-primary/70" />
                </div>
                <div>
                  <h3 className="text-sm tracking-[0.15em] uppercase font-medium font-['Inter',sans-serif]">
                    {t('visit.social.label')}
                  </h3>
                  <div className="mt-2 flex flex-col gap-1">
                    <a
                      href={c.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                    >
                      {c.instagram_handle}
                    </a>
                    <a
                      href={c.telegram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                    >
                      {c.telegram_label}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map placeholder / CTA */}
          <ScrollReveal delay={200}>
            <div className="flex flex-col justify-center items-center border border-border p-10 md:p-16 text-center min-h-[300px]">
              <MapPin size={32} strokeWidth={1} className="text-primary/40 mb-6" />
              <h3 className="text-xl md:text-2xl font-medium font-['Playfair_Display',serif]">
                Tashkent City Mall
              </h3>
              <p className="mt-3 text-sm text-muted-foreground font-light">
                {l(c.map_subtitle_ru, c.map_subtitle_uz)}
              </p>
              <a
                href={c.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-primary/30 text-sm tracking-[0.15em] uppercase text-primary hover:border-primary/60 transition-all duration-500"
                style={{ transitionTimingFunction: 'var(--brand-easing)' }}
              >
                {t('visit.map.button')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
