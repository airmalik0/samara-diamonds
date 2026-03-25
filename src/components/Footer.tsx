import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-10 md:py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start leading-none">
          <span className="text-lg tracking-[0.2em] font-['Playfair_Display',serif] font-medium">
            SAMAR
          </span>
          <span className="text-[8px] tracking-[0.35em] text-muted-foreground mt-0.5">
            DIAMONDS
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://www.instagram.com/samardiamonds/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-500"
          >
            Instagram
          </a>
          <a
            href="https://t.me/samar_diamonds"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-500"
          >
            Telegram
          </a>
          <a
            href="tel:+998935557555"
            className="hover:text-foreground transition-colors duration-500"
          >
            +998 93 555 75 55
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/50 font-light">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
