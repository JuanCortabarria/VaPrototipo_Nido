# Prompt para Claude Design — Nido v2

> Cómo usarlo: en Claude Design elegí el modelo **Fable 5.2**. Copiá todo desde «Diseñá un prototipo…» hasta el final y adjuntá 6 a 8 capturas de `evidencia/capturas-prototipo-2026-11-12/` como antirreferencia. Sugeridas: 02, 06, 15, 20, 23, 28 y 34. El detalle de las apps de referencia está en `diseno/referencias-apps.md`.

---

Diseñá un prototipo navegable de alta fidelidad de **Nido**, una app para iPhone que ayuda a una familia a no olvidar el próximo paso de salud de cada persona. Todo el contenido de la interfaz va en **español rioplatense** (vos, tenés, agregá), claro y breve.

## 1. Contexto del producto

Nido es el proyecto final de Ingeniería en Sistemas de la Universidad ORT Uruguay. El mercado inicial es Uruguay. Una persona organiza la salud de sus hijos y de su padre mayor, con ayuda de una cuidadora y de otros familiares.

El problema central es que las indicaciones médicas, los estudios, las recetas y las tomas de medicación quedan dispersos entre papeles, WhatsApp y la memoria de alguien. Nido conecta cada información con **una próxima acción clara: qué hay que hacer, para quién, cuándo y quién lo hace**.

Nido complementa al prestador de salud: no está conectado a mutualistas y los documentos los sube la familia. La IA organiza y propone tareas, pero **nunca interpreta resultados, diagnostica ni recomienda tratamientos**.

El prototipo anterior tenía todas las funciones, pero era recargado, confuso y feo. Adjunto capturas como **antirreferencia**: no repitas esa estética, la densidad de texto, los avisos legales en cada pantalla ni las etiquetas chicas tipo «Antonio · Rosa».

## 2. Lo que aprendimos en pruebas con usuarios (diseñá para resolver esto)

1. La primera pantalla tiene que ser **accionable**, no un calendario: «qué tengo que hacer ahora y hoy».
2. **El destinatario de cada tarea tiene que verse de inmediato.** Darle la medicación de una persona a otra es el error más grave posible.
3. Cada tarjeta muestra **fecha y hora**. Los usuarios perdían la referencia del día.
4. **Navegación iOS evidente**: botón Atrás, gesto de deslizar hacia atrás y hojas que se cierran. Antes no se podía volver.
5. **Lo realizado sale de la lista de pendientes** y va al historial de la persona, con la opción de deshacer.
6. **Las acciones dependen del tipo de actividad.** Una tarea de cuidado no tiene «preguntas para la consulta».
7. **Los permisos son críticos** y antes no se encontraban.
8. **Los documentos no vencen.** Son un archivo para buscar. Solo algunos carnés vencen y van aparte.
9. «No puedo» tiene que generar el siguiente paso, no solo cambiar el nombre del responsable.
10. Para una consulta, lo crítico es **tener los resultados de estudios listos**.

## 3. Plataforma y estilo

- iPhone de 390 × 844 pt, sin tablet ni escritorio. Respetá la *safe area*, el *home indicator* y la Dynamic Island.
- Seguí las **Apple Human Interface Guidelines**:
  - Tipografía SF Pro / system-ui con la escala de iOS (Large Title, Headline, Body, Footnote).
  - Listas agrupadas (*inset grouped*) y *sheets* con *detents*.
  - Swipe actions en las filas, segmented controls y tab bar inferior.
  - Áreas táctiles de 44 pt o más.
- La sensación buscada es **cálida, tranquila y confiable**: un producto de cuidado familiar, no un sistema hospitalario. Mucho aire, poca densidad y un solo acento de color para las acciones principales.
- **Cada persona tiene un color de avatar** y **cada tipo de actividad tiene un ícono** (SF Symbols o equivalente). El color nunca es el único indicador: siempre va acompañado de texto o ícono.
- Contraste AA como mínimo, compatible con Dynamic Type. Modo claro obligatorio; el modo oscuro es opcional.
- Sin textos legales en las pantallas. Las aclaraciones van en un ícono ⓘ o en un pie discreto, solo donde haga falta.

