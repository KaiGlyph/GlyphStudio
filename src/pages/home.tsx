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
        paddingBottom: '4rem',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          padding: '0 1.5rem',
        }}
      >
        {/* Hero — genérico, centrado, con más espacio */}
        <section 
          className="fade-in" 
          style={{ 
            marginBottom: '6rem', 
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '2.875rem',
              color: 'var(--accent-blue)',
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: '2.5rem',
            }}
          >
            Aprende haciendo, no memorizando
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Studio Glyph es una plataforma de aprendizaje práctico para quienes quieren dominar disciplinas técnicas y creativas desde los fundamentos hasta proyectos reales. Sin atajos. Sin ruido. Solo conocimiento que construye.
          </p>
        </section>

        {/* ¿Qué es Studio Glyph? */}
        <section className="fade-in" style={{ marginBottom: '6rem' }}>
          <h2
            style={{
              fontSize: '2.125rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.75rem',
            }}
          >
            ¿Qué es Studio Glyph?
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(96, 165, 250, 0.15)', 
            maxWidth: '4.5rem',
            margin: '0 0 2rem',
          }} />
          <p style={{ 
            color: 'var(--text-primary)',
            fontSize: '1.05rem',
            lineHeight: 1.75,
          }}>
            Studio Glyph es un entorno digital dedicado al aprendizaje profundo en disciplinas técnicas y creativas. 
            Comenzamos en 2025 con Programación, y cada año incorporaremos nuevas dimensiones del conocimiento práctico.
          </p>
        </section>

        {/* Cursos actuales */}
        <section className="fade-in" style={{ marginBottom: '6rem' }}>
          <h2
            style={{
              fontSize: '2.125rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.75rem',
            }}
          >
            Cursos actuales
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(96, 165, 250, 0.15)', 
            maxWidth: '4.5rem',
            margin: '0 0 2rem',
          }} />
          <h3
            style={{
              fontSize: '1.625rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.25rem',
            }}
          >
            Programación 2025
          </h3>
          <p style={{ 
            color: 'var(--text-primary)',
            fontSize: '1.05rem',
            lineHeight: 1.75,
          }}>
            Un recorrido riguroso desde los fundamentos hasta proyectos reales. 
            Cubrimos lógica computacional, estructuras de datos, algoritmos y desarrollo de software funcional. 
            No se trata de seguir tutoriales, sino de resolver problemas reales con elegancia técnica.
          </p>
        </section>

        {/* Filosofía */}
        <section className="fade-in" style={{ marginBottom: '6rem' }}>
          <h2
            style={{
              fontSize: '2.125rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.75rem',
            }}
          >
            Filosofía de aprendizaje
          </h2>
          <hr style={{ 
            border: '0', 
            height: '1px', 
            backgroundColor: 'rgba(96, 165, 250, 0.15)', 
            maxWidth: '4.5rem',
            margin: '0 0 2rem',
          }} />
          <ul style={{ 
            paddingLeft: '2rem', 
            color: 'var(--text-primary)',
            fontSize: '1.05rem',
            lineHeight: 1.9,
          }}>
            <li style={{ marginBottom: '1.25rem' }}>
              <strong>Curiosidad sobre Conocimiento</strong>: Priorizamos las preguntas, no las respuestas.
            </li>
            <li style={{ marginBottom: '1.25rem' }}>
              <strong>Experimentación sobre Teoría</strong>: Aprender haciendo, fallando y refinando.
            </li>
            <li>
              <strong>Conexión sobre Contenido</strong>: El conocimiento emerge en diálogo, no en aislamiento.
            </li>
          </ul>
        </section>

        {/* CTA: Contacto — con título y ESPACIO CLARO arriba del botón */}
        <section className="fade-in" style={{ 
          textAlign: 'center', 
          marginTop: '6rem',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <h2
            style={{
              fontSize: '2.125rem',
              color: 'var(--accent-blue)',
              marginBottom: '1.5rem',
            }}
          >
            ¿Tienes preguntas?
          </h2>
          <p style={{ 
            color: 'var(--text-primary)',
            fontSize: '1.15rem',
            marginBottom: '3.5rem', /* ← AQUÍ está el cambio clave */
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Si deseas saber más sobre nuestros cursos, metodología o cómo participar, escríbenos. 
            Te responderemos con claridad y sin compromiso.
          </p>
          <button
            onClick={() => alert('Funcionalidad de contacto próximamente')}
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: 'var(--bg-dark)',
              border: 'none',
              padding: '0.95rem 2.5rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1.1rem',
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
            Contáctanos
          </button>
        </section>
      </div>
    </main>
  );
}