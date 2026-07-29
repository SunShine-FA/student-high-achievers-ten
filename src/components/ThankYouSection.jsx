import { useEffect, useRef } from 'react';

export default function ThankYouSection() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="thankyou-section" id="thankyou">
      <div className="section-header reveal-header">
        <h2 className="section-title">💌 A Message to Our Stars</h2>
        <div className="section-divider">
          <span className="divider-line" />
          <span className="divider-gem">◆</span>
          <span className="divider-line" />
        </div>
      </div>
      <div className="thankyou-card" ref={cardRef}>
        <div className="thankyou-icon">💛</div>
        <p className="thankyou-salutation">To our dear students,</p>
        <p className="thankyou-body">
          Your success is the result of your determination, hard work, and unwavering
          commitment. We are immensely proud of each one of you. Continue believing in
          yourselves and never stop learning.
        </p>
        <p className="thankyou-body">
          May this achievement be the beginning of many greater accomplishments.
          Congratulations once again, and best wishes for a bright future!
        </p>
        <p className="thankyou-sign">
          With Love &amp; Pride,<br />
          <strong>Your Teachers &amp; School Family</strong>
        </p>
      </div>
    </section>
  );
}
