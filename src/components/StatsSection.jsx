import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, duration = 1800 }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const elRef   = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || started.current) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          setValue(Math.round(easeOut(progress) * target));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <div className="stat-number" ref={elRef}>{value}</div>;
}

export default function StatsSection({ stats }) {
  const cardRefs  = useRef([]);
  const [visible, setVisible] = useState([false, false, false]);

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          obs.unobserve(el);
        }
      }, { threshold: 0.15 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const cards = [
    { icon: '👨‍🎓', label: 'Total Students',  value: stats.total       },
    { icon: '🏅',   label: 'Distinctions',    value: stats.distinctions },
    { icon: '🎯',   label: 'Highest Marks',   value: stats.highest     },
  ];

  return (
    <section className="stats-section" id="stats">
      <div className="section-header reveal-header">
        <h2 className="section-title">📊 Achievement Statistics</h2>
        <p className="section-subtitle">Numbers that speak of excellence</p>
        <div className="section-divider">
          <span className="divider-line" />
          <span className="divider-gem">◆</span>
          <span className="divider-line" />
        </div>
      </div>
      <div className="stats-grid">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className={`stat-card${visible[i] ? ' visible' : ''}`}
            ref={el => (cardRefs.current[i] = el)}
          >
            <div className="stat-icon">{c.icon}</div>
            <AnimatedCounter target={c.value} />
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
