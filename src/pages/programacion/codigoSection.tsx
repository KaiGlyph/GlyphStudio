// src/pages/programacion/CodigoSection.tsx
import { useAnimatedSection } from '../../hooks/useAnimatedSection';

export default function CodigoSection() {
  const ref = useAnimatedSection();

  const languages = [
    { name: 'HTML', color: '#e34c26' },
    { name: 'CSS', color: '#264de4' },
    { name: 'JavaScript', color: '#f7df1e', textColor: '#000' },
    { name: 'Python', color: '#3776ab' },
    { name: 'PHP', color: '#777bb4' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
  ];

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
        Programación (Código)
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
        Fundamentos sólidos en lenguajes esenciales para el desarrollo web, scripting y aplicaciones modernas.
        Aprendizaje basado en proyectos reales, no en ejercicios abstractos.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {languages.map((lang, i) => (
          <div
            key={i}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: '1.5rem 1rem',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: lang.color,
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: lang.textColor || 'white',
                fontWeight: 700,
                fontFamily: '"Orbitron", monospace',
                fontSize: '1rem',
              }}
            >
              {lang.name.charAt(0)}
            </div>
            <span
              style={{
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {lang.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}