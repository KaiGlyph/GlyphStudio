// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/StudioGlyph-Logo.png'; // ✅ Tu ruta original

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(9, 12, 16, 0.6)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '1.25rem 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={logo}
            alt="Studio Glyph"
            style={{
              width: '2.25rem',
              height: '2.25rem',
              filter: 'drop-shadow(0 0 8px var(--glow-blue))',
            }}
          />
          <h1
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              color: 'var(--accent-blue)',
              textShadow: '0 0 10px var(--glow-blue)',
            }}
          >
            STUDIO GLYPH
          </h1>
        </Link>

        <nav>
          <ul style={{ display: 'flex', gap: '1.75rem' }}>
            <li>
              <Link
                to="/"
                style={{
                  color: isHome ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                  textShadow: isHome ? '0 0 10px var(--glow-blue)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isHome) e.currentTarget.style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  if (!isHome) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Inicio
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}