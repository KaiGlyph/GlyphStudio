// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/StudioGlyph-Logo.png';

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
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px var(--glow-blue)',
        }}>
          <img
            src={logo}
            alt="Studio Glyph"
            style={{
              width: '18px',
              height: '18px',
            }}
          />
        </div>
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
                        if (!isActive) e.currentTarget.style.color = 'var(--accent-blue)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Toggle de tema */}
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
            fontSize: '1.2rem',
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
          {isDarkMode ? '🌙' : '☀️'}
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