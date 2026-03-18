import { useNavigate } from 'react-router-dom';
import './Programacion2025.css';

export default function Programacion2025() {
  const navigate = useNavigate();

  return (
    <main className="programacion-page">
      <div className="programacion-container">
        {/* Hero Section */}
        <section className="hero-section">
          <span className="badge">Curso 2025</span>
          <h1 className="hero-title">Programación 2025</h1>
          <p className="hero-subtitle">
            Programar es darle instrucciones a una máquina para que resuelva un problema por ti.
            Aquí encontrarás dos caminos: el software (aplicaciones web y datos) y la automatización
            industrial (máquinas y fábricas). Puedes elegir uno o explorar los dos.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate('/programacion/codigo')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Explorar Código
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate('/programacion/ladder')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
              </svg>
              Explorar Ladder
            </button>
          </div>
        </section>

        <div className="divider" />

        {/* Tarjetas resumen */}
        <section className="cards-grid">
          {/* Tarjeta Código */}
          <div
            className="info-card codigo"
            onClick={() => navigate('/programacion/codigo')}
          >
            <div className="card-icon codigo">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--bg-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            <h3 className="card-title">Programación de Código</h3>

            <p className="card-description">
              Escribe instrucciones en lenguajes como Python o JavaScript que un ordenador
              ejecuta para crear aplicaciones web, analizar datos o automatizar tareas del
              ordenador. Es el camino clásico del desarrollador de software.
            </p>

            <ul className="card-list">
              <li className="card-list-item">
                <svg className="card-list-icon codigo" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Lógica y sintaxis desde cero
              </li>
              <li className="card-list-item">
                <svg className="card-list-icon codigo" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Estructuras de datos y algoritmos
              </li>
              <li className="card-list-item">
                <svg className="card-list-icon codigo" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Desarrollo web con React
              </li>
            </ul>

            <span className="card-link codigo">
              Ver todos los lenguajes
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>

          {/* Tarjeta Ladder */}
          <div
            className="info-card ladder"
            onClick={() => navigate('/programacion/ladder')}
          >
            <div className="card-icon ladder">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--bg-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
              </svg>
            </div>

            <h3 className="card-title">Ladder & Automatización</h3>

            <p className="card-description">
              Programa PLCs (autómatas industriales) usando diagramas gráficos en lugar de
              texto. Los PLCs controlan motores, cintas y procesos en fábricas. Si te atrae
              la industria, este es tu camino.
            </p>

            <ul className="card-list">
              <li className="card-list-item">
                <svg className="card-list-icon ladder" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Lógica de escalera (Ladder)
              </li>
              <li className="card-list-item">
                <svg className="card-list-icon ladder" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                TIA Portal y PLCs Siemens S7
              </li>
              <li className="card-list-item">
                <svg className="card-list-icon ladder" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Automatización de procesos reales
              </li>
            </ul>

            <span className="card-link ladder">
              Ver todas las tecnologías
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </section>

        <div className="final-divider" />
      </div>
    </main>
  );
}