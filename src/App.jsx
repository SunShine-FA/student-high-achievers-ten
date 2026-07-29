import { useState, useCallback, useEffect } from 'react';
import { useCanvas } from './hooks/useCanvas';
import { STUDENTS, STATS }  from './data/students';

import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import PremiumSection    from './components/PremiumSection';
import AllStudents       from './components/AllStudents';
import StatsSection      from './components/StatsSection';
import QuoteSection      from './components/QuoteSection';
import ThankYouSection   from './components/ThankYouSection';
import DeveloperSection  from './components/DeveloperSection';
import Footer            from './components/Footer';
import Modal             from './components/Modal';

const topBoys  = STUDENTS.filter(s => s.isTopBoy);
const topGirls = STUDENTS.filter(s => s.isTopGirl);
const others   = STUDENTS.filter(s => !s.isTopBoy && !s.isTopGirl);

export default function App() {
  /* ── Canvas layers ──────────────────────────────────────── */
  const { particlesRef, fireworksRef, confettiRef,
          triggerFireworksRef, triggerConfettiRef } = useCanvas();

  /* ── Modal state ────────────────────────────────────────── */
  const [modalState, setModalState] = useState(null); // { student, type }

  const openPremiumModal = useCallback(student => {
    setModalState({ student, type: 'premium' });
    // Cinematic celebration
    triggerFireworksRef.current?.(8000, true);
    triggerConfettiRef.current?.(350);
  }, [triggerFireworksRef, triggerConfettiRef]);

  const openRegularModal = useCallback(student => {
    setModalState({ student, type: 'regular' });
    triggerConfettiRef.current?.(150);
  }, [triggerConfettiRef]);

  const closeModal = useCallback(() => setModalState(null), []);

  /* ── Scroll-linked active nav highlight ─────────────────── */
  useEffect(() => {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--gold)' : '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ── Section header reveal ──────────────────────────────── */
  useEffect(() => {
    const headers = document.querySelectorAll('.reveal-header');
    headers.forEach(h => {
      h.style.opacity   = '0';
      h.style.transform = 'translateY(30px)';
      h.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    headers.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  /* ── Lock body scroll when modal is open ────────────────── */
  useEffect(() => {
    document.body.style.overflow = modalState ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalState]);

  return (
    <>
      {/* Canvas layers */}
      <canvas id="particles-canvas" ref={particlesRef} />
      <canvas id="fireworks-canvas" ref={fireworksRef} />
      <canvas id="confetti-canvas"  ref={confettiRef}  />

      <Navbar />

      <main>
        <Hero />

        <PremiumSection
          sectionId="top-girls"
          title="Top Girls"
          subtitle="Our Most Distinguished Female Achievers"
          students={topGirls}
          pinkDecor={true}
          onCardClick={openPremiumModal}
        />

        <PremiumSection
          sectionId="top-boys"
          title="Top 3 Boys"
          subtitle="Our Most Distinguished Male Achievers"
          students={topBoys}
          pinkDecor={false}
          onCardClick={openPremiumModal}
        />

        <AllStudents students={others} onCardClick={openRegularModal} />

        <StatsSection stats={STATS} />

        <QuoteSection />

        <ThankYouSection />

        <DeveloperSection />
      </main>

      <Footer />

      {/* Modal */}
      <Modal modalState={modalState} onClose={closeModal} />
    </>
  );
}
