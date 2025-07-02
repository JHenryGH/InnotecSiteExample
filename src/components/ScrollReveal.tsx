import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: Props) {
  const ref = useRevealOnScroll();
  const style = { transitionDelay: `${delay}ms` };

  return (
    <div ref={ref as any} className="reveal" style={style}>
      {children}
    </div>
  );
}
