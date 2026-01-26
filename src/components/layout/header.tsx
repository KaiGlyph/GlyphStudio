// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logoBlanco from '../../assets/StudioGlyph-Logo.png';
import logoNegro from '../../assets/StudioGlyph-LogoNegro.png';

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
    { to: '/', label: 'Inicio' },
    { to: '/cursos', label: 'Cursos' },
    { to: '/sobre-nosotros', label: 'Sobre nosotros' },
    { to: '/contacto', label: 'Contacto' },
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'var(--bg-darker)' : 'var(--bg-darker)',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.08)',
        padding: '1.2rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <Link
        to="/"
        style={{ 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.8rem' 
        }}
        onClick={() => setIsMenuOpen(false)}
      >
        <img
          src={isDarkMode ? logoBlanco : logoNegro}
          alt="Studio Glyph"
          style={{
            width: '2.75rem',
            height: '2.75rem',
          }}
        />
        <h1
          style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--accent-blue)',
            letterSpacing: '0.5px',
          }}
        >
          STUDIO GLYPH
        </h1>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {/* Nav de escritorio */}
        {!isMobile && (
          <nav>
            <ul
              style={{
                display: 'flex',
                gap: '2.5rem',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      style={{
                        color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        fontWeight: 500,
                        textDecoration: 'none',
                        position: 'relative',
                        transition: 'color 0.3s ease',
                        fontSize: '0.95rem',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--accent-blue)';
                          // Mostrar subrayado
                          const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement;
                          if (underline) {
                            underline.style.width = '100%';
                            underline.style.left = '0';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          // Ocultar subrayado
                          const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement;
                          if (underline) {
                            underline.style.width = '0';
                            underline.style.left = '50%';
                          }
                        }
                      }}
                    >
                      {label}
                      {/* Subrayado animado */}
                      {!isActive && (
                        <span
                          className="nav-underline"
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            width: '0',
                            height: '1px',
                            backgroundColor: 'var(--accent-blue)',
                            transition: 'width 0.3s ease, left 0.3s ease',
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Toggle de tema con SVG */}
        <button
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
          style={{
            background: 'transparent',
            border: '2px solid var(--text-secondary)',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-blue)';
            e.currentTarget.style.transform = 'rotate(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          {isDarkMode ? (
            // Ícono de sol (modo claro)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
            // Ícono de luna (modo oscuro)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Menú hamburguesa - solo en móvil */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              position: 'relative',
              width: '28px',
              height: '20px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isMenuOpen 
                  ? 'translate(-50%, -50%) rotate(45deg)' 
                  : 'translate(-50%, -50%)',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isMenuOpen 
                  ? 'translate(-50%, -50%) rotate(-45deg)' 
                  : 'translate(-50%, calc(-50% - 6px))',
                opacity: isMenuOpen ? 1 : 1,
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, calc(-50% + 6px))',
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
          </button>
        )}
      </div>

      {/* Overlay de menú móvil */}
      {isMenuOpen && isMobile && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDarkMode 
              ? 'rgba(9, 12, 16, 0.98)' 
              : 'rgba(249, 250, 251, 0.98)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            paddingTop: '6rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </header>
  );
}