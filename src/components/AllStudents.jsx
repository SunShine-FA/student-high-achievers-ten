import { useState, useEffect, useRef } from 'react';
import StudentCard from './StudentCard';

const FILTERS = [
  { label: 'All Students', value: 'all'    },
  { label: 'Boys',         value: 'male'   },
  { label: 'Girls',        value: 'female' },
];

export default function AllStudents({ students, onCardClick }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleIds, setVisibleIds]     = useState(new Set());
  const gridRef = useRef(null);

  const filtered = activeFilter === 'all'
    ? students
    : students.filter(s => s.gender === activeFilter);

  // IntersectionObserver for scroll-reveal of student cards
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleIds(prev => new Set([...prev, entry.target.dataset.id]));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    grid.querySelectorAll('[data-id]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeFilter]); // re-observe when filter changes

  return (
    <section className="all-students-section" id="all-students">
      <div className="section-header reveal-header">
        <h2 className="section-title">🌟 All Achievers</h2>
        <p className="section-subtitle">Every student who made us proud</p>
        <div className="section-divider">
          <span className="divider-line" />
          <span className="divider-gem">◆</span>
          <span className="divider-line" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => { setActiveFilter(f.value); setVisibleIds(new Set()); }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="students-grid" ref={gridRef}>
        {filtered.map((s, i) => (
          <div key={s.id} data-id={s.id} style={{ transitionDelay: `${i * 60}ms` }}>
            <StudentCard
              student={s}
              onCardClick={onCardClick}
              visible={visibleIds.has(s.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
