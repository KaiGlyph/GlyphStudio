import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PythonPage.css';

// ─── Datos del curso ────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: 'Introducción a Python',
    descripcion: 'Qué es Python, para qué sirve y cómo ejecutar tu primer programa.',
    duracion: '15 min',
    teoria: `Python es un lenguaje de programación creado en 1991 por Guido van Rossum. Su nombre no viene de la serpiente, sino del programa de humor británico "Monty Python's Flying Circus".

Es uno de los lenguajes más usados del mundo por tres razones principales:

1. Su sintaxis es muy cercana al inglés natural, lo que lo hace fácil de leer y aprender.
2. Es multiusos: sirve para desarrollo web, análisis de datos, inteligencia artificial, automatización y más.
3. Tiene una comunidad enorme y miles de librerías gratuitas listas para usar.

Para ejecutar Python necesitas instalarlo desde python.org y luego puedes escribir código en un archivo .py o directamente en la terminal usando el comando "python".`,
    codigo: {
      titulo: 'Tu primer programa en Python',
      lenguaje: 'python',
      contenido: `# El programa más clásico para empezar
print("Hola, mundo!")

# print() muestra texto en la pantalla
# El texto va siempre entre comillas

# También puedes hacer operaciones matemáticas
print(2 + 3)      # Resultado: 5
print(10 / 2)     # Resultado: 5.0
print(2 ** 8)     # Resultado: 256 (2 elevado a 8)`,
    },
    ejercicio: {
      enunciado: 'Modifica el programa para que muestre tu nombre y tu edad en dos líneas separadas. Por ejemplo: "Me llamo Ana" y "Tengo 25 años".',
      pista: 'Usa dos instrucciones print(), una para cada línea.',
      solucion: `print("Me llamo Ana")
print("Tengo 25 años")`,
    },
  },
  {
    id: 2,
    titulo: 'Variables y Tipos de Datos',
    descripcion: 'Cómo guardar información y qué tipos de datos maneja Python.',
    duracion: '20 min',
    teoria: `Una variable es un nombre que le damos a un espacio en la memoria del ordenador donde guardamos un dato. Puedes imaginarla como una caja con una etiqueta: la etiqueta es el nombre de la variable y dentro de la caja está el valor.

En Python no necesitas declarar el tipo de la variable de antemano. Python lo detecta solo según el valor que le asignas. Esto se llama tipado dinámico.

Los tipos de datos más comunes son:
— int (entero): números sin decimales, como 5, -3 o 1000
— float (flotante): números con decimales, como 3.14 o -0.5
— str (cadena de texto): texto entre comillas, como "hola" o 'mundo'
— bool (booleano): solo dos valores posibles, True o False

Puedes cambiar el valor de una variable en cualquier momento simplemente reasignándola.`,
    codigo: {
      titulo: 'Variables en acción',
      lenguaje: 'python',
      contenido: `# Crear variables con distintos tipos
nombre = "Carlos"        # str  → texto
edad = 28                # int  → número entero
altura = 1.75            # float → número decimal
es_estudiante = True     # bool → verdadero o falso

# Mostrar los valores
print(nombre)            # Carlos
print(edad)              # 28
print(type(edad))        # <class 'int'> → nos dice el tipo

# Cambiar el valor de una variable
edad = 29
print(edad)              # 29

# Concatenar texto con variables
print("Me llamo " + nombre + " y tengo " + str(edad) + " años.")
# También puedes usar f-strings (más cómodo):
print(f"Me llamo {nombre} y tengo {edad} años.")`,
    },
    ejercicio: {
      enunciado: 'Crea tres variables: una con tu ciudad, otra con la temperatura actual en grados y otra con si está lloviendo (True/False). Luego imprime una frase usando las tres, por ejemplo: "En Barcelona hace 18.5 grados y está lloviendo: False".',
      pista: 'Usa un f-string para construir la frase de forma limpia.',
      solucion: `ciudad = "Barcelona"
temperatura = 18.5
lloviendo = False

print(f"En {ciudad} hace {temperatura} grados y está lloviendo: {lloviendo}")`,
    },
  },
  {
    id: 3,
    titulo: 'Condicionales',
    descripcion: 'Toma decisiones en tu código con if, elif y else.',
    duracion: '20 min',
    teoria: `Un condicional permite que tu programa tome decisiones: ejecuta un bloque de código solo si se cumple una condición. Es la base de cualquier lógica de programación.

La estructura básica es:
  if condición:
      (código si la condición es verdadera)
  else:
      (código si la condición es falsa)

La indentación (el espacio al principio de la línea) es obligatoria en Python. Usa 4 espacios o un tabulador. Si no indentas bien, el programa dará error.

Puedes encadenar varias condiciones con elif (abreviatura de "else if"). Python evalúa las condiciones de arriba a abajo y ejecuta solo el primer bloque cuya condición sea verdadera.

Los operadores de comparación más usados son:
  ==   igual a
  !=   distinto de
  >    mayor que
  <    menor que
  >=   mayor o igual que
  <=   menor o igual que`,
    codigo: {
      titulo: 'Condicionales con if / elif / else',
      lenguaje: 'python',
      contenido: `nota = 7.5

# Condicional simple
if nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")

# Condicional con múltiples ramas
if nota >= 9:
    print("Sobresaliente")
elif nota >= 7:
    print("Notable")
elif nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")

# Operadores lógicos: and, or, not
edad = 20
tiene_carnet = True

if edad >= 18 and tiene_carnet:
    print("Puede conducir")
else:
    print("No puede conducir")`,
    },
    ejercicio: {
      enunciado: 'Escribe un programa que reciba una temperatura (puedes ponerla directamente como variable) y clasifique el tiempo: menos de 0° es "Helada", entre 0 y 15° es "Fría", entre 15 y 25° es "Agradable" y más de 25° es "Calurosa".',
      pista: 'Necesitarás un if seguido de tres elif. Recuerda que Python evalúa las condiciones en orden.',
      solucion: `temperatura = 22

if temperatura < 0:
    print("Helada")
elif temperatura < 15:
    print("Fría")
elif temperatura < 25:
    print("Agradable")
else:
    print("Calurosa")`,
    },
  },
  {
    id: 4,
    titulo: 'Bucles',
    descripcion: 'Repite acciones con for y while sin escribir el mismo código varias veces.',
    duracion: '25 min',
    teoria: `Un bucle (o loop) repite un bloque de código varias veces. En lugar de escribir la misma instrucción diez veces, la escribes una vez dentro del bucle y le dices cuántas veces repetirla.

Python tiene dos tipos de bucle:

FOR — se usa cuando sabes cuántas veces quieres repetir, o cuando quieres recorrer una lista de elementos. La función range(n) genera una secuencia de números del 0 al n-1.

WHILE — se usa cuando no sabes cuántas veces necesitas repetir, sino que repites mientras se cumpla una condición. Hay que tener cuidado: si la condición nunca se vuelve falsa, el bucle se repite infinitamente.

Dentro de cualquier bucle puedes usar:
  break     → para salir del bucle antes de que termine
  continue  → para saltar a la siguiente iteración sin ejecutar el resto del código del bloque`,
    codigo: {
      titulo: 'Bucles for y while',
      lenguaje: 'python',
      contenido: `# Bucle FOR con range
for i in range(5):           # i toma valores 0, 1, 2, 3, 4
    print(f"Vuelta {i}")

# Recorrer una lista con for
frutas = ["manzana", "pera", "uva"]
for fruta in frutas:
    print(f"Fruta: {fruta}")

# Bucle WHILE
contador = 0
while contador < 3:
    print(f"Contador: {contador}")
    contador += 1            # equivale a: contador = contador + 1

# Uso de break: salir antes de tiempo
for numero in range(10):
    if numero == 5:
        break                # Para cuando llega a 5
    print(numero)            # Imprime 0, 1, 2, 3, 4`,
    },
    ejercicio: {
      enunciado: 'Escribe un programa que calcule la suma de todos los números del 1 al 100 usando un bucle for. El resultado debería ser 5050.',
      pista: 'Crea una variable "total = 0" antes del bucle y dentro del bucle ve sumando cada número con total += numero.',
      solucion: `total = 0

for numero in range(1, 101):   # range(1, 101) va del 1 al 100
    total += numero

print(f"La suma del 1 al 100 es: {total}")   # 5050`,
    },
  },
  {
    id: 5,
    titulo: 'Funciones',
    descripcion: 'Organiza tu código en bloques reutilizables con def.',
    duracion: '25 min',
    teoria: `Una función es un bloque de código con nombre que puedes ejecutar (llamar) cuando quieras. Sirve para dos cosas: evitar repetir el mismo código y dividir un programa grande en partes más pequeñas y manejables.

Para crear una función en Python usas la palabra clave def seguida del nombre y paréntesis:

  def nombre_funcion(parámetros):
      código de la función
      return resultado

Los parámetros son los datos que le pasas a la función cuando la llamas. El return devuelve un resultado. Si no pones return, la función devuelve None (nada).

Importante: las variables que creas dentro de una función solo existen dentro de ella. Esto se llama ámbito local (scope). Si necesitas que una variable esté disponible fuera de la función, debes devolver su valor con return.`,
    codigo: {
      titulo: 'Definir y usar funciones',
      lenguaje: 'python',
      contenido: `# Función sin parámetros
def saludar():
    print("¡Hola! Bienvenido al curso.")

saludar()   # Llamamos a la función

# Función con parámetros
def saludar_persona(nombre):
    print(f"¡Hola, {nombre}!")

saludar_persona("Ana")     # ¡Hola, Ana!
saludar_persona("Carlos")  # ¡Hola, Carlos!

# Función que devuelve un valor con return
def sumar(a, b):
    resultado = a + b
    return resultado

suma = sumar(3, 7)
print(suma)   # 10

# Parámetros con valor por defecto
def potencia(base, exponente=2):
    return base ** exponente

print(potencia(4))     # 16  → 4² (usa el valor por defecto)
print(potencia(2, 8))  # 256 → 2⁸`,
    },
    ejercicio: {
      enunciado: 'Crea una función llamada "calcular_imc" que reciba el peso (en kg) y la altura (en metros) y devuelva el Índice de Masa Corporal. La fórmula es: IMC = peso / altura². Luego llama a la función con tu peso y altura y muestra el resultado redondeado a 2 decimales con round().',
      pista: 'La potencia en Python se escribe con **: altura ** 2. Para redondear usa round(valor, 2).',
      solucion: `def calcular_imc(peso, altura):
    imc = peso / altura ** 2
    return round(imc, 2)

resultado = calcular_imc(70, 1.75)
print(f"Tu IMC es: {resultado}")   # Tu IMC es: 22.86`,
    },
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function PythonPage() {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [completados, setCompletados] = useState<number[]>([]);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [mostrarEjercicio, setMostrarEjercicio] = useState(false);

  const modulo = modulos[moduloActivo];
  const progreso = Math.round((completados.length / modulos.length) * 100);

  function marcarCompletado(id: number) {
    if (!completados.includes(id)) {
      setCompletados([...completados, id]);
    }
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
    <main className="python-page">
      <div className="python-layout">

        {/* ── Sidebar ────────────────────────────────── */}
        <aside className="python-sidebar">
          <button className="btn-back-sidebar" onClick={() => navigate('/programacion/codigo')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className="sidebar-logo">
              <span>Py</span>
            </div>
            <div>
              <h2 className="sidebar-title">Python</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className="progreso-pct">{progreso}%</span>
            </div>
            <div className="progreso-bar">
              <div className="progreso-fill" style={{ width: `${progreso}%` }} />
            </div>
            <p className="progreso-info">{completados.length} de {modulos.length} completados</p>
          </div>

          {/* Lista de módulos */}
          <nav className="modulos-nav">
            {modulos.map((m, index) => {
              const completado = completados.includes(m.id);
              const activo = moduloActivo === index;
              return (
                <button
                  key={m.id}
                  className={`modulo-btn ${activo ? 'activo' : ''} ${completado ? 'completado' : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className="modulo-num">
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

        {/* ── Contenido principal ────────────────────── */}
        <div className="python-content">

          {/* Cabecera del módulo */}
          <header className="modulo-header">
            <div className="modulo-meta">
              <span className="modulo-badge">Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className="modulo-titulo">{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className="modulo-glow" />

          {/* Teoría */}
          <section className="seccion">
            <div className="seccion-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Código de ejemplo */}
          <section className="seccion">
            <div className="seccion-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Ejemplo de código
            </div>
            <div className="codigo-block">
              <div className="codigo-header">
                <div className="codigo-dots">
                  <span /><span /><span />
                </div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className="codigo-lang">{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="codigo-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          {/* Ejercicio */}
          <section className="seccion">
            <div className="seccion-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>

            <div className={`ejercicio-card ${mostrarEjercicio ? 'abierto' : ''}`}>
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
                  <div className="pista-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <p className="solucion-label">Solución</p>
                      <pre className="codigo-pre solucion-pre"><code>{modulo.ejercicio.solucion}</code></pre>
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
            <button className="btn-nav btn-next" onClick={irSiguiente}>
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