import CoursePage from '../../../components/CoursePage/CoursePage';

// ─── Datos del curso TIA Portal ──────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: 'Introducción a TIA Portal',
    descripcion: 'Qué es TIA Portal, cómo se instala y cómo se organiza su entorno de trabajo.',
    duracion: '20 min',
    teoria: `TIA Portal (Totally Integrated Automation Portal) es el software de ingeniería de Siemens que permite programar, configurar y diagnosticar todos los dispositivos de automatización de la gama SIMATIC desde un único entorno. Fue introducido en 2010 como sucesor del clásico STEP 7 y WinCC flexible, unificando en una sola plataforma lo que antes requerían varios programas separados.

Desde TIA Portal puedes hacer todo el ciclo de un proyecto de automatización: configurar el hardware del PLC, escribir el programa de control, diseñar las pantallas HMI del operador, simular el comportamiento antes de conectar a la máquina real, cargar el programa al PLC y diagnosticar problemas en producción.

Las versiones más usadas actualmente son TIA Portal V17, V18 y V19. Cada versión añade soporte para nuevos hardware y funciones, pero la interfaz y los conceptos son los mismos. Para seguir este curso necesitas al menos TIA Portal V16.

El entorno de trabajo se divide en tres áreas principales:

Vista del portal — la pantalla de bienvenida donde creas o abres proyectos y accedes a las tareas principales de forma visual e intuitiva.

Vista del proyecto — el área de trabajo principal. A la izquierda tienes el árbol del proyecto con todos los dispositivos, bloques y pantallas. En el centro está el editor donde escribes código o diseñas pantallas. A la derecha hay un panel de propiedades e inspección.

Vista de redes — muestra todos los dispositivos del proyecto y cómo están conectados entre sí por red (PROFINET, Ethernet, etc.).`,
    codigo: {
      titulo: 'Estructura de un proyecto TIA Portal',
      lenguaje: 'tia',
      contenido: `Árbol de proyecto típico en TIA Portal:

  📁 Proyecto_Cinta_Transportadora
  │
  ├── 📟 PLC_1 [CPU 1214C DC/DC/DC]
  │   ├── 🔧 Configuración de dispositivos
  │   │     └── Tabla de variables PLC (I/O asignadas)
  │   │
  │   ├── 📂 Bloques de programa
  │   │   ├── OB1  — Main (ciclo de scan principal)
  │   │   ├── OB100 — Startup (se ejecuta al arrancar)
  │   │   ├── FC1  — Control_Cinta (función sin memoria)
  │   │   ├── FB1  — Alarmas (función con memoria/DB)
  │   │   └── DB1  — Datos_Alarmas (bloque de datos)
  │   │
  │   └── 📋 Tablas de variables PLC
  │         ├── Entradas  (%I0.0 … %I1.7)
  │         └── Salidas   (%Q0.0 … %Q1.7)
  │
  ├── 🖥️  HMI_1 [KTP700 Basic]
  │   ├── Pantallas
  │   │   ├── Pantalla_Principal
  │   │   └── Pantalla_Alarmas
  │   └── Administración de alarmas
  │
  └── 🌐 Dispositivos y redes
        └── PROFINET: PLC_1 ←→ HMI_1`,
    },
    ejercicio: {
      enunciado: 'Abre TIA Portal y crea un nuevo proyecto llamado "Practica_01". Añade un PLC de la familia S7-1200 (CPU 1214C DC/DC/DC, referencia 6ES7 214-1AG40-0XB0). Navega por el árbol del proyecto e identifica dónde están los bloques de programa y la tabla de variables. ¿Qué bloque se crea automáticamente al añadir el PLC?',
      pista: 'Al añadir un S7-1200, TIA Portal crea automáticamente el bloque OB1 (Main). Este es el bloque de organización principal que se ejecuta de forma cíclica. También verás una carpeta "Bloques del sistema" con OBs de diagnóstico que Siemens añade automáticamente.',
      solucion: `Pasos para crear el proyecto:

  1. Abrir TIA Portal → "Crear nuevo proyecto"
     Nombre: Practica_01
     Ruta: elegir carpeta de trabajo

  2. Vista del portal → "Configurar un dispositivo"
     → "Agregar nuevo dispositivo"
     → Controladores → SIMATIC S7-1200
     → CPU 1214C DC/DC/DC
     → Versión de firmware: 4.4 (o la más reciente disponible)

  3. TIA Portal crea automáticamente:
     ✓ OB1 (Main) — bloque principal de ciclo
     ✓ Configuración de hardware con la CPU
     ✓ Tabla de variables PLC vacía
     ✓ Carpeta de bloques del sistema

  4. Para ver el árbol completo:
     Vista del proyecto (botón abajo izq.) → expandir PLC_1
     → Bloques de programa → doble clic en OB1 para abrirlo

  El OB1 se ejecuta repetidamente (ciclo de scan):
  Lee entradas → Ejecuta OB1 → Escribe salidas → Repite`,
    },
  },
  {
    id: 2,
    titulo: 'Configuración de Hardware',
    descripcion: 'Cómo configurar una CPU S7-1200 o S7-1500, añadir módulos de expansión y asignar direcciones de E/S.',
    duracion: '25 min',
    teoria: `La configuración de hardware en TIA Portal es el paso previo a cualquier programación. Aquí defines exactamente qué CPU tienes, qué módulos de expansión están conectados y qué dirección de memoria del PLC corresponde a cada entrada y salida física.

La CPU S7-1200 tiene entradas y salidas integradas. Por ejemplo, la CPU 1214C tiene 14 entradas digitales (DI), 10 salidas digitales (DQ) y 2 entradas analógicas (AI) integradas. Puedes expandir añadiendo Signal Boards (SB, en la propia CPU) o Signal Modules (SM, a la derecha de la CPU).

La CPU S7-1500 es la gama alta: mayor velocidad de procesamiento, más memoria, soporte para Safety (SIL 3), mejor diagnóstico integrado y pantalla de display propia. Su estructura es similar pero más modular y con más opciones de comunicación.

El direccionamiento de E/S es automático en TIA Portal: cuando añades un módulo, el software asigna automáticamente las direcciones de byte. Puedes modificarlas manualmente si necesitas una asignación específica. Las entradas digitales empiezan en %I0.0, las salidas digitales en %Q0.0, y las analógicas en %IW64 o %QW64.

PROFINET es la red estándar de comunicación de Siemens. Cada dispositivo en la red PROFINET necesita un nombre de dispositivo único (device name) y una dirección IP. TIA Portal gestiona todo esto desde la vista de redes y permite hacer el "bautismo" (asignación del nombre) directamente desde el software conectando el portátil al PLC.`,
    codigo: {
      titulo: 'Tabla de direcciones E/S — CPU 1214C DC/DC/DC',
      lenguaje: 'tia',
      contenido: `Configuración hardware típica: CPU 1214C + 1 módulo DI/DQ

  ┌─────────────────────────────────────────────────────┐
  │  SLOT 0: CPU 1214C DC/DC/DC                         │
  │                                                     │
  │  Entradas digitales integradas (DI 14x24VDC):       │
  │  %I0.0 … %I0.7   → Byte 0 (8 entradas)             │
  │  %I1.0 … %I1.5   → Byte 1 (6 entradas)             │
  │                                                     │
  │  Salidas digitales integradas (DQ 10x24VDC/0.5A):   │
  │  %Q0.0 … %Q0.7   → Byte 0 (8 salidas)              │
  │  %Q1.0 … %Q1.1   → Byte 1 (2 salidas)              │
  │                                                     │
  │  Entradas analógicas integradas (AI 2x):            │
  │  %IW64  → Canal 0 (0-10V o 4-20mA)                 │
  │  %IW66  → Canal 1                                   │
  └─────────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────────┐
  │  SLOT 1: SM 1223 DI8/DQ8 (módulo expansión)        │
  │                                                     │
  │  %I2.0 … %I2.7   → 8 entradas digitales adicionales│
  │  %Q2.0 … %Q2.7   → 8 salidas digitales adicionales │
  └─────────────────────────────────────────────────────┘

  Tabla de variables PLC (asignación simbólica):
  ┌─────────────────┬──────────┬──────────┬────────────┐
  │ Nombre          │ Dirección│ Tipo     │ Comentario │
  ├─────────────────┼──────────┼──────────┼────────────┤
  │ S_START         │ %I0.0    │ Bool     │ Pulsador ON │
  │ S_STOP          │ %I0.1    │ Bool     │ Pulsador OFF│
  │ S_EMERGENCIA    │ %I0.2    │ Bool     │ E-Stop NC  │
  │ SENSOR_PIEZA    │ %I0.3    │ Bool     │ Fotocélula │
  │ KM_MOTOR        │ %Q0.0    │ Bool     │ Contactor  │
  │ PILOTO_VERDE    │ %Q0.1    │ Bool     │ Luz marcha │
  │ PILOTO_ROJO     │ %Q0.2    │ Bool     │ Luz parada │
  │ VELOCIDAD_REF   │ %QW64    │ Word     │ Variador   │
  └─────────────────┴──────────┴──────────┴────────────┘`,
    },
    ejercicio: {
      enunciado: 'En el proyecto Practica_01, abre la configuración de hardware de la CPU 1214C. Identifica cuántas entradas y salidas digitales tiene integradas. Luego añade un módulo de expansión SM 1222 DQ16 (16 salidas digitales) en el slot 1. ¿En qué dirección empieza el byte de salidas del módulo añadido? Crea la tabla de variables con al menos 4 entradas y 4 salidas con nombres descriptivos.',
      pista: 'Para ver las direcciones: doble clic en la CPU → pestaña "Descripción general de E/S". El módulo SM 1222 en slot 1 normalmente empieza en %Q2.0 porque los bytes 0 y 1 ya los usa la CPU integrada. En la tabla de variables, usa nombres sin espacios y con guiones bajos (S_START, KM_MOTOR...).',
      solucion: `CPU 1214C DC/DC/DC — E/S integradas:
  • 14 entradas digitales: %I0.0 a %I1.5
  • 10 salidas digitales:  %Q0.0 a %Q1.1
  • 2 entradas analógicas: %IW64, %IW66

  SM 1222 DQ16 en Slot 1:
  • Dirección inicio: %Q2.0
  • Rango: %Q2.0 a %Q3.7 (16 salidas = 2 bytes)

  Tabla de variables propuesta:
  ┌──────────────────┬──────────┬──────┐
  │ S_MARCHA         │ %I0.0    │ Bool │
  │ S_PARO           │ %I0.1    │ Bool │
  │ S_EMERGENCIA     │ %I0.2    │ Bool │
  │ SENSOR_NIVEL     │ %I0.3    │ Bool │
  │ MOTOR_BOMBA      │ %Q0.0    │ Bool │
  │ VALVULA_ENTRADA  │ %Q0.1    │ Bool │
  │ VALVULA_SALIDA   │ %Q0.2    │ Bool │
  │ PILOTO_MARCHA    │ %Q0.3    │ Bool │
  └──────────────────┴──────────┴──────┘`,
    },
  },
  {
    id: 3,
    titulo: 'Bloques de Programa: OB, FC y FB',
    descripcion: 'Entiende la diferencia entre bloques de organización, funciones y funciones de bloque para estructurar tu programa correctamente.',
    duracion: '30 min',
    teoria: `TIA Portal organiza el programa del PLC en bloques, cada uno con un propósito diferente. Elegir el tipo correcto de bloque es fundamental para hacer programas estructurados, reutilizables y fáciles de mantener.

OB (Organisation Block, Bloque de Organización) — son los bloques que el sistema operativo del PLC llama automáticamente. No los llamas tú desde el programa: el PLC los ejecuta en respuesta a eventos. Los más importantes son:

OB1 (Main) — se ejecuta cíclicamente, una vez por scan. Es el bloque principal donde arranca la ejecución del programa.
OB100 (Startup) — se ejecuta una única vez al arrancar el PLC o al pasar de STOP a RUN. Ideal para inicializar variables.
OB30-OB38 (Alarma cíclica) — se ejecutan cada X milisegundos, independientemente del OB1. Para tareas de tiempo crítico.
OB80-OB87 (Alarmas de error) — se ejecutan cuando ocurre un error en el PLC.

FC (Function, Función) — bloque de código reutilizable SIN memoria propia. Los datos que necesita los recibe como parámetros de entrada y devuelve resultados como parámetros de salida. Cuando termina, no guarda nada. Ideal para cálculos y lógicas sin estado.

FB (Function Block, Bloque de Función) — igual que FC pero CON memoria propia. Cada vez que llamas a un FB debes asociarle un DB de instancia (bloque de datos) donde se guardan sus variables internas entre ciclos. Ideal para controlar motores, válvulas u otros elementos que tienen un estado que debe persistir.

DB (Data Block, Bloque de Datos) — almacén de datos. No contiene código, solo variables. Hay DBs globales (accesibles desde cualquier bloque) y DBs de instancia (asociados a un FB específico).`,
    codigo: {
      titulo: 'Estructura de OB1, FC y FB con su DB',
      lenguaje: 'tia',
      contenido: `OB1 — Main (llama a los demás bloques):
  ┌─────────────────────────────────────────────┐
  │ OB1 [Ladder]                                │
  │                                             │
  │ Red 1: Llamada a FC de control de cinta     │
  │  ──────────────[FC1 "Control_Cinta"]──────  │
  │                 EN     ENO                  │
  │  %I0.0 ────── S_START                       │
  │  %I0.1 ────── S_STOP                        │
  │               MOTOR ──── %Q0.0              │
  │                                             │
  │ Red 2: Llamada a FB de alarmas              │
  │  ──────────────[FB1 "Alarmas", DB1]───────  │
  │                 EN     ENO                  │
  │  %I0.3 ────── SENSOR                        │
  │               ALARM_OUT ── %Q0.2            │
  └─────────────────────────────────────────────┘

  FC1 — Control_Cinta (sin memoria, lógica pura):
  ┌─────────────────────────────────────────────┐
  │ Parámetros de entrada: S_START, S_STOP      │
  │ Parámetros de salida:  MOTOR                │
  │                                             │
  │ Red 1: Lógica de control                    │
  │ ──[S_START]──┬──[/S_STOP]──────────(MOTOR)─│
  │              └── [MOTOR] (automantenimiento)│
  └─────────────────────────────────────────────┘

  FB1 + DB1 — Alarmas (con memoria):
  ┌─────────────────────────────────────────────┐
  │ DB1 (instancia de FB1):                     │
  │  • T_Retardo (TON) — temporizador interno   │
  │  • Contador_Alarmas (Int) — persiste        │
  │  • Estado_Alarm (Bool) — persiste           │
  │                                             │
  │ → Las variables del DB1 mantienen su valor  │
  │   entre ciclos de scan                      │
  └─────────────────────────────────────────────┘`,
    },
    ejercicio: {
      enunciado: 'Crea en TIA Portal un FC llamado "Calcular_Porcentaje" que reciba dos parámetros de entrada: Valor_Actual (Int) y Valor_Maximo (Int), y devuelva un parámetro de salida Porcentaje (Real). La fórmula es: Porcentaje = (Valor_Actual * 100.0) / Valor_Maximo. Llama a este FC desde OB1 pasándole valores concretos y guarda el resultado en una variable del DB global.',
      pista: 'En TIA Portal, crea el FC desde: Bloques de programa → Agregar nuevo bloque → Función. El lenguaje puede ser Ladder o SCL (SCL es más cómodo para cálculos matemáticos). Para la conversión de Int a Real usa la instrucción INT_TO_REAL o CONV en Ladder.',
      solucion: `FC1 "Calcular_Porcentaje" en SCL:

  FUNCTION "Calcular_Porcentaje" : Void
  VAR_INPUT
    Valor_Actual  : Int;
    Valor_Maximo  : Int;
  END_VAR
  VAR_OUTPUT
    Porcentaje : Real;
  END_VAR

  BEGIN
    IF Valor_Maximo <> 0 THEN
      Porcentaje := INT_TO_REAL(Valor_Actual) * 100.0
                   / INT_TO_REAL(Valor_Maximo);
    ELSE
      Porcentaje := 0.0;  // Evitar división por cero
    END_IF;
  END_FUNCTION

  Llamada desde OB1 (Ladder):
  ──────────────[FC1 "Calcular_Porcentaje"]──────
                 EN           ENO
    MW10 ──── Valor_Actual
    MW12 ──── Valor_Maximo
               Porcentaje ──── DB_Global.Porc_Nivel

  DB_Global debe contener la variable:
  • Porc_Nivel : Real  (porcentaje del nivel del depósito)`,
    },
  },
  {
    id: 4,
    titulo: 'HMI con WinCC: pantallas de operador',
    descripcion: 'Diseña pantallas de operador con WinCC Basic para paneles KTP de Siemens.',
    duracion: '30 min',
    teoria: `HMI (Human-Machine Interface, Interfaz Hombre-Máquina) es la pantalla táctil o de teclas que el operador usa para controlar y supervisar la máquina. Siemens integra WinCC en TIA Portal para diseñar estas pantallas de forma que estén directamente conectadas a las variables del PLC sin necesidad de configuración adicional de comunicación.

Los paneles más usados de la gama Basic son los KTP (Key and Touch Panel): KTP400, KTP700 y KTP900 Basic. Son paneles táctiles con teclas de función físicas, pantalla de color y conexión PROFINET. Ideales para máquinas con presupuesto ajustado.

Para la gama Advanced (paneles más potentes con scripting VBScript, recetas, visor de tendencias, etc.) se usan los paneles Comfort y Unified, que también se programan desde TIA Portal.

El flujo de trabajo básico para crear una pantalla HMI es:

1. Añadir el panel HMI al proyecto y conectarlo al PLC en la vista de redes.
2. Hacer la compilación de conexiones (TIA Portal genera automáticamente las variables HMI que apuntan a las variables del PLC).
3. Diseñar las pantallas: arrastrar objetos (botones, campos de texto, indicadores, barras) desde la librería.
4. Vincular cada objeto a una variable del PLC: un botón puede escribir un valor, un campo puede mostrar el valor actual de una variable.
5. Configurar alarmas: definir qué condiciones del PLC generan un mensaje de alarma en la pantalla.
6. Compilar y cargar al panel HMI.

La conexión entre el HMI y el PLC es por PROFINET. Ambos deben estar en la misma subred IP (por ejemplo, PLC: 192.168.0.1, HMI: 192.168.0.2, máscara: 255.255.255.0).`,
    codigo: {
      titulo: 'Configuración de pantalla HMI y variables vinculadas',
      lenguaje: 'tia',
      contenido: `Estructura típica de un proyecto HMI en TIA Portal:

  HMI_1 [KTP700 Basic, 7", PROFINET]
  │
  ├── Conexiones
  │   └── HMI_Conexion_1: HMI_1 ←PROFINET→ PLC_1
  │       IP HMI: 192.168.0.2
  │       IP PLC: 192.168.0.1
  │
  ├── Variables HMI (vinculadas al PLC)
  │   ┌────────────────┬──────────────────┬──────┐
  │   │ Nombre HMI     │ Variable PLC     │ Tipo │
  │   ├────────────────┼──────────────────┼──────┤
  │   │ Motor_Estado   │ PLC_1.KM_MOTOR   │ Bool │
  │   │ Nivel_Deposito │ PLC_1.DB1.Nivel  │ Int  │
  │   │ Btn_Marcha     │ PLC_1.S_HMI_ON   │ Bool │
  │   │ Btn_Paro       │ PLC_1.S_HMI_OFF  │ Bool │
  │   └────────────────┴──────────────────┴──────┘
  │
  ├── Pantallas
  │   ├── Pantalla_Principal
  │   │   ├── [Círculo] color=verde si Motor_Estado=1
  │   │   ├── [Barra]   valor=Nivel_Deposito, rango 0-100
  │   │   ├── [Botón]   "MARCHA" → Btn_Marcha=1 al pulsar
  │   │   └── [Botón]   "PARO"   → Btn_Paro=1 al pulsar
  │   └── Pantalla_Alarmas
  │       └── [Visor de alarmas] muestra alarmas activas
  │
  └── Administración de alarmas
      ├── Alarma 1: Nivel_Deposito < 10 → "Nivel bajo"
      └── Alarma 2: Motor_Estado=0 tras marcha → "Fallo motor"

  ─────────────────────────────────────────────────
  En el PLC, las variables de botones HMI se usan así:

  Red 1 — Marcha desde HMI o desde pulsador físico:
  ──[ ]──┬──[ ]──┬──[/]──────────────────( )──
   S_ON  │ S_HMI_ON│ S_STOP           MOTOR
         └──[ ]──┘   (el HMI y el botón
           MOTOR      físico tienen la misma
                      prioridad)`,
    },
    ejercicio: {
      enunciado: 'Añade un panel KTP700 Basic al proyecto Practica_01 y conéctalo al PLC por PROFINET. Crea una pantalla principal con: un indicador circular que muestre si el motor está en marcha (verde) o parado (rojo), un campo numérico que muestre el porcentaje calculado en el ejercicio anterior, y dos botones: MARCHA y PARO que escriban en variables Bool del PLC (%M0.0 y %M0.1 respectivamente). Configura una alarma que se active cuando el porcentaje supere el 90%.',
      pista: 'Para el indicador de color: selecciona el círculo → Animaciones → Apariencia → vincula "Color de fondo" a Motor_Estado con dos rangos: 0=rojo, 1=verde. Para los botones: Eventos → Pulsar → SetBit (para MARCHA) o ResetBit (para PARO).',
      solucion: `Pasos de configuración:

  1. Añadir KTP700 Basic:
     Árbol proyecto → Agregar nuevo dispositivo
     → HMI → SIMATIC Basic Panel → KTP700 Basic PN

  2. Conectar a PLC en vista de redes:
     Arrastrar cable PROFINET entre HMI_1 y PLC_1
     Asignar IPs: PLC=192.168.0.1, HMI=192.168.0.2

  3. Crear variables HMI:
     HMI_1 → Variables HMI → Agregar:
     • Motor_ON    → PLC_1 → %Q0.0  (Bool, lectura)
     • Porcentaje  → PLC_1 → DB1.Porc_Nivel (Real, lectura)
     • HMI_Marcha  → PLC_1 → %M0.0  (Bool, escritura)
     • HMI_Paro    → PLC_1 → %M0.1  (Bool, escritura)

  4. Diseñar Pantalla_Principal:
     • Círculo: Animaciones→Apariencia→Color de fondo
       Rango 0: #FF0000 (rojo)  Rango 1: #00CC00 (verde)
       Variable: Motor_ON
     • Campo E/S: Tipo=Salida, Variable=Porcentaje
       Formato: 3 dígitos, 1 decimal, sufijo "%"
     • Botón MARCHA: Eventos→Pulsar→SetBit→HMI_Marcha
     • Botón PARO:   Eventos→Pulsar→SetBit→HMI_Paro

  5. Alarma:
     Administración de alarmas → Alarmas de bit discretas
     → Agregar: Variable=Porcentaje, Límite=90.0
     Texto: "ATENCIÓN: Nivel superior al 90%"`,
    },
  },
  {
    id: 5,
    titulo: 'Diagnóstico y Puesta en Marcha',
    descripcion: 'Cómo cargar un programa al PLC, monitorizar variables en tiempo real y diagnosticar fallos.',
    duracion: '25 min',
    teoria: `La puesta en marcha (commissioning) es el proceso de cargar el programa en el PLC real, verificar que las E/S responden correctamente y ajustar parámetros hasta que la máquina funciona según las especificaciones. TIA Portal ofrece herramientas muy completas para este proceso.

COMPILAR — antes de cargar, siempre debes compilar el proyecto. La compilación verifica que no hay errores de sintaxis, que todas las variables están correctamente declaradas y que no hay inconsistencias de hardware. El panel de resultados mostrará errores (en rojo, impiden cargar) y advertencias (en amarillo, no impiden cargar pero conviene revisarlas).

CARGAR AL DISPOSITIVO — selecciona el PLC en el árbol → botón "Cargar en dispositivo". TIA Portal buscará el PLC en la red, mostrará las diferencias entre el proyecto y lo que hay en el PLC, y preguntará qué hacer con cada diferencia. Puedes cargar solo el hardware, solo el software o todo.

MODO ONLINE — al conectarte al PLC en modo online, puedes ver el estado en tiempo real de todas las variables. En el editor Ladder, los contactos y bobinas se colorean: verde cuando la condición es TRUE, gris cuando es FALSE. Esto permite seguir visualmente el flujo de "corriente lógica" mientras la máquina funciona.

TABLA DE OBSERVACIÓN (Watch Table) — crea una tabla con las variables que quieres monitorizar. Puedes ver su valor en tiempo real y también forzar valores (escribir un valor manualmente para probar sin necesidad de activar el sensor físico).

FORZADO PERMANENTE — permite fijar el valor de una entrada o salida independientemente del programa. Útil para probar actuadores sin necesidad de que el programa lo ordene. Usar con precaución en máquinas reales.

BÚFER DE DIAGNÓSTICO — el PLC registra los últimos eventos del sistema: arranques, paradas, errores de hardware, cambios de modo. Es lo primero que debes consultar cuando el PLC da un error que no entiendes.`,
    codigo: {
      titulo: 'Proceso de puesta en marcha paso a paso',
      lenguaje: 'tia',
      contenido: `FLUJO COMPLETO DE PUESTA EN MARCHA EN TIA PORTAL:

  ① COMPILAR
  ─────────────────────────────────────────────
  Menú → Compilar → Hardware y software (todo)
  ✓ Sin errores → podemos cargar
  ✗ Con errores → revisar panel "Resultados"

  Errores comunes:
  • "Variable no declarada" → revisar tabla de variables
  • "Tipo de datos incompatible" → revisar conexiones en bloques
  • "Dirección fuera de rango" → revisar config. hardware


  ② ESTABLECER CONEXIÓN ONLINE
  ─────────────────────────────────────────────
  Menú → Online → Conectar al dispositivo
  Tipo de interfaz: PN/IE (PROFINET / Industrial Ethernet)
  Interfaz: adaptador de red del portátil
  → TIA Portal busca PLCs en la red
  → Seleccionar PLC_1 → Conectar


  ③ CARGAR AL DISPOSITIVO
  ─────────────────────────────────────────────
  Botón "Cargar en dispositivo" (flecha abajo, azul)
  → Vista previa de carga: muestra diferencias
  → Acción para bloques modificados: "Cargar"
  → Acción para bloques eliminados: "Borrar en dispositivo"
  → CARGAR → PLC pasa a modo RUN automáticamente


  ④ MONITORIZACIÓN EN TIEMPO REAL
  ─────────────────────────────────────────────
  Abrir OB1 → Botón "Activar monitorización" (gafas)

  Vista en Ladder con monitorización activa:
  ──[verde]──┬──[verde]──[rojo/]────────(verde)──
    %I0.0=1  │  %Q0.0=1  %I0.1=0        %Q0.0=1
   (S_ON)    └──(sellos)  (S_OFF=0,OK)  (MOTOR=ON)

  Verde = TRUE  │  Gris = FALSE


  ⑤ TABLA DE OBSERVACIÓN (forzar variables)
  ─────────────────────────────────────────────
  Agregar nueva tabla de observación
  Añadir variables: %I0.0, %Q0.0, DB1.Nivel...
  → Ver valores en tiempo real
  → Columna "Valor de forzado" → forzar para pruebas
  → Botón "Forzar todo" → aplica los valores forzados


  ⑥ BÚFER DE DIAGNÓSTICO
  ─────────────────────────────────────────────
  Online → Diagnóstico del dispositivo
  → Búfer de diagnóstico → ver últimos 100 eventos
  Ejemplo de evento: "Error de E/S en slot 2 a las 14:32:05"`,
    },
    ejercicio: {
      enunciado: 'Si tienes acceso a un PLC S7-1200 real o al simulador PLCSIM de TIA Portal: Compila el proyecto Practica_01 sin errores, conéctate al PLC (o al simulador), carga el programa y activa la monitorización del OB1. Usa la tabla de observación para forzar %I0.0 a TRUE y verifica que %Q0.0 se activa según la lógica que programaste. Consulta el búfer de diagnóstico y anota qué eventos aparecen tras el arranque.',
      pista: 'Si no tienes PLC físico, activa PLCSIM desde TIA Portal: Online → Simular. PLCSIM crea un PLC virtual en tu PC. Para forzar entradas en PLCSIM puedes usar el panel SIM o la tabla de observación con forzado. El búfer de diagnóstico normalmente muestra el evento "PLC pasó a modo RUN" como primer registro.',
      solucion: `Pasos con PLCSIM (simulador):

  1. Activar simulador:
     Online → Simular → Se abre PLCSIM automáticamente
     El PLC virtual aparece en modo STOP

  2. Compilar y cargar:
     Compilar todo (sin errores) →
     Cargar en dispositivo → seleccionar PLCSIM
     → PLCSIM pasa a RUN

  3. Activar monitorización:
     Abrir OB1 → Botón gafas (monitorizar)
     → Los contactos y bobinas se colorean

  4. Tabla de observación:
     Agregar nueva tabla → añadir %I0.0 y %Q0.0
     → Columna "Valor de forzado" de %I0.0: TRUE
     → Botón "Forzar todo" (rayo)
     → %I0.0 pasa a verde (TRUE) en Ladder
     → Si la lógica es correcta, %Q0.0 también verde

  5. Búfer de diagnóstico (típico tras arranque):
     Evento 1: "CPU cambia a RUN" — timestamp
     Evento 2: "OB100 ejecutado" — inicialización
     Evento 3: "Carga correcta del programa"

  6. Para parar el forzado:
     Botón "Detener forzado" → %I0.0 vuelve a FALSE
     → %Q0.0 se desactiva (si no hay automantenimiento)`,
    },
  },
];

// ─── Componente simplificado ─────────────────────────────────────────────────

export default function TiaPortalPage() {
  return (
    <CoursePage
      courseId="tia"
      courseName="TIA Portal"
      courseLogo="TIA"
      modulos={modulos}
      backRoute="/programacion/ladder"
    />
  );
}