import { useNavigate } from 'react-router-dom';
import './leaderSection.css';

export default function LeaderSection() {
  const navigate = useNavigate();

  const fundamentos = [
    {
      numero: '01',
      titulo: 'Lógica de Escalera',
      contenido:
        'El diagrama Ladder recibe ese nombre porque se parece a una escalera: dos raíles verticales conectados por peldaños horizontales (llamados "rungs"). Cada peldaño es una instrucción. Los contactos simulan interruptores y las bobinas representan las salidas que queremos activar.',
      snippet: `(Red 1) Arranque de motor con pulsador

   |----[ ]-------[ / ]-------( )----| 
   |   S_START    S_STOP    KM_MOTOR  |

   S_START  → Contacto NA (Normalmente Abierto): el pulsador de arranque
   S_STOP   → Contacto NC (Normalmente Cerrado): el pulsador de parada
   KM_MOTOR → Bobina de salida: activa el contactor del motor`,
    },
    {
      numero: '02',
      titulo: 'Temporizadores y Contadores',
      contenido:
        'Los temporizadores permiten retardar o limitar acciones en el tiempo. TON (Timer On-Delay) activa una salida después de X segundos. TOF la desactiva pasado ese tiempo. Los contadores como CTU (Count Up) cuentan eventos: piezas producidas, ciclos completados o pulsaciones de un botón.',
      snippet: `(Red 2) Temporizador: encender alarma 5 s después de fallo

   |----[ ]------[TON T1, PT:5s]----| 
   |   FALLO                        |

(Red 3) Si T1 llegó a 5 s → activar alarma

   |----[ ]----------( )------------|
   |   T1.Q       ALARMA_VISUAL     |

   T1.Q → Bit de salida del temporizador (vale 1 cuando PT se alcanza)`,
    },
    {
      numero: '03',
      titulo: 'Entradas y Salidas (I/O)',
      contenido:
        'Las entradas (inputs) son las señales que el PLC recibe del exterior: sensores de presencia, pulsadores, finales de carrera. Las salidas (outputs) son las acciones que ejecuta: encender un motor, abrir una válvula, activar una alarma. Configurarlas correctamente es el primer paso de cualquier proyecto.',
      snippet: `Tabla de asignación de I/O — Proyecto: Cinta transportadora

  ENTRADAS (Inputs)          DIRECCIÓN   DESCRIPCIÓN
  ─────────────────────────────────────────────────────
  Pulsador MARCHA            %I0.0       NA, 24 VDC
  Pulsador PARO              %I0.1       NC, 24 VDC
  Sensor fin de cinta        %I0.2       Inductivo PNP

  SALIDAS (Outputs)          DIRECCIÓN   DESCRIPCIÓN
  ─────────────────────────────────────────────────────
  Contactor motor cinta      %Q0.0       24 VDC, 0.5 A
  Piloto luminoso MARCHA     %Q0.1       Luz verde`,
    },
    {
      numero: '04',
      titulo: 'Comunicaciones Industriales',
      contenido:
        'Los PLCs rara vez trabajan solos. PROFINET y Ethernet/IP son protocolos modernos basados en red local. Modbus es un protocolo clásico, muy usado por su simplicidad. Estos estándares permiten que autómatas de distintos fabricantes intercambien datos en tiempo real.',
      snippet: `Ejemplo: leer dato de otro PLC vía Modbus RTU

  Función: FC3 (Read Holding Registers)
  Dispositivo esclavo ID: 1
  Registro origen:        40001  (velocidad del variador)
  Número de registros:    1
  Variable destino PLC:   MW100

  → El PLC maestro lee MW100 cada 100 ms
  → Si MW100 > 1500 rpm → activar alarma de sobrevelocidad`,
    },
  ];

  const tecnologias = [
    {
      nombre: 'Ladder Logic',
      ruta: '/programacion/ladder/ladder-logic',
      descripcion:
        'El lenguaje gráfico estándar para programar PLCs. En lugar de escribir texto, dibujas un circuito eléctrico que el autómata interpreta como instrucciones. Si vienes del mundo de la electricidad industrial, te resultará muy familiar.',
      icono: '⚡',
      gradiente: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      temas: ['Contactos y bobinas', 'Temporizadores (TON/TOF)', 'Contadores (CTU/CTD)', 'Lógica booleana'],
    },
    {
      nombre: 'TIA Portal',
      ruta: '/programacion/ladder/tia-portal',
      descripcion:
        'El software de Siemens donde se programa, configura y depuran los PLCs de la gama S7-1200 y S7-1500. Es como el "Visual Studio" de la automatización industrial: todo en un único entorno, desde el hardware hasta el HMI (pantalla del operador).',
      icono: 'TIA',
      gradiente: 'linear-gradient(135deg, #009999, #00cccc)',
      temas: ['STEP 7 (lenguaje Siemens)', 'WinCC HMI (pantallas)', 'Configuración de hardware', 'Diagnóstico y depuración'],
    },
    {
      nombre: 'PLCs Industriales',
      ruta: '/programacion/ladder/plcs',
      descripcion:
        'Un PLC (Programmable Logic Controller) es un ordenador industrial diseñado para funcionar 24/7 en entornos con polvo, vibraciones y temperatura extrema. Controla máquinas, cintas, motores y cualquier proceso que necesite automatización.',
      icono: '🔧',
      gradiente: 'linear-gradient(135deg, #f39c12, #f1c40f)',
      temas: ['Familia Siemens S7', 'Entradas y Salidas (I/O)', 'Redes de comunicación', 'Seguridad funcional'],
    },
  ];

  return (
    <main className="leader-section-page">
      <div className="leader-section-container">

        {/* Hero */}
        <section className="leader-section-hero">
          <div className="leader-section-glow" />

          <div className="leader-section-icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--bg-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
            </svg>
          </div>

          <h1 className="leader-section-title">Ladder & Automatización</h1>
          <p className="leader-section-subtitle">
            Aprende a programar autómatas (PLCs) para controlar maquinaria industrial.
            Sin experiencia previa: empezamos desde cero con el lenguaje gráfico más usado en fábricas de todo el mundo.
          </p>

          <button className="btn-back" onClick={() => navigate('/programacion-2025')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver a Programación 2025
          </button>
        </section>

        <div className="leader-section-divider" />

        {/* Fundamentos */}
        <section className="leader-section-content">
          <h2 className="section-title">Fundamentos de Automatización</h2>

          <div className="fundamentos-list">
            {fundamentos.map((item, index) => (
              <div key={index} className="fundamento-item" style={{ animationDelay: `${index * 0.12}s` }}>
                <div className="fundamento-left">
                  <span className="fundamento-numero">{item.numero}</span>
                  {index < fundamentos.length - 1 && <div className="fundamento-linea" />}
                </div>
                <div className="fundamento-body">
                  <h3 className="fundamento-title">{item.titulo}</h3>
                  <p className="fundamento-text">{item.contenido}</p>
                  <pre className="fundamento-snippet"><code>{item.snippet}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tecnologías */}
        <section className="leader-section-content">
          <h2 className="section-title">Tecnologías y Herramientas</h2>

          <div className="tecnologias-grid">
            {tecnologias.map((tech, index) => (
              <div
                key={tech.nombre}
                className="tecnologia-card"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="tecnologia-logo" style={{ background: tech.gradiente }}>
                  <span>{tech.icono}</span>
                </div>

                <h3 className="tecnologia-name">{tech.nombre}</h3>
                <p className="tecnologia-desc">{tech.descripcion}</p>

                <ul className="tecnologia-topics">
                  {tech.temas.map((tema, i) => (
                    <li key={i} className="topic-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {tema}
                    </li>
                  ))}
                </ul>

                <button className="btn-ver-mas" onClick={() => navigate(tech.ruta)}>
                  Explorar {tech.nombre}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="leader-section-divider-final" />

      </div>
    </main>
  );
}