import { useEffect, useRef } from 'react';

/* ============================================================
   CANVAS HOOK
   Manages three canvas layers: particles, fireworks, confetti.
   Call this hook once in App.jsx and pass the returned refs
   to the three <canvas> elements.
   ============================================================ */

// ── Constants ──────────────────────────────────────────────
const PARTICLE_COUNT = 80;

const FIREWORK_COLORS = [
  ['#FFD700', '#FFA500', '#FFF8DC'],
  ['#FFFFFF', '#E0E0E0', '#C0C0C0'],
  ['#00BFFF', '#1E90FF', '#87CEFA'],
  ['#8A2BE2', '#9370DB', '#DDA0DD'],
  ['#FFD700', '#ff0044', '#00ff88', '#00bfff', '#ff00ff'],
];

// ── Confetti palette ────────────────────────────────────────
const CONFETTI_PALETTE = [
  '#f5c842', '#fde68a', '#ffffff',
  '#3b82f6', '#1a3a8f', '#34d399',
  '#f87171', '#a78bfa', '#fb923c',
];

export function useCanvas() {
  const particlesRef  = useRef(null);
  const fireworksRef  = useRef(null);
  const confettiRef   = useRef(null);

  // External trigger refs so components can fire celebrations
  const triggerFireworksRef = useRef(null);
  const triggerConfettiRef  = useRef(null);

  useEffect(() => {
    const pCanvas = particlesRef.current;
    const fCanvas = fireworksRef.current;
    const cCanvas = confettiRef.current;
    if (!pCanvas || !fCanvas || !cCanvas) return;

    const pCtx = pCanvas.getContext('2d');
    const fCtx = fCanvas.getContext('2d');
    const cCtx = cCanvas.getContext('2d');

    // ── Resize ───────────────────────────────────────────────
    function resize() {
      [pCanvas, fCanvas, cCanvas].forEach(c => {
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
      });
    }
    resize();
    window.addEventListener('resize', resize);

    // ════════════════════════════════════════════════════════
    //  PARTICLE SYSTEM
    // ════════════════════════════════════════════════════════
    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x          = Math.random() * pCanvas.width;
        this.y          = initial ? Math.random() * pCanvas.height : pCanvas.height + 10;
        this.size       = Math.random() * 2.5 + 0.5;
        this.speedY     = -(Math.random() * 0.6 + 0.1);
        this.speedX     = (Math.random() - 0.5) * 0.3;
        this.alpha      = Math.random() * 0.6 + 0.1;
        this.gold       = Math.random() > 0.6;
        this.twinkle    = Math.random() * Math.PI * 2;
        this.twinkleSpd = Math.random() * 0.03 + 0.01;
      }
      update() {
        this.x       += this.speedX;
        this.y       += this.speedY;
        this.twinkle += this.twinkleSpd;
        if (this.y < -10) this.reset();
      }
      draw() {
        const a = this.alpha * (0.7 + 0.3 * Math.sin(this.twinkle));
        pCtx.save();
        pCtx.globalAlpha  = a;
        pCtx.fillStyle    = this.gold ? '#f5c842' : '#ffffff';
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.restore();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    let pAnimId;
    function animParticles() {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      pAnimId = requestAnimationFrame(animParticles);
    }
    animParticles();

    // ════════════════════════════════════════════════════════
    //  FIREWORKS SYSTEM
    // ════════════════════════════════════════════════════════
    let rockets = [];
    let sparks  = [];
    let fwInterval = null;
    let fwGrandTimeout = null;

    class Rocket {
      constructor(x, startY, targetY, isGrand = false) {
        this.x         = x;
        this.y         = startY;
        this.targetY   = targetY;
        this.isGrand   = isGrand;
        this.speed     = Math.random() * 4 + (isGrand ? 7 : 5);
        const angle    = -Math.PI / 2 + (Math.random() * 0.3 - 0.15);
        this.vx        = Math.cos(angle) * this.speed;
        this.vy        = Math.sin(angle) * this.speed;
        this.trail     = [];
        this.exploded  = false;
        this.palette   = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      }
      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > (this.isGrand ? 8 : 5)) this.trail.shift();
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.03;
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.exploded = true;
          createExplosion(this.x, this.y, this.palette, this.isGrand);
        }
      }
      draw() {
        fCtx.save();
        fCtx.globalCompositeOperation = 'lighter';
        fCtx.beginPath();
        if (this.trail.length > 0) {
          fCtx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++)
            fCtx.lineTo(this.trail[i].x, this.trail[i].y);
        } else {
          fCtx.moveTo(this.x, this.y);
          fCtx.lineTo(this.x, this.y);
        }
        fCtx.strokeStyle = '#FFA500';
        fCtx.lineWidth   = this.isGrand ? 3 : 2;
        fCtx.stroke();
        fCtx.restore();
      }
    }

    class Spark {
      constructor(x, y, palette, isGrand) {
        this.x        = x;
        this.y        = y;
        this.color    = palette[Math.floor(Math.random() * palette.length)];
        const angle   = Math.random() * Math.PI * 2;
        const speed   = Math.random() * (isGrand ? 12 : 7) + 2;
        this.vx       = Math.cos(angle) * speed;
        this.vy       = Math.sin(angle) * speed;
        this.alpha    = 1;
        this.size     = Math.random() * 2.5 + 1.5;
        this.gravity  = 0.08;
        this.friction = 0.96;
        this.decay    = Math.random() * 0.015 + 0.008;
        this.trail    = [];
      }
      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 4) this.trail.shift();
        this.vx    *= this.friction;
        this.vy    *= this.friction;
        this.vy    += this.gravity;
        this.x     += this.vx;
        this.y     += this.vy;
        this.alpha -= this.decay;
      }
      draw() {
        if (this.alpha <= 0) return;
        fCtx.save();
        fCtx.globalCompositeOperation = 'lighter';
        fCtx.globalAlpha = this.alpha;
        if (this.trail.length > 0) {
          fCtx.beginPath();
          fCtx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++)
            fCtx.lineTo(this.trail[i].x, this.trail[i].y);
          fCtx.strokeStyle = this.color;
          fCtx.lineWidth   = this.size * 0.8;
          fCtx.stroke();
        }
        fCtx.beginPath();
        fCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        fCtx.fillStyle   = this.color;
        fCtx.fill();
        fCtx.restore();
      }
    }

    function createExplosion(x, y, palette, isGrand) {
      const count = isGrand ? 150 : 70;
      for (let i = 0; i < count; i++) sparks.push(new Spark(x, y, palette, isGrand));
      ensureFireworksLoop();
    }

    let ambientInterval = null;
    function startAmbientFireworks() {
      if (ambientInterval) return;
      ambientInterval = setInterval(() => {
        const pad = fCanvas.width * 0.05;
        const x = pad + Math.random() * (fCanvas.width - pad * 2);
        const startY  = fCanvas.height;
        const targetY = fCanvas.height * 0.1 + Math.random() * (fCanvas.height * 0.45);
        rockets.push(new Rocket(x, startY, targetY, false));
        ensureFireworksLoop();
      }, 3500); // Launch a background rocket every 3.5 seconds
    }

    function stopAmbientFireworks() {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }

    let fwStopTimeout = null;

    function startFireworks(durationMs = 4000, special = false) {
      clearInterval(fwInterval);
      clearTimeout(fwGrandTimeout);
      clearTimeout(fwStopTimeout);
      stopAmbientFireworks();

      const launch = () => {
        const pad = fCanvas.width * 0.05;
        const x = pad + Math.random() * (fCanvas.width - pad * 2);
        const startY  = fCanvas.height;
        const targetY = fCanvas.height * 0.05 + Math.random() * (fCanvas.height * 0.55);
        rockets.push(new Rocket(x, startY, targetY, false));
        ensureFireworksLoop();
      };

      for (let i = 0; i < 3; i++) launch();
      fwInterval = setInterval(launch, special ? 250 : 600);

      if (special) {
        fwGrandTimeout = setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            const pad = fCanvas.width * 0.1;
            const x = pad + Math.random() * (fCanvas.width - pad * 2);
            const targetY = fCanvas.height * 0.1 + Math.random() * (fCanvas.height * 0.35);
            rockets.push(new Rocket(x, fCanvas.height, targetY, true));
          }
          ensureFireworksLoop();
        }, durationMs - 1200);
      }

      fwStopTimeout = setTimeout(() => {
        clearInterval(fwInterval);
        startAmbientFireworks(); // Resume continuous ambient background fireworks
      }, durationMs);
    }

    let fAnimId = null;
    let isFireworksLoopRunning = false;

    function ensureFireworksLoop() {
      if (!isFireworksLoopRunning) {
        isFireworksLoopRunning = true;
        animFireworks();
      }
    }

    function animFireworks() {
      fCtx.globalCompositeOperation = 'destination-out';
      fCtx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      fCtx.fillRect(0, 0, fCanvas.width, fCanvas.height);
      fCtx.globalCompositeOperation = 'source-over';

      rockets = rockets.filter(r => !r.exploded);
      rockets.forEach(r => { r.update(); r.draw(); });
      sparks  = sparks.filter(s => s.alpha > 0);
      sparks.forEach(s => { s.update(); s.draw(); });

      if (rockets.length === 0 && sparks.length === 0) {
        fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
        isFireworksLoopRunning = false;
        fAnimId = null;
        return;
      }

      fAnimId = requestAnimationFrame(animFireworks);
    }

    // Expose trigger so App can call it
    triggerFireworksRef.current = startFireworks;

    // ════════════════════════════════════════════════════════
    //  CONFETTI SYSTEM
    // ════════════════════════════════════════════════════════
    let confettiPieces = [];

    class ConfettiPiece {
      constructor() { this.reset(); }
      reset() {
        this.x        = Math.random() * cCanvas.width;
        this.y        = -20;
        this.w        = Math.random() * 12 + 5;
        this.h        = Math.random() * 6  + 3;
        this.speedX   = (Math.random() - 0.5) * 4;
        this.speedY   = Math.random() * 4 + 2;
        this.rotation = Math.random() * 360;
        this.rotSpd   = (Math.random() - 0.5) * 8;
        this.alpha    = 1;
        this.color    = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)];
      }
      update() {
        this.x        += this.speedX;
        this.y        += this.speedY;
        this.rotation += this.rotSpd;
        this.speedX   *= 0.99;
        if (this.y > cCanvas.height + 20) this.alpha = 0;
      }
      draw() {
        cCtx.save();
        cCtx.globalAlpha = this.alpha;
        cCtx.translate(this.x, this.y);
        cCtx.rotate((this.rotation * Math.PI) / 180);
        cCtx.fillStyle   = this.color;
        cCtx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        cCtx.restore();
      }
    }

    let cAnimId = null;
    let isConfettiLoopRunning = false;

    function burstConfetti(count = 200) {
      for (let i = 0; i < count; i++) confettiPieces.push(new ConfettiPiece());
      if (!isConfettiLoopRunning) {
        isConfettiLoopRunning = true;
        animConfetti();
      }
    }

    triggerConfettiRef.current = burstConfetti;

    function animConfetti() {
      if (confettiPieces.length === 0) {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
        isConfettiLoopRunning = false;
        cAnimId = null;
        return;
      }
      cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
      confettiPieces = confettiPieces.filter(p => p.alpha > 0);
      confettiPieces.forEach(p => { p.update(); p.draw(); });
      cAnimId = requestAnimationFrame(animConfetti);
    }

    // ── Initial page-load celebration ────────────────────────
    const t1 = setTimeout(() => {
      startFireworks(4000, false);
      burstConfetti(280);
    }, 600);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(pAnimId);
      cancelAnimationFrame(fAnimId);
      cancelAnimationFrame(cAnimId);
      clearInterval(fwInterval);
      stopAmbientFireworks();
      clearTimeout(fwGrandTimeout);
      clearTimeout(fwStopTimeout);
      clearTimeout(t1);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return { particlesRef, fireworksRef, confettiRef, triggerFireworksRef, triggerConfettiRef };
}
