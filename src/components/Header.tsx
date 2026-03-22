import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Коллекции', href: '#collections' },
  { label: 'О нас', href: '#about' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Контакты', href: '#visit' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.1em] xl:tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500 whitespace-nowrap"
              style={{ transitionTimingFunction: 'var(--brand-easing)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Phone */}
        <a
          href="tel:+998935557555"
          className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 shrink-0"
        >
          <Phone size={14} />
          <span className="tracking-wider whitespace-nowrap">+998 93 555 75 55</span>
        </a>

        {/* Mobile/Tablet Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+998935557555"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <Phone size={14} />
            <span className="tracking-wider">+998 93 555 75 55</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
