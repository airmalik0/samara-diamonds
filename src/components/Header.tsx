import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useContacts } from '@/hooks/useContacts';

const navKeys = [
  { key: 'nav.collections', href: '#collections' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.contacts', href: '#visit' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();
  const { data: contacts } = useContacts();
  const phone = contacts?.phone || '+998935557555';
  const phoneDisplay = phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      style={{ transitionTimingFunction: 'var(--brand-easing)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4 lg:py-5">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none shrink-0">
          <span className="text-xl lg:text-2xl font-semibold tracking-[0.2em] font-['Playfair_Display',serif]">
            SAMAR
          </span>
          <span className="text-[9px] lg:text-[10px] tracking-[0.35em] text-muted-foreground mt-0.5">
            DIAMONDS
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.1em] xl:tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500 whitespace-nowrap"
              style={{ transitionTimingFunction: 'var(--brand-easing)' }}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Desktop: Lang + Phone */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={toggle}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500 border border-border px-2.5 py-1"
          >
            {lang === 'ru' ? 'UZ' : 'RU'}
          </button>
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
          >
            <Phone size={14} />
            <span className="tracking-wider whitespace-nowrap">{phoneDisplay}</span>
          </a>
        </div>

        {/* Mobile/Tablet Menu Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors border border-border px-2 py-1"
          >
            {lang === 'ru' ? 'UZ' : 'RU'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-foreground"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-700 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'var(--brand-easing)',
          background: 'hsl(0 0% 4% / 0.95)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-4">
          {navKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <Phone size={14} />
            <span className="tracking-wider">{phoneDisplay}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
