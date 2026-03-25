// src/components/layout/Header.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logoBlanco from '../../assets/GlyphStudio-Logo.png';
import logoNegro  from '../../assets/GlyphStudio-LogoNegro.png';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, cerrarSesion } = useAuth();

  const [isMenuOpen,     setIsMenuOpen]     = useState(false);
  const [isUserOpen,     setIsUserOpen]     = useState(false);
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);
  const [isDarkMode,     setIsDarkMode]     = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef   = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/',               label: 'Inicio' },
    { to: '/cursos',         label: 'Cursos' },
    { to: '/sobre-nosotros', label: 'Sobre nosotros' },
    { to: '/contacto',       label: 'Contacto' },
  ];

  // Tema
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

  // Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserOpen(false);
  }, [location.pathname]);

  // Bloquear scroll en menú móvil
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  function toggleTheme() {
    setIsDarkMode(prev => !prev);
    setIsUserOpen(false);
  }

  async function handleCerrarSesion() {
    setIsUserOpen(false);
    await cerrarSesion();
    navigate('/');
  }

  // Inicial del usuario para el avatar
  const userInitial = user
    ? (user.user_metadata?.username?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()
    : null;

  const username = user
    ? (user.user_metadata?.username ?? user.email?.split('@')[0])
    : null;

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
                      <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
                        {label}
                        {!isActive && <span className="nav-underline" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* Hamburguesa — solo móvil */}
          {isMobile && (
            <button
              className="btn-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger-line hamburger-line-1 ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line hamburger-line-2 ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line hamburger-line-3 ${isMenuOpen ? 'open' : ''}`} />
            </button>
          )}

          {/* Botón usuario con dropdown */}
          <div className="user-menu-wrapper" ref={userMenuRef}>
            <button
              className={`btn-user-icon ${isUserOpen ? 'open' : ''} ${user ? 'logged' : ''}`}
              onClick={() => setIsUserOpen(prev => !prev)}
              aria-label="Menú de usuario"
              aria-expanded={isUserOpen}
            >
              {user ? (
                <div className="user-avatar-small">{userInitial}</div>
              ) : (
                /* Icono de usuario anónimo */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>

            {/* Dropdown */}
            {isUserOpen && (
              <div className="user-dropdown">

                {/* Info usuario si está logueado */}
                {user && (
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">{userInitial}</div>
                    <div>
                      <p className="dropdown-username">{username}</p>
                      <p className="dropdown-email">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Opciones si NO está logueado */}
                {!user && (
                  <>
                    <button
                      className="dropdown-item dropdown-item-primary"
                      onClick={() => { navigate('/login'); setIsUserOpen(false); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>
                      Iniciar sesión
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => { navigate('/login?modo=registro'); setIsUserOpen(false); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                      Registrarse gratis
                    </button>
                    <div className="dropdown-separator" />
                  </>
                )}

                {/* Toggle tema — siempre visible */}
                <button className="dropdown-item" onClick={toggleTheme}>
                  {isDarkMode ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                      Modo claro
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Modo oscuro
                    </>
                  )}
                </button>

                {/* Cerrar sesión — solo si logueado */}
                {user && (
                  <>
                    <div className="dropdown-separator" />
                    <button className="dropdown-item dropdown-item-danger" onClick={handleCerrarSesion}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </>
                )}

              </div>
            )}
          </div>


        </div>
      </header>

      {/* Menú móvil */}
      {isMenuOpen && isMobile && (
        <div ref={mobileMenuRef} className="mobile-menu">
          <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>✕</button>

          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to} className={`mobile-menu-link ${isActive ? 'active' : ''}`}>
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}