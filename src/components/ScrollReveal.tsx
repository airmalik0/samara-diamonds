import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  mode?: 'curtain' | 'rise';
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, mode = 'rise', delay = 0, className }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  const modeClass = mode === 'curtain' ? 'curtain-reveal' : 'rise-reveal';

  return (
    <div
      ref={ref}
      className={cn(modeClass, isVisible && 'visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