### Patrones tomados de apps reales

Aplicá estos patrones; vienen de apps que resuelven bien cada problema.

**Recordatorios (Due, Things 3 y las pautas de notificaciones de Apple)**
- Hoy se agrupa en **Mañana · Tarde · Noche**. En cada bloque, primero lo que tiene hora fija. Una tarea puede tener «para cuándo» sin hora («Renovar receta · antes del viernes»).
- Notificaciones con botones: **Tomada · Posponer · No puedo** para tomas, **Ver preparación · No puedo** para consultas.
- Si nadie responde, el aviso se repite a los 15 y a los 30 minutos y se corta apenas alguien marca la tarea. Posponer ofrece 10 min, 30 min y 1 h.
- Los avisos son relativos a la actividad («1 hora antes»): si se reprograma, el aviso se mueve solo.
- Un **resumen de la mañana** con el día, en lugar de muchos avisos sueltos. Tomas y consultas son sensibles al tiempo; el resto, normales.

**Medicamentos (Medisafe, Medicamentos de Apple y MyTherapy)**
- Una toma tiene tres estados: **Tomada**, **Omitida** (con motivo opcional) y **Sin registrar**.
- Si una toma de Antonio queda sin registrar 60 minutos, Sofía recibe «Una toma de Antonio está sin registrar». En la pantalla bloqueada no se nombra el medicamento.
- La medicación «si hace falta» (Paracetamol) no tiene horarios: tiene un botón **Registrar toma**.
- El aviso de reposición se define en días: «Avisame cuando queden 7 días».
- **Compartir resumen de medicación** para el médico: plan actual, tomas de las últimas 2 semanas y omitidas con su motivo. Sin conclusiones.

**Turnos (Zocdoc, Doctolib y Doctoralia)** — Nido no reserva turnos; los registra, los recuerda y ayuda a prepararlos.
- **Registrar turno pegando el mensaje**: desde ＋, la persona pega el SMS o WhatsApp de la mutualista y la IA propone fecha, hora, lugar, especialidad y para quién. Se revisa antes de crear.
- Aviso el día anterior: «Mañana 10:30 · Consulta de Antonio».
- La ficha de cada persona separa consultas **Próximas** y **Pasadas**. Cada consulta pasada guarda lo que se cargó después (indicación y estudios).

## 4. Personas de la demo (datos ficticios)

| Persona | Rol | Color | Cómo usa Nido |
| --- | --- | --- | --- |
| **Sofía**, 44 | Organizadora (mamá) | Verde | Usa todo. Ve lo de los demás solo en la medida en que se lo permitieron |
| **Antonio**, 79 | Papá de Sofía | Azul | Vista simple. Designó a Sofía como su representante |
| **Rosa** | Cuidadora de Antonio | Ámbar | Ve la agenda de Antonio y registra tomas y cuidados. No ve información sensible |
| **Fernando**, 46 | Pareja de Sofía, papá | Gris azulado | Ve la agenda de los hijos. Recibe tareas reasignadas |
| **Lucía**, 16 | Hija | Rosa | Ve solo lo suyo |
| **Mateo**, 8 | Hijo | Violeta | No tiene cuenta. Lo gestiona Sofía |

**Fecha de la demo:** jueves 12 de noviembre. Usá pocos datos, simples y creíbles.

**Hoy:**
- 08:00 · Antonio: tomar Losartán (lo hace Rosa).
- 10:30 · Antonio: consulta con medicina general (lo acompaña Sofía).
- 16:30 · Lucía: control odontológico (la lleva Sofía).
- 21:00 · Antonio: tomar Atorvastatina (lo hace Rosa).

**Esta semana:**
- Martes 17 · Antonio: radiografía de tórax.
- Miércoles 18 · Mateo: control pediátrico.

**Más adelante:**
- Carné de salud de Sofía vence en 30 días.
- Receta de Losartán de Antonio vence en 12 días.

**Medicamentos de Antonio** (ficticios; la dosis es la que la familia copió de la indicación, no una recomendación):

