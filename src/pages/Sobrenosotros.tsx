// src/pages/SobreNosotros.tsx
import { useNavigate } from 'react-router-dom';
import './SobreNosotros.css';

export default function SobreNosotros() {
  const navigate = useNavigate();

  const valores = [
    {
      icono: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      titulo: 'Aprendizaje práctico',
      texto: 'Cada concepto va acompañado de un ejemplo real y un ejercicio. Sin teoría vacía.',
    },
    {
      icono: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      titulo: 'Claridad ante todo',
      texto: 'Si algo técnico necesita explicación, lo explicamos. Los términos complejos no se esconden, se enseñan.',
    },
    {
      icono: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
        </svg>
      ),
      titulo: 'Orientado a la industria',
      texto: 'Los cursos de automatización reflejan lo que se usa en fábricas reales. No simulaciones de laboratorio.',
    },
    {
      icono: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      titulo: 'Progreso medible',
      texto: 'Módulos numerados, ejercicios con solución y seguimiento de progreso para saber exactamente dónde estás.',
    },
  ];

  return (
    <main className="sobre-page">
      <div className="sobre-container">

        {/* Hero */}
        <section className="sobre-hero">
          <div className="sobre-glow" />
          <h1 className="sobre-title">Construido por alguien<br />que aprendió haciéndolo</h1>
          <p className="sobre-subtitle">
            Glyph Studio nació de la frustración de encontrar cursos que explican
            conceptos sin mostrar para qué sirven. Aquí cada lección existe porque
            resuelve un problema real.
          </p>
        </section>

        <div className="sobre-divider" />

        {/* Historia */}
        <section className="sobre-section">
          <div className="sobre-section-grid">
            <div className="sobre-section-text">
              <h2 className="sobre-section-title">¿Por qué existe Glyph Studio?</h2>
              <p>
                Aprender programación o automatización industrial por cuenta propia es difícil.
                La mayoría del material disponible asume que ya sabes demasiado, usa jerga sin
                explicar, o se queda en ejemplos tan simples que no te preparan para nada real.
              </p>
              <p>
                Glyph Studio existe para cerrar esa brecha. Empezamos en 2025 con dos caminos:
                desarrollo de software (Python, JavaScript, TypeScript, React) y automatización
                industrial (Ladder Logic, TIA Portal, PLCs). Dos mundos que comparten la misma
                filosofía: aprender haciendo, no memorizando.
              </p>
              <p>
                Cada módulo está escrito pensando en la persona que llega sin saber nada,
                pero también en quien ya tiene base y quiere ir más lejos. Los ejercicios
                tienen pista y solución. Las explicaciones usan ejemplos del mundo real.
                Los términos técnicos se explican siempre que aparecen.
              </p>
            </div>
            <div className="sobre-section-visual">
              <div className="sobre-stats">
                <div className="stat-item">
                  <span className="stat-numero">7</span>
                  <span className="stat-label">Cursos disponibles</span>
                </div>
                <div className="stat-item">
                  <span className="stat-numero">35+</span>
                  <span className="stat-label">Módulos de contenido</span>
                </div>
                <div className="stat-item">
                  <span className="stat-numero">2025</span>
                  <span className="stat-label">Año de lanzamiento</span>
                </div>
                <div className="stat-item">
                  <span className="stat-numero">∞</span>
                  <span className="stat-label">Acceso gratuito</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sobre-divider" />

        {/* Valores */}
        <section className="sobre-section">
          <h2 className="sobre-section-title centrado">Cómo enseñamos</h2>
          <div className="valores-grid">
            {valores.map((v, i) => (
              <div key={i} className="valor-card">
                <div className="valor-icono-wrapper">{v.icono}</div>
                <h3 className="valor-titulo">{v.titulo}</h3>
                <p className="valor-texto">{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="sobre-divider" />

        {/* El autor */}
        <section className="sobre-section autor-section">
          <div className="autor-card">
            <div className="autor-avatar">KG</div>
            <div className="autor-info">
              <h2 className="autor-nombre">KaiGlyph</h2>
              <p className="autor-rol">Fundador y creador de contenido</p>
              <p className="autor-bio">
                Técnico en automatización industrial y desarrollador web autodidacta.
                Construyó Glyph Studio para compartir lo que aprendió en el camino:
                que la mejor forma de entender algo es tener que explicárselo a alguien más.
              </p>
              <div className="autor-links">
                <a
                  href="https://github.com/KaiGlyph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="autor-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.22c-3.338.724-4.033-1.415-4.033-1.415-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.304.76-1.604-2.665-.304-5.466-1.33-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.37.823 1.103.823 2.222v3.293c0 .32.216.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/jordi-gallardo-sanchez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="autor-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452H16.9v-5.569c0-1.328-.027-3.038-1.852-3.038-1.853 0-2.136 1.447-2.136 2.941v5.666H9.325V9h3.397v1.561h.047c.473-.9 1.633-1.852 3.363-1.852 3.594 0 4.256 2.366 4.256 5.444v6.299zM5.337 7.433c-1.09 0-1.973-.882-1.973-1.973 0-1.09.883-1.973 1.973-1.973 1.09 0 1.973.883 1.973 1.973 0 1.09-.883 1.973-1.973 1.973zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .77 0 1.722v20.555C0 23.23.792 24 1.771 24h20.451c.98 0 1.778-.77 1.778-1.722V1.722C24 .77 23.204 0 22.225 0z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sobre-cta">
          <h2 className="sobre-cta-title">¿Listo para empezar?</h2>
          <p className="sobre-cta-desc">
            Explora los cursos disponibles y empieza donde más te interese.
            No hay orden obligatorio ni fechas de entrega.
          </p>
          <div className="sobre-cta-btns">
            <button className="btn-primary-sobre" onClick={() => navigate('/cursos')}>
              Ver cursos
            </button>
            <button className="btn-outline-sobre" onClick={() => navigate('/contacto')}>
              Contactar
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}