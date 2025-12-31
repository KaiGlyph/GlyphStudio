// src/pages/Home.tsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, i) => {
      el.classList.add(`fade-in-${i}`);
    });
  }, []);

  return (
    <main
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '3rem',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Contenedor principal centrado */}
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          padding: '0 1.5rem',
        }}
      >
        {/* Sección 1: Hero */}
        <section className="fade-in" style={{ marginBottom: '4.5rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              color: 'var(--accent-blue)',
              fontWeight: 600,
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            Bienvenido a Studio Glyph
          </h1>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(96, 165, 250, 0.15)', 
            maxWidth: '4rem',
            margin: '0.5rem 0 1.5rem',
          }} />
          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-primary)', 
            marginBottom: '1rem',
          }}>
            Una plataforma minimalista y futurista diseñada para el aprendizaje práctico, profundo y autónomo.
          </p>
          <p style={{ 
            color: 'var(--text-secondary)',
          }}>
            No enseñamos. <strong>Inspiramos</strong>.  
            No damos respuestas. <strong>Te ayudamos a descifrarlas.</strong>
          </p>
        </section>

        {/* Sección 2: ¿Qué es? */}
        <section className="fade-in" style={{ marginBottom: '4.5rem' }}>
          <h2
            style={{
              fontSize: '2rem',
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            ¿Qué es Studio Glyph?
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(139, 92, 246, 0.15)', 
            maxWidth: '4rem',
            margin: '0.5rem 0 1.5rem',
          }} />
          <p style={{ marginBottom: '1.25rem' }}>
            Studio Glyph es un espacio digital donde la programación y la música se encuentran en un lenguaje común: el de la <strong>curiosidad estructurada</strong>.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Imagina un lugar donde cada lección no es un capítulo, sino un <strong>glifo</strong> — un símbolo que contiene múltiples capas de significado, que solo se revelan cuando te detienes a observarlo, a experimentar con él, a reconstruirlo.
          </p>
        </section>

        {/* Sección 3: Programación 2025 */}
        <section className="fade-in" style={{ marginBottom: '4.5rem' }}>
          <h2
            style={{
              fontSize: '2rem',
              color: 'var(--accent-blue)',
              marginBottom: '0.75rem',
            }}
          >
            Programación 2025
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(96, 165, 250, 0.15)', 
            maxWidth: '4rem',
            margin: '0.5rem 0 1.5rem',
          }} />
          <p style={{ marginBottom: '1.5rem' }}>
            Fundamentos, algoritmos, proyectos reales. Construye desde la lógica hasta la elegancia.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Cada año, desbloqueamos una nueva dimensión de conocimiento.  
            No hay prisa. Solo profundidad.
          </p>
        </section>

        {/* Sección 4: Filosofía */}
        <section className="fade-in" style={{ marginBottom: '4.5rem' }}>
          <h2
            style={{
              fontSize: '2rem',
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Filosofía de Aprendizaje
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(139, 92, 246, 0.15)', 
            maxWidth: '4rem',
            margin: '0.5rem 0 1.5rem',
          }} />
          <ul style={{ 
            paddingLeft: '1.75rem', 
            marginBottom: '1.5rem',
            color: 'var(--text-secondary)',
          }}>
            <li style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
              <strong>Curiosidad sobre Conocimiento</strong>
              <br /><span style={{ fontWeight: 400, fontSize: '0.95rem' }}>Preguntar más que responder.</span>
            </li>
            <li style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
              <strong>Experimentación sobre Teoría</strong>
              <br /><span style={{ fontWeight: 400, fontSize: '0.95rem' }}>Hacer antes que entender.</span>
            </li>
            <li style={{ lineHeight: 1.6 }}>
              <strong>Conexión sobre Contenido</strong>
              <br /><span style={{ fontWeight: 400, fontSize: '0.95rem' }}>Aprender con otros, no solo de otros.</span>
            </li>
          </ul>
          <p>
            No somos una escuela. Somos un laboratorio. Un taller. Un gremio digital.
          </p>
        </section>

        {/* CTA — con espacio arriba y abajo */}
        <section className="fade-in" style={{ 
          textAlign: 'center', 
          marginTop: '5rem',
          marginBottom: '3rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '2.5rem',
        }}>
          <h3
            style={{
              fontSize: '1.875rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.25rem',
            }}
          >
            ¿Listo para descifrar tu primer glifo?
          </h3>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '2rem',
          }}>
            Explora las primeras lecciones, proyectos o simplemente… quédate a mirar.
          </p>
          <button
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: 'var(--bg-dark)',
              border: 'none',
              padding: '0.9rem 2.25rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
            }}
          >
            Empezar ahora
          </button>
        </section>
      </div>
    </main>
  );
}