import { useEffect, useRef } from 'react';
import PremiumCard from './PremiumCard';
import { podiumOrder } from '../data/students';

export default function PremiumSection({ students, sectionId, title, subtitle, pinkDecor, onCardClick }) {
  const containerRef = useRef(null);

  // Intersection Observer — stagger cards into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.premium-card');
    cards.forEach(card => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 200);
        });
        obs.unobserve(container);
      }
    }, { threshold: 0.1 });

    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  const ordered = podiumOrder(students);

  return (
    <section className="premium-section" id={sectionId}>
      <div className={`section-bg-decor${pinkDecor ? ' section-bg-decor-pink' : ''}`} />
      <div className="section-header reveal-header">
        <div className="section-crown">👑</div>
        <h2 className="section-title gold-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <div className="section-divider">
          <span className="divider-line" />
          <span className="divider-gem">◆</span>
          <span className="divider-line" />
        </div>
      </div>
      <div className="premium-cards-container" ref={containerRef}>
        {ordered.map((s, i) => (
          <PremiumCard
            key={s.id}
            student={s}
            delay={i * 150}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}
