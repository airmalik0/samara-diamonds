import { useEffect, useState } from 'react';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import { useLanguage } from '@/hooks/useLanguage';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { ref, position, isTouch } = useMouseGlow();
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-end"
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-background z-10" />
      {/* Left text readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-[hsl(0,0%,4%)]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/hero/hero-1.webp"
        >
          <source src="/hero/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Jeweler's Light — cursor glow */}
      {!isTouch && (
        <div
          className="absolute z-10 pointer-events-none transition-opacity duration-1000"
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsl(0 0% 91% / 0.06) 0%, transparent 70%)',
            left: position.x - 250,
            top: position.y - 250,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-10 pb-16 md:pb-24 max-w-7xl mx-auto">
        {/* Overline */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionTimingFunction: 'var(--brand-easing)' }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground">
            {t('hero.overline')}
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`mt-4 md:mt-6 text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] max-w-xl md:max-w-2xl transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--brand-easing)' }}
        >
          {t('hero.headline1')}{' '}
          <em className="font-normal italic text-primary/70">
            {t('hero.headline2')}
          </em>{' '}
          {t('hero.headline3')}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-lg font-light transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionTimingFunction: 'var(--brand-easing)' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA */}
        <div
          className={`mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-[900ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionTimingFunction: 'var(--brand-easing)' }}
        >
          <a
            href="#visit"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500"
            style={{ transitionTimingFunction: 'var(--brand-easing)' }}
          >
            {t('hero.cta.visit')}
          </a>
          <a
            href="tel:+998935557555"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-primary/30 text-sm tracking-[0.15em] uppercase text-primary hover:border-primary/60 transition-all duration-500"
            style={{ transitionTimingFunction: 'var(--brand-easing)' }}
          >
            {t('hero.cta.call')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1200ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown size={20} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
