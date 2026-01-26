// src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Efecto de brillo de fondo */}
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
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '0 clamp(1.5rem, 5vw, 3rem)' }}>
        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            fontFamily: '"Orbitron", monospace',
            color: 'var(--accent-blue)',
            letterSpacing: '-0.04em',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            marginBottom: '2rem',
            letterSpacing: '-0.03em',
          }}
        >
          Página no encontrada
        </h2>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
            lineHeight: 1.8,
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          La ruta que buscas no existe en este universo. 
          Tal vez fue eliminada, renombrada o nunca existió.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'var(--accent-blue)',
            color: 'var(--bg-dark)',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(96, 165, 250, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(96, 165, 250, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(96, 165, 250, 0.3)';
          }}
        >
          ← Volver al inicio
        </button>
      </div>
    </main>
  );
}