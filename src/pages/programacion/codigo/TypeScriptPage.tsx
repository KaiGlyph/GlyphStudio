import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TypeScriptPage.css';

// ─── Datos del curso ────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: '¿Qué es TypeScript y por qué existe?',
    descripcion: 'El problema que TypeScript resuelve y cómo se relaciona con JavaScript.',
    duracion: '15 min',
    teoria: `TypeScript es JavaScript con un sistema de tipos encima. Lo creó Microsoft en 2012 porque a medida que los proyectos JavaScript crecen, aparece un problema serio: puedes pasarle a una función un dato de tipo incorrecto y el error solo aparece cuando el programa ya está ejecutándose, a veces en producción frente a los usuarios.

TypeScript añade tipos estáticos: le dices al código qué tipo de dato espera cada variable, parámetro y función. El compilador de TypeScript revisa todo esto antes de ejecutar nada y avisa de los errores en el editor, mientras escribes.

La relación con JavaScript es directa: TypeScript es un superconjunto de JavaScript. Eso significa que todo código JavaScript válido es también código TypeScript válido. No tienes que reaprender nada: solo añades tipos donde los necesites.

El proceso de trabajo es: escribes archivos .ts → el compilador (tsc) los transforma en archivos .js normales → el navegador o Node.js ejecuta esos .js. El código TypeScript nunca llega al navegador directamente.

Ventajas principales:
— Los errores aparecen en el editor, no en producción.
— El autocompletado del editor se vuelve mucho más preciso e inteligente.
— El código es más fácil de entender y mantener, especialmente en equipos grandes.`,
    codigo: {
      titulo: 'JavaScript vs TypeScript: el mismo código',
      lenguaje: 'typescript',
      contenido: `// ── JavaScript (sin tipos) ──────────────────────────────
function sumar(a, b) {
  return a + b;
}

sumar(5, 3);       // ✓ correcto → 8
sumar("5", 3);     // ✓ JavaScript no se queja → "53" (bug silencioso)
sumar(true, null); // ✓ JavaScript tampoco → 1  (bug silencioso)


// ── TypeScript (con tipos) ───────────────────────────────
function sumarTS(a: number, b: number): number {
  return a + b;
}

sumarTS(5, 3);       // ✓ correcto → 8
sumarTS("5", 3);     // ✗ Error en el editor: Argument of type 'string'
                     //   is not assignable to parameter of type 'number'
sumarTS(true, null); // ✗ Error en el editor: antes de ejecutar nada

// TypeScript te avisa del problema mientras escribes,
// no cuando el usuario ya ha encontrado el bug.`,
    },
    ejercicio: {
      enunciado: 'Convierte esta función JavaScript a TypeScript añadiendo los tipos correctos. La función recibe el nombre de un producto (texto) y su precio (número con decimales) y devuelve un texto con el formato "Producto: X — Precio: Y€". Por ejemplo: calcularEtiqueta("Teclado", 45.99) → "Producto: Teclado — Precio: 45.99€".',
      pista: 'El nombre es string, el precio es number. El retorno también es string. Añade los tipos con : después de cada parámetro y al final de los paréntesis para indicar el tipo de retorno.',
      solucion: `// Versión JavaScript original
function calcularEtiqueta(nombre, precio) {
  return \`Producto: \${nombre} — Precio: \${precio}€\`;
}

// Versión TypeScript con tipos
function calcularEtiqueta(nombre: string, precio: number): string {
  return \`Producto: \${nombre} — Precio: \${precio}€\`;
}

// Ahora TypeScript avisará si intentamos pasar datos incorrectos:
// calcularEtiqueta(123, "barato")  ← Error detectado antes de ejecutar`,
    },
  },
  {
    id: 2,
    titulo: 'Tipos Básicos',
    descripcion: 'Los tipos primitivos de TypeScript y cómo anotar variables y funciones.',
    duracion: '20 min',
    teoria: `TypeScript incluye todos los tipos de JavaScript más algunos adicionales. Los más usados son:

string — texto: "hola", 'mundo', \`plantilla\`
number — cualquier número: 42, 3.14, -7 (no hay int y float separados como en otros lenguajes)
boolean — solo true o false
null — ausencia de valor intencionada
undefined — variable declarada pero sin valor asignado
any — desactiva la comprobación de tipos (úsalo lo menos posible, es rendirse ante TypeScript)
unknown — como any pero más seguro: obliga a comprobar el tipo antes de usar el valor
void — indica que una función no devuelve nada
never — indica que una función nunca termina (lanza un error o bucle infinito)

Para declarar el tipo de una variable usas dos puntos (:) después del nombre:
  const nombre: string = "Ana";

Pero en la mayoría de casos TypeScript puede inferir el tipo solo a partir del valor. No necesitas escribir el tipo si el valor lo deja claro:
  const nombre = "Ana";  // TypeScript ya sabe que es string

Escribe los tipos explícitamente cuando la inferencia no sea suficiente: en parámetros de funciones, en variables que empiezan sin valor, o cuando quieras ser muy claro con el código.`,
    codigo: {
      titulo: 'Tipos básicos en la práctica',
      lenguaje: 'typescript',
      contenido: `// Tipos básicos con anotación explícita
const nombre: string   = "Ana";
const edad: number     = 28;
const activo: boolean  = true;
let   resultado: null  = null;

// Inferencia de tipos: TypeScript lo deduce solo
const ciudad = "Madrid";     // TypeScript infiere: string
const año    = 2025;         // TypeScript infiere: number
const debug  = false;        // TypeScript infiere: boolean

// Funciones: siempre anota los parámetros
function saludar(nombre: string): string {
  return \`Hola, \${nombre}!\`;
}

// Función sin retorno → void
function registrar(mensaje: string): void {
  console.log(\`[LOG] \${mensaje}\`);
}

// Union types: acepta más de un tipo (con |)
let id: string | number;
id = 42;       // ✓
id = "abc-1";  // ✓
id = true;     // ✗ Error: boolean no está en la unión

// Tipo any: evítalo salvo casos muy concretos
let dato: any = "hola";
dato = 42;        // ✓ no hay error pero perdemos la seguridad de tipos
dato = [1, 2, 3]; // ✓ TypeScript se rinde y acepta cualquier cosa`,
    },
    ejercicio: {
      enunciado: 'Declara las siguientes variables con sus tipos correctos y sin usar "any": una variable para guardar el título de un artículo, otra para el número de visualizaciones, otra para si está publicado o no, y una función "resumir" que reciba el título (string) y las visualizaciones (number) y devuelva un string con el formato "\'Título\' — X visualizaciones". Intenta dejar que TypeScript infiera los tipos donde pueda.',
      pista: 'Solo necesitas anotar los parámetros de la función explícitamente. Para las variables con valor inicial, TypeScript infiere el tipo solo.',
      solucion: `const titulo        = "Aprendiendo TypeScript";  // infiere string
const visualizaciones = 1340;                       // infiere number
const publicado      = true;                        // infiere boolean

function resumir(titulo: string, visualizaciones: number): string {
  return \`'\${titulo}' — \${visualizaciones} visualizaciones\`;
}

console.log(resumir(titulo, visualizaciones));
// 'Aprendiendo TypeScript' — 1340 visualizaciones`,
    },
  },
  {
    id: 3,
    titulo: 'Interfaces y Type Aliases',
    descripcion: 'Define la forma de tus objetos con interfaces y types para un código más seguro.',
    duracion: '25 min',
    teoria: `Cuando trabajas con objetos, necesitas una forma de describir su estructura: qué propiedades tiene, de qué tipo es cada una y cuáles son opcionales. Para esto TypeScript tiene dos herramientas: interfaces y type aliases.

INTERFACE — define la forma de un objeto. Es la forma más común y expresiva de describir objetos en TypeScript. Puedes extenderla (heredarla) con extends para añadir más propiedades.

TYPE ALIAS — es más flexible: puede describir objetos, pero también uniones de tipos, tuplas, primitivos, etc. Se usa cuando necesitas algo que una interface no puede expresar.

Las propiedades opcionales se marcan con ? después del nombre. Las propiedades de solo lectura se marcan con readonly al principio.

¿Cuándo usar cada uno?
— Usa interface para describir la forma de objetos y clases, especialmente si pueden ser extendidas.
— Usa type para uniones de tipos, tipos calculados o cuando necesitas algo más complejo que un objeto.
En la práctica, para objetos simples ambos funcionan igual. Elige uno y sé consistente dentro del proyecto.`,
    codigo: {
      titulo: 'Interfaces y types en objetos reales',
      lenguaje: 'typescript',
      contenido: `// Interface: describe la forma de un objeto
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number;         // ? → propiedad opcional
  readonly creadoEn: Date; // readonly → no se puede modificar tras la creación
}

// Crear un objeto que cumpla la interface
const usuario: Usuario = {
  id: 1,
  nombre: "Ana García",
  email: "ana@ejemplo.com",
  creadoEn: new Date(),
  // edad es opcional → podemos omitirla sin error
};

// usuario.creadoEn = new Date(); ← Error: es readonly

// Extender una interface con más propiedades
interface Admin extends Usuario {
  permisos: string[];
  nivel: "junior" | "senior" | "super"; // union de literales
}

// Type alias: útil para uniones y tipos complejos
type ID = string | number;
type Estado = "activo" | "inactivo" | "pendiente";

// Función que usa la interface como tipo de parámetro
function mostrarUsuario(u: Usuario): string {
  return \`[\${u.id}] \${u.nombre} <\${u.email}>\`;
}

console.log(mostrarUsuario(usuario));
// [1] Ana García <ana@ejemplo.com>`,
    },
    ejercicio: {
      enunciado: 'Crea una interface "Producto" con las propiedades: id (number), nombre (string), precio (number), categoria (string) y descripcion (opcional). Luego crea una segunda interface "Carrito" con: productos (array de Producto) y descuento (number, opcional). Finalmente escribe una función "calcularTotal" que reciba un Carrito y devuelva el precio total aplicando el descuento si existe.',
      pista: 'Un array de Producto se escribe como Producto[]. Para el descuento opcional usa ?: number. En la función, comprueba si carrito.descuento existe antes de aplicarlo.',
      solucion: `interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
}

interface Carrito {
  productos: Producto[];
  descuento?: number;
}

function calcularTotal(carrito: Carrito): number {
  const subtotal = carrito.productos.reduce((acc, p) => acc + p.precio, 0);
  if (carrito.descuento) {
    return subtotal - (subtotal * carrito.descuento / 100);
  }
  return subtotal;
}

const miCarrito: Carrito = {
  productos: [
    { id: 1, nombre: "Teclado", precio: 45, categoria: "Periféricos" },
    { id: 2, nombre: "Ratón",   precio: 25, categoria: "Periféricos" },
  ],
  descuento: 10,
};

console.log(calcularTotal(miCarrito));  // 63 (10% de descuento sobre 70€)`,
    },
  },
  {
    id: 4,
    titulo: 'Genéricos (Generics)',
    descripcion: 'Escribe funciones y estructuras que funcionan con cualquier tipo de forma segura.',
    duracion: '25 min',
    teoria: `Los genéricos son una de las características más potentes de TypeScript. Permiten escribir código que funciona con distintos tipos sin sacrificar la seguridad de tipos.

El problema que resuelven: imagina una función que devuelve el primer elemento de un array. Si la escribes para number[], solo funciona con arrays de números. Si usas any[], funciona con todo pero pierdes la información del tipo. Los genéricos te dan lo mejor de ambos mundos.

La sintaxis usa corchetes angulares <T> donde T es una variable de tipo (el nombre T es convencional, puedes usar cualquier letra o nombre descriptivo). Cuando llamas a la función, TypeScript infiere T automáticamente a partir de los argumentos.

Los genéricos también permiten restricciones con extends: puedes decir que T debe ser un tipo que tenga ciertas propiedades, sin especificar exactamente cuál es ese tipo.

En React los usarás constantemente: useState<number>(0), useRef<HTMLDivElement>(null), los tipos de las props… Entender genéricos es fundamental para trabajar con TypeScript en proyectos reales.`,
    codigo: {
      titulo: 'Genéricos: código reutilizable y tipado',
      lenguaje: 'typescript',
      contenido: `// Sin genéricos: hay que escribir una función por tipo
function primerNumero(arr: number[]): number { return arr[0]; }
function primerTexto(arr: string[]): string   { return arr[0]; }

// Con genérico: una sola función para todos los tipos
function primero<T>(arr: T[]): T {
  return arr[0];
}

const n = primero([1, 2, 3]);        // TypeScript infiere T = number
const s = primero(["a", "b", "c"]); // TypeScript infiere T = string
// n y s tienen sus tipos correctos sin que lo especifiques

// Genérico con restricción: T debe tener la propiedad "id"
function buscarPorId<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const usuarios = [
  { id: 1, nombre: "Ana" },
  { id: 2, nombre: "Carlos" },
];
const encontrado = buscarPorId(usuarios, 1);
// encontrado tiene tipo { id: number, nombre: string } | undefined

// Genérico en interfaces: muy útil para respuestas de API
interface Respuesta<T> {
  datos: T;
  error: string | null;
  cargando: boolean;
}

type RespuestaUsuario = Respuesta<Usuario>;
type RespuestaLista   = Respuesta<Usuario[]>;`,
    },
    ejercicio: {
      enunciado: 'Escribe una función genérica "filtrar" que reciba un array de cualquier tipo y una función de predicado (una función que recibe un elemento y devuelve true o false), y devuelva un nuevo array solo con los elementos que pasen el filtro. Luego úsala dos veces: una para filtrar números mayores de 5, y otra para filtrar strings que empiecen por "A".',
      pista: 'La función de predicado tiene tipo (item: T) => boolean. El tipo de retorno de filtrar es T[]. Esta función hace exactamente lo mismo que el método .filter() nativo de los arrays, pero escrita por ti con genéricos.',
      solucion: `function filtrar<T>(arr: T[], predicado: (item: T) => boolean): T[] {
  return arr.filter(predicado);
}

// Filtrar números mayores de 5
const numeros = [1, 8, 3, 9, 2, 7, 4];
const grandes = filtrar(numeros, n => n > 5);
console.log(grandes);  // [8, 9, 7]

// Filtrar strings que empiezan por "A"
const nombres = ["Ana", "Carlos", "Alba", "Pedro", "Andrea"];
const conA = filtrar(nombres, s => s.startsWith("A"));
console.log(conA);  // ["Ana", "Alba", "Andrea"]`,
    },
  },
  {
    id: 5,
    titulo: 'TypeScript con React',
    descripcion: 'Cómo tipar componentes, props, hooks y eventos en un proyecto React real.',
    duracion: '30 min',
    teoria: `En proyectos React con TypeScript, los tipos más importantes que necesitarás dominar son los de las props, los hooks y los eventos del DOM.

PROPS — cada componente React define qué datos espera recibir. En TypeScript describes esa "forma" con una interface o type, y se la asignas al componente. Esto hace que el editor te avise si olvidas pasar una prop obligatoria o si le pasas el tipo incorrecto.

HOOKS — useState necesita saber de qué tipo es el estado. Muchas veces TypeScript lo infiere, pero cuando el estado empieza como null o como un array vacío, tienes que especificarlo: useState<string | null>(null), useState<Usuario[]>([]).

EVENTOS — cuando manejas eventos del DOM (onClick, onChange, onSubmit…), el parámetro del handler tiene un tipo concreto. El más común es React.ChangeEvent<HTMLInputElement> para inputs de texto, y React.MouseEvent<HTMLButtonElement> para clicks de botón. Tu editor te mostrará estos tipos con el autocompletado.

CHILDREN — si tu componente envuelve otros componentes o texto, sus hijos tienen tipo React.ReactNode. Si solo acepta texto, usa string.

Con el tiempo estos tipos se vuelven automáticos: los escribes sin pensar porque el editor los sugiere. La curva de aprendizaje es breve pero el beneficio en proyectos grandes es enorme.`,
    codigo: {
      titulo: 'Componentes React completamente tipados',
      lenguaje: 'typescript',
      contenido: `import { useState } from 'react';

// ── Interface de props ───────────────────────────────────
interface TarjetaProps {
  titulo: string;
  descripcion: string;
  precio: number;
  destacado?: boolean;           // opcional
  onComprar: (titulo: string) => void; // función callback tipada
}

// ── Componente con props tipadas ─────────────────────────
function Tarjeta({ titulo, descripcion, precio, destacado = false, onComprar }: TarjetaProps) {
  return (
    <div className={destacado ? "tarjeta destacada" : "tarjeta"}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <span>{precio}€</span>
      <button onClick={() => onComprar(titulo)}>Comprar</button>
    </div>
  );
}

// ── useState con tipos ───────────────────────────────────
function Carrito() {
  const [items, setItems]   = useState<string[]>([]);    // array de strings
  const [total, setTotal]   = useState<number>(0);
  const [abierto, setAbierto] = useState(false);         // infiere boolean

  function añadir(nombre: string): void {
    setItems(prev => [...prev, nombre]);
  }

  // ── Evento tipado ──────────────────────────────────────
  function handleBusqueda(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.value);  // TypeScript sabe que value es string
  }

  return (
    <div>
      <input onChange={handleBusqueda} placeholder="Buscar..." />
      <Tarjeta
        titulo="Teclado mecánico"
        descripcion="Switch Cherry MX Red"
        precio={89.99}
        destacado
        onComprar={añadir}
      />
      <p>Items en el carrito: {items.length}</p>
    </div>
  );
}`,
    },
    ejercicio: {
      enunciado: 'Crea un componente React tipado llamado "ContadorConHistorial". Debe tener: un estado numérico para el contador actual, un estado array de números para guardar el historial de valores. Cada vez que el usuario pulse "Incrementar", el contador sube 1 y el valor actual se añade al historial. Añade también un botón "Resetear" que pone el contador a 0 y limpia el historial. Tipas correctamente todos los estados, el retorno del componente y los handlers de los botones.',
      pista: 'El historial es un useState<number[]>([]). Para añadir el valor actual al historial antes de actualizarlo: setHistorial(prev => [...prev, contador]). El tipo de retorno del componente es React.ReactElement o simplemente JSX.Element.',
      solucion: `import { useState } from 'react';

function ContadorConHistorial(): JSX.Element {
  const [contador, setContador]     = useState<number>(0);
  const [historial, setHistorial]   = useState<number[]>([]);

  function incrementar(): void {
    setHistorial(prev => [...prev, contador]);
    setContador(prev => prev + 1);
  }

  function resetear(): void {
    setContador(0);
    setHistorial([]);
  }

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={resetear}>Resetear</button>

      <h3>Historial</h3>
      <ul>
        {historial.map((valor, index) => (
          <li key={index}>Paso {index + 1}: {valor}</li>
        ))}
      </ul>
    </div>
  );
}`,
    },
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function TypeScriptPage() {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [completados, setCompletados]   = useState<number[]>([]);
  const [mostrarSolucion, setMostrarSolucion]   = useState(false);
  const [mostrarEjercicio, setMostrarEjercicio] = useState(false);

  const modulo   = modulos[moduloActivo];
  const progreso = Math.round((completados.length / modulos.length) * 100);

  function marcarCompletado(id: number) {
    if (!completados.includes(id)) setCompletados([...completados, id]);
  }

  function irSiguiente() {
    marcarCompletado(modulo.id);
    setMostrarSolucion(false);
    setMostrarEjercicio(false);
    if (moduloActivo < modulos.length - 1) {
      setModuloActivo(moduloActivo + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function seleccionarModulo(index: number) {
    setModuloActivo(index);
    setMostrarSolucion(false);
    setMostrarEjercicio(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="ts-page">
      <div className="ts-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="ts-sidebar">
          <button className="btn-back-sidebar ts-back" onClick={() => navigate('/programacion/codigo')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className="ts-logo">
              <span>TS</span>
            </div>
            <div>
              <h2 className="sidebar-title">TypeScript</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className="ts-pct">{progreso}%</span>
            </div>
            <div className="progreso-bar">
              <div className="ts-fill" style={{ width: `${progreso}%` }} />
            </div>
            <p className="progreso-info">{completados.length} de {modulos.length} completados</p>
          </div>

          <nav className="modulos-nav">
            {modulos.map((m, index) => {
              const completado = completados.includes(m.id);
              const activo     = moduloActivo === index;
              return (
                <button
                  key={m.id}
                  className={`modulo-btn ${activo ? 'ts-activo' : ''} ${completado ? 'ts-completado' : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className={`modulo-num ${activo ? 'ts-num-activo' : ''} ${completado ? 'ts-num-done' : ''}`}>
                    {completado
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      : m.id}
                  </span>
                  <span className="modulo-nombre">{m.titulo}</span>
                  <span className="modulo-duracion">{m.duracion}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Contenido ───────────────────────────── */}
        <div className="ts-content">

          <header className="modulo-header">
            <div className="modulo-meta">
              <span className="ts-badge">Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className="ts-titulo">{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className="ts-glow" />

          {/* Teoría */}
          <section className="seccion">
            <div className="ts-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Teoría
            </div>
            <div className="teoria-body">
              {modulo.teoria.split('\n\n').map((p, i) => (
                <p key={i} className="teoria-parrafo">{p}</p>
              ))}
            </div>
          </section>

          {/* Código */}
          <section className="seccion">
            <div className="ts-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Ejemplo de código
            </div>
            <div className="ts-codigo-block">
              <div className="codigo-header">
                <div className="codigo-dots">
                  <span /><span /><span />
                </div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className="ts-lang">{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="ts-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          {/* Ejercicio */}
          <section className="seccion">
            <div className="ts-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>
            <div className={`ts-ejercicio ${mostrarEjercicio ? 'ts-abierto' : ''}`}>
              {!mostrarEjercicio ? (
                <button className="ejercicio-reveal ts-reveal" onClick={() => setMostrarEjercicio(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Ver ejercicio
                </button>
              ) : (
                <>
                  <p className="ejercicio-enunciado">{modulo.ejercicio.enunciado}</p>
                  <div className="ts-pista">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3178c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span><strong>Pista:</strong> {modulo.ejercicio.pista}</span>
                  </div>
                  {!mostrarSolucion ? (
                    <button className="btn-solucion ts-btn-sol" onClick={() => setMostrarSolucion(true)}>
                      Mostrar solución
                    </button>
                  ) : (
                    <div className="solucion-block">
                      <p className="ts-sol-label">Solución</p>
                      <pre className="ts-pre ts-solucion-pre"><code>{modulo.ejercicio.solucion}</code></pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Navegación */}
          <div className="modulo-footer">
            {moduloActivo > 0 && (
              <button className="btn-nav btn-prev" onClick={() => seleccionarModulo(moduloActivo - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Módulo anterior
              </button>
            )}
            <button className="btn-nav ts-btn-next" onClick={irSiguiente}>
              {moduloActivo < modulos.length - 1 ? (
                <>Marcar y continuar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>Completar curso</>
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}