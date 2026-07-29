import { useState, useEffect, useCallback } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const links = [
    { label: 'Home',         href: '#hero'         },
    { label: 'Top Boys',     href: '#top-boys'     },
    { label: 'Top Girls',    href: '#top-girls'    },
    { label: 'All Achievers',href: '#all-students' },
    { label: 'Statistics',   href: '#stats'        },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-logo">
          <span className="nav-trophy">🏆</span>
          <span className="nav-title">Hall of Fame</span>
        </div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onClick={e => smoothScroll(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="nav-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(true)}
        >☰</button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMenuOpen(false)}>✕</button>
        <ul className="mobile-nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="mobile-nav-link" onClick={e => smoothScroll(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
