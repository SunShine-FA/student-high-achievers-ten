import { useCallback, useRef } from 'react';

export default function Hero() {
  const rippleRef = useRef(null);

  const handleEnter = useCallback(() => {
    // Ripple effect
    const ripple = rippleRef.current;
    if (ripple) {
      ripple.style.animation = 'none';
      void ripple.offsetWidth;
      ripple.style.animation = 'rippleEffect 0.6s ease-out';
    }
    const target = document.getElementById('top-boys');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-gradient" />
      <div className="hero-floating-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <div className="hero-content">
        <div className="hero-trophy-wrapper">
          <div className="hero-trophy-ring" />
          <div className="hero-trophy-icon">🏆</div>
        </div>
        <div className="hero-badge">Class of 2026</div>
        <h1 className="hero-title">
          <span className="hero-title-line1">Digital</span>
          <span className="hero-title-line2">Hall of Fame</span>
        </h1>
        <p className="hero-subtitle">Celebrating Our Board Achievers 2026</p>
        <p className="hero-institute">Air Foundation School &amp; College</p>
        <blockquote className="hero-quote">
          &ldquo;We don&apos;t celebrate marks alone; we celebrate<br />
          dedication, discipline, and dreams.&rdquo;
        </blockquote>
        <button className="hero-cta-btn" id="enterHallBtn" onClick={handleEnter}>
          <span className="btn-ripple" ref={rippleRef} />
          <span className="btn-icon">✨</span>
          Enter Hall of Fame
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
