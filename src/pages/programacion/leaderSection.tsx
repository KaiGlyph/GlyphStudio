// src/pages/programacion/LeaderSection.tsx
import { useAnimatedSection } from '../../hooks/useAnimatedSection';

export default function LeaderSection() {
  const ref = useAnimatedSection();

  return (
    <section
      ref={ref}
      data-animated
      style={{
        marginBottom: '8rem',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--accent-blue)',
          marginBottom: '3rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          textAlign: 'center',
        }}
      >
        Programación (Leader)
      </h2>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          lineHeight: 1.8,
          maxWidth: '800px',
          margin: '0 auto 3rem',
          textAlign: 'center',
        }}
      >
        Introducción a la automatización industrial con <strong style={{ color: 'var(--accent-blue)' }}>TIA Portal</strong> de Siemens.
        Aprende a programar PLCs, diseñar HMI y controlar sistemas físicos como si fueras un "Leader" en entornos industriales.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2.5rem',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #00a8cc, #0077b6)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontFamily: '"Orbitron", monospace',
              fontSize: '1.5rem',
            }}
          >
            🏭
          </div>
          <h3
            style={{
              color: 'var(--accent-blue)',
              marginBottom: '1rem',
              fontSize: '1.4rem',
            }}
          >
            TIA Portal (Siemens)
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Entorno integrado para programar PLCs S7-1200/1500, diseñar interfaces HMI y simular procesos industriales.
          </p>
        </div>

        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            fontStyle: 'italic',
            maxWidth: '600px',
          }}
        >
          Ideal para estudiantes de mecatrónica, automatización o ingeniería industrial que quieren dominar la industria 4.0.
        </div>
      </div>
    </section>
  );
}