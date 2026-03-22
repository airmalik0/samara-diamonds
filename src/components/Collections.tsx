import { ScrollReveal } from './ScrollReveal';
import { Gem, CircleDot, Star, Sparkles, Link2, Crown } from 'lucide-react';

const categories = [
  { icon: Crown, label: 'Комплекты', description: 'Готовые наборы для безупречного образа' },
  { icon: Gem, label: 'Кольца', description: 'От классики до авангарда' },
  { icon: Star, label: 'Серьги', description: 'Сияние для каждого дня' },
  { icon: Sparkles, label: 'Подвески', description: 'Акцент, который запоминается' },
  { icon: Link2, label: 'Браслеты', description: 'Элегантность на запястье' },
  { icon: CircleDot, label: 'Колье', description: 'Роскошь у горла' },
];

export function Collections() {
  return (
    <section id="collections" className="py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Категории
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium">
              Коллекции
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 100}>
              <div
                className="group relative border border-border p-6 md:p-10 flex flex-col items-center text-center hover:border-primary/30 transition-all duration-700 cursor-pointer"
                style={{ transitionTimingFunction: 'var(--brand-easing)' }}
              >
                <cat.icon
                  size={28}
                  strokeWidth={1}
                  className="text-primary/60 group-hover:text-primary transition-colors duration-700"
                />
                <h3 className="mt-4 text-base md:text-lg tracking-[0.1em] font-['Inter',sans-serif] font-medium">
                  {cat.label}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground font-light">
                  {cat.description}
                </p>

                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-primary/40 w-0 group-hover:w-full transition-all duration-1000"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
