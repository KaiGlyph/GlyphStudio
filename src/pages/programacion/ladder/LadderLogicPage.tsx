import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LadderLogicPage.css';

// ─── Datos del curso ────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    titulo: '¿Qué es Ladder Logic?',
    descripcion: 'El origen del lenguaje gráfico de escalera y por qué sigue siendo el estándar industrial.',
    duracion: '15 min',
    teoria: `Ladder Logic (o Diagrama de Escalera) es un lenguaje de programación gráfico diseñado específicamente para programar PLCs (Controladores Lógicos Programables). Su nombre viene de su apariencia visual: el programa se estructura como una escalera, con dos raíles verticales (el de alimentación a la izquierda y el neutro a la derecha) conectados por peldaños horizontales llamados "rungs".

Fue creado en los años 60 y 70 como una evolución directa de los esquemas de relés eléctricos. La idea era que los técnicos de mantenimiento industrial, familiarizados con los circuitos de relés, pudieran leer y programar PLCs sin necesidad de aprender un lenguaje de programación convencional. Un contacto normalmente abierto en Ladder se comporta exactamente igual que un contacto NA en un esquema eléctrico.

Hoy en día, aunque existen otros lenguajes de PLC (FBD, STL, SCL…), Ladder sigue siendo el más usado en todo el mundo, especialmente en América y Europa, porque:
— La gran mayoría de técnicos industriales lo conocen.
— Es muy visual e intuitivo para lógicas de control secuencial.
— Está estandarizado por la norma IEC 61131-3, que regula los lenguajes de programación de PLCs.

Cada peldaño (rung) representa una línea lógica: de izquierda a derecha, la "corriente lógica" fluye a través de los contactos (condiciones) hasta llegar a la bobina (acción). Si todas las condiciones se cumplen, la bobina se activa.`,
    codigo: {
      titulo: 'Estructura básica de un programa Ladder',
      lenguaje: 'ladder',
      contenido: `Estructura de un programa Ladder en TIA Portal / Step 7:

  RAIL IZQ.                              RAIL DER.
  ─────┬──────────────────────────────────┬─────
       │                                  │
  Red 1│  ──[ ]──────────────────────( )──│  Arranque simple
       │    S1                       KM1  │  S1=pulsador, KM1=contactor
       │                                  │
  ─────┤──────────────────────────────────┤─────
       │                                  │
  Red 2│  ──[ ]────[/]───────────────( )──│  Con enclavamiento
       │    S_ON   S_OFF              M1  │  S_ON=marcha, S_OFF=paro
       │                                  │
  ─────┤──────────────────────────────────┤─────
       │                                  │
  Red 3│  ──[ ]──────────────────────[S]──│  Set (memoria)
       │    SENSOR                  ALARM │  Se activa y queda ON
       │                                  │
  ─────┴──────────────────────────────────┴─────

  [ ]  → Contacto Normalmente Abierto (NA): pasa si la variable es TRUE
  [/]  → Contacto Normalmente Cerrado (NC): pasa si la variable es FALSE
  ( )  → Bobina de salida: se activa si la lógica es TRUE
  [S]  → Bobina Set: activa y mantiene aunque la condición desaparezca
  [R]  → Bobina Reset: desactiva una bobina Set`,
    },
    ejercicio: {
      enunciado: 'Dibuja en papel (o describe en texto) el diagrama Ladder para este proceso: una cinta transportadora que arranca cuando se pulsa el botón START (S_START, NA) y para cuando se pulsa STOP (S_STOP, NC) o cuando el sensor de final de recorrido (S_FIN, NA) detecta una pieza. La salida es el motor de la cinta (M_CINTA).',
      pista: 'Necesitas un peldaño con S_START en serie con S_STOP (NC) y S_FIN (NC) — porque cuando se activan deben CORTAR la corriente. La bobina al final es M_CINTA. Recuerda: un NC en reposo deja pasar corriente; cuando se activa, la corta.',
      solucion: `Red 1 — Control de la cinta transportadora:

  ──[ ]────[/]────[/]────────────────( )──
    S_START  S_STOP  S_FIN          M_CINTA

  Explicación paso a paso:
  • S_START  [NA] → el operador pulsa MARCHA → deja pasar corriente
  • S_STOP   [NC] → en reposo deja pasar; al pulsar PARO corta la corriente
  • S_FIN    [NC] → en reposo deja pasar; cuando detecta pieza corta la corriente
  • M_CINTA  ( )  → se activa solo si las tres condiciones anteriores permiten flujo

  PROBLEMA: al soltar S_START la cinta para.
  SOLUCIÓN: añadir un contacto de autoenclavamiento (automantenimiento):

  ──[ ]──┬──[/]────[/]────────────────( )──
    S_START│  S_STOP  S_FIN           M_CINTA
           │
          [ ] ← M_CINTA (contacto auxiliar, se "sella" al activarse)

  Así la cinta sigue funcionando aunque soltemos S_START.`,
    },
  },
  {
    id: 2,
    titulo: 'Contactos y Bobinas',
    descripcion: 'Los elementos fundamentales de Ladder: contactos NA, NC y los distintos tipos de bobinas.',
    duracion: '20 min',
    teoria: `Los contactos y las bobinas son los bloques básicos de cualquier programa Ladder. Entenderlos bien es entender el 80% del lenguaje.

CONTACTOS — representan condiciones que se evalúan. Hay dos tipos fundamentales:

Contacto NA (Normalmente Abierto) — símbolo [ ]. En reposo no deja pasar corriente lógica. Cuando la variable asociada es TRUE (1), se cierra y deja pasar. Es el tipo más común: lo usas para "si este botón está pulsado" o "si este sensor detecta".

Contacto NC (Normalmente Cerrado) — símbolo [/]. Al contrario: en reposo deja pasar. Cuando la variable es TRUE, se abre y corta. Lo usas para paradas de emergencia, finales de carrera de protección, o cualquier condición que deba interrumpir la lógica al activarse.

BOBINAS — representan acciones que se ejecutan. Las principales son:

Bobina estándar ( ) — se activa mientras la lógica del peldaño sea TRUE. En cuanto la lógica se vuelve FALSE, se desactiva. Es como una lámpara: encendida si hay corriente, apagada si no.

Bobina Set [S] — cuando la lógica se vuelve TRUE, activa la variable y la MANTIENE activa aunque la condición desaparezca. Es como un pestillo: una vez activado, no se suelta solo.

Bobina Reset [R] — desactiva una variable que fue activada por un Set. Siempre se usa en pareja con un Set.

Bobina de flanco positivo [P] — se activa solo durante UN ciclo de scan cuando la condición pasa de FALSE a TRUE. Útil para disparar acciones que solo deben ocurrir una vez por evento.`,
    codigo: {
      titulo: 'Contactos NA, NC, bobinas Set/Reset y flancos',
      lenguaje: 'ladder',
      contenido: `Ejemplo: Sistema de alarma con memoria

  Red 1 — Activar alarma (Set) cuando sensor detecta:
  ──[ ]──────────────────────────────[S]──
    SENSOR_HUMO                    ALARMA
    (NA: activa cuando hay humo)   (Set: queda activa)

  Red 2 — Desactivar alarma (Reset) cuando operario confirma:
  ──[ ]──────────────────────────────[R]──
    BTN_RESET                      ALARMA
    (NA: botón de confirmación)    (Reset: apaga la alarma)

  Red 3 — Bobina estándar: piloto ON mientras alarma activa:
  ──[ ]──────────────────────────────( )──
    ALARMA                         PILOTO_ROJO

  Red 4 — Flanco positivo: contar solo una vez por activación:
  ──[P]──────────────────────────────( )──
    SENSOR_PIEZA                   ADD_CONTADOR
    (solo 1 ciclo al detectar)     (suma 1 al contador)

  ─────────────────────────────────────────
  Diferencia clave Set vs Estándar:

  Estándar ( ): ALARMA = SENSOR_HUMO
    → Si SENSOR_HUMO=0, ALARMA=0  (se apaga sola)

  Set/Reset [S][R]: ALARMA queda en 1 aunque SENSOR_HUMO vuelva a 0
    → Solo se apaga cuando alguien pulsa BTN_RESET`,
    },
    ejercicio: {
      enunciado: 'Diseña la lógica Ladder para un sistema de control de acceso: una puerta que se abre (MOTOR_ABRIR) cuando se introduce el código correcto (CODIGO_OK, NA) y permanece abierta hasta que el sensor de puerta abierta (SENSOR_ABIERTA, NA) confirma que está completamente abierta. Una vez abierta, se activa un temporizador (lo veremos en el módulo 3), pero por ahora simplemente activa una señal de PUERTA_LISTA. Usa Set y Reset.',
      pista: 'Usa [S] en MOTOR_ABRIR cuando CODIGO_OK sea TRUE. Usa [R] en MOTOR_ABRIR cuando SENSOR_ABIERTA sea TRUE (ya no necesita seguir abriendo). Luego activa PUERTA_LISTA con un contacto NA de SENSOR_ABIERTA.',
      solucion: `Red 1 — Arrancar motor de apertura:
  ──[ ]──────────────────────────────[S]──
    CODIGO_OK                   MOTOR_ABRIR

  Red 2 — Parar motor cuando puerta está completamente abierta:
  ──[ ]──────────────────────────────[R]──
    SENSOR_ABIERTA              MOTOR_ABRIR

  Red 3 — Señal de puerta lista para paso:
  ──[ ]──────────────────────────────( )──
    SENSOR_ABIERTA               PUERTA_LISTA

  Flujo del proceso:
  1. Operario introduce código → CODIGO_OK = TRUE (1 ciclo)
  2. Red 1: MOTOR_ABRIR se pone a TRUE con Set → motor arranca
  3. CODIGO_OK vuelve a FALSE pero MOTOR_ABRIR sigue TRUE (memoria Set)
  4. Puerta llega al tope → SENSOR_ABIERTA = TRUE
  5. Red 2: Reset desactiva MOTOR_ABRIR → motor para
  6. Red 3: PUERTA_LISTA = TRUE → luz verde para el operario`,
    },
  },
  {
    id: 3,
    titulo: 'Temporizadores: TON, TOF y TP',
    descripcion: 'Controla el tiempo en tus procesos con los tres temporizadores estándar de Ladder.',
    duracion: '25 min',
    teoria: `Los temporizadores son uno de los elementos más usados en la automatización industrial. Permiten introducir retardos, limitar duraciones y sincronizar procesos en el tiempo. La norma IEC 61131-3 define tres tipos estándar:

TON (Timer On-Delay, Retardo a la Conexión) — el más usado. Cuando la entrada IN se pone a TRUE, empieza a contar. Cuando el tiempo acumulado (ET, Elapsed Time) alcanza el valor programado (PT, Preset Time), la salida Q se pone a TRUE. Si IN vuelve a FALSE antes de llegar a PT, el temporizador se resetea. Uso típico: "si esta condición lleva X segundos activa, entonces haz esto".

TOF (Timer Off-Delay, Retardo a la Desconexión) — la lógica inversa. Cuando IN pasa a TRUE, Q se activa inmediatamente. Cuando IN vuelve a FALSE, Q sigue activa durante PT segundos antes de desactivarse. Uso típico: ventilador que sigue funcionando X segundos después de apagar la máquina para enfriarla.

TP (Timer Pulse, Temporizador de Pulso) — genera un pulso de duración fija. Cuando IN pasa a TRUE (aunque sea un instante), Q se activa durante exactamente PT segundos, sin importar lo que haga IN durante ese tiempo. Uso típico: activar una señal acústica durante 3 segundos al detectar un error.

En TIA Portal (Siemens), los temporizadores son bloques de función (IEC Timers) que necesitan una instancia de datos (DB) asociada. Los tiempos se expresan como T#5s (5 segundos), T#500ms (500 milisegundos) o T#2m30s (2 minutos y 30 segundos).`,
    codigo: {
      titulo: 'TON, TOF y TP en Ladder',
      lenguaje: 'ladder',
      contenido: `Ejemplo 1 — TON: arranque retardado del motor (5 segundos)

  Red 1:
  ──[ ]────────────────[TON T1, PT:T#5s]──
    S_START               IN      Q→ (interno)
                                  ET→ tiempo actual

  Red 2: activar motor cuando TON completa los 5s
  ──[ ]──────────────────────────────( )──
    T1.Q                           MOTOR
    (TRUE cuando ET >= PT)


  Ejemplo 2 — TOF: ventilador sigue 30s después de apagar

  Red 1:
  ──[ ]────────────────[TOF T2, PT:T#30s]─
    MAQUINA_ON            IN      Q→ VENTILADOR
                                  (TRUE inmediato al ON,
                                   FALSE 30s después del OFF)


  Ejemplo 3 — TP: alarma sonora 3 segundos al detectar error

  Red 1:
  ──[P]────────────────[TP  T3, PT:T#3s]──
    ERROR_DETECTADO       IN      Q→ ALARMA_SONORA
    (flanco positivo)             (pulso fijo de 3s)


  ─────────────────────────────────────────
  Tabla resumen:

  Timer │ IN→TRUE  │ IN→FALSE     │ Uso típico
  ──────┼──────────┼──────────────┼──────────────────────
  TON   │ cuenta   │ reset        │ retardo de arranque
  TOF   │ Q=TRUE   │ cuenta, luego│ retardo de parada
        │ inmediato│ Q=FALSE      │
  TP    │ pulso PT │ no interrumpe│ señal de duración fija`,
    },
    ejercicio: {
      enunciado: 'Diseña la lógica para una lavadora simplificada con tres fases temporizadas: Fase 1 — Llenado de agua durante 2 minutos (VALVULA_AGUA activa). Fase 2 — Lavado durante 30 minutos (MOTOR_TAMBOR activo), que empieza cuando termina el llenado. Fase 3 — Señal de FIN_CICLO que se activa cuando termina el lavado. Usa temporizadores TON encadenados.',
      pista: 'Usa T1 (TON, PT:T#2m) para el llenado. Cuando T1.Q sea TRUE, arranca T2 (TON, PT:T#30m) para el lavado. Cuando T2.Q sea TRUE, activa FIN_CICLO. Cada temporizador usa la salida Q del anterior como condición IN.',
      solucion: `Red 1 — Arranque del ciclo y llenado:
  ──[ ]────────────────[TON T1, PT:T#2m]──
    BTN_INICIO             IN     Q→(interno)

  Red 2 — VALVULA_AGUA activa durante llenado (T1 contando):
  ──[ ]────[/]───────────────────────( )──
    BTN_INICIO  T1.Q              VALVULA_AGUA
    (mientras cuenta y aún no ha llegado a 2 min)

  Red 3 — Fase lavado: arranca cuando llenado completo:
  ──[ ]────────────────[TON T2, PT:T#30m]─
    T1.Q                   IN     Q→(interno)
    (T1 completó 2 min)

  Red 4 — MOTOR_TAMBOR activo durante lavado:
  ──[ ]────[/]───────────────────────( )──
    T1.Q     T2.Q               MOTOR_TAMBOR

  Red 5 — Señal de fin de ciclo:
  ──[ ]──────────────────────────────( )──
    T2.Q                        FIN_CICLO

  Flujo:
  BTN_INICIO → T1 cuenta 2min → VALVULA_AGUA
             → T1.Q=TRUE → T2 cuenta 30min → MOTOR_TAMBOR
             → T2.Q=TRUE → FIN_CICLO`,
    },
  },
  {
    id: 4,
    titulo: 'Contadores: CTU, CTD y CTUD',
    descripcion: 'Cuenta eventos, piezas y ciclos con los contadores estándar de Ladder.',
    duracion: '20 min',
    teoria: `Los contadores permiten contar eventos discretos: pulsaciones de un botón, piezas que pasan por un sensor, ciclos completados de una máquina, etc. Al igual que los temporizadores, están estandarizados por IEC 61131-3.

CTU (Count Up, Contador Ascendente) — cuenta hacia arriba desde 0. Cada vez que la entrada CU pasa de FALSE a TRUE (flanco positivo), el valor actual CV se incrementa en 1. Cuando CV alcanza el valor programado PV, la salida Q se pone a TRUE. La entrada R (Reset) pone CV a 0.

CTD (Count Down, Contador Descendente) — cuenta hacia abajo desde el valor programado PV. Cada flanco positivo en CD decrementa CV. Cuando CV llega a 0, Q se pone a TRUE. La entrada LD (Load) carga el valor PV en CV.

CTUD (Count Up/Down, Contador Bidireccional) — combina ambos. Tiene dos entradas: CU para contar hacia arriba y CD para contar hacia abajo. Muy útil para gestionar inventarios o posiciones relativas.

Un detalle importante: los contadores solo cuentan FLANCOS (transiciones de 0 a 1), no niveles. Si la señal de entrada lleva varios ciclos de scan a TRUE, solo cuenta una vez. Esto los hace perfectos para sensores de pulso (encoders, células fotoeléctricas de paso).

En TIA Portal los contadores IEC también necesitan un bloque de datos de instancia, igual que los temporizadores.`,
    codigo: {
      titulo: 'CTU, CTD y CTUD en la práctica',
      lenguaje: 'ladder',
      contenido: `Ejemplo 1 — CTU: contar piezas en una línea de producción

  Red 1 — Contar cada pieza que pasa por el sensor:
  ──[P]─────────────[CTU C1, PV:100]──────
    SENSOR_PIEZA      CU    Q→ LOTE_COMPLETO
    (flanco positivo) CV→ MW10 (valor actual)

  Red 2 — Reset del contador al confirmar lote:
  ──[ ]─────────────────────────[R de C1]──
    BTN_CONFIRMA_LOTE              R


  Ejemplo 2 — CTD: dispensador con stock limitado

  Red 1 — Cargar stock inicial (20 unidades):
  ──[ ]─────────────[CTD C2, PV:20]───────
    BTN_RECARGAR      LD    Q→ SIN_STOCK
                      CV→ MW20

  Red 2 — Decrementar al dispensar:
  ──[P]───────────────────────[CD de C2]──
    SENSOR_DISPENSADO              CD


  Ejemplo 3 — CTUD: control de aforo (max 50 personas)

  Red 1:
  ──[P]────────────[CTUD C3, PV:50]───────
    SENSOR_ENTRADA    CU   Q→ AFORO_COMPLETO
  ──[P]──────────────────────────CD───────
    SENSOR_SALIDA     CD   CV→ personas actuales`,
    },
    ejercicio: {
      enunciado: 'Una máquina de embalaje agrupa piezas en cajas de 12 unidades. Diseña la lógica Ladder que: cuente las piezas con un sensor (SENSOR_PIEZA), active la señal CAJA_LLENA cuando llegue a 12 piezas, active un actuador EMPUJADOR durante 2 segundos para empujar la caja (usa un TON), y resetee el contador automáticamente cuando el temporizador del empujador termine para empezar a contar la siguiente caja.',
      pista: 'CTU con PV:12. Cuando C1.Q (CAJA_LLENA) sea TRUE, activa un TON de 2s para el EMPUJADOR. Cuando el TON.Q sea TRUE, resetea el contador C1 con su entrada R. Así el ciclo se repite automáticamente.',
      solucion: `Red 1 — Contar piezas:
  ──[P]─────────────[CTU C1, PV:12]───────
    SENSOR_PIEZA      CU    Q→ CAJA_LLENA

  Red 2 — Activar temporizador de empuje cuando caja llena:
  ──[ ]────────────────[TON T1, PT:T#2s]──
    C1.Q (CAJA_LLENA)    IN    Q→(interno)

  Red 3 — Activar empujador mientras temporizador cuenta:
  ──[ ]────[/]───────────────────────( )──
    C1.Q    T1.Q                EMPUJADOR
    (activo desde CAJA_LLENA hasta fin del TON)

  Red 4 — Reset del contador cuando termina el empuje:
  ──[ ]──────────────────────[R de C1]────
    T1.Q                           R
    (al completar 2s, resetea el contador)

  Ciclo automático:
  12 piezas → CAJA_LLENA → EMPUJADOR 2s → Reset C1 → cuenta desde 0`,
    },
  },
  {
    id: 5,
    titulo: 'Lógica de Enclavamiento y Seguridad',
    descripcion: 'Técnicas esenciales para diseñar programas Ladder seguros: enclavamientos, autorretención y paradas de emergencia.',
    duracion: '25 min',
    teoria: `En automatización industrial, la seguridad no es opcional. Un error de programación puede dañar maquinaria, producir piezas defectuosas o, en el peor caso, provocar un accidente. Las técnicas de enclavamiento son la primera línea de defensa.

AUTORRETENCIÓN (Seal-in circuit) — es el circuito más básico de la automatización. Permite que una salida se mantenga activa después de que el botón de arranque se suelte. Se implementa poniendo un contacto NA de la propia bobina en paralelo con el botón de arranque. Así la salida "se sella" a sí misma.

ENCLAVAMIENTO (Interlock) — impide que dos acciones incompatibles ocurran simultáneamente. El ejemplo clásico es un motor reversible: no puedes tener MARCHA_ADELANTE y MARCHA_ATRAS activas al mismo tiempo o quemarás el motor. Se implementa poniendo un contacto NC de cada salida en el peldaño de la otra.

PARADA DE EMERGENCIA (E-Stop) — toda máquina industrial debe tener un botón de parada de emergencia que detenga todo de forma inmediata. En Ladder se implementa con un contacto NC del E-Stop en serie con TODAS las salidas críticas, o mejor aún, conectado directamente al hardware del PLC (categoría de seguridad SIL).

PRIORIDAD DE PARADA — cuando un botón de marcha y uno de parada se activan simultáneamente, ¿cuál gana? En seguridad industrial, el PARO siempre tiene prioridad. Esto se logra poniendo el contacto NC del paro ANTES del NA de marcha en el peldaño.

Estas técnicas no son solo buenas prácticas: muchas están exigidas por normativas como la ISO 13849 y la IEC 62061 para máquinas industriales.`,
    codigo: {
      titulo: 'Autorretención, enclavamiento y E-Stop',
      lenguaje: 'ladder',
      contenido: `Ejemplo 1 — Autorretención (circuito sello):

  ──[ ]──┬──[/]──────────────────────( )──
    S_ON  │  S_OFF                  MOTOR
          │
         [ ] ← MOTOR (contacto auxiliar de autorretención)

  Sin el contacto auxiliar: MOTOR solo activo mientras pulsas S_ON
  Con él: pulsas S_ON, MOTOR arranca y se mantiene solo hasta S_OFF


  Ejemplo 2 — Enclavamiento motor reversible:

  Red 1 — Marcha adelante (imposible si marcha atrás activa):
  ──[ ]──┬──[/]────[/]──────────────( )──
    S_ADE │  S_OFF  KM_ATRAS       KM_ADE
          [ ] ← KM_ADE

  Red 2 — Marcha atrás (imposible si marcha adelante activa):
  ──[ ]──┬──[/]────[/]──────────────( )──
    S_ATR │  S_OFF  KM_ADE         KM_ATRAS
          [ ] ← KM_ATRAS

  [/]KM_ATRAS en Red 1 y [/]KM_ADE en Red 2 = enclavamiento cruzado


  Ejemplo 3 — E-Stop en todas las salidas críticas:

  ──[ ]──┬──[/]────[/]──────────────( )──
    S_ON  │  S_OFF  E_STOP          MOTOR
          [ ] ← MOTOR

  ──[ ]────────────[/]──────────────( )──
    AUTO_VALVULA    E_STOP          VALVULA

  E_STOP es NC → en reposo deja pasar (máquina funciona)
               → al pulsar emergencia corta TODO`,
    },
    ejercicio: {
      enunciado: 'Diseña el programa Ladder completo para una prensa industrial con estas condiciones de seguridad: la prensa (CILINDRO_PRENSA) solo puede bajar si se pulsan DOS botones simultáneamente (BTN_IZQ y BTN_DER, ambos NA) — esto obliga a usar las dos manos y evita que el operario meta la mano. La prensa sube automáticamente cuando llega al tope inferior (SENSOR_ABAJO, NA). Hay un E-Stop (E_STOP, NC) que detiene todo. Añade un enclavamiento para que SUBIDA y BAJADA no puedan activarse simultáneamente.',
      pista: 'Para la bajada: BTN_IZQ AND BTN_DER AND [/]E_STOP AND [/]SUBIDA → BAJADA. Para la subida: SENSOR_ABAJO AND [/]E_STOP AND [/]BAJADA → SUBIDA. El enclavamiento cruzado entre BAJADA y SUBIDA evita activación simultánea.',
      solucion: `Red 1 — Bajada de la prensa (requiere dos manos):
  ──[ ]────[ ]────[/]────[/]─────────( )──
   BTN_IZQ BTN_DER E_STOP SUBIDA    BAJADA
   (ambos pulsados)(seguridad)(enclavamiento)

  Red 2 — Subida automática al llegar al tope:
  ──[ ]────[/]────[/]────────────────( )──
  SENSOR_ABAJO E_STOP BAJADA        SUBIDA
  (tope inf.)  (seg.) (enclavamiento)

  Red 3 — Piloto de ciclo en marcha:
  ──[ ]──────────────────────────────( )──
    BAJADA                      PILOTO_CICLO

  Red 4 — Piloto de emergencia activa:
  ──[/]──────────────────────────────( )──
    E_STOP                     PILOTO_EMERG

  Análisis de seguridad:
  ✓ Mando a dos manos: BTN_IZQ AND BTN_DER obligatorio
  ✓ E-Stop NC: fallo eléctrico = parada segura (fail-safe)
  ✓ Enclavamiento cruzado: BAJADA y SUBIDA mutuamente exclusivas
  ✓ Subida automática: no queda atrapada en posición baja`,
    },
  },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function LadderLogicPage() {
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
    <main className="ladder-page">
      <div className="ladder-layout">

        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="ladder-sidebar">
          <button className="btn-back-sidebar ladder-back" onClick={() => navigate('/programacion/ladder')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver
          </button>

          <div className="sidebar-header">
            <div className="ladder-logo">⚡</div>
            <div>
              <h2 className="sidebar-title">Ladder Logic</h2>
              <p className="sidebar-subtitle">{modulos.length} módulos</p>
            </div>
          </div>

          <div className="progreso-wrapper">
            <div className="progreso-label">
              <span>Progreso</span>
              <span className="ladder-pct">{progreso}%</span>
            </div>
            <div className="progreso-bar">
              <div className="ladder-fill" style={{ width: `${progreso}%` }} />
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
                  className={`modulo-btn ${activo ? 'ladder-activo' : ''} ${completado ? 'ladder-completado' : ''}`}
                  onClick={() => seleccionarModulo(index)}
                >
                  <span className={`modulo-num ${activo ? 'ladder-num-activo' : ''} ${completado ? 'ladder-num-done' : ''}`}>
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
        <div className="ladder-content">

          <header className="modulo-header">
            <div className="modulo-meta">
              <span className="ladder-badge">Módulo {modulo.id}</span>
              <span className="modulo-tiempo">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {modulo.duracion}
              </span>
            </div>
            <h1 className="ladder-titulo">{modulo.titulo}</h1>
            <p className="modulo-desc">{modulo.descripcion}</p>
          </header>

          <div className="ladder-glow" />

          {/* Teoría */}
          <section className="seccion">
            <div className="ladder-label">
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

          {/* Código / Diagrama */}
          <section className="seccion">
            <div className="ladder-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
              </svg>
              Diagrama de ejemplo
            </div>
            <div className="ladder-codigo-block">
              <div className="codigo-header">
                <div className="codigo-dots"><span /><span /><span /></div>
                <span className="codigo-titulo">{modulo.codigo.titulo}</span>
                <span className="ladder-lang">{modulo.codigo.lenguaje}</span>
              </div>
              <pre className="ladder-pre"><code>{modulo.codigo.contenido}</code></pre>
            </div>
          </section>

          {/* Ejercicio */}
          <section className="seccion">
            <div className="ladder-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ejercicio práctico
            </div>
            <div className={`ladder-ejercicio ${mostrarEjercicio ? 'ladder-abierto' : ''}`}>
              {!mostrarEjercicio ? (
                <button className="ejercicio-reveal ladder-reveal" onClick={() => setMostrarEjercicio(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Ver ejercicio
                </button>
              ) : (
                <>
                  <p className="ejercicio-enunciado">{modulo.ejercicio.enunciado}</p>
                  <div className="ladder-pista">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span><strong>Pista:</strong> {modulo.ejercicio.pista}</span>
                  </div>
                  {!mostrarSolucion ? (
                    <button className="btn-solucion ladder-btn-sol" onClick={() => setMostrarSolucion(true)}>
                      Mostrar solución
                    </button>
                  ) : (
                    <div className="solucion-block">
                      <p className="ladder-sol-label">Solución</p>
                      <pre className="ladder-pre ladder-solucion-pre"><code>{modulo.ejercicio.solucion}</code></pre>
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
            <button className="btn-nav ladder-btn-next" onClick={irSiguiente}>
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