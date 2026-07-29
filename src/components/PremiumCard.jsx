import { useRef, useCallback } from 'react';

/* ── Helpers ─────────────────────────────────────────────── */
function getRankClass(rank) {
  return ['rank-gold', 'rank-silver', 'rank-bronze'][rank - 1] || 'rank-default';
}

function PhotoOrAvatar({ student }) {
  const emoji = student.gender === 'female' ? '👩‍🎓' : '👨‍🎓';
  if (student.photo) {
    return (
      <>
        <img
          src={student.photo}
          alt={student.name}
          loading="lazy"
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="avatar-fallback" style={{ display: 'none' }}>{emoji}</div>
      </>
    );
  }
  return <div className="avatar-fallback">{emoji}</div>;
}

/* ── Card Particles (static config generated once) ────────── */
const PARTICLE_CFG = Array.from({ length: 8 }, () => ({
  left:  10 + Math.random() * 80,
  dur:   3  + Math.random() * 4,
  delay: Math.random() * 4,
}));

const STAR_POS = [
  [15, 12], [80, 15], [8, 70], [88, 65], [50, 5], [30, 88], [72, 82],
];
const STAR_CFG = STAR_POS.map(([l, t]) => ({
  left:  l,
  top:   t,
  dur:   2 + Math.random() * 2,
  delay: Math.random() * 3,
}));

/* ── PremiumCard ─────────────────────────────────────────── */
export default function PremiumCard({ student, delay = 0, onCardClick }) {
  const cardRef = useRef(null);

  const rankClass = getRankClass(student.rank);

  // 3-D tilt effect
  const handleMouseMove = useCallback(e => {
    const el = cardRef.current;
    if (!el) return;
    const rect  = el.getBoundingClientRect();
    const dx    = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy    = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform =
      `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  return (
    <div
      ref={cardRef}
      className="premium-card tilt-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onCardClick(student)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onCardClick(student)}
    >
      {/* Spotlight */}
      <div className="spotlight" />

      {/* Floating particles */}
      <div className="card-particles">
        {PARTICLE_CFG.map((p, i) => (
          <span
            key={i}
            className="card-particle"
            style={{ left: `${p.left}%`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s` }}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="card-stars">
        {STAR_CFG.map((s, i) => (
          <span
            key={i}
            className="card-star"
            style={{
              left: `${s.left}%`, top: `${s.top}%`,
              '--sdur': `${s.dur}s`, '--sdelay': `${s.delay}s`,
            }}
          >✦</span>
        ))}
      </div>

      <div className="top-achiever-ribbon">Top Achiever</div>
      <div className={`card-rank-badge ${rankClass}`}>#{student.rank}</div>

      <div className="premium-photo-ring-wrap">
        <div className="rotating-ring" />
        <div className="card-crown">👑</div>
        <div className="premium-photo-container">
          <PhotoOrAvatar student={student} />
        </div>
      </div>

      <div className="card-name">{student.name}</div>

      <div className="card-stats">
        <div className="card-stat-item">
          <span className="card-stat-val">{student.marks.split('/')[0].trim()}</span>
          <span className="card-stat-lbl">Marks</span>
        </div>
        <div className="card-stat-item">
          <span className="card-stat-val">{student.percentage}</span>
          <span className="card-stat-lbl">Percent</span>
        </div>
      </div>

      <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', opacity: 0.7 }}>
        {student.achievement}
      </div>
    </div>
  );
}
