import { useNavigate } from 'react-router-dom';
import './codigoSection.css';

export default function CodigoSection() {
  const navigate = useNavigate();

  const fundamentos = [
    {
      numero: '01',
      titulo: 'Lógica de Programación',
      contenido:
        'Antes de aprender un lenguaje concreto, hay que aprender a pensar como un programador: descomponer un problema en pasos pequeños usando variables (cajitas donde guardamos datos), condicionales (si pasa esto, haz aquello) y bucles (repite esta acción N veces).',
      snippet: `// Variable: guardamos un dato con nombre
let edad = 25;

// Condicional: tomamos una decisión
if (edad >= 18) {
  console.log("Eres mayor de edad");
}

// Bucle: repetimos una acción
for (let i = 0; i < 3; i++) {
  console.log("Vuelta número " + i);
}`,
    },
    {
      numero: '02',
      titulo: 'Estructuras de Datos',
      contenido:
        'Son formas de organizar información en memoria. Un array guarda una lista de elementos en orden. Un objeto agrupa datos relacionados bajo un nombre. Elegir la estructura correcta puede hacer tu programa más rápido y más sencillo de mantener.',
      snippet: `// Array: lista de elementos en orden
const frutas = ["manzana", "pera", "uva"];

// Objeto: datos agrupados con nombre
const usuario = {
  nombre: "Ana",
  edad: 30,
  activo: true
};

console.log(frutas[0]);       // "manzana"
console.log(usuario.nombre);  // "Ana"`,
    },
    {
      numero: '03',
      titulo: 'Algoritmos',
      contenido:
        'Un algoritmo es una receta: una secuencia de pasos que resuelve un problema. Aprenderás a buscar un elemento dentro de una lista, ordenar datos de menor a mayor, y resolver problemas que se llaman a sí mismos (recursividad).',
      snippet: `// Array desordenado
const numeros = [4, 2, 8, 1, 6];

// Ordenar de menor a mayor
const ordenados = numeros.sort((a, b) => a - b);
// Resultado: [1, 2, 4, 6, 8]

// Buscar si existe un valor
const existe = numeros.includes(8); // true`,
    },
    {
      numero: '04',
      titulo: 'Buenas Prácticas',
      contenido:
        'Escribir código que funcione no es suficiente; también tiene que ser legible y fácil de mantener. Veremos clean code (código limpio), testing (probar que tu código hace lo que debe) y Git (guarda el historial de cambios y permite colaborar en equipo).',
      snippet: `# Git: los comandos básicos del día a día

git init          # Crea un repositorio nuevo
git add .         # Prepara todos los cambios
git commit -m "Añado función de login"
git push          # Sube los cambios al servidor
git pull          # Descarga cambios del equipo`,
    },
  ];

  const lenguajes = [
    {
      nombre: 'Python',
      ruta: '/programacion/codigo/python',
      descripcion:
        'El lenguaje más popular para empezar. Lees el código casi como si fuera español, lo que facilita aprender sin distracciones. Usado en inteligencia artificial, análisis de datos y automatización de tareas repetitivas.',
      icono: 'Py',
      gradiente: 'linear-gradient(135deg, #3776ab, #ffd343)',
      temas: ['Sintaxis clara', 'Data Science', 'Django / FastAPI', 'Automatización'],
    },
    {
      nombre: 'JavaScript',
      ruta: '/programacion/codigo/javascript',
      descripcion:
        'El único lenguaje que entienden los navegadores de forma nativa. Si quieres que una página reaccione a clics, muestre animaciones o cargue datos sin recargar, necesitas JavaScript.',
      icono: 'JS',
      gradiente: 'linear-gradient(135deg, #f7df1e, #f0db4f)',
      temas: ['ES6+ (JavaScript moderno)', 'Manipulación del DOM', 'Async / Await', 'Node.js'],
    },
    {
      nombre: 'TypeScript',
      ruta: '/programacion/codigo/typescript',
      descripcion:
        'JavaScript con un sistema de tipos: le dices al código qué tipo de dato espera cada variable. Esto hace que los errores aparezcan antes de ejecutar el programa, no después.',
      icono: 'TS',
      gradiente: 'linear-gradient(135deg, #3178c6, #007acc)',
      temas: ['Tipado estático', 'Interfaces y contratos', 'Genéricos', 'Autocompletado inteligente'],
    },
    {
      nombre: 'React',
      ruta: '/programacion/codigo/react',
      descripcion:
        'Una biblioteca que divide las interfaces en piezas reutilizables llamadas componentes. Es como construir con LEGO: cada pieza tiene su función y puedes combinarlas para crear cualquier pantalla.',
      icono: '⚛',
      gradiente: 'linear-gradient(135deg, #61dafb, #00d8ff)',
      temas: ['Hooks (lógica reutilizable)', 'JSX (HTML dentro de JS)', 'Context API', 'React Router'],
    },
  ];

  return (
    <main className="codigo-section-page">
      <div className="codigo-section-container">

        {/* Hero */}
        <section className="codigo-section-hero">
          <div className="codigo-section-glow" />

          <div className="codigo-section-icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--bg-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          <h1 className="codigo-section-title">Programación de Código</h1>
          <p className="codigo-section-subtitle">
            Aprende a escribir instrucciones que los ordenadores ejecutan. Empieza por los
            fundamentos, elige un lenguaje y construye proyectos reales paso a paso.
          </p>

          <button className="btn-back" onClick={() => navigate('/programacion-2025')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver a Programación 2025
          </button>
        </section>

        <div className="codigo-section-divider" />

        {/* Lenguajes */}
        <section className="codigo-section-content">
          <h2 className="section-title">Lenguajes y Tecnologías</h2>

          <div className="lenguajes-grid">
            {lenguajes.map((lang, index) => (
              <div
                key={lang.nombre}
                className="lenguaje-card"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="lenguaje-logo" style={{ background: lang.gradiente }}>
                  <span>{lang.icono}</span>
                </div>

                <h3 className="lenguaje-name">{lang.nombre}</h3>
                <p className="lenguaje-desc">{lang.descripcion}</p>

                <ul className="lenguaje-topics">
                  {lang.temas.map((tema, i) => (
                    <li key={i} className="topic-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {tema}
                    </li>
                  ))}
                </ul>

                <button className="btn-ver-mas" onClick={() => navigate(lang.ruta)}>
                  Explorar {lang.nombre}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Fundamentos */}
        <section className="codigo-section-content">
          <h2 className="section-title">Fundamentos Esenciales</h2>

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

        

        <div className="codigo-section-divider-final" />

      </div>
    </main>
  );
}