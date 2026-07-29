import { useEffect, useRef } from 'react';

export default function Footer() {
  const starsRef = useRef(null);

  useEffect(() => {
    const stars = starsRef.current?.querySelectorAll('span');
    if (!stars) return;
    stars.forEach((star, i) => {
      star.style.display        = 'inline-block';
      star.style.animation      = `trophyPulse ${1.5 + i * 0.2}s ease-in-out infinite`;
      star.style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-content">
        <div className="footer-trophy">🏆</div>
        <h4 className="footer-institute">Air Foundation School &amp; College</h4>
        <p className="footer-text">
          Made with <span className="footer-heart">❤️</span> for Our Students
        </p>
        <p className="footer-year">Congratulations Class of 2026</p>
        <div className="footer-stars" ref={starsRef}>
          <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
        </div>
      </div>
    </footer>
  );
}
