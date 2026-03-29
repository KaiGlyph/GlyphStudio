import CoursePage from '../../../components/CoursePage/CoursePage';

// ─── Datos del curso PLCs Industriales ───────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: '¿Qué es un PLC y para qué sirve?',
    descripcion: 'Qué es un Controlador Lógico Programable, cómo funciona internamente y dónde se usa en la industria.',
    duracion: '15 min',
    teoria: `Un PLC (Programmable Logic Controller, o Controlador Lógico Programable) es un ordenador industrial diseñado específicamente para controlar procesos en tiempo real. A diferencia de un PC convencional, está construido para sobrevivir en entornos industriales: temperaturas extremas, polvo, vibraciones, humedad y ruido eléctrico.

Fue inventado en 1968 por Dick Morley para sustituir los enormes paneles de relés eléctricos que controlaban las líneas de producción de General Motors. La idea era tener un sistema programable que pudiera modificarse sin cambiar el cableado físico.

Hoy en día los PLCs controlan prácticamente cualquier proceso industrial: cintas transportadoras, robots de soldadura, plantas de tratamiento de agua, ascensores, líneas de embotellado, semáforos inteligentes, plantas de energía y mucho más.

El funcionamiento interno de un PLC sigue siempre el mismo ciclo, llamado ciclo de scan:
1. LECTURA DE ENTRADAS — el PLC lee el estado de todos los sensores y señales conectadas a sus entradas y los copia en una zona de memoria llamada imagen de proceso de entradas.
2. EJECUCIÓN DEL PROGRAMA — ejecuta el programa Ladder (u otro lenguaje) de arriba a abajo, calculando las salidas en función de las entradas.
3. ESCRITURA DE SALIDAS — copia los resultados calculados a las salidas físicas: motores, válvulas, pilotos luminosos...
4. COMUNICACIONES y tareas del sistema — gestiona las comunicaciones con otros dispositivos.
5. VUELTA AL PASO 1 — el ciclo se repite típicamente cada 1-20 milisegundos.

Este ciclo continuo garantiza que el PLC siempre está respondiendo a los cambios del proceso en tiempo real.`,
    codigo: {
      titulo: 'Ciclo de scan y arquitectura interna de un PLC',
      lenguaje: 'plc',
      contenido: `ARQUITECTURA INTERNA DE UN PLC S7-1200:

  ┌─────────────────────────────────────────────────────┐
  │                    CPU (Procesador)                  │
  │                                                     │
  │  ┌──────────┐   ┌──────────┐   ┌──────────────┐   │
  │  │ Memoria  │   │ Programa │   │  Sistema     │   │
  │  │  de      │   │  de      │   │  Operativo   │   │
  │  │ trabajo  │   │  usuario │   │  (firmware)  │   │
  │  │ (RAM)    │   │  (Flash) │   │              │   │
  │  └──────────┘   └──────────┘   └──────────────┘   │
  └──────────────────────────────────────────────────-──┘
         │                                    │
  ┌──────┴──────┐                    ┌────────┴──────┐
  │  ENTRADAS   │                    │   SALIDAS     │
  │  (Inputs)   │                    │   (Outputs)   │
  │             │                    │               │
  │ %I0.0 ←──── Pulsador START      │ %Q0.0 ────→ Motor    │
  │ %I0.1 ←──── Pulsador STOP       │ %Q0.1 ────→ Válvula  │
  │ %I0.2 ←──── Sensor presencia    │ %Q0.2 ────→ Piloto   │
  │ %IW64 ←──── Sensor temperatura  │ %QW64 ────→ Variador │
  └─────────────┘                    └───────────────┘

  CICLO DE SCAN (se repite ~cada 10ms):
  ─────────────────────────────────────
  ① Leer %I → copiar estado sensores a memoria
  ② Ejecutar OB1 → calcular salidas según lógica
  ③ Escribir %Q → activar/desactivar actuadores
  ④ Comunicaciones → actualizar datos con HMI/SCADA
  ↺ Volver a ①

  Tiempo de ciclo típico:
  • S7-1200: 1 - 10 ms
  • S7-1500: 0.1 - 1 ms (10x más rápido)`,
    },
    ejercicio: {
      enunciado: 'Responde estas preguntas de comprensión: 1) ¿Por qué el PLC usa una "imagen de proceso" en lugar de leer directamente las entradas durante la ejecución del programa? 2) Si una señal de sensor cambia de estado durante la fase de ejecución del programa (paso 2 del scan), ¿cuándo lo detectará el PLC? 3) ¿Qué ventaja tiene el ciclo de scan para la consistencia del control?',
      pista: 'La imagen de proceso es una "fotografía" del estado de las entradas tomada al inicio de cada ciclo. Esto garantiza que durante toda la ejecución del programa, los datos son coherentes entre sí, aunque los sensores cambien mientras el programa se ejecuta.',
      solucion: `1) ¿Por qué usar imagen de proceso?
  Si el PLC leyera las entradas directamente durante la ejecución,
  una misma variable podría tener valores distintos en dos líneas
  del mismo programa (el sensor cambió entre medias).
  La imagen de proceso "congela" el estado al inicio del ciclo:
  todos los cálculos del programa trabajan con datos coherentes.

2) ¿Cuándo detecta el cambio?
  Si el sensor cambia durante el paso ② (ejecución):
  → El cambio NO se detecta en ese ciclo
  → Se detectará en el ① del ciclo SIGUIENTE
  → Retardo máximo = 1 tiempo de ciclo (~10ms en S7-1200)
  Este retardo es aceptable para la mayoría de procesos industriales.

3) Ventaja del ciclo de scan:
  → Determinismo: el comportamiento es predecible y repetible
  → Consistencia: todas las salidas se calculan con el mismo
     "snapshot" de entradas
  → Simplicidad de programación: el programador no necesita
     gestionar interrupciones ni concurrencia en la mayoría de casos
  → Fiabilidad: si el ciclo se alarga (sobrecarga), el watchdog
     detecta el problema y pone el PLC en estado seguro`,
    },
  },
  {
    id: 2,
    titulo: 'Tipos de PLCs y criterios de selección',
    descripcion: 'Gamas de PLCs Siemens, diferencias entre S7-1200 y S7-1500, y cómo elegir el modelo correcto para cada aplicación.',
    duracion: '20 min',
    teoria: `No todos los PLCs son iguales. La elección del modelo correcto depende del tamaño del proceso, la velocidad de respuesta necesaria, el número de señales de E/S y las funciones especiales que se necesiten. En Siemens, la gama SIMATIC S7 cubre desde aplicaciones pequeñas hasta plantas completas.

S7-1200 — el modelo de entrada y media gama. Compacto, económico y suficiente para la mayoría de aplicaciones: máquinas individuales, pequeñas líneas de producción, control de bombas y ventiladores. Integra E/S propias (hasta 14 DI + 10 DQ + 2 AI en la CPU 1214C) y se puede expandir. Soporta PROFINET, Modbus TCP y comunicación serie. Tiempo de ciclo típico: 1-10ms.

S7-1500 — la gama alta. Mayor velocidad de procesamiento (hasta 1ns por instrucción), más memoria, pantalla de display integrada para diagnóstico, soporte nativo para Safety (SIL 2/3), Motion Control integrado y capacidades de ciberseguridad avanzadas. Para grandes instalaciones, procesos de alta velocidad o cuando se necesita Safety certificado. Precio más elevado.

S7-300/400 — la gama clásica, actualmente en fin de vida (discontinuada). Aún muy presente en instalaciones antiguas, importante conocerla para mantenimiento.

ET 200SP — no es un PLC completo sino un sistema de periferia descentralizada: E/S remotas que se conectan por PROFINET al PLC principal. Permite distribuir las señales de E/S cerca de los actuadores y sensores, reduciendo el cableado.

Criterios de selección práctica:
— Número de E/S: ¿cuántos sensores y actuadores hay?
— Velocidad: ¿necesito respuestas en microsegundos (servos, control de posición) o milisegundos (cintas, bombas)?
— Safety: ¿hay riesgo para personas? → necesito PLC de seguridad certificado
— Presupuesto: S7-1200 es significativamente más económico
— Expansión futura: ¿el sistema puede crecer?`,
    codigo: {
      titulo: 'Comparativa S7-1200 vs S7-1500',
      lenguaje: 'plc',
      contenido: `TABLA COMPARATIVA: S7-1200 vs S7-1500

  Característica          │ S7-1200            │ S7-1500
  ────────────────────────┼────────────────────┼──────────────────────
  Velocidad proceso       │ 0.1 µs/instrucción │ 1 ns/instrucción
  Memoria trabajo         │ hasta 150 KB       │ hasta 20 MB
  Memoria programa        │ hasta 4 MB         │ hasta 32 MB
  E/S integradas          │ Sí (14DI+10DQ+2AI) │ No (modular)
  Módulos máx. expansión  │ 8 SM + 3 CM        │ hasta 32 módulos
  Display integrado       │ No                 │ Sí (diagnóstico)
  Safety integrado        │ Solo con F-CPU     │ Sí (variantes F)
  Motion Control          │ Básico (4 ejes)    │ Avanzado (sin límite)
  PROFINET                │ 1 puerto           │ 3 puertos (switch)
  OPC UA integrado        │ Desde V4.1         │ Sí nativo
  Precio referencial      │ ~300-800€/CPU      │ ~1.500-5.000€/CPU

  ─────────────────────────────────────────────────────────────
  GUÍA RÁPIDA DE SELECCIÓN:

  ¿Aplicación pequeña/mediana, presupuesto ajustado?
  → S7-1200 CPU 1214C o CPU 1215C

  ¿Control de servomotores o eje de posición complejo?
  → S7-1200 con TO (Technology Objects) o S7-1500T

  ¿Proceso con riesgo para personas (SIL requerido)?
  → S7-1200F (Safety) o S7-1500F (Safety avanzado)

  ¿Gran instalación, muchas E/S, alta velocidad?
  → S7-1500 + ET 200SP para E/S descentralizadas

  ¿Mantenimiento de instalación antigua S7-300?
  → STEP 7 clásico o migración a TIA Portal con S7-1500`,
    },
    ejercicio: {
      enunciado: 'Para cada uno de estos proyectos, decide qué PLC Siemens usarías y justifica la elección: A) Control de una bomba de riego con 3 sensores de nivel y 1 motor, sin personal permanente. B) Línea de producción de 120 ejes de posición CNC con tolerancia de 0.01mm. C) Sistema de seguridad en una prensa industrial donde un fallo puede lesionar al operario. D) Planta de tratamiento de agua con 200 señales de E/S distribuidas en 500m de instalación.',
      pista: 'Piensa en: número de E/S, velocidad necesaria, si hay Safety, si las señales están cerca o lejos del PLC. Para D, piensa en E/S descentralizadas para evitar kilómetros de cable.',
      solucion: `A) Control de bomba de riego (3 sensores + 1 motor):
  → S7-1200 CPU 1212C DC/DC/DC
  Justificación: proceso simple, pocas E/S (caben en la CPU
  integrada), bajo presupuesto, sin requisitos de Safety ni
  alta velocidad. La CPU 1212C tiene 8DI+6DQ+2AI integradas.

B) 120 ejes CNC con tolerancia 0.01mm:
  → S7-1500T (variante Technology) + drives SINAMICS
  Justificación: precisión de posicionamiento submilimétrico
  requiere Motion Control avanzado, tiempo de ciclo <1ms y
  sincronización de múltiples ejes. El S7-1200 no llega.

C) Prensa industrial con riesgo de lesión:
  → S7-1200F o S7-1500F (variante Safety, certificado SIL 2)
  Justificación: cuando hay riesgo para personas, la normativa
  ISO 13849 / IEC 62061 exige funciones de seguridad certificadas.
  Un PLC estándar NO es válido para estas aplicaciones.

D) Planta de agua con 200 E/S en 500 metros:
  → S7-1500 (CPU central) + ET 200SP (periferia distribuida)
  Justificación: distribuir las E/S con ET 200SP cerca de los
  equipos y conectarlas por PROFINET ahorra cientos de metros
  de cable. 200 señales en un solo bastidor central sería
  inviable logística y económicamente.`,
    },
  },
  {
    id: 3,
    titulo: 'Entradas y Salidas: digitales y analógicas',
    descripcion: 'Cómo conectar sensores y actuadores al PLC: señales digitales, analógicas, niveles de tensión y cableado básico.',
    duracion: '25 min',
    teoria: `Las entradas y salidas (E/S o I/O) son la interfaz física entre el PLC y el mundo real. Entender los tipos de señal y cómo se conectan es fundamental antes de programar nada.

ENTRADAS DIGITALES (DI) — reciben señales que solo tienen dos estados: 0 o 1, apagado o encendido. Un pulsador, un interruptor de fin de carrera, un sensor inductivo o un relé de protección son ejemplos. En el S7-1200, las entradas digitales funcionan a 24VDC: más de 15V se interpreta como 1 (TRUE), menos de 5V como 0 (FALSE).

SALIDAS DIGITALES (DQ) — envían señales de dos estados. Pueden ser de transistor (DC, más rápidas, para cargas resistivas/inductivas pequeñas) o de relé (AC/DC, para cargas más grandes pero más lentas). Un contactor, una electroválvula o una luz piloto se conectan a una salida digital.

ENTRADAS ANALÓGICAS (AI) — reciben señales continuas que representan una magnitud física: temperatura, presión, nivel, caudal. Los rangos más comunes son 0-10V y 4-20mA. El PLC convierte esta señal a un valor entero (típicamente 0-27648 en Siemens para el rango completo). La señal de 4-20mA es preferible en ambientes industriales porque el cable largo no degrada la señal y la rotura de cable (0mA) es detectable.

SALIDAS ANALÓGICAS (AQ) — envían una señal continua para controlar variadores de frecuencia, válvulas proporcionales o posicionadores. Mismos rangos que las entradas.

SENSORES PNP vs NPN — los sensores de proximidad e inductivos pueden ser PNP (fuente de corriente, el más común en Europa) o NPN (sumidero de corriente, más común en Asia). Los PLCs Siemens usan entradas tipo sumidero/fuente configurables.

PROTECCIÓN — siempre hay que proteger las salidas con fusibles y usar diodos de rueda libre en cargas inductivas (motores, solenoides) para proteger los transistores de salida de los picos de tensión al desconectar.`,
    codigo: {
      titulo: 'Tipos de señales E/S y rangos de conversión analógica',
      lenguaje: 'plc',
      contenido: `SEÑALES DIGITALES — niveles de tensión S7-1200:

  Entrada digital (24VDC):
  ├── Señal "1" (TRUE):  15V … 30V DC
  ├── Señal "0" (FALSE):  0V … 5V DC
  └── Zona muerta:        5V … 15V (evitar)

  Salida digital (transistor PNP, 24VDC/0.5A máx.):
  ├── ON:  24V DC en la salida
  └── OFF: 0V DC en la salida


  SEÑALES ANALÓGICAS — conversión a valor entero:

  Rango 0-10V DC:
  ┌──────────┬────────────┬──────────────────────────┐
  │ Tensión  │ Valor PLC  │ Ejemplo                  │
  ├──────────┼────────────┼──────────────────────────┤
  │   0 V    │     0      │ Nivel mínimo depósito    │
  │   5 V    │  13824     │ Nivel al 50%             │
  │  10 V    │  27648     │ Nivel máximo depósito    │
  └──────────┴────────────┴──────────────────────────┘

  Rango 4-20mA (industrial, preferido):
  ┌──────────┬────────────┬──────────────────────────┐
  │ Corriente│ Valor PLC  │ Ejemplo                  │
  ├──────────┼────────────┼──────────────────────────┤
  │   0 mA   │  -6912(*)  │ CABLE ROTO — alarma      │
  │   4 mA   │     0      │ Presión mínima (0 bar)   │
  │  12 mA   │  13824     │ Presión media (5 bar)    │
  │  20 mA   │  27648     │ Presión máxima (10 bar)  │
  └──────────┴────────────┴──────────────────────────┘
  (*) El valor negativo permite detectar cable roto

  Fórmula para convertir valor PLC → valor físico:
  Valor_real = (Valor_PLC / 27648) × Rango_máximo
  Ejemplo: PLC=13824, rango=100°C → Temperatura=50°C`,
    },
    ejercicio: {
      enunciado: 'Un depósito de agua tiene un sensor de nivel con salida 4-20mA (0mA = vacío, 20mA = lleno a 2 metros). El PLC lee el valor analógico en %IW64. Escribe la fórmula para calcular el nivel en centímetros. Luego, ¿qué valor tendría %IW64 cuando el depósito esté al 75% de su capacidad? ¿Y si el cable del sensor se rompe?',
      pista: 'El rango físico es 0-200 cm (2 metros). Usa la fórmula: Nivel_cm = (IW64 / 27648) × 200. Para el 75%: el nivel es 150cm, ¿qué valor de IW64 corresponde? Despeja IW64 de la fórmula. Cable roto = 0mA = valor negativo en el PLC.',
      solucion: `Fórmula nivel en cm:
  Nivel_cm = (IW64 / 27648) × 200

  Al 75% de capacidad:
  Nivel = 0.75 × 200 cm = 150 cm
  IW64 = (150 / 200) × 27648 = 0.75 × 27648 = 20736

  Verificación: (20736 / 27648) × 200 = 150 cm ✓

  Cable roto (0 mA):
  El sensor 4-20mA no puede dar 0mA en funcionamiento normal
  → 0mA indica fallo de cable o sensor sin alimentar
  → El PLC leerá IW64 ≈ -6912 (valor negativo)
  → En el programa, detectamos: IF IW64 < 0 THEN ALARMA_CABLE

  En SCL (TIA Portal):
  // Conversión analógica con detección de fallo
  IF "IW_Nivel" < 0 THEN
    "Alarma_Cable_Roto" := TRUE;
    "Nivel_cm" := 0;
  ELSE
    "Alarma_Cable_Roto" := FALSE;
    "Nivel_cm" := INT_TO_REAL("IW_Nivel") / 27648.0 * 200.0;
  END_IF;`,
    },
  },
  {
    id: 4,
    titulo: 'Comunicaciones Industriales',
    descripcion: 'PROFINET, Modbus y OPC UA: cómo los PLCs hablan entre sí y con sistemas superiores como SCADA.',
    duracion: '25 min',
    teoria: `En la industria moderna, los PLCs rara vez trabajan solos. Necesitan comunicarse con pantallas HMI, otros PLCs, variadores de frecuencia, sistemas SCADA (Supervisory Control and Data Acquisition) y sistemas ERP de gestión empresarial. Para esto existen protocolos de comunicación industrial.

PROFINET — el protocolo estándar de Siemens y el más usado en Europa. Basado en Ethernet industrial (mismo cable RJ45 que usas en casa, pero con switches industriales y cables más robustos). Permite comunicación en tiempo real (ciclos de 1ms o menos) entre el PLC y dispositivos de campo como variadores, válvulas inteligentes, ET 200SP y otros PLCs. Es el protocolo que usas para conectar el PLC al HMI en TIA Portal.

MODBUS — el protocolo más antiguo y universal (1979). Existen dos versiones: Modbus RTU (comunicación serie RS-485, hasta 32 dispositivos en un bus) y Modbus TCP (sobre Ethernet). Su ventaja es la universalidad: casi cualquier dispositivo industrial lo soporta, independientemente del fabricante. Es más lento que PROFINET pero perfecto para leer datos de contadores de energía, sensores inteligentes o equipos legacy.

OPC UA (Open Platform Communications Unified Architecture) — el estándar moderno para comunicación vertical: del PLC a sistemas SCADA, MES (Manufacturing Execution System) o la nube. Es seguro (autenticación y cifrado), independiente del fabricante y diseñado para Industria 4.0. Los S7-1500 lo incluyen de serie; los S7-1200 lo tienen desde la versión de firmware 4.1.

PROFIBUS — el predecesor de PROFINET, basado en comunicación serie. Muy presente en instalaciones antiguas. Si haces mantenimiento de plantas construidas antes de 2010, lo encontrarás habitualmente.

La arquitectura de comunicación industrial típica tiene tres niveles: nivel de campo (sensores/actuadores ↔ PLC por PROFINET/Modbus), nivel de control (PLC ↔ SCADA por OPC UA/Ethernet) y nivel de gestión (SCADA ↔ ERP por bases de datos/web services).`,
    codigo: {
      titulo: 'Configuración Modbus TCP en TIA Portal (S7-1200)',
      lenguaje: 'plc',
      contenido: `MODBUS TCP — leer registros de un variador de frecuencia

  Topología:
  S7-1200 (Maestro Modbus) ←── Ethernet ──→ Variador ABB
  IP PLC: 192.168.1.1                        IP Variador: 192.168.1.10

  En TIA Portal, bloque MB_CLIENT (FC de librería Modbus):

  Red 1 — Llamada al bloque Modbus TCP cada ciclo:
  ──────────────────[MB_CLIENT]──────────────────
                     REQ ←── Activar petición (TRUE)
                     ID  ←── 1 (conexión #1)
                     MODE ←── 0 (leer Holding Registers)
                     MB_DATA_ADDR ←── 40001 (registro variador)
                     MB_DATA_LEN  ←── 3 (leer 3 registros)
                     MB_DATA_PTR  ←── P#DB1.DBW0 (dónde guardar)
                     DONE ──→ MB10.0 (petición completada)
                     ERROR ──→ MB10.1 (hubo error)
                     STATUS ──→ MW20 (código de error)

  Registros leídos del variador (guardados en DB1):
  ┌──────────┬───────────┬──────────────────────────┐
  │ DB1.DBW0 │ Reg 40001 │ Velocidad actual (rpm)   │
  │ DB1.DBW2 │ Reg 40002 │ Corriente (×0.1 A)       │
  │ DB1.DBW4 │ Reg 40003 │ Estado del variador       │
  └──────────┴───────────┴──────────────────────────┘

  Interpretación estado variador (Reg 40003):
  Bit 0 = 1 → En marcha
  Bit 1 = 1 → Fallo activo
  Bit 2 = 1 → Listo para marcha
  Bit 3 = 1 → Límite de corriente activo`,
    },
    ejercicio: {
      enunciado: 'Diseña la arquitectura de comunicación para una planta de embotellado con: 3 PLCs S7-1200 (uno por línea), 1 PLC S7-1500 coordinador, 3 pantallas KTP700 (una por línea), 1 PC con SCADA para supervisión global, y 6 variadores de frecuencia (2 por línea). Indica qué protocolo usarías para cada conexión y por qué.',
      pista: 'Piensa en cada "conversación" por separado: PLC ↔ HMI, PLC ↔ variador, S7-1200 ↔ S7-1500, S7-1500 ↔ SCADA. No todas necesitan el mismo protocolo.',
      solucion: `Arquitectura de comunicación — Planta de embotellado:

  NIVEL DE CAMPO (tiempo real):
  ┌─────────────────────────────────────────────────┐
  │ S7-1200 Línea 1 ←─PROFINET─→ KTP700 Línea 1   │
  │ S7-1200 Línea 1 ←─Modbus TCP─→ Variador 1A    │
  │ S7-1200 Línea 1 ←─Modbus TCP─→ Variador 1B    │
  │ (igual para líneas 2 y 3)                       │
  └─────────────────────────────────────────────────┘
  Justificación:
  • PROFINET PLC↔HMI: integración nativa en TIA Portal,
    actualización rápida de pantalla (<100ms)
  • Modbus TCP PLC↔Variador: protocolo universal, todos los
    fabricantes de variadores lo soportan

  NIVEL DE CONTROL (coordinación):
  ┌─────────────────────────────────────────────────┐
  │ S7-1200 L1 ──┐                                  │
  │ S7-1200 L2 ──┼─── PROFINET ───→ S7-1500 coord. │
  │ S7-1200 L3 ──┘                                  │
  └─────────────────────────────────────────────────┘
  Justificación: PROFINET para comunicación entre PLCs
  Siemens, permite PUT/GET de datos entre controladores

  NIVEL DE SUPERVISIÓN (gestión):
  ┌─────────────────────────────────────────────────┐
  │ S7-1500 ──── OPC UA ────→ PC SCADA             │
  └─────────────────────────────────────────────────┘
  Justificación: OPC UA es el estándar para comunicación
  vertical PLC→SCADA, seguro, independiente del fabricante
  y preparado para Industria 4.0 / conexión a nube`,
    },
  },
  {
    id: 5,
    titulo: 'Mantenimiento y Diagnóstico de PLCs',
    descripcion: 'Cómo localizar fallos, interpretar códigos de error, sustituir módulos y mantener un sistema PLC en producción.',
    duracion: '25 min',
    teoria: `El mantenimiento de sistemas PLC es una de las habilidades más valoradas en la industria. Una parada de producción no planificada puede costar miles de euros por hora. Saber diagnosticar y resolver fallos rápidamente es crítico.

DIAGNÓSTICO DE PRIMER NIVEL — antes de abrir TIA Portal, observa los LEDs del PLC. El S7-1200 tiene tres LEDs principales:
RUN/STOP (verde/amarillo): verde = programa ejecutándose, amarillo = detenido.
ERROR (rojo): parpadeando = error de hardware o E/S; fijo = error crítico del sistema.
MAINT (amarillo): mantenimiento requerido (batería baja, firmware desactualizado).

BÚFER DE DIAGNÓSTICO — es el registro histórico del PLC. Guarda los últimos 50-100 eventos con timestamp: arranques, paradas, errores de módulo, fallos de comunicación. Es lo primero que consultas cuando el PLC ha fallado y ya se ha recuperado: el búfer te dice qué pasó exactamente y cuándo.

ERRORES COMUNES Y SOLUCIONES:
Error de E/S (LED ERROR parpadea): un módulo de expansión no responde. Verificar conexiones del bus, alimentación del módulo, y si el módulo está dañado.
Error de comunicación PROFINET: verificar cables Ethernet, dirección IP del dispositivo, que el device name coincide con el configurado en TIA Portal.
Watchdog timeout (ciclo de scan demasiado largo): el programa tarda más de lo permitido. Revisar bucles While infinitos o llamadas bloqueantes.
Pérdida de datos de retentividad: fallo de batería o memoria. Los datos marcados como retentivos (contadores, valores acumulados) se han perdido.

SUSTITUCIÓN DE MÓDULOS — los módulos de E/S del S7-1200 y S7-1500 son hot-swap en algunos sistemas pero no en todos. Siempre verificar el manual antes de extraer un módulo con el PLC en marcha. Tras sustituir, verificar que la dirección asignada en TIA Portal coincide con la posición física.

MANTENIMIENTO PREVENTIVO — documentar el estado del sistema periódicamente: hacer backup del programa, anotar versiones de firmware, verificar estado de batería (si aplica), limpiar filtros de ventilación de armarios eléctricos y revisar apriete de conexiones (las vibraciones afloja bornes con el tiempo).`,
    codigo: {
      titulo: 'Procedimiento de diagnóstico paso a paso',
      lenguaje: 'plc',
      contenido: `ÁRBOL DE DIAGNÓSTICO — PLC S7-1200 con fallo:

  ① OBSERVAR LEDs
  ─────────────────────────────────────────────────
  RUN/STOP amarillo fijo → PLC en STOP
    ├── ¿Hay error? LED ERROR encendido → ir a ②
    └── ¿Sin error? → PLC puesto en STOP manualmente
        Solución: poner en RUN desde TIA Portal o botón

  LED ERROR parpadeando → error de E/S
    └── Identificar módulo con LED rojo → ir a ③

  LED ERROR fijo → error crítico de sistema → ir a ②

  ② CONSULTAR BÚFER DE DIAGNÓSTICO
  ─────────────────────────────────────────────────
  TIA Portal → Online → Diagnóstico del dispositivo
  → Búfer de diagnóstico → ver últimos eventos

  Errores frecuentes y solución:
  • "Fallo de periferia en slot X"
    → Verificar módulo en slot X: ¿está bien conectado?
    → ¿Alimentación 24V del módulo OK?
    → ¿Fusible del módulo fundido?

  • "Timeout de estación PROFINET [nombre]"
    → Verificar cable Ethernet entre PLC y dispositivo
    → Verificar que IP y device name son correctos
    → Ping desde portátil al dispositivo: ¿responde?

  • "Watchdog — ciclo de scan > Tmax"
    → Revisar bucles en el programa (While sin límite)
    → Aumentar Tmax en propiedades de la CPU si es justificado

  ③ SUSTITUCIÓN DE MÓDULO DEFECTUOSO
  ─────────────────────────────────────────────────
  1. Documentar: fotografiar cableado antes de desconectar
  2. Poner PLC en STOP
  3. Cortar alimentación 24V del módulo (no siempre el PLC)
  4. Extraer módulo defectuoso
  5. Instalar módulo nuevo (misma referencia)
  6. Restaurar alimentación
  7. Poner PLC en RUN → verificar que desaparece el error
  8. Hacer backup del programa actualizado

  ④ BACKUP Y DOCUMENTACIÓN
  ─────────────────────────────────────────────────
  TIA Portal → Proyecto → Guardar y archivar
  → Guardar copia con fecha: Proyecto_v2_2025-03-22
  → Incluir en la documentación:
    • Versión firmware CPU
    • Tabla de variables actualizada
    • Histórico de cambios realizados`,
    },
    ejercicio: {
      enunciado: 'Lunes por la mañana. La línea de producción está parada. El operario dice que "el PLC se paró solo durante el fin de semana". El LED RUN/STOP está en amarillo (STOP) y el LED ERROR no está encendido. ¿Cuál es tu protocolo de actuación paso a paso? ¿Qué información necesitas recoger antes de volver a poner el PLC en RUN? ¿Qué pasa si lo pones en RUN sin investigar y el fallo se repite?',
      pista: 'El PLC en STOP sin LED de error suele indicar que fue puesto en STOP por el sistema operativo (watchdog, error de programa) o manualmente. El búfer de diagnóstico tiene la respuesta. No pongas en RUN sin saber por qué se paró: podría ser una parada de seguridad.',
      solucion: `PROTOCOLO DE ACTUACIÓN — PLC en STOP sin error visible:

  PASO 1 — Asegurar que es seguro intervenir
  • ¿Hay personal trabajando cerca de la maquinaria?
  • ¿Las salidas en STOP dejan la máquina en estado seguro?
  • Avisar al responsable de producción antes de actuar

  PASO 2 — Conectarse online sin modificar nada
  TIA Portal → Online → Conectar (modo observación)
  NO poner en RUN todavía

  PASO 3 — Consultar el búfer de diagnóstico
  → Diagnóstico del dispositivo → Búfer de diagnóstico
  → Buscar el evento del fin de semana
  Posibles causas:
  • "OB de error no cargado" → error de programa sin manejador
  • "Fallo de periferia" → un sensor/módulo falló y el programa
    no tiene tratamiento de errores → el S.O. puso en STOP
  • "Watchdog" → ciclo demasiado largo
  • "Corte de alimentación" → bajó la tensión

  PASO 4 — Según la causa encontrada:
  • Fallo de periferia → verificar y reparar el módulo/sensor
    → LUEGO poner en RUN
  • Error de programa → corregir el bloque de error
    → Recargar programa → poner en RUN
  • Corte de alimentación → verificar SAI/UPS
    → Si no hay más problemas, poner en RUN con precaución

  PASO 5 — Poner en RUN con supervisión
  • Tener el dedo en STOP durante los primeros minutos
  • Monitorizar el programa online
  • Anotar todo en el libro de mantenimiento

  ¿Qué pasa si pones en RUN sin investigar?
  → Si la causa sigue presente, el PLC volverá a parar
  → Si era una parada de seguridad (sensor crítico roto),
    podrías arrancar una máquina en condiciones peligrosas
  → Nunca pongas en RUN sin saber por qué se paró`,
    },
  },
];

// ─── Componente simplificado ─────────────────────────────────────────────────

export default function PlcsPage() {
  return (
    <CoursePage
      courseId="plcs"
      courseName="PLCs Industriales"
      courseLogo="🔧"
      modulos={modulos}
      backRoute="/programacion/ladder"
    />
  );
}