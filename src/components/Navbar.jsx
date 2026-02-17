import { useEffect, useMemo, useRef, useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScrollRef.current && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActivePath(window.location.pathname || '/');
  }, []);

  const navItems = useMemo(() => ([
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collezione' },
    { href: '/artist', label: 'L\'Artista' },
    { href: '/design', label: 'Collaborazioni' },
    { href: '/contacts', label: 'Contatti' }
  ]), []);

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 left-0 w-full px-[5vw] py-8 flex justify-between items-center z-[9100] transition-transform duration-[400ms] ease-in-out ${hidden ? 'nav-hidden' : ''}`}
      style={{ mixBlendMode: 'difference' }}
    >
      <a href="/" className="font-serif text-2xl tracking-wide z-[1001] cursor-hover">
        EMILIANO CIONI
      </a>
      
      <ul className="hidden md:flex gap-12">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`nav-item cursor-hover ${activePath === item.href ? 'active' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  );
}

