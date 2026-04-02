import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { useGalleryItems } from '@/hooks/useGalleryItems';

export function Gallery() {
  const { t, lang } = useLanguage();
  const { data: items } = useGalleryItems();

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
          {items?.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 100}>
              <div className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
                {/* Layer 1: Model image (underneath, revealed on hover) */}
                <img
                  src={item.image_model}
                  alt={item.slug}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                />

                {/* Layer 2: White background product (on top, slides away on hover) */}
                <div
                  className="absolute inset-0 transition-transform duration-[1.8s] group-hover:translate-x-full"
                  style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                >
                  <img
                    src={item.image_white}
                    alt={item.slug}
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
                    className="text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-700 text-neutral-400 group-hover:text-neutral-300"
                    style={{ transitionTimingFunction: 'var(--brand-easing)' }}
                  >
                    {lang === 'ru' ? item.subtitle_ru : item.subtitle_uz}
                  </p>
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
