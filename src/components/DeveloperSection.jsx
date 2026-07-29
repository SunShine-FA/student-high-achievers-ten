import { useEffect, useRef } from 'react';

export default function DeveloperSection() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="developer-section" id="developer">
      <div className="developer-bg-decor" />
      <div className="developer-card" ref={cardRef}>
        <div className="dev-glow" />
        <p className="dev-title">Designed &amp; Developed By</p>
        <h3 className="dev-name gold-title">Faseeh Ur Rehman</h3>
        <div className="dev-divider">
          <span className="divider-line" />
          <span className="divider-gem">◆</span>
          <span className="divider-line" />
        </div>
        <ul className="dev-details">
          <li>🎓 BS Software Engineering</li>
          <li>🛡️ Ethical Hacker</li>
          <li>💻 Computer Teacher</li>
          <li>
            🧠 &ldquo;Mastermind&rdquo;{' '}
            <span className="dev-nickname-caption">(Nickname lovingly given by the students)</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