| Medicamento | Tomas | Stock |
| --- | --- | --- |
| Losartán 50 mg | 1 comprimido a las 08:00, todos los días | 18 comprimidos |
| Atorvastatina 20 mg | 1 comprimido a las 21:00, todos los días | 6 comprimidos (aviso de reposición) |
| Paracetamol 500 mg | Si hay dolor, sin horario | 10 comprimidos |

## 5. Arquitectura

**Tab bar:** Hoy · Calendario · **＋** (botón central) · Personas · Asistente.

- **Hoy (inicio).** Saludo y fecha. Arriba, chips de filtro por persona: Todos / Antonio / Lucía…
  - Secciones: **Ahora** (lo próximo o vencido, destacado), **Más tarde hoy**, **Esta semana** y **Para tener en cuenta** (vencimientos, reposición, pedidos de reasignación).
  - Muestra como máximo unos 5 ítems por sección y un enlace «Ver todo».
- **Calendario.** Vistas semana y mes con puntos de color por persona. Al tocar un día, se abre su lista.
- **＋** abre una hoja con: Sacar foto o subir documento · Nueva actividad · Nueva indicación de medicación · Nota de cuidado.
- **Personas.** Lista de la familia. Cada **ficha** tiene un encabezado con avatar y rol y, debajo, secciones:
  - Próximo.
  - Medicación.
  - Documentos.
  - Vencimientos (solo si aplica).
  - Valores registrados.
  - Notas de cuidado.
  - Historial de lo realizado.
  - **Quién ve mi información**.
- **Asistente.** Chat con sugerencias rápidas. Siempre muestra la **fuente** (documento o tarea) de lo que responde y **propone acciones que la persona confirma**.
- **Selector de perfil de la demo:** una pastilla flotante y discreta fuera del contenido de la app, rotulada «Demo · ver como…». Tiene que quedar claro que es un control de la demostración, no parte del producto.

## 6. Componente clave: tarjeta de actividad

Jerarquía, de mayor a menor peso visual:

1. **Avatar grande y nombre del destinatario** («Para Antonio»).
2. Título de la acción, en lenguaje natural: «Tomar Losartán 50 mg».
3. Ícono del tipo de actividad, día y hora («Hoy 08:00», «Mar 17 · 09:30»).
4. Responsable, si es otra persona, en texto secundario: «Lo hace Rosa».
5. Estado solo cuando importa: atrasada, sin responder o reasignación pedida.
6. Acción primaria según el tipo: **Tomada** / **Hecho** / **Ver preparación**.
   - Swipe derecha: completar.
   - Swipe izquierda: posponer o «No puedo».

**Tipos de actividad:** Consulta · Estudio · Tomar medicamento · Cuidado · Gestión (sacar hora, renovar receta, comprar) · Vacuna. Cada tipo tiene su propio detalle y sus propias acciones.

## 7. Recorridos que hay que diseñar en profundidad

Diseñá cada pantalla y cada estado, incluidos los vacíos, de éxito, de error y la confirmación con deshacer.

### R1 · Sofía revisa su día
Abre Nido y aterriza en Hoy, ve «Ahora · Para Antonio · Tomar Losartán · Lo hace Rosa» y toca la tarjeta.

El detalle de la toma muestra:
- Medicamento, dosis copiada de la indicación y hora.
- Stock actual.
- Botones **Tomada** / **Omitida** / **Posponer**.

Al marcar «Tomada»:
- La tarjeta sale de Hoy.
- Aparece un *toast* «Registrado · quedan 17 · Deshacer».
- La toma queda en el historial de Antonio con autor y hora.

Microcopy de honestidad, discreto: «Registra que se dio; no confirma que la tomó».

### R2 · De la indicación médica a las tomas (medicación de punta a punta)
1. Sofía toca ＋ → «Sacar foto», fotografía una indicación ficticia y elige a Antonio.
2. Pantalla **«Revisá lo que encontramos»**. La IA propone campos editables con el fragmento de la fuente al lado:
   - Medicamento.
   - Dosis (como figura).
   - Frecuencia y horarios.
   - Duración: tantos días o «sin fecha de fin».
   - Receta: vence el…
   - Un dato ilegible aparece marcado como «No pudimos leer esto · completalo vos».
