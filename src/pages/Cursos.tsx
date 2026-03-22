// src/pages/Cursos.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cursos.css';

// ─── Estructura de datos ─────────────────────────────────────────────────────

interface Curso {
  nombre: string;
  descripcion: string;
  ruta: string;
  icono: string;
  gradiente: string;
  disponible: boolean;
}

interface SubCategoria {
  nombre: string;
  descripcion: string;
  cursos: Curso[];
}

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  acento: string;
  disponible: boolean;
  proximamente?: string;
  subcategorias?: SubCategoria[];
}

const categorias: Categoria[] = [
  {
    id: 'programacion',
    nombre: 'Programación 2025',
    descripcion: 'Dos enfoques complementarios: desarrollo de software y automatización industrial. Aprende desde cero o profundiza en lo que ya sabes.',
    icono: '{ }',
    acento: '#60a5fa',
    disponible: true,
    subcategorias: [
      {
        nombre: 'Programación de Código',
        descripcion: 'Lenguajes de programación modernos para desarrollo web, datos e interfaces.',
        cursos: [
          {
            nombre: 'Python',
            descripcion: 'El lenguaje más popular para empezar. Sintaxis clara, usado en IA, datos y automatización.',
            ruta: '/programacion/codigo/python',
            icono: 'Py',
            gradiente: 'linear-gradient(135deg, #3776ab, #ffd343)',
            disponible: true,
          },
          {
            nombre: 'JavaScript',
            descripcion: 'El lenguaje nativo de los navegadores. Interactividad, DOM y desarrollo web moderno.',
            ruta: '/programacion/codigo/javascript',
            icono: 'JS',
            gradiente: 'linear-gradient(135deg, #f7df1e, #f0db4f)',
            disponible: true,
          },
          {
            nombre: 'TypeScript',
            descripcion: 'JavaScript con tipos estáticos. Código más seguro, escalable y con mejor autocompletado.',
            ruta: '/programacion/codigo/typescript',
            icono: 'TS',
            gradiente: 'linear-gradient(135deg, #3178c6, #007acc)',
            disponible: true,
          },
          {
            nombre: 'React',
            descripcion: 'Biblioteca para interfaces modernas. Componentes, hooks, estado y React Router.',
            ruta: '/programacion/codigo/react',
            icono: '⚛',
            gradiente: 'linear-gradient(135deg, #61dafb, #00d8ff)',
            disponible: true,
          },
        ],
      },
      {
        nombre: 'Ladder & Automatización',
        descripcion: 'Programación de PLCs industriales para controlar procesos y maquinaria.',
        cursos: [
          {
            nombre: 'Ladder Logic',
            descripcion: 'El lenguaje gráfico estándar para PLCs. Contactos, bobinas, temporizadores y contadores.',
            ruta: '/programacion/ladder/ladder-logic',
            icono: '⚡',
            gradiente: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            disponible: true,
          },
          {
            nombre: 'TIA Portal',
            descripcion: 'El entorno Siemens para programar PLCs S7-1200 y S7-1500. Hardware, HMI y diagnóstico.',
            ruta: '/programacion/ladder/tia-portal',
            icono: 'TIA',
            gradiente: 'linear-gradient(135deg, #009999, #00cccc)',
            disponible: true,
          },
          {
            nombre: 'PLCs Industriales',
            descripcion: 'Arquitectura, tipos de señales, comunicaciones industriales y mantenimiento de PLCs.',
            ruta: '/programacion/ladder/plcs',
            icono: '🔧',
            gradiente: 'linear-gradient(135deg, #f39c12, #f1c40f)',
            disponible: true,
          },
        ],
      },
    ],
  },
  {
    id: 'musica',
    nombre: 'Música',
    descripcion: 'Teoría musical, producción, instrumentos y composición. Próximamente en Glyph Studio.',
    icono: '♪',
    acento: '#f472b6',
    disponible: false,
    proximamente: 'Previsto para 2026',
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function Cursos() {
  const navigate = useNavigate();
  const [abiertos, setAbiertos] = useState<string[]>(['programacion']);

  function toggleCategoria(id: string) {
    setAbiertos(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  return (
    <main className="cursos-page">
      <div className="cursos-container">

        {/* Hero */}
        <section className="cursos-hero">
          <div className="cursos-glow" />
          <h1 className="cursos-title">Cursos</h1>
          <p className="cursos-subtitle">
            Elige tu camino de aprendizaje. Cada curso está diseñado para llevarte
            desde los fundamentos hasta proyectos reales, paso a paso.
          </p>
        </section>

        {/* Lista de categorías */}
        <div className="categorias-list">
          {categorias.map((cat) => {
            const estaAbierto = abiertos.includes(cat.id);
            return (
              <div
                key={cat.id}
                className={`categoria-item ${!cat.disponible ? 'bloqueada' : ''} ${estaAbierto ? 'abierta' : ''}`}
                style={{ '--acento': cat.acento } as React.CSSProperties}
              >
                {/* Cabecera de la categoría */}
                <button
                  className="categoria-header"
                  onClick={() => cat.disponible && toggleCategoria(cat.id)}
                  disabled={!cat.disponible}
                  aria-expanded={estaAbierto}
                >
                  <div className="categoria-header-left">
                    <div className="categoria-icono">{cat.icono}</div>
                    <div className="categoria-info">
                      <div className="categoria-nombre-row">
                        <h2 className="categoria-nombre">{cat.nombre}</h2>
                        {!cat.disponible && (
                          <span className="badge-proximamente">
                            {cat.proximamente ?? 'Próximamente'}
                          </span>
                        )}
                      </div>
                      <p className="categoria-desc">{cat.descripcion}</p>
                    </div>
                  </div>

                  {cat.disponible && (
                    <div className={`categoria-chevron ${estaAbierto ? 'rotado' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Contenido expandible */}
                <div className={`categoria-body ${estaAbierto ? 'expandido' : ''}`}>
                  <div className="categoria-body-inner">
                    {cat.subcategorias?.map((sub, si) => (
                      <div key={si} className="subcategoria">

                        {/* Título de subcategoría */}
                        <div className="subcategoria-header">
                          <span className="subcategoria-linea" />
                          <div className="subcategoria-info">
                            <h3 className="subcategoria-nombre">{sub.nombre}</h3>
                            <p className="subcategoria-desc">{sub.descripcion}</p>
                          </div>
                        </div>

                        {/* Grid de cursos */}
                        <div className="cursos-grid">
                          {sub.cursos.map((curso, ci) => (
                            <div key={ci} className="curso-card">
                              <div
                                className="curso-card-logo"
                                style={{ background: curso.gradiente }}
                              >
                                <span>{curso.icono}</span>
                              </div>
                              <div className="curso-card-body">
                                <h4 className="curso-card-nombre">{curso.nombre}</h4>
                                <p className="curso-card-desc">{curso.descripcion}</p>
                              </div>
                              <button
                                className="curso-card-btn"
                                onClick={() => navigate(curso.ruta)}
                              >
                                Empezar
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                  <polyline points="12 5 19 12 12 19" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}