// src/pages/Home.tsx
import { useAnimatedSection } from '../hooks/useAnimatedSection';

export default function Home() {
  const heroRef = useAnimatedSection();
  const whatRef = useAnimatedSection();
  const coursesRef = useAnimatedSection();
  const philosophyRef = useAnimatedSection();
  const ctaRef = useAnimatedSection();

  return (
    <main
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 40%, var(--bg-dark) 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          data-animated
          style={{
            marginBottom: '10rem',
            textAlign: 'center',
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Efecto de brillo de fondo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)',
              opacity: 0.12,
              pointerEvents: 'none',
              filter: 'blur(100px)',
            }}
          />
          
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '3rem',
              letterSpacing: '-0.04em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Aprende haciendo,<br />
            no memorizando
          </h1>
          
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-secondary)',
              maxWidth: '850px',
              margin: '0 auto',
              lineHeight: 1.8,
              fontWeight: 400,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Glyph Studio es una plataforma de aprendizaje práctico para quienes quieren dominar disciplinas técnicas y creativas desde los fundamentos hasta proyectos reales. Sin atajos. Sin ruido. Solo conocimiento que construye.
          </p>
        </section>

        {/* Separador */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
            margin: '0 auto 4rem',
            opacity: 0.2,
          }}
        />

        {/* ¿Qué es Glyph Studio? */}
        <section 
          ref={whatRef} 
          data-animated 
          style={{ 
            marginBottom: '10rem',
            maxWidth: '900px',
            margin: '0 auto 10rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--accent-blue)',
              marginBottom: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            ¿Qué es Glyph Studio?
          </h2>
          
          <p
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.9,
              opacity: 0.95,
            }}
          >
            Glyph Studio es un entorno digital dedicado al <strong style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>aprendizaje profundo</strong> en disciplinas técnicas y creativas. 
            Comenzamos en <strong style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>2025</strong> con Programación, y cada año incorporaremos nuevas dimensiones del conocimiento práctico.
          </p>
        </section>

        {/* Separador */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
            margin: '0 auto 4rem',
            opacity: 0.2,
          }}
        />

        {/* Cursos actuales */}
        <section 
          ref={coursesRef} 
          data-animated 
          style={{ 
            marginBottom: '10rem',
            maxWidth: '900px',
            margin: '0 auto 10rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--accent-blue)',
              marginBottom: '3rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            Cursos actuales
          </h2>

          {/* Tarjeta horizontal del curso */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2rem',
              padding: '2rem',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: 'var(--card-shadow)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            
          >
            {/* Icono o miniatura */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: 'var(--card-glow)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--bg-dark)',
                }}
              >
                P25
              </span>
            </div>

            {/* Contenido del curso */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.8rem)',
                  background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Programación 2025
              </h3>
              
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  lineHeight: 1.7,
                  opacity: 0.9,
                  marginBottom: '1.25rem',
                }}
              >
                De fundamentos a proyectos reales. Lógica, algoritmos, estructuras de datos y desarrollo funcional.
              </p>

              {/* Botón de acceso al curso */}
              <a
                href="/programacion2025"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--accent-blue)',
                  color: 'var(--bg-dark)',
                  textDecoration: 'none',
                  padding: '0.85rem 2rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--card-glow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(96, 165, 250, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--card-glow)';
                }}
              >
                Ver curso
              </a>
            </div>
          </div>
        </section>

        {/* Separador */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
            margin: '0 auto 4rem',
            opacity: 0.2,
          }}
        />

        {/* Filosofía */}
        <section 
          ref={philosophyRef} 
          data-animated 
          style={{ 
            marginBottom: '10rem',
            maxWidth: '900px',
            margin: '0 auto 10rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--accent-blue)',
              marginBottom: '3rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textAlign: 'center',
            }}
          >
            Filosofía de aprendizaje
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                title: 'Curiosidad sobre Conocimiento',
                desc: 'Priorizamos las preguntas, no las respuestas.',
                icon: (
                  <div
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontWeight: 700,
                      fontSize: '1.8rem',
                      color: 'var(--bg-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    ?
                  </div>
                ),
              },
              {
                title: 'Experimentación sobre Teoría',
                desc: 'Aprender haciendo, fallando y refinando.',
                icon: (
                  <div
                    style={{
                      fontFamily: '"Orbitron", monospace',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: 'var(--bg-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    E
                  </div>
                ),
              },
              {
                title: 'Conexión sobre Contenido',
                desc: 'El conocimiento emerge en diálogo, no en aislamiento.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10 9L14 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10 15L14 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '14px',
                  padding: '2rem 1.5rem',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)', // compatibilidad Safari
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: 'var(--card-shadow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--card-hover-border)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                {/* Círculo con ícono */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: 'var(--card-glow)',
                  }}
                >
                  <div
                    style={{
                      color: 'var(--bg-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
                    color: 'var(--accent-blue)',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </h3>
                
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                    lineHeight: 1.7,
                    opacity: 0.95,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          ref={ctaRef}
          data-animated
          style={{
            textAlign: 'center',
            marginTop: '10rem',
            padding: '5rem 2rem',
            position: 'relative',
            maxWidth: '900px',
            margin: '10rem auto 0',
          }}
        >
          {/* Línea decorativa superior */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
              margin: '0 auto 3rem',
              opacity: 0.6,
            }}
          />
          
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            ¿Tienes preguntas?
          </h2>
          
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              marginBottom: '3rem',
              maxWidth: '750px',
              margin: '0 auto 3rem',
              lineHeight: 1.8,
            }}
          >
            Si deseas saber más sobre nuestros cursos, metodología o cómo participar, escríbenos. 
            Te responderemos con claridad y sin compromiso.
          </p>
          
          <button
            onClick={() => alert('Funcionalidad de contacto próximamente')}
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: 'var(--bg-dark)',
              border: 'none',
              padding: '1.2rem 3.5rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1.125rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 10px 40px rgba(96, 165, 250, 0.3)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 60px rgba(96, 165, 250, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(96, 165, 250, 0.3)';
            }}
          >
            Contáctanos
          </button>
        </section>
      </div>
    </main>
  );
}