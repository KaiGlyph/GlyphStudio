// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimatedSection } from '../hooks/useAnimatedSection';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const heroRef       = useAnimatedSection();
  const whatRef       = useAnimatedSection();
  const coursesRef    = useAnimatedSection();
  const philosophyRef = useAnimatedSection();
  const ctaRef        = useAnimatedSection();

  const filosofia: { titulo: string; desc: string; icono: React.ReactNode }[] = [
    {
      titulo: 'Curiosidad sobre Conocimiento',
      desc: 'Priorizamos las preguntas, no las respuestas. Cada concepto es una puerta, no un destino.',
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      titulo: 'Experimentación sobre Teoría',
      desc: 'Aprender haciendo, fallando y refinando. El error es parte del proceso, no el final.',
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      titulo: 'Conexión sobre Contenido',
      desc: 'El conocimiento emerge en diálogo, no en aislamiento. Aprender con otros multiplica el resultado.',
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <polyline points="9 11 12 14 22 4" />
        </svg>
      ),
    },
  ];

  return (
    <main className="home-page">
      <div className="home-container">

        {/* ── Hero ──────────────────────────────── */}
        <section ref={heroRef} data-animated className="hero-section">
          <div className="hero-glow" />
          <h1 className="hero-title">
            Aprende haciendo,<br />
            no memorizando
          </h1>
          <p className="hero-subtitle">
            Glyph Studio es una plataforma de aprendizaje práctico para quienes quieren dominar
            disciplinas técnicas y creativas desde los fundamentos hasta proyectos reales.
            Sin atajos. Sin ruido. Solo conocimiento que construye.
          </p>
        </section>

        <div className="home-divider" />

        {/* ── Qué es ────────────────────────────── */}
        <section ref={whatRef} data-animated className="home-section">
          <h2 className="home-section-title">¿Qué es Glyph Studio?</h2>
          <p className="home-section-text">
            Glyph Studio es un entorno digital dedicado al{' '}
            <strong>aprendizaje profundo</strong> en disciplinas técnicas y creativas.
            Comenzamos en <strong>2025</strong> con Programación, y cada año incorporaremos
            nuevas dimensiones del conocimiento práctico.
          </p>
        </section>

        <div className="home-divider" />

        {/* ── Cursos ────────────────────────────── */}
        <section ref={coursesRef} data-animated className="home-section">
          <h2 className="home-section-title">Cursos actuales</h2>

          <div className="curso-card">
            <div className="curso-card-icon">
              <span>P25</span>
            </div>
            <div className="curso-card-body">
              <h3 className="curso-card-title">Programación 2025</h3>
              <p className="curso-card-desc">
                De fundamentos a proyectos reales. Lógica, algoritmos, estructuras de datos
                y desarrollo funcional en los lenguajes más demandados del mercado.
              </p>
              <button
                className="curso-card-btn"
                onClick={() => navigate('/programacion-2025')}
              >
                Ver curso
              </button>
            </div>
          </div>
        </section>

        <div className="home-divider" />

        {/* ── Filosofía ─────────────────────────── */}
        <section ref={philosophyRef} data-animated className="home-section">
          <h2 className="filosofia-title">Filosofía de aprendizaje</h2>

          <div className="filosofia-grid">
            {filosofia.map((item, i) => (
              <div key={i} className="filosofia-card">
                <div className="filosofia-icon">
                  {typeof item.icono === 'string' ? item.icono : item.icono}
                </div>
                <h3 className="filosofia-card-title">{item.titulo}</h3>
                <p className="filosofia-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section ref={ctaRef} data-animated className="cta-section">
          <div className="cta-divider" />
          <h2 className="cta-title">¿Tienes preguntas?</h2>
          <p className="cta-desc">
            Si deseas saber más sobre nuestros cursos, metodología o cómo participar,
            escríbenos. Te responderemos con claridad y sin compromiso.
          </p>
          <button className="cta-btn" onClick={() => navigate('/contacto')}>
            Contáctanos
          </button>
        </section>

      </div>
    </main>
  );
}