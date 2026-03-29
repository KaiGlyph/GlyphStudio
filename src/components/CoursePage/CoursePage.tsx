import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgreso } from '../../hooks/useProgreso';
import './CoursePage.css';

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
  duracion: string;
  teoria: string;
  codigo: {
    titulo: string;
    lenguaje: string;
    contenido: string;
  };
  ejercicio: {
    enunciado: string;
    pista: string;
    solucion: string;
  };
}

interface CoursePageProps {
  courseId: string;
  courseName: string;
  courseLogo: string;
  modulos: Modulo[];
  backRoute?: string;
}

export default function CoursePage({
  courseId,
  courseName,
  courseLogo,
  modulos,
  backRoute = '/programacion/codigo',
}: CoursePageProps) {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [mostrarEjercicio, setMostrarEjercicio] = useState(false);

  const { progreso, cargando, guardarProgreso } = useProgreso(courseId, modulos.length);
  const completados = progreso.completados;
  const porcentaje = progreso.porcentaje;

  useEffect(() => {
    if (!cargando && progreso.moduloActivo > 0) {
      setModuloActivo(progreso.moduloActivo);
    }
  }, [cargando, progreso.moduloActivo]);

  const modulo = modulos[moduloActivo];

  function irSiguiente() {
    const nuevosCompletados = completados.includes(modulo.id)
      ? completados
      : [...completados, modulo.id];

    const siguienteModulo = moduloActivo < modulos.length - 1
      ? moduloActivo + 1
      : moduloActivo;

    guardarProgreso(nuevosCompletados, siguienteModulo, modulos.length);
    setMostrarSolucion(false);
    setMostrarEjercicio(false);

    if (moduloActivo < modulos.length - 1) {
      setModuloActivo(siguienteModulo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function seleccionarModulo(index: number) {
    guardarProgreso(completados, index, modulos.length);
    setModuloActivo(index);
    setMostrarSolucion(false);
    setMostrarEjercicio(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (cargando) {
    return (
      <main className={`${courseId}-page`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <span className="login-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
      </main>
    );
  }

  return (
    <main className={`${courseId}-page`}>
      <div className={`${courseId}-layout`}>
        <aside className={`${courseId}-sidebar`}>
          <button className="btn-back-sidebar" onClick={() => navigate(backRoute)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className={`sidebar-logo ${courseId}-logo`}>
              <span>{courseLogo}</span>
            </div>
            <div>
              <h2 className="sidebar-title">{courseName}</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className={`progreso-pct ${courseId}-pct`}>{porcentaje}%</span>
            </div>
            <div className="progreso-bar">
              <div className={`progreso-fill ${courseId}-fill`} style={{ width: `${porcentaje}%` }} />
            </div>
            <p className="progreso-info">{completados.length} de {modulos.length} completados</p>
          </div>

          <nav className="modulos-nav">
            {modulos.map((m, index) => {
              const completado = completados.includes(m.id);
              const activo = moduloActivo === index;
              return (
                <button
                  key={m.id}
                  className={`modulo-btn ${activo ? `activo-${courseId}` : ''} ${completado ? `completado-${courseId}` : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className={`modulo-num ${activo ? `num-${courseId}` : ''} ${completado ? `num-${courseId}-done` : ''}`}>
                    {completado
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      : m.id
                    }
                  </span>
                  <span className="modulo-nombre">{m.titulo}</span>
                  <span className="modulo-duracion">{m.duracion}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className={`${courseId}-content`}>
          <header className="modulo-header">
            <div className="modulo-meta">
              <span className={`modulo-badge ${courseId}-badge`}>Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className={`modulo-titulo ${courseId}-titulo`}>{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className={`modulo-glow ${courseId}-glow`} />

          <section className="seccion">
            <div className={`seccion-label ${courseId}-label`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Teoría
            </div>
            <div className="teoria-body">
              {modulo.teoria.split('\n\n').map((parrafo, i) => (
                <p key={i} className="teoria-parrafo">{parrafo}</p>
              ))}
            </div>
          </section>

          <section className="seccion">
            <div className={`seccion-label ${courseId}-label`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Ejemplo de código
            </div>
            <div className={`codigo-block ${courseId}-block`}>
              <div className="codigo-header">
                <div className="codigo-dots"><span /><span /><span /></div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className={`codigo-lang ${courseId}-lang`}>{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="codigo-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          <section className="seccion">
            <div className={`seccion-label ${courseId}-label`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>

            <div className={`ejercicio-card ${courseId}-ejercicio ${mostrarEjercicio ? 'abierto' : ''}`}>
              {!mostrarEjercicio ? (
                <button className="ejercicio-reveal" onClick={() => setMostrarEjercicio(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Ver ejercicio
                </button>
              ) : (
                <>
                  <p className="ejercicio-enunciado">{modulo.ejercicio.enunciado}</p>
                  <div className={`pista-box ${courseId}-pista`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span><strong>Pista:</strong> {modulo.ejercicio.pista}</span>
                  </div>

                  {!mostrarSolucion ? (
                    <button className="btn-solucion" onClick={() => setMostrarSolucion(true)}>
                      Mostrar solución
                    </button>
                  ) : (
                    <div className="solucion-block">
                      <p className={`solucion-label ${courseId}-sol-label`}>Solución</p>
                      <pre className={`codigo-pre solucion-pre ${courseId}-solucion-pre`}><code>{modulo.ejercicio.solucion}</code></pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <div className="modulo-footer">
            {moduloActivo > 0 && (
              <button className="btn-nav btn-prev" onClick={() => seleccionarModulo(moduloActivo - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Módulo anterior
              </button>
            )}
            <button className={`btn-nav btn-next-${courseId}`} onClick={irSiguiente}>
              {moduloActivo < modulos.length - 1 ? (
                <>
                  Marcar y continuar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Completar curso
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}