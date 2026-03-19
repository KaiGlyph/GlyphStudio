// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logoBlanco from '../../assets/GlyphStudio-Logo.png';
import logoNegro from '../../assets/GlyphStudio-LogoNegro.png';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/',              label: 'Inicio' },
    { to: '/cursos',        label: 'Cursos' },
    { to: '/sobre-nosotros',label: 'Sobre nosotros' },
    { to: '/contacto',      label: 'Contacto' },
  ];

  // Aplicar tema al cargar
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Detectar cambio de tamaño
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setIsMenuOpen(false)}>
          <img
            src={isDarkMode ? logoBlanco : logoNegro}
            alt="Glyph Studio"
            className="header-logo-img"
          />
          <h1 className="header-logo-text">GLYPH STUDIO</h1>
        </Link>

        {/* Acciones derecha */}
        <div className="header-actions">

          {/* Nav escritorio */}
          {!isMobile && (
            <nav className="header-nav">
              <ul>
                {navLinks.map(({ to, label }) => {
                  const isActive = location.pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                      >
                        {label}
                        {!isActive && <span className="nav-underline" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* Toggle de tema */}
          <button
            className="btn-theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
          >
            {isDarkMode ? (
              // Sol
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Luna
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Hamburguesa — solo móvil */}
          {isMobile && (
            <button
              className="btn-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger-line hamburger-line-1 ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line hamburger-line-2 ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line hamburger-line-3 ${isMenuOpen ? 'open' : ''}`} />
            </button>
          )}
        </div>
      </header>

      {/* Menú móvil — fuera del header para evitar que sea cortado */}
      {isMenuOpen && isMobile && (
        <div ref={menuRef} className="mobile-menu">

          {/* Botón cerrar */}
          <button
            className="mobile-menu-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>

          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`mobile-menu-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}