import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgreso } from '../../../hooks/useProgreso';
import './JavaScriptPage.css';

// ─── Datos del curso ────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: 'Introducción a JavaScript',
    descripcion: 'Qué es JavaScript, dónde se ejecuta y cómo añadirlo a una página web.',
    duracion: '15 min',
    teoria: `JavaScript es el único lenguaje de programación que los navegadores web entienden de forma nativa. Mientras que HTML define la estructura de una página y CSS su apariencia, JavaScript es lo que le da comportamiento: reaccionar a clics, mostrar mensajes, cargar datos sin recargar la página, etc.

Fue creado en 1995 por Brendan Eich en tan solo 10 días, originalmente para el navegador Netscape. Hoy es el lenguaje más usado del mundo según la encuesta anual de Stack Overflow, presente tanto en el navegador (frontend) como en el servidor (backend, gracias a Node.js).

Hay tres formas de incluir JavaScript en una página web:
1. Inline: directamente en un atributo HTML como onclick="..." (poco recomendado).
2. En una etiqueta script dentro del HTML.
3. En un archivo externo .js vinculado con la etiqueta script src="archivo.js" (la forma correcta para proyectos reales).

Para ver el resultado de tu código puedes usar console.log(), que muestra información en la consola del navegador. Ábrela con F12 → pestaña "Console".`,
    codigo: {
      titulo: 'Primeros pasos con JavaScript',
      lenguaje: 'javascript',
      contenido: `// Mostrar un mensaje en la consola del navegador
console.log("Hola desde JavaScript");

// También puedes mostrar un cuadro de diálogo emergente
// (solo para pruebas, no en producción)
alert("¡Esto es un alert!");

// Operaciones básicas
console.log(5 + 3);     // 8
console.log(10 - 4);    // 6
console.log(3 * 7);     // 21
console.log(15 / 4);    // 3.75
console.log(15 % 4);    // 3 → el resto de la división (módulo)

// typeof nos dice el tipo de un valor
console.log(typeof 42);        // "number"
console.log(typeof "hola");    // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"`,
    },
    ejercicio: {
      enunciado: 'Abre la consola de tu navegador (F12 → Console) y escribe tres console.log: uno con tu nombre, otro con el año actual y otro con el resultado de multiplicar 123 por 456. ¿Cuánto da?',
      pista: 'No necesitas ningún archivo: puedes escribir JavaScript directamente en la consola del navegador y pulsar Enter para ejecutarlo.',
      solucion: `console.log("Ana");
console.log(2025);
console.log(123 * 456);  // 56088`,
    },
  },
  {
    id: 2,
    titulo: 'Variables: var, let y const',
    descripcion: 'Las tres formas de declarar variables en JavaScript moderno y cuándo usar cada una.',
    duracion: '20 min',
    teoria: `En JavaScript tienes tres palabras clave para crear variables: var, let y const. Aunque las tres guardan datos, tienen comportamientos muy distintos.

VAR — la forma antigua (anterior a 2015). Tiene un comportamiento extraño llamado "hoisting" que eleva la declaración al inicio del fichero, lo que puede generar bugs difíciles de detectar. Hoy en día se evita en código nuevo.

LET — introducida en ES6 (2015). Es la forma moderna de declarar variables que pueden cambiar de valor. Solo existe dentro del bloque {} donde se declara, lo que la hace más predecible y segura.

CONST — también introducida en ES6. Se usa para valores que no van a cambiar. Si intentas reasignarla, JavaScript lanzará un error. Es la opción por defecto en código moderno: usa const siempre que puedas, y let solo cuando necesites reasignar.

Regla práctica: empieza declarando todo con const. Si en algún momento necesitas cambiar el valor, cámbialo a let. Nunca uses var en código nuevo.`,
    codigo: {
      titulo: 'var vs let vs const',
      lenguaje: 'javascript',
      contenido: `// CONST: valor que no cambia
const PI = 3.14159;
const nombre = "Ana";
// PI = 3;  ← Esto lanzaría un error: Assignment to constant variable

// LET: valor que puede cambiar
let puntuacion = 0;
puntuacion = 10;   // ✓ permitido
puntuacion += 5;   // ✓ suma 5 → ahora vale 15
console.log(puntuacion);  // 15

// Ámbito de bloque: let y const solo existen dentro de {}
if (true) {
  let mensaje = "Estoy dentro del bloque";
  console.log(mensaje);  // ✓ funciona
}
// console.log(mensaje);  ← Error: mensaje no está definida aquí

// Los objetos y arrays declarados con const
// pueden modificarse internamente (solo no puedes reasignar la variable)
const usuario = { nombre: "Carlos", edad: 25 };
usuario.edad = 26;         // ✓ permitido: modificamos una propiedad
console.log(usuario.edad); // 26`,
    },
    ejercicio: {
      enunciado: 'Declara las siguientes variables usando la palabra clave correcta (const o let): el nombre de una tienda (no cambiará), el stock de un producto (puede cambiar), el precio de un artículo (no cambiará) y el total de la cesta de la compra (empieza en 0 y aumentará). Luego simula añadir 3 artículos al carrito sumando el precio al total.',
      pista: 'Usa const para los valores fijos (nombre, precio) y let para los que van a cambiar (stock, total). Para sumar al total usa: total += precio.',
      solucion: `const nombreTienda = "Mi Tienda Online";
let stock = 50;
const precio = 29.99;
let total = 0;

// Simulamos añadir 3 artículos
total += precio;
total += precio;
total += precio;
stock -= 3;

console.log(\`Tienda: \${nombreTienda}\`);
console.log(\`Total: \${total.toFixed(2)}€\`);  // 89.97€
console.log(\`Stock restante: \${stock}\`);       // 47`,
    },
  },
  {
    id: 3,
    titulo: 'Funciones y Arrow Functions',
    descripcion: 'Cómo crear funciones tradicionales y la sintaxis moderna con flecha (=>).',
    duracion: '25 min',
    teoria: `Una función en JavaScript es un bloque de código reutilizable al que puedes llamar por su nombre. Existen varias formas de escribirlas:

FUNCTION DECLARATION — la forma clásica con la palabra function. Tiene una característica llamada hoisting: puedes llamarla antes de declararla en el código.

FUNCTION EXPRESSION — asignar una función anónima a una variable. No tiene hoisting, así que debes declararla antes de usarla.

ARROW FUNCTION (función flecha) — la forma más moderna y concisa, introducida en ES6 con la sintaxis =>. Es la más usada hoy en día. Si solo tiene una expresión, el return es implícito y puedes escribirla en una sola línea.

Las arrow functions también tienen una diferencia importante respecto a las funciones tradicionales: no tienen su propio contexto "this", lo que las hace más predecibles en muchas situaciones (especialmente dentro de objetos y eventos).

Regla práctica: usa arrow functions por defecto para código corto y callbacks. Usa function declaration para funciones principales que necesitan ser identificadas claramente o que se llaman antes de su definición.`,
    codigo: {
      titulo: 'Tres formas de escribir una función',
      lenguaje: 'javascript',
      contenido: `// 1. Function declaration (forma clásica)
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
console.log(saludar("Ana"));  // Hola, Ana!

// 2. Function expression (función asignada a variable)
const despedir = function(nombre) {
  return \`Adiós, \${nombre}!\`;
};
console.log(despedir("Ana"));  // Adiós, Ana!

// 3. Arrow function (forma moderna)
const sumar = (a, b) => {
  return a + b;
};
console.log(sumar(3, 7));  // 10

// Arrow function de una línea: el return es implícito
const multiplicar = (a, b) => a * b;
console.log(multiplicar(4, 5));  // 20

// Arrow function con un solo parámetro: los paréntesis son opcionales
const doble = n => n * 2;
console.log(doble(8));  // 16

// Parámetros con valor por defecto
const saludarFormal = (nombre, titulo = "Sr./Sra.") =>
  \`Buenos días, \${titulo} \${nombre}\`;
console.log(saludarFormal("García"));         // Buenos días, Sr./Sra. García
console.log(saludarFormal("López", "Dr."));   // Buenos días, Dr. López`,
    },
    ejercicio: {
      enunciado: 'Escribe una arrow function llamada "calcularDescuento" que reciba el precio original y el porcentaje de descuento, y devuelva el precio final. Por ejemplo: calcularDescuento(100, 20) debería devolver 80 (100€ con un 20% de descuento). Luego crea otra función "formatearPrecio" que reciba un número y devuelva el texto con el símbolo del euro, por ejemplo: "80.00€".',
      pista: 'La fórmula del descuento es: precio - (precio * porcentaje / 100). Para formatear el precio usa el método .toFixed(2) que redondea a 2 decimales.',
      solucion: `const calcularDescuento = (precio, porcentaje) =>
  precio - (precio * porcentaje / 100);

const formatearPrecio = precio => \`\${precio.toFixed(2)}€\`;

const precioFinal = calcularDescuento(100, 20);
console.log(formatearPrecio(precioFinal));  // 80.00€

// Otro ejemplo
console.log(formatearPrecio(calcularDescuento(59.99, 15)));  // 50.99€`,
    },
  },
  {
    id: 4,
    titulo: 'Arrays y sus métodos',
    descripcion: 'Trabaja con listas de datos usando los métodos más útiles de los arrays.',
    duracion: '30 min',
    teoria: `Un array en JavaScript es una lista ordenada de elementos. Cada elemento tiene una posición numérica llamada índice, que empieza en 0 (no en 1).

Los arrays tienen métodos muy potentes que permiten transformar y filtrar datos sin necesidad de escribir bucles manualmente. Los más importantes son:

MAP — recorre el array y devuelve un nuevo array con cada elemento transformado. No modifica el original.

FILTER — devuelve un nuevo array solo con los elementos que cumplen una condición. Tampoco modifica el original.

FIND — devuelve el primer elemento que cumple la condición (no un array, el elemento directamente).

REDUCE — "reduce" el array a un único valor aplicando una operación acumulativa. Muy útil para sumas, totales, etc.

INCLUDES — devuelve true si el array contiene un valor concreto.

SOME / EVERY — some devuelve true si al menos un elemento cumple la condición. every devuelve true solo si todos la cumplen.

Todos estos métodos (map, filter, reduce…) reciben como argumento una función que se aplica a cada elemento. Normalmente se usan con arrow functions por su sintaxis compacta.`,
    codigo: {
      titulo: 'Los métodos esenciales de los arrays',
      lenguaje: 'javascript',
      contenido: `const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// MAP: transforma cada elemento
const dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// FILTER: filtra según condición
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares);   // [2, 4, 6, 8, 10]

// REDUCE: acumula un resultado
const suma = numeros.reduce((acumulador, n) => acumulador + n, 0);
console.log(suma);    // 55

// FIND: encuentra el primer elemento que cumple la condición
const primerMayorDe5 = numeros.find(n => n > 5);
console.log(primerMayorDe5);  // 6

// INCLUDES: comprueba si existe un valor
console.log(numeros.includes(7));   // true
console.log(numeros.includes(11));  // false

// Encadenar métodos (muy común en código real)
const resultado = numeros
  .filter(n => n % 2 === 0)   // solo pares: [2,4,6,8,10]
  .map(n => n ** 2)            // al cuadrado: [4,16,36,64,100]
  .reduce((acc, n) => acc + n, 0);  // suma: 220
console.log(resultado);  // 220`,
    },
    ejercicio: {
      enunciado: 'Tienes una lista de productos de una tienda. Usando los métodos de array (sin bucles for): 1) obtén solo los productos que cuestan menos de 30€, 2) crea un array con solo los nombres de todos los productos, y 3) calcula el precio total si compras uno de cada producto.',
      pista: 'Para el punto 1 usa filter, para el 2 usa map accediendo a la propiedad .nombre, y para el 3 usa reduce sumando la propiedad .precio.',
      solucion: `const productos = [
  { nombre: "Teclado",  precio: 45 },
  { nombre: "Ratón",    precio: 25 },
  { nombre: "Cable USB",precio: 8  },
  { nombre: "Monitor",  precio: 199},
  { nombre: "Webcam",   precio: 29 },
];

// 1. Productos baratos (menos de 30€)
const baratos = productos.filter(p => p.precio < 30);
console.log(baratos.map(p => p.nombre));  // ["Ratón", "Cable USB", "Webcam"]

// 2. Solo los nombres
const nombres = productos.map(p => p.nombre);
console.log(nombres);  // ["Teclado", "Ratón", "Cable USB", "Monitor", "Webcam"]

// 3. Precio total
const total = productos.reduce((acc, p) => acc + p.precio, 0);
console.log(\`Total: \${total}€\`);  // Total: 306€`,
    },
  },
  {
    id: 5,
    titulo: 'Manipulación del DOM',
    descripcion: 'Accede y modifica elementos HTML desde JavaScript para crear páginas interactivas.',
    duracion: '30 min',
    teoria: `El DOM (Document Object Model) es la representación que hace el navegador de una página HTML en forma de árbol de objetos. Cada etiqueta HTML (div, p, button…) se convierte en un nodo del árbol que JavaScript puede leer y modificar.

Para acceder a un elemento HTML desde JavaScript, los métodos más usados son:

document.getElementById("id") — busca un elemento por su atributo id. Devuelve un solo elemento.
document.querySelector(".clase") — busca el primer elemento que coincida con un selector CSS.
document.querySelectorAll(".clase") — devuelve todos los elementos que coincidan (como un array).

Una vez tienes el elemento, puedes:
— Leer o cambiar su texto con elemento.textContent
— Leer o cambiar su HTML interno con elemento.innerHTML
— Cambiar estilos con elemento.style.propiedad
— Añadir o quitar clases CSS con elemento.classList.add(), .remove(), .toggle()

Los EVENTOS permiten ejecutar código cuando el usuario hace algo. Se asignan con addEventListener:
  elemento.addEventListener("click", función)
  elemento.addEventListener("input", función)  ← cuando escribe en un campo
  elemento.addEventListener("submit", función) ← cuando envía un formulario`,
    codigo: {
      titulo: 'Interactuar con el HTML desde JavaScript',
      lenguaje: 'javascript',
      contenido: `// Supongamos que tenemos este HTML:
// <h1 id="titulo">Hola</h1>
// <button id="btn">Cambiar texto</button>
// <input id="campo" placeholder="Escribe algo">
// <p id="salida"></p>

// Acceder a elementos
const titulo = document.getElementById("titulo");
const btn    = document.getElementById("btn");
const campo  = document.getElementById("campo");
const salida = document.getElementById("salida");

// Leer y modificar contenido
console.log(titulo.textContent);    // "Hola"
titulo.textContent = "¡Hola, mundo!";

// Cambiar estilos directamente
titulo.style.color = "#60a5fa";
titulo.style.fontSize = "2rem";

// Añadir/quitar clases CSS
titulo.classList.add("destacado");
titulo.classList.toggle("oculto");  // añade si no está, quita si está

// Reaccionar a eventos
btn.addEventListener("click", () => {
  titulo.textContent = "¡Hiciste clic!";
  titulo.style.color = "#f59e0b";
});

// Evento input: se dispara con cada tecla que escribe el usuario
campo.addEventListener("input", (evento) => {
  const texto = evento.target.value;  // lo que hay en el campo
  salida.textContent = \`Estás escribiendo: \${texto}\`;
});`,
    },
    ejercicio: {
      enunciado: 'Crea un mini contador interactivo en HTML+JS. Necesitas: un número que empiece en 0, un botón "+" que lo incremente y un botón "-" que lo decremente (sin bajar de 0). Bonus: cambia el color del número a rojo si es 0, a verde si es positivo.',
      pista: 'Guarda el valor actual en una variable let contador = 0. En cada click, actualiza la variable y luego actualiza el textContent del elemento con el número. Para el color usa elemento.style.color.',
      solucion: `// HTML necesario:
// <p id="contador">0</p>
// <button id="incrementar">+</button>
// <button id="decrementar">-</button>

let contador = 0;
const display    = document.getElementById("contador");
const btnMas     = document.getElementById("incrementar");
const btnMenos   = document.getElementById("decrementar");

function actualizarDisplay() {
  display.textContent = contador;
  display.style.color = contador === 0 ? "#ef4444" : "#22c55e";
}

btnMas.addEventListener("click", () => {
  contador++;
  actualizarDisplay();
});

btnMenos.addEventListener("click", () => {
  if (contador > 0) contador--;
  actualizarDisplay();
});`,
    },
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function JavaScriptPage() {
  const navigate = useNavigate();

  // ── Estado local ──
  const [moduloActivo,    setModuloActivo]    = useState(0);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [mostrarEjercicio,setMostrarEjercicio]= useState(false);

  // ── Progreso persistido en Supabase ──
  const { progreso, cargando, guardarProgreso } = useProgreso('javascript', modulos.length);
  const completados = progreso.completados;
  const porcentaje  = progreso.porcentaje;

  // Restaurar módulo activo cuando carga el progreso desde Supabase
  useEffect(() => {
    if (!cargando && progreso.moduloActivo > 0) {
      setModuloActivo(progreso.moduloActivo);
    }
  }, [cargando]);

  const modulo = modulos[moduloActivo];

  // ── Acciones ──

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
    // Guarda el módulo activo actual antes de cambiar
    guardarProgreso(completados, index, modulos.length);
    setModuloActivo(index);
    setMostrarSolucion(false);
    setMostrarEjercicio(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render ──

  if (cargando) {
    return (
      <main className="js-page">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <span className="login-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
      </main>
    );
  }

  return (
    <main className="js-page">
      <div className="js-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="js-sidebar">
          <button className="btn-back-sidebar" onClick={() => navigate('/programacion/codigo')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className="sidebar-logo js-logo">
              <span>JS</span>
            </div>
            <div>
              <h2 className="sidebar-title">JavaScript</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className="progreso-pct js-pct">{porcentaje}%</span>
            </div>
            <div className="progreso-bar">
              <div className="progreso-fill js-fill" style={{ width: `${porcentaje}%` }} />
            </div>
            <p className="progreso-info">{completados.length} de {modulos.length} completados</p>
          </div>

          {/* Lista de módulos */}
          <nav className="modulos-nav">
            {modulos.map((m, index) => {
              const completado = completados.includes(m.id);
              const activo     = moduloActivo === index;
              return (
                <button
                  key={m.id}
                  className={`modulo-btn ${activo ? 'activo-js' : ''} ${completado ? 'completado-js' : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className={`modulo-num ${activo ? 'num-js' : ''} ${completado ? 'num-js-done' : ''}`}>
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

        {/* ── Contenido principal ─────────────────── */}
        <div className="js-content">

          <header className="modulo-header">
            <div className="modulo-meta">
              <span className="modulo-badge js-badge">Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className="modulo-titulo js-titulo">{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className="modulo-glow js-glow" />

          {/* Teoría */}
          <section className="seccion">
            <div className="seccion-label js-label">
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

          {/* Código */}
          <section className="seccion">
            <div className="seccion-label js-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Ejemplo de código
            </div>
            <div className="codigo-block js-block">
              <div className="codigo-header">
                <div className="codigo-dots">
                  <span /><span /><span />
                </div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className="codigo-lang js-lang">{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="codigo-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          {/* Ejercicio */}
          <section className="seccion">
            <div className="seccion-label js-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>

            <div className={`ejercicio-card js-ejercicio ${mostrarEjercicio ? 'abierto' : ''}`}>
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
                  <div className="pista-box js-pista">
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
                      <p className="solucion-label js-sol-label">Solución</p>
                      <pre className="codigo-pre solucion-pre js-solucion-pre"><code>{modulo.ejercicio.solucion}</code></pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Navegación inferior */}
          <div className="modulo-footer">
            {moduloActivo > 0 && (
              <button className="btn-nav btn-prev" onClick={() => seleccionarModulo(moduloActivo - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Módulo anterior
              </button>
            )}
            <button className="btn-nav btn-next-js" onClick={irSiguiente}>
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