import { useEffect, useCallback, useRef } from 'react';

/* ── Helper: replay an animation by removing + re-adding ── */
function replayAnim(el) {
  if (!el) return;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
}

/* ── Premium Modal ─────────────────────────────────────── */
function PremiumModal({ student, onClose }) {
  const beamsRef  = useRef(null);
  const trophyRef = useRef(null);
  const crownRef  = useRef(null);

  // Re-trigger cinematic animations each time this modal opens
  useEffect(() => {
    if (!student) return;
    beamsRef.current?.querySelectorAll('.light-beam').forEach(b => replayAnim(b));
    replayAnim(trophyRef.current);
    replayAnim(crownRef.current);
  }, [student]);

  if (!student) return null;
  const { name, photo, rank, marks, percentage, achievement, message } = student;

  return (
    <div className="modal-container premium-modal open" id="premiumModal">
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

      {/* Cinematic celebration layer */}
      <div className="modal-celebration-layer" ref={beamsRef}>
        <div className="light-beam beam-1" />
        <div className="light-beam beam-2" />
        <div className="light-beam beam-3" />
        <div className="light-beam beam-4" />
        <div className="trophy-rise" ref={trophyRef}>🏆</div>
        <div className="crown-drop"  ref={crownRef}>👑</div>
      </div>

      <div className="premium-modal-content">
        <div className="modal-congrats-banner">🏆 Congratulations!</div>
        <div className="modal-congrats-msg">
          You are among the Top 3 Achievers. Your dedication, perseverance, and excellence
          have made us incredibly proud. Keep reaching for greater heights.
        </div>

        <div className="premium-modal-photo-ring">
          <div className="modal-rotating-ring" />
          <div className="modal-photo-wrapper">
            <img className="modal-photo" src={photo || ''} alt={name} />
          </div>
          <div className="modal-crown-badge">👑</div>
          <div className="modal-top-ribbon">Top Achiever</div>
        </div>

        <h2 className="modal-student-name" id="modalStudentName">{name}</h2>
        <div className="modal-rank-badge">🏆 Rank #{rank}</div>

        <div className="modal-stats-row">
          <div className="modal-stat">
            <span className="modal-stat-label">Marks</span>
            <span className="modal-stat-value">{marks}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Percentage</span>
            <span className="modal-stat-value">{percentage}</span>
          </div>
        </div>

        <div className="modal-achievement-badge">{achievement}</div>

        <div className="modal-message-block">
          <p className="modal-personal-msg">{message}</p>
          <p className="modal-teacher-msg">
            &ldquo;Your teacher is incredibly proud of your journey. You have proven that
            excellence is not a talent — it is a daily decision.&rdquo;
          </p>
          <p className="modal-future-quote">
            🌟 &ldquo;The future belongs to those who believe in the beauty of their dreams.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Regular Modal ─────────────────────────────────────── */
function RegularModal({ student, onClose }) {
  if (!student) return null;
  const { name, photo, rank, marks, percentage, achievement, message } = student;

  return (
    <div className="modal-container regular-modal open" id="regularModal">
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
      <div className="regular-modal-photo-wrapper">
        <img
          className="modal-photo regular-modal-photo"
          src={photo || ''}
          alt={name}
        />
        <div className="photo-glow-ring" />
      </div>
      <h2 className="modal-student-name" id="regularModalName">{name}</h2>
      <div className="modal-rank-badge regular-rank">Rank #{rank}</div>

      <div className="modal-stats-row">
        <div className="modal-stat">
          <span className="modal-stat-label">Marks</span>
          <span className="modal-stat-value">{marks}</span>
        </div>
        <div className="modal-stat">
          <span className="modal-stat-label">Percentage</span>
          <span className="modal-stat-value">{percentage}</span>
        </div>
      </div>

      <div className="modal-achievement-badge regular-achievement">{achievement}</div>

      <div className="modal-message-block">
        <p className="modal-personal-msg">{message}</p>
        <p className="modal-teacher-msg">
          &ldquo;Your dedication and hard work have paid off. We are proud of your achievement
          and look forward to seeing your continued success.&rdquo;
        </p>
        <p className="modal-future-quote">
          🌟 &ldquo;Every expert was once a beginner. Keep learning, keep growing.&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ── Modal Overlay (combines both) ────────────────────── */
export default function Modal({ modalState, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && modalState) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [modalState, onClose]);

  const handleOverlayClick = useCallback(
    e => { if (e.target === e.currentTarget) onClose(); },
    [onClose]
  );

  if (!modalState) return null;
  const { student, type } = modalState;

  return (
    <div
      className="modal-overlay open"
      id="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={type === 'premium' ? 'modalStudentName' : 'regularModalName'}
      onClick={handleOverlayClick}
    >
      {type === 'premium'
        ? <PremiumModal  student={student} onClose={onClose} />
        : <RegularModal  student={student} onClose={onClose} />
      }
    </div>
  );
}
