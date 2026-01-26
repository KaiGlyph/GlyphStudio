// src/pages/programacion/index.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CodigoSection from './programacion/codigoSection';
import LeaderSection from './programacion/leaderSection';

export default function Programacion2025() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Hero */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '6rem',
            position: 'relative',
            paddingTop: '4rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)',
              opacity: 0.08,
              pointerEvents: 'none',
              filter: 'blur(100px)',
              zIndex: 0,
            }}
          />
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Programación 2025
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.8,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Dos caminos. Una misma disciplina: resolver problemas con lógica, precisión y creatividad.
          </p>
        </section>

        <CodigoSection />
        <LeaderSection />

        {/* Botón de regreso */}
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--accent-blue)',
              border: '1px solid var(--accent-blue)',
              padding: '0.8rem 2.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}