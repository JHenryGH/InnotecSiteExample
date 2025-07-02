import { useMemo } from 'react';

interface Particle {
  top: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  transformOrigin: string;
  boxShadow: string;
}

const AnimatedHeroBackground = ({ particleCount = 50 }) => {
  const particles = useMemo(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const duration = `${Math.random() * 150 + 100}s`;
      const delay = `-${Math.random() * 150}s`;
      const transformOrigin = `${Math.random() * 50 - 25}vw ${Math.random() * 50 - 25}vh`;
      const color = Math.random() > 0.3 ? 'var(--cyan)' : 'var(--lightest-slate)';
      const size = `${Math.floor(Math.random() * 2) + 1}px`;
      
      particleArray.push({
        top,
        left,
        animationDuration: duration,
        animationDelay: delay,
        transformOrigin,
        boxShadow: `${size} ${size} ${color}`,
      });
    }
    return particleArray;
  }, [particleCount]);

  return (
    <div className="hero-particles">
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            top: p.top,
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            transformOrigin: p.transformOrigin,
            boxShadow: p.boxShadow,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedHeroBackground;