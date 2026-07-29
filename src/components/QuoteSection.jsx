import { useEffect, useRef } from 'react';

export default function QuoteSection() {
  const quoteRef = useRef(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('revealed');
        obs.unobserve(el);
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="quote-section" id="quote">
      <div className="quote-orbs">
        <div className="quote-orb quote-orb-1" />
        <div className="quote-orb quote-orb-2" />
      </div>
      <div className="quote-content">
        <div className="quote-mark quote-mark-open">&ldquo;</div>
        <blockquote className="main-quote reveal-text" ref={quoteRef}>
          Success is not the destination; it is the reward<br />of consistent hard work.
        </blockquote>
        <div className="quote-mark quote-mark-close">&rdquo;</div>
        <div className="quote-line" />
        <p className="quote-author">— Board of Excellence, 2026</p>
      </div>
    </section>
  );
}
