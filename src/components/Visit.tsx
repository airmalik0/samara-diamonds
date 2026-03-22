import { ScrollReveal } from './ScrollReveal';
import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

export function Visit() {
  return (
    <section id="visit" className="py-20 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Ждём вас
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium">
              Посетите <em className="font-normal italic text-primary/70">бутик</em>
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
                    Адрес
                  </h3>
                  <p className="mt-2 text-muted-foreground font-light">
                    Tashkent City Mall, 1 этаж
                    <br />
                    г. Ташкент, ул. Ботир Закиров, 7
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
                    Часы работы
                  </h3>
                  <p className="mt-2 text-muted-foreground font-light">
                    Пн — Чт: 10:00 — 23:00
                    <br />
                    Пт — Вс: 10:00 — 00:00
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
                    Телефон
                  </h3>
                  <a
                    href="tel:+998935557555"
                    className="mt-2 block text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                  >
                    +998 93 555 75 55
                  </a>
                  <p className="text-sm text-muted-foreground/60 mt-1">Sara</p>
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
                    Социальные сети
                  </h3>
                  <div className="mt-2 flex flex-col gap-1">
                    <a
                      href="https://www.instagram.com/samardiamonds/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                    >
                      @samardiamonds
                    </a>
                    <a
                      href="https://t.me/samar_diamonds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground font-light transition-colors duration-500"
                    >
                      Telegram
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
                1 этаж, бутик SAMAR Italy
              </p>
              <a
                href="https://www.tcmall.uz/en/scheme?location=s151"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-primary/30 text-sm tracking-[0.15em] uppercase text-primary hover:border-primary/60 transition-all duration-500"
                style={{ transitionTimingFunction: 'var(--brand-easing)' }}
              >
                Показать на карте
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