3. Sofía confirma y Nido muestra **el plan propuesto**:
   - Tomas programadas con su aviso.
   - Una gestión **Comprar o retirar** con la cantidad estimada para cubrir la duración ingresada.
   - Un recordatorio de **renovar la receta**.
   
   Cada ítem se puede activar o desactivar y editar. Nada se crea hasta tocar **Crear plan**.
4. Ficha de medicación de Antonio:
   - Una fila por medicamento con stock grande, botones **− / +** y «Faltan ~6 días».
   - Vencimiento del medicamento y estado de la receta, como dos datos separados.
   - Botón **Reponer**.
5. Reponer lleva a la lista de reposición (ver C1).

### R3 · «No puedo» y reasignación
1. Sofía recibe un aviso a las 15:30: «Llevar a Lucía al odontólogo · 16:30». Puede responder **Estoy al tanto**, **Hecho** o **No puedo**.
2. Toca **No puedo** y elige el motivo («Se me superpone con otra cosa») o lo escribe.
3. La siguiente hoja pregunta **¿Qué hacemos?**:
   - **Pedirle a otra persona**: muestra solo a quienes tienen permiso. Elige a Fernando, el papá.
   - **Reprogramar**: crea automáticamente la gestión «Llamar al odontólogo para cambiar la hora», con responsable y fecha.
4. Al confirmar hay un feedback visible:
   - En Hoy aparece «Le pediste a Fernando · esperando respuesta».
   - O aparece la nueva gestión de reprogramar.
   
   El historial conserva quién, qué y cuándo.

### R4 · Permisos en tres niveles y representante
1. En Personas → Antonio → **Quién ve mi información** hay una fila por persona con acceso. Cada fila tiene tres niveles con interruptores y una explicación en una línea:
   - **Ver agenda**: cuándo, dónde y con quién.
   - **Ver información de salud**: indicaciones, estudios, documentos y medicación.
   - **Registrar y administrar medicación**: marcar tomas, ajustar stock.
2. Valores de la demo:
   - Rosa: agenda ✔ · salud ✘ · medicación ✔.
   - Sofía: los tres ✔ y figura como **Representante de Antonio**, con una nota de que actúa en su nombre y que queda registrado.
3. «Solo yo»: un documento individual puede quedar privado aunque el nivel esté activo. Mostralo en el detalle del documento con un candado.
4. Agregar persona → elegir niveles → enviar invitación (simulada).
5. El historial de cambios de permisos muestra quién, qué y cuándo.
6. **Avisos** en una sección aparte: «Quién recibe los avisos de Antonio». Por defecto todos los que tienen acceso, y cada persona lo puede apagar por tipo (tomas, consultas, vencimientos).
7. Probá el efecto: al cambiar a «ver como Rosa», no aparece nada de la información de salud. Tiene que ser una ausencia limpia, sin tarjetas grises bloqueadas.

### R5 · Preparar una consulta
El detalle de «Consulta medicina general · Antonio · Hoy 10:30» tiene una sección **Antes de ir**, en este orden:

1. **Estudios para llevar**: la lista de estudios pedidos con su estado («Hemograma ✔ adjunto», «Ecocardiograma ✘ falta el resultado») y la acción «Adjuntar desde documentos».
2. **Preguntas para el médico**: lista editable.
3. **Compartir resumen de medicación**: vista previa del resumen y botón para compartirlo.
4. **Logística**: autorización, traslado y acompañante. Incluye el botón conceptual «Solicitar acompañante» (C2).

Después de la consulta, ofrecé el botón **Cargar lo que indicó el médico**, que entra al recorrido R2.

## 8. Pantallas simples (sin tanta profundidad, pero prolijas)

- **Vista simple de Antonio**:
  - Letra extragrande y dos pestañas grandes, **Hoy** / **Mañana**.
  - Tarjetas enormes con una sola acción: **Tomada** o **Hecho**.
  - Un botón fijo **Necesito ayuda**, que avisa a Sofía y a Rosa.
  - No puede editar ni borrar. Puede abrir «Mis medicamentos» en modo lectura.
