import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReactPage.css';

// ─── Datos del curso ────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: '¿Qué es React y cómo funciona?',
    descripcion: 'La idea central de React: componentes, el DOM virtual y por qué cambió el desarrollo web.',
    duracion: '15 min',
    teoria: `React es una biblioteca JavaScript creada por Facebook en 2013 para construir interfaces de usuario. La idea central es simple pero poderosa: en lugar de manipular el HTML directamente, describes cómo quieres que se vea la interfaz en cada momento, y React se encarga de actualizar solo las partes que han cambiado.

El problema que resuelve: en una aplicación web tradicional, cuando algo cambia (un usuario hace clic, llegan datos nuevos…) tienes que encontrar el elemento HTML correcto y modificarlo manualmente. Esto se vuelve caótico en aplicaciones grandes con cientos de elementos interactivos.

La solución de React: el DOM Virtual. React mantiene una copia ligera del HTML en memoria. Cuando algo cambia, compara la copia anterior con la nueva, calcula el mínimo número de cambios necesarios y solo entonces actualiza el navegador. Esto lo hace muy eficiente.

El concepto clave es el COMPONENTE: una función JavaScript que devuelve HTML (en realidad JSX, que veremos enseguida). Los componentes son como piezas de LEGO reutilizables. Puedes tener un componente Botón que uses en toda la aplicación, y si cambias su diseño en un solo sitio, cambia en todas partes.

React en 2025 se usa principalmente con:
— Vite como herramienta de desarrollo (rápido, moderno)
— TypeScript para tener tipos en los componentes
— React Router para navegar entre páginas
— Librerías de estado como Zustand o el propio Context API`,
    codigo: {
      titulo: 'Tu primer componente React',
      lenguaje: 'jsx',
      contenido: `// Un componente es una función que devuelve JSX
// JSX es HTML con superpoderes: puede contener JavaScript

function Saludo() {
  const nombre = "Ana";
  const hora   = new Date().getHours();

  // JavaScript normal dentro de la función
  const mensaje = hora < 12 ? "Buenos días" : "Buenas tardes";

  // El return devuelve JSX (parece HTML pero es JavaScript)
  return (
    <div className="tarjeta">        {/* className en vez de class */}
      <h1>{mensaje}, {nombre}!</h1>  {/* {} para insertar JS en JSX */}
      <p>Son las {hora}h.</p>
    </div>
  );
}

// Usar el componente es como escribir una etiqueta HTML propia
function App() {
  return (
    <div>
      <Saludo />   {/* ← así se usa un componente */}
      <Saludo />   {/* puedes usarlo las veces que quieras */}
    </div>
  );
}`,
    },
    ejercicio: {
      enunciado: 'Crea un componente llamado "TarjetaPerfil" que muestre el nombre de una persona, su profesión y un emoji de avatar. El componente no recibe props por ahora: pon los datos directamente como variables dentro de la función. Luego úsalo dos veces en App con datos distintos (cambia las variables).',
      pista: 'Declara las variables nombre, profesion y avatar dentro de la función del componente. Recuerda que en JSX los atributos de clase se llaman className, no class.',
      solucion: `function TarjetaPerfil() {
  const nombre     = "Carlos López";
  const profesion  = "Desarrollador Frontend";
  const avatar     = "👨‍💻";

  return (
    <div className="tarjeta-perfil">
      <span className="avatar">{avatar}</span>
      <h2>{nombre}</h2>
      <p>{profesion}</p>
    </div>
  );
}

// Para usarlo con datos distintos, lo normal es usar props
// (lo veremos en el siguiente módulo)
function App() {
  return (
    <div>
      <TarjetaPerfil />
    </div>
  );
}`,
    },
  },
  {
    id: 2,
    titulo: 'Props: datos de padre a hijo',
    descripcion: 'Cómo pasar información a los componentes para hacerlos reutilizables de verdad.',
    duracion: '20 min',
    teoria: `Las props (abreviatura de "properties") son la forma de pasar datos de un componente padre a un componente hijo. Son como los parámetros de una función: el componente los recibe y los usa para decidir qué mostrar.

La regla más importante de las props: son de solo lectura. Un componente hijo nunca debe modificar las props que recibe. Si necesita cambiar algo, lo comunica al padre a través de una función que el padre le pasa como prop (también llamado "callback").

Este flujo de datos en una sola dirección (siempre de padre a hijo) se llama "one-way data flow" y es uno de los principios fundamentales de React. Hace que sea mucho más fácil rastrear de dónde vienen los datos y qué componente es responsable de qué.

Para pasar props, las escribes como atributos HTML en el JSX:
  <Componente nombre="Ana" edad={28} activo={true} />

Las strings se pasan entre comillas. Cualquier otra cosa (números, booleanos, objetos, funciones…) va entre llaves {}.

En el componente hijo, las props llegan como un objeto en el primer parámetro de la función. Normalmente se desestructuran directamente:
  function Componente({ nombre, edad, activo }) { ... }`,
    codigo: {
      titulo: 'Props en acción: componente reutilizable',
      lenguaje: 'jsx',
      contenido: `// Componente que recibe props
function TarjetaProducto({ nombre, precio, disponible, onComprar }) {
  return (
    <div className={disponible ? "tarjeta" : "tarjeta agotado"}>
      <h3>{nombre}</h3>
      <p>{precio}€</p>

      {/* Renderizado condicional con operador ternario */}
      {disponible
        ? <button onClick={onComprar}>Añadir al carrito</button>
        : <span>Agotado</span>
      }
    </div>
  );
}

// El padre pasa los datos como atributos
function Tienda() {
  function handleCompra() {
    alert("Producto añadido al carrito");
  }

  return (
    <div>
      <TarjetaProducto
        nombre="Teclado mecánico"
        precio={89.99}
        disponible={true}
        onComprar={handleCompra}
      />
      <TarjetaProducto
        nombre="Monitor 4K"
        precio={349}
        disponible={false}
        onComprar={handleCompra}
      />
    </div>
  );
}`,
    },
    ejercicio: {
      enunciado: 'Modifica el componente TarjetaPerfil del módulo anterior para que reciba las props: nombre (string), profesion (string), avatar (string) y destacado (boolean, opcional). Si destacado es true, añade la clase CSS "destacado" al div principal. Luego úsalo en App tres veces con datos distintos, marcando solo uno como destacado.',
      pista: 'Para la prop opcional con valor por defecto puedes desestructurar así: { nombre, profesion, avatar, destacado = false }. Para la clase condicional usa: className={destacado ? "tarjeta destacado" : "tarjeta"}.',
      solucion: `function TarjetaPerfil({ nombre, profesion, avatar, destacado = false }) {
  return (
    <div className={destacado ? "tarjeta-perfil destacado" : "tarjeta-perfil"}>
      <span className="avatar">{avatar}</span>
      <h2>{nombre}</h2>
      <p>{profesion}</p>
      {destacado && <span className="badge">⭐ Destacado</span>}
    </div>
  );
}

function App() {
  return (
    <div>
      <TarjetaPerfil nombre="Ana García"    profesion="Diseñadora UX" avatar="👩‍🎨" />
      <TarjetaPerfil nombre="Carlos López"  profesion="Dev Frontend"  avatar="👨‍💻" destacado />
      <TarjetaPerfil nombre="Marta Ruiz"    profesion="Data Scientist" avatar="👩‍🔬" />
    </div>
  );
}`,
    },
  },
  {
    id: 3,
    titulo: 'useState: el estado del componente',
    descripcion: 'Cómo hacer que tus componentes recuerden información y se actualicen solos.',
    duracion: '25 min',
    teoria: `El estado (state) es la memoria privada de un componente: datos que pueden cambiar con el tiempo y que, cuando cambian, provocan que el componente se vuelva a renderizar (actualice lo que muestra en pantalla).

La diferencia con las props es clave: las props vienen de fuera y no se pueden modificar. El estado es interno al componente y puede cambiar libremente usando la función que proporciona useState.

useState es un hook (función especial de React que "engancha" funcionalidades al componente). Devuelve siempre un array de dos elementos:
1. El valor actual del estado
2. Una función para actualizarlo

Regla fundamental: nunca modifiques el estado directamente. Siempre usa la función setter. React necesita saber cuándo cambia el estado para volver a renderizar el componente. Si modificas el valor directamente, React no se entera y la pantalla no se actualiza.

Cuando el nuevo estado depende del anterior (como incrementar un contador), usa la forma funcional del setter: setContador(prev => prev + 1). Esto garantiza que siempre trabajas con el valor más reciente, especialmente importante cuando hay múltiples actualizaciones seguidas.`,
    codigo: {
      titulo: 'useState: contador, toggle y formulario',
      lenguaje: 'jsx',
      contenido: `import { useState } from 'react';

// Ejemplo 1: Contador
function Contador() {
  const [cuenta, setCuenta] = useState(0);  // valor inicial: 0

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={() => setCuenta(prev => prev + 1)}>+1</button>
      <button onClick={() => setCuenta(prev => prev - 1)}>-1</button>
      <button onClick={() => setCuenta(0)}>Resetear</button>
    </div>
  );
}

// Ejemplo 2: Toggle (mostrar/ocultar)
function Acordeon({ titulo, contenido }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button onClick={() => setAbierto(prev => !prev)}>
        {titulo} {abierto ? "▲" : "▼"}
      </button>
      {abierto && <p>{contenido}</p>}  {/* solo renderiza si abierto es true */}
    </div>
  );
}

// Ejemplo 3: Formulario controlado
function FormularioNombre() {
  const [nombre, setNombre] = useState("");

  return (
    <div>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
      />
      {nombre && <p>Hola, {nombre}!</p>}
    </div>
  );
}`,
    },
    ejercicio: {
      enunciado: 'Crea un componente "ListaDeTareas" con estado. Debe tener: un input de texto donde el usuario escribe una tarea, un botón "Añadir" que añade la tarea a la lista y limpia el input, y una lista que muestra todas las tareas añadidas. Cada tarea debe tener un botón "✕" para eliminarla. Usa dos estados: uno para el texto del input y otro para el array de tareas.',
      pista: 'Para añadir: setTareas(prev => [...prev, textoInput]). Para eliminar por índice: setTareas(prev => prev.filter((_, i) => i !== indiceAEliminar)). Limpia el input después de añadir con setTexto("").',
      solucion: `import { useState } from 'react';

function ListaDeTareas() {
  const [texto, setTexto]   = useState("");
  const [tareas, setTareas] = useState([]);

  function añadir() {
    if (!texto.trim()) return;  // no añadir si está vacío
    setTareas(prev => [...prev, texto.trim()]);
    setTexto("");
  }

  function eliminar(indice) {
    setTareas(prev => prev.filter((_, i) => i !== indice));
  }

  return (
    <div>
      <div>
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => e.key === "Enter" && añadir()}
          placeholder="Nueva tarea..."
        />
        <button onClick={añadir}>Añadir</button>
      </div>

      <ul>
        {tareas.map((tarea, i) => (
          <li key={i}>
            {tarea}
            <button onClick={() => eliminar(i)}>✕</button>
          </li>
        ))}
      </ul>

      <p>{tareas.length} tarea(s) pendientes</p>
    </div>
  );
}`,
    },
  },
  {
    id: 4,
    titulo: 'useEffect: efectos secundarios',
    descripcion: 'Cómo sincronizar tu componente con el mundo exterior: APIs, timers y el DOM.',
    duracion: '25 min',
    teoria: `useEffect es el hook para manejar efectos secundarios: todo lo que ocurre fuera del renderizado puro. Llamadas a una API, timers, suscripciones, manipulación directa del DOM, etc.

El nombre viene de "side effects" (efectos secundarios). En React, un renderizado puro debería ser predecible: dados los mismos props y estado, siempre devuelve el mismo JSX. Pero a veces necesitas hacer cosas que tienen efectos en el mundo exterior. Para eso es useEffect.

La firma básica es:
  useEffect(() => {
    // código del efecto
  }, [dependencias]);

El segundo parámetro, el array de dependencias, controla cuándo se ejecuta el efecto:
— Sin array: se ejecuta después de cada renderizado (evitar, puede crear bucles infinitos)
— Array vacío []: se ejecuta solo una vez, cuando el componente aparece en pantalla
— [variable]: se ejecuta cuando esa variable cambia

La función de limpieza (cleanup): si tu efecto crea algo que hay que destruir (un timer, una suscripción, un listener), devuelve una función desde el efecto. React la ejecutará cuando el componente se desmonte o antes de volver a ejecutar el efecto.

El error más común: poner un fetch dentro de useEffect y no gestionar que el componente puede desmontarse antes de que la petición termine. Siempre verifica si el componente sigue montado antes de actualizar el estado.`,
    codigo: {
      titulo: 'useEffect: fetch, timer y limpieza',
      lenguaje: 'jsx',
      contenido: `import { useState, useEffect } from 'react';

// Ejemplo 1: Cargar datos de una API al montar el componente
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Se ejecuta una vez cuando el componente aparece
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(datos => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);  // [] → solo al montar

  if (cargando) return <p>Cargando...</p>;

  return (
    <ul>
      {usuarios.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Ejemplo 2: Efecto con dependencia + limpieza (cleanup)
function TituloActualizado({ texto }) {
  useEffect(() => {
    // Cambia el título de la pestaña del navegador
    document.title = texto;

    // Cleanup: restaura el título cuando el componente desaparece
    return () => {
      document.title = "Mi App";
    };
  }, [texto]);  // se ejecuta cada vez que 'texto' cambia

  return <h1>{texto}</h1>;
}

// Ejemplo 3: Timer con limpieza
function Reloj() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);  // limpia el timer
  }, []);

  return <p>Han pasado {segundos} segundos</p>;
}`,
    },
    ejercicio: {
      enunciado: 'Crea un componente "BuscadorGitHub" que tenga un input de texto para escribir un nombre de usuario de GitHub. Cuando el usuario deje de escribir durante 500ms (debounce), hace una petición a la API de GitHub (https://api.github.com/users/NOMBRE) y muestra el nombre, el número de repositorios públicos y el avatar del usuario. Si el usuario no existe, muestra un mensaje de error.',
      pista: 'Necesitas tres estados: username (el texto del input), userData (el resultado de la API) y error. Para el debounce usa un useEffect con setTimeout que devuelva clearTimeout como cleanup. El efecto depende de [username].',
      solucion: `import { useState, useEffect } from 'react';

function BuscadorGitHub() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (!username.trim()) {
      setUserData(null);
      setError("");
      return;
    }

    // Debounce: espera 500ms antes de hacer la petición
    const timer = setTimeout(() => {
      setError("");
      fetch(\`https://api.github.com/users/\${username}\`)
        .then(res => {
          if (!res.ok) throw new Error("Usuario no encontrado");
          return res.json();
        })
        .then(data => setUserData(data))
        .catch(err => {
          setUserData(null);
          setError(err.message);
        });
    }, 500);

    return () => clearTimeout(timer);  // limpia si el usuario sigue escribiendo
  }, [username]);

  return (
    <div>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Usuario de GitHub..."
      />
      {error    && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} width={80} alt="avatar" />
          <h3>{userData.name}</h3>
          <p>{userData.public_repos} repositorios públicos</p>
        </div>
      )}
    </div>
  );
}`,
    },
  },
  {
    id: 5,
    titulo: 'React Router: navegación entre páginas',
    descripcion: 'Crea aplicaciones multipágina con React Router: rutas, parámetros y navegación.',
    duracion: '30 min',
    teoria: `React Router es la librería estándar para añadir navegación a una aplicación React. Sin ella, React solo renderiza una única "pantalla" y no hay forma de tener URLs distintas para distintas vistas.

La idea central: en lugar de que el servidor devuelva páginas HTML diferentes para cada URL, React Router intercepta los cambios de URL en el navegador y muestra u oculta componentes según la ruta. Todo ocurre en el cliente, sin recargas. Esto se llama SPA (Single Page Application).

Los componentes principales que ya estás usando en este proyecto:

BrowserRouter — envuelve toda la aplicación y activa el sistema de rutas. Solo hay uno por app.

Routes + Route — definen qué componente se muestra para cada URL. Ya lo tienes en tu App.tsx.

Link y NavLink — en lugar de usar etiquetas <a href="...">, usas <Link to="...">. La diferencia es que Link no recarga la página, solo actualiza la URL y el componente.

useNavigate — el hook que ya usas con navigate('/ruta') para navegar programáticamente (después de un clic en un botón, por ejemplo).

useParams — para leer parámetros dinámicos de la URL, como el id en /productos/:id.

useLocation — para leer la URL actual, los query params, etc.`,
    codigo: {
      titulo: 'React Router: rutas, Links y parámetros',
      lenguaje: 'jsx',
      contenido: `import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';

// ── Componente de navegación ────────────────────────────
function Nav() {
  return (
    <nav>
      {/* NavLink añade la clase "active" automáticamente a la ruta actual */}
      <NavLink to="/"         className={({ isActive }) => isActive ? "activo" : ""}>Inicio</NavLink>
      <NavLink to="/productos"className={({ isActive }) => isActive ? "activo" : ""}>Productos</NavLink>
    </nav>
  );
}

// ── Ruta con parámetro dinámico ─────────────────────────
function DetalleProducto() {
  const { id } = useParams();  // lee el :id de la URL
  const navigate = useNavigate();

  return (
    <div>
      <h1>Producto #{id}</h1>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <button onClick={() => navigate('/productos')}>Ver todos</button>
    </div>
  );
}

// ── App con estructura de rutas ─────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"                  element={<Inicio />} />
        <Route path="/productos"         element={<ListaProductos />} />
        <Route path="/productos/:id"     element={<DetalleProducto />} />
        <Route path="*"                  element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Desde ListaProductos navegas al detalle con Link:
// <Link to={\`/productos/\${producto.id}\`}>{producto.nombre}</Link>`,
    },
    ejercicio: {
      enunciado: 'Crea una mini aplicación con React Router que tenga tres páginas: Inicio (muestra un título y un botón para ir al catálogo), Catálogo (muestra una lista de 3 productos con nombre y precio, cada uno con un Link al detalle), y Detalle (usa useParams para leer el id del producto y muestra los datos de ese producto). Los datos de los productos los defines como un array en un archivo o directamente en el componente.',
      pista: 'Define los productos como: const productos = [{ id: 1, nombre: "...", precio: ... }, ...]. En el componente Detalle, usa: const { id } = useParams() y luego productos.find(p => p.id === Number(id)) para encontrar el producto correcto.',
      solucion: `import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const productos = [
  { id: 1, nombre: "Teclado mecánico", precio: 89.99,  desc: "Switch Cherry MX Red, retroiluminado RGB." },
  { id: 2, nombre: "Ratón inalámbrico", precio: 49.99, desc: "2.4GHz, 6 botones, batería 60 horas." },
  { id: 3, nombre: "Webcam HD",         precio: 35.00, desc: "1080p, micrófono integrado, clip universal." },
];

function Inicio() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Bienvenido a la tienda</h1>
      <button onClick={() => navigate('/catalogo')}>Ver catálogo</button>
    </div>
  );
}

function Catalogo() {
  return (
    <div>
      <h1>Catálogo</h1>
      {productos.map(p => (
        <div key={p.id}>
          <span>{p.nombre} — {p.precio}€</span>
          <Link to={\`/catalogo/\${p.id}\`}> Ver detalle →</Link>
        </div>
      ))}
    </div>
  );
}

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p.id === Number(id));

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1>{producto.nombre}</h1>
      <p>{producto.desc}</p>
      <strong>{producto.precio}€</strong>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Inicio />} />
        <Route path="/catalogo"     element={<Catalogo />} />
        <Route path="/catalogo/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    },
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function ReactPage() {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo]         = useState(0);
  const [completados, setCompletados]           = useState<number[]>([]);
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
    <main className="react-page">
      <div className="react-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="react-sidebar">
          <button className="btn-back-sidebar react-back" onClick={() => navigate('/programacion/codigo')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className="react-logo">⚛</div>
            <div>
              <h2 className="sidebar-title">React</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className="react-pct">{progreso}%</span>
            </div>
            <div className="progreso-bar">
              <div className="react-fill" style={{ width: `${progreso}%` }} />
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
                  className={`modulo-btn ${activo ? 'react-activo' : ''} ${completado ? 'react-completado' : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className={`modulo-num ${activo ? 'react-num-activo' : ''} ${completado ? 'react-num-done' : ''}`}>
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
        <div className="react-content">

          <header className="modulo-header">
            <div className="modulo-meta">
              <span className="react-badge">Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className="react-titulo">{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className="react-glow" />

          {/* Teoría */}
          <section className="seccion">
            <div className="react-label">
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
            <div className="react-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Ejemplo de código
            </div>
            <div className="react-codigo-block">
              <div className="codigo-header">
                <div className="codigo-dots"><span /><span /><span /></div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className="react-lang">{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="react-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          {/* Ejercicio */}
          <section className="seccion">
            <div className="react-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>
            <div className={`react-ejercicio ${mostrarEjercicio ? 'react-abierto' : ''}`}>
              {!mostrarEjercicio ? (
                <button className="ejercicio-reveal react-reveal" onClick={() => setMostrarEjercicio(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Ver ejercicio
                </button>
              ) : (
                <>
                  <p className="ejercicio-enunciado">{modulo.ejercicio.enunciado}</p>
                  <div className="react-pista">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span><strong>Pista:</strong> {modulo.ejercicio.pista}</span>
                  </div>
                  {!mostrarSolucion ? (
                    <button className="btn-solucion react-btn-sol" onClick={() => setMostrarSolucion(true)}>
                      Mostrar solución
                    </button>
                  ) : (
                    <div className="solucion-block">
                      <p className="react-sol-label">Solución</p>
                      <pre className="react-pre react-solucion-pre"><code>{modulo.ejercicio.solucion}</code></pre>
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
            <button className="btn-nav react-btn-next" onClick={irSiguiente}>
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