import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    setActivePath(window.location.pathname || '/');
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collezione' },
    { href: '/artist', label: 'L\'Artista' },
    { href: '/design', label: 'Collaborazioni' },
    { href: '/contacts', label: 'Contatti' }
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="mobile-menu-btn md:hidden cursor-hover"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`mobile-menu-item ${activePath === item.href ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}








