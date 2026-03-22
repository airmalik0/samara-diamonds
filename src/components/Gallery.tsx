import { ScrollReveal } from './ScrollReveal';

const galleryItems = [
  {
    title: 'Кольца',
    subtitle: 'New Collection 2026',
    image: '/gallery/rings.webp',
  },
  {
    title: 'Серьги',
    subtitle: 'Бриллиантовый блеск',
    image: '/gallery/earrings.webp',
  },
  {
    title: 'Подвески',
    subtitle: 'Утончённый акцент',
    image: '/gallery/pendants.webp',
  },
  {
    title: 'Комплекты',
    subtitle: 'Идеальная гармония',
    image: '/gallery/sets.webp',
  },
  {
    title: 'Браслеты',
    subtitle: 'Элегантность',
    image: '/gallery/bracelets.webp',
  },
  {
    title: 'Колье',
    subtitle: 'Роскошь и стиль',
    image: '/gallery/necklaces.webp',
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Витрина
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium">
              Галерея
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
                {/* Product image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Velvet hover overlay */}
                <div
                  className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-1000"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-1 text-base md:text-xl font-medium font-['Playfair_Display',serif]">
                    {item.title}
                  </h3>
                </div>

                {/* Hover bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-primary/50 w-0 group-hover:w-full transition-all duration-1000"
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