- **Documentos** (dentro de la ficha y en un buscador global):
  - Archivo cronológico con filtros por tipo (Resultados, Indicaciones y recetas, Informes, Carnés, Otros), por persona y por fecha.
  - Cada documento muestra la vista previa del original, sus datos y las tareas vinculadas. **Sin vencimientos.**
- **Vencimientos**: solo los que aplican a esa persona (carné de salud, carné de vacunas, receta) con aviso anticipado. No muestres categorías vacías.
- **Asistente**:
  - Ejemplo 1: «¿Qué tengo que hacer el martes 17 cuando lleve a papá a la radiografía?» → arma un **plan de salida**: radiografía 09:30; de paso, retirar Atorvastatina (queda poco stock) y renovar la receta de Losartán. Cada ítem tiene un botón «Agregar a mi día».
  - Ejemplo 2: «¿Dónde está la última radiografía de papá?» → devuelve el documento con fecha y un enlace. Si le piden interpretarla, responde amablemente que eso lo explica el médico.
- **Calendario** semanal y mensual, y **Nueva actividad**:
  - Formulario corto: para quién, qué (tipo), cuándo, quién lo hace, repetir, aviso.
  - Avisos sugeridos según el tipo (consulta: un día antes y 2 horas antes) y editables.
- **Historial de la persona**: lo realizado, agrupado por día, con autor.
- **Notas de cuidado**: qué pasó, cuándo, qué se hizo, quién lo registró y foto opcional.

## 9. Pantallas conceptuales

Rotulalas con un badge «Concepto». Muestran la idea; no hay servicio real.

- **C1 · Pedir a la farmacia.** La lista de reposición se puede editar y se envía a una farmacia asociada ficticia, con un posible descuento. Termina en «Pedido enviado (simulado)».
- **C2 · Traslado con acompañante.** Desde una consulta: pedir a alguien que lleve a Antonio, espere en la sala y lo traiga de vuelta. Se elige horario y se agregan notas para el acompañante.
- **C3 · Nido por WhatsApp.** Mockup de una conversación: Rosa recibe «08:00 · Losartán para Antonio. ¿Ya se lo diste?» y responde «Sí». Nido confirma y la toma aparece registrada en la app.
- **C4 · Valores en el tiempo.** En la ficha de una persona, un gráfico simple de un valor objetivo que se repite (por ejemplo, la presión registrada de Antonio o el peso y la talla de Mateo) con la fuente de cada punto. Sin interpretación, rangos «normales» ni conclusiones.

## 10. Reglas que no se pueden romper

- Nunca interpretar estudios, diagnosticar, sugerir dosis ni tratamientos. Los datos de medicación los ingresa o confirma la persona.
- Todo lo que propone la IA se **revisa y confirma** antes de crearse, y muestra su fuente.
- Registrar un turno no es reservarlo con la clínica. Marcar «Tomada» no prueba que la persona la ingirió. Decilo una sola vez y con poco texto, donde corresponda.
- Organizar la familia no da acceso a toda la salud de otros adultos. Lo que una persona no puede ver **no aparece**: ni el título, ni un candado, ni contadores que lo delaten.
- Toda acción importante se puede deshacer o corregir y queda en el historial con autor y hora.
- Los datos son ficticios. No uses marcas reales de mutualistas ni de farmacias.

## 11. Entregable

- El prototipo tiene que poder exportarse como sitio estático (HTML, CSS y JS, sin servidor) para publicarlo en Vercel.
- Prototipo clickeable con los recorridos R1 a R5 conectados de punta a punta, las pantallas simples y las conceptuales C1 a C4.
- Selector «ver como» funcional con Sofía, Antonio, Rosa y Lucía. Cambiar de perfil cambia lo que se ve.
- Una página inicial de la demo, antes de entrar a la app, con: qué es Nido, los perfiles disponibles y los 5 recorridos sugeridos para probar.
- Mostrá el sistema visual: colores de las personas, íconos por tipo, tarjeta de actividad en todos sus estados, botones, hojas y *toasts*.
- Mockups de la **pantalla bloqueada del iPhone** con las notificaciones de Nido: toma con botones, toma sin registrar enviada a Sofía, aviso del día anterior a una consulta y resumen de la mañana.
