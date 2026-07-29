import { useRef, useCallback } from 'react';

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

function getRankClass(rank) {
  return ['rank-gold', 'rank-silver', 'rank-bronze'][rank - 1] || 'rank-default';
}

export default function StudentCard({ student, onCardClick, visible }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(e => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform =
      `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  const rankClass = getRankClass(student.rank);

  return (
    <div
      ref={cardRef}
      className={`student-card tilt-card${visible ? ' visible' : ''}`}
      data-gender={student.gender}
      onClick={() => onCardClick(student)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onCardClick(student)}
    >
      <div className={`card-rank-badge ${rankClass}`}>#{student.rank}</div>
      <div className="student-photo-container">
        <PhotoOrAvatar student={student} />
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
      <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)', opacity: 0.75, marginTop: '6px' }}>
        {student.achievement}
      </div>
    </div>
  );
}
