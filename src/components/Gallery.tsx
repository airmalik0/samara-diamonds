import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';

const galleryItems = [
  {
    titleKey: 'gallery.rings',
    subtitleKey: 'gallery.rings.sub',
    imageWhite: '/gallery/rings-white.webp',
    imageModel: '/gallery/rings-model.webp',
  },
  {
    titleKey: 'gallery.earrings',
    subtitleKey: 'gallery.earrings.sub',
    imageWhite: '/gallery/earrings-white.webp',
    imageModel: '/gallery/earrings-model.webp',
  },
  {
    titleKey: 'gallery.pendants',
    subtitleKey: 'gallery.pendants.sub',
    imageWhite: '/gallery/pendants-white.webp',
    imageModel: '/gallery/pendants-model.webp',
  },
  {
    titleKey: 'gallery.sets',
    subtitleKey: 'gallery.sets.sub',
    imageWhite: '/gallery/sets-white.webp',
    imageModel: '/gallery/sets-model.webp',
  },
  {
    titleKey: 'gallery.bracelets',
    subtitleKey: 'gallery.bracelets.sub',
    imageWhite: '/gallery/bracelets-white.webp',
    imageModel: '/gallery/bracelets-model.webp',
  },
  {
    titleKey: 'gallery.necklaces',
    subtitleKey: 'gallery.necklaces.sub',
    imageWhite: '/gallery/necklaces-white.webp',
    imageModel: '/gallery/necklaces-model.webp',
  },
];

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t('gallery.overline')}
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium">
              {t('gallery.title')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={item.titleKey} delay={i * 100}>
              <div className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
                {/* Layer 1: Model image (underneath, revealed on hover) */}
                <img
                  src={item.imageModel}
                  alt={t(item.titleKey)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                />

                {/* Layer 2: White background product (on top, slides away on hover) */}
                <div
                  className="absolute inset-0 transition-transform duration-[1.8s] group-hover:translate-x-full"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                >
                  <img
                    src={item.imageWhite}
                    alt={t(item.titleKey)}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient for text — only on model (hover) state */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.8s]"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p
                    className="text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-700 text-neutral-400 group-hover:text-neutral-300"
                    style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                  >
                    {t(item.subtitleKey)}
                  </p>
                  <h3
                    className="mt-1 text-base md:text-xl font-medium font-['Playfair_Display',serif] transition-colors duration-700 text-neutral-800 group-hover:text-white"
                    style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                  >
                    {t(item.titleKey)}
                  </h3>
                </div>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-primary/60 w-0 group-hover:w-full transition-all duration-[1.8s]"
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
