# Nido — contexto de trabajo

Actualizado: 29 de octubre de 2026. Este archivo reúne estado, decisiones, evidencia y operación. IDEA.md explica el producto; README.md sirve de entrada. Evitar duplicar decisiones en documentos paralelos.

## Proyecto y equipo

Tesis/proyecto final de Ingeniería en Sistemas, Universidad ORT Uruguay, Laboratorio de Proyectos Aplicados. Propuesta emprendedora de desarrollo de producto. Equipo: Juan Cortabarria, Martín Obes y Joaquín Kalichman. Experta propuesta: Natalia Labat, doctora con más de 30 años de experiencia; confirmación formal y carta pendientes según el material recibido. Enrique participa en la validación de la idea; falta confirmar el aval docente del CIE.

Nido es el nombre de trabajo; no se ha verificado disponibilidad definitiva. Existió una demo de landing en `https://nido-poc.vercel.app/`; su propiedad, versión y conexión con este repositorio no se verificaron. No reemplazarla al publicar este prototipo.

## Decisiones confirmadas por el usuario

- Objetivo de las próximas dos semanas: prototipo navegable completo para probar con familiares/cuidadores y presentar en facultad.
- Diseñar para celulares iPhone y publicar en Vercel para abrir desde Safari. No hay una entrega adicional impuesta por el profesor.
- Se puede replantear desde cero si la investigación lo justifica.
- Representar todos los módulos; recorridos principales completos y secundarios más simples.
- Escenario: una persona organiza la salud de hijos y un adulto mayor, con ayuda ocasional.
- Calendario familiar como inicio, manteniendo esta orientación del HTML.
- Cada adulto decide qué comparte; organizador solicita acceso y ve su estado.
- Priorizar foto/documento → revisar datos → guardar → crear pendiente.
- Mejorar primero la app; decidir WhatsApp después.
- Ningún documento manda automáticamente ante contradicciones: distinguir evidencia, propuesta y decisión; resolver con el usuario.
- Próxima prioridad confirmada: medicamentos y recetas, enfocada en cajas, vencimientos y renovación; no desarrollar horarios ni registro de tomas en esta iteración.
- Antonio abre una agenda simplificada con letras grandes y pocas acciones.
- Permisos elegibles por categoría, con documentos individuales privados como excepción permanente.
- Tareas asignadas directamente; el responsable registra cumplimiento, sin etapa de aceptación.
- Evaluación mediante exploración libre y comentarios posteriores.
- Revisar juntos una matriz de necesidades, evidencia y funciones; no asumir que toda sugerencia es un requisito validado.
- Indicación futura → pendiente con inicio anticipado de gestión → fecha de turno confirmada por el usuario.
- Preparación de consulta: documentos, autorización, traslado e indicaciones ingresadas por el usuario.
- Inventario por persona, sin ubicaciones en esta etapa.
- Notas de cuidado: qué ocurrió, cuándo, qué se hizo, quién lo registró y foto opcional.
- Recuperación documental por persona, fecha y tipo, con acceso a la fuente original disponible.
- Preguntas al usuario en formato de selección. Idioma de trabajo: español rioplatense, claro y conciso.

## Base de investigación y sus límites

El discovery describe 17 archivos de transcripción: 10 entrevistas iniciales, cuatro revisitas probables, dos de segunda ronda sin inicial identificada y una reunión experta. Sugiere 12 identidades de usuarios, sujetas a confirmar. No son 17 usuarios independientes. Las transcripciones originales no estaban en esta carpeta; aquí se consolidan las conclusiones reportadas, no una nueva auditoría de entrevistas.

Hallazgos: indicaciones que quedan sin agendar; recetas vencidas detectadas al retirar medicación; recordatorios con anticipación insuficiente; reparto informal de compras y cuidados; pérdida de documentos externos; rechazo al esfuerzo de mantener datos. Contraejemplos: algunos usuarios gestionan bien con sus hábitos o portales de prestadores. El cuidado de otro adulto con gestiones recurrentes es un segmento candidato, no una conclusión universal.

La experta aporta necesidades de confidencialidad, permisos trazables, registro de cumplimiento, continuidad entre cuidadores y límites del asistente. Es orientación del dominio, no evidencia adicional de demanda. Plazos de recetas, esquemas de vacunas y obligaciones legales mencionados en los documentos requieren verificación específica antes de implementarlos como reglas reales.

### Referentes internacionales

El discovery reporta 38 casos iniciales y 12 análisis profundos, más una ampliación de 30 casos con superposiciones: no sumar como 68 productos únicos. Las matrices y fuentes completas no estaban en esta carpeta.

| Referentes reportados | Aprendizaje candidato | Límite |
| --- | --- | --- |
| Caring Village, Jointly, CareClinic | Tareas y responsabilidades compartidas | Colaboración también agrega esfuerzo |
| Guava, Paperless | Captura, clasificación y recuperación | Extracción no garantiza exactitud |
| Medisafe, Dosecast, MedAdvisor | Recordatorios, registro y reposición | Dependencias farmacéuticas y mantenimiento |
| MY LUZ, Mi Quirónsalud, SUMMUMApp | Conectar documentos con gestiones | Un prestador dispone de datos que Nido no tiene |
| Google Calendar | Recurrencias, filtros y permisos | Agenda compartida no equivale a responsabilidad |
| Google Health, HealthVault, CareZone | Continuidad y salida de información | No atribuir cierres a una causa sin evidencia |

Son mecanismos para explorar; no implican que se hayan probado estas apps directamente ni que haya APIs disponibles. No afirmar que ningún competidor integra estas funciones.

### Landing

Cifras reportadas por el formulario CIE: 227 visitantes, 96 clics en Probar Nido, 99 selecciones de plan y 61 correos. 17 registros asociados a Plus; 14 de 15 respuestas sobre USD 4,99 lo consideraron razonable. No hubo cobros. No interpretar estos eventos como un embudo secuencial ni como pago, retención o demanda representativa. Faltan exportaciones, fechas, unicidad y origen del tráfico.

### Hipótesis de negocio e impacto

Hay versiones incompatibles: gratuidad financiada por farmacias, freemium y suscripción. El contexto histórico modelaba una comisión del 7%, 1.000 gestores, 5.000 personas, USD 50.000 mensuales de ventas atribuibles y USD 3.500 de ingresos, con costos aproximados de USD 2.400 sin sueldos. Son supuestos de escenario, no acuerdos comprobados, ingresos reales ni rentabilidad validada. El formulario CIE mantiene el modelo abierto. No priorizar monetización en el trabajo actual.

La reducción del 25% del tiempo de coordinación es una meta preliminar mencionada en los formularios, no un resultado. Requiere línea de base y uso real.

## Contradicciones y resolución

| Tema | Material anterior | Estado actual |
| --- | --- | --- |
| Canal principal | Formularios/contexto priorizan WhatsApp; discovery lo deja abierto | Usuario eligió mejorar app primero |
| Priorización | Agente/calendario/stock MUST; tareas/permisos SHOULD; carpetas CAN | Representar todos; profundizar recorridos acordados. No usar SHOULD para justificar acceso excesivo |
| Evidencia | Formularios afirman potencial de mercado y exclusividad | Mantener límites del discovery; conclusiones comerciales no demostradas |
| Datos académicos | Contexto dice que faltan números de estudiantes | El formulario CIE ya los contiene; originales respaldados |
| Permisos | Administradora con acceso amplio en HTML | Cada adulto autoriza lo compartido |
| Modelo económico | Versiones gratuitas y pagas | Pendiente, fuera del foco actual |

## Estado real del prototipo — versión de varios perfiles

Rediseñado en español con HTML, CSS y JavaScript separados en `prototype/public/`. Calendario como inicio; cinco destinos: Calendario, Documentos, Asistente, Medicamentos y Familia. Fecha inicial relativa al día de apertura. Persistencia en localStorage (`nido-demo-v3`) y restablecimiento desde Familia. Sin dependencias de compilación.

### Perfiles de demostración

- Sofía: administradora. Accede a sus registros y a los de hijos y Antonio que estén compartidos. No obtiene acceso universal por su rol.
- Antonio: abuelo. Solo accede a sus propios registros. Controla autorizaciones generales y visibilidad de documentos.
- Rosa: cuidadora. Solo tareas y notas de cuidado autorizadas de Antonio; no documentos clínicos ni medicamentos.
- Lucía: hija. Solo su información. Puede ver quién es responsable de su turno, sin acceder a datos de salud de esa persona.

Escenario pedido por el usuario: Antonio tiene un resultado ficticio de anatomía patológica con un diagnóstico de cáncer. Es «Solo yo». Sofía no ve el contenido, el título ni la consulta vinculada en documentos, calendario, pendientes, búsqueda, asistente o avisos. Antonio puede compartirlo voluntariamente y volver a hacerlo privado. No usar datos reales de pacientes para representar este escenario.

### Recorridos implementados

- Cambio de perfil limpia modal, búsqueda y conversación anterior.
- Calendario semanal/mensual, filtros, agenda y pendientes. Crear, editar, reprogramar, completar, reabrir y cancelar con confirmación; historial conservado.
- Recordatorio con anticipación y destinatario; solo configuración de demo. Preguntas para la consulta y acceso a documento fuente.
- Carga de imagen/PDF ficticio de hasta 1 MB, revisión de datos manual o ejemplo preparado, confirmación y creación de pendiente vinculado.
- Visibilidad del documento propagada a las tareas vinculadas. Accesos reevaluados al abrir registros.
- Medicamentos con cantidades por caja, vencimientos de caja/receta separados, corrección de existencias, lista de reposición, registro de compra y pendiente de renovación.
- Notas de cuidado con autor/fecha y registro manual de vacunas, sin recomendación sanitaria automática.
- Solicitud de acceso de Sofía, aceptación por Antonio, autorización de cuidadora y revocación; historial de permisos para el titular.
- Asistente de búsqueda sobre datos visibles. Sin interpretación médica ni respuestas que revelen registros privados.
- Estados vacíos, etiquetas de privacidad, formularios, corrección de acciones y conservación local de cambios.

### Ampliación de medicamentos, permisos y agenda simple

- Inventario por cajas ordenadas por fecha. Cantidades separadas: fecha vigente, vencida y sin registrar; no se presentan todas como disponibles para tratamiento.
- Retiro de caja con motivo e historial y restauración del registro. La cantidad total activa excluye cajas retiradas.
- Búsqueda y filtros Todos, Revisar, Recetas y Reposición. Umbral de revisión de cantidad y días de aviso de receta configurables por medicamento.
- Flujo de renovación: pendiente de coordinar → consulta coordinada → nueva receta registrada. Reutiliza un único pendiente activo por medicamento; registrar una nueva receta cierra la gestión y conserva el vencimiento anterior en el historial. Iniciar la gestión no extiende su vigencia.
- Fecha desconocida explícita, sin inventar vencimientos; edición de datos sin alterar las cantidades de las cajas. No valida legalmente la receta ni calcula dosis o días de tratamiento.
- Antonio entra en Hoy/Mañana y próximas actividades con tipografía mayor, con opción de abrir calendario completo y volver a la vista simple.
- Categorías de acceso: agenda/gestiones, medicamentos/recetas, documentos, tareas/notas de cuidado, vacunas. Los permisos anteriores se interpretan conservando sus alcances; los nuevos se guardan como categorías. Los documentos «Solo yo» continúan excluidos.
- El filtro central evalúa la categoría del registro en cada vista y exige también autorización sobre fuentes vinculadas. Revocar medicamentos oculta las gestiones vinculadas; revocar documentos oculta sus actividades vinculadas. Cambiar perfil limpia resultados anteriores.
- Asignación directa de tareas, sin aceptación. Comentarios de exploración desde Familia: facilidad percibida, qué intentó y qué cambiaría; guardado local y descarga JSON del propio perfil, sin envío automático.
- Se conserva el almacenamiento anterior (`nido-demo-v3`), con una actualización compatible del vínculo de la renovación de ejemplo. Los ejemplos nuevos de cajas se ven en una demo nueva o al restablecerla; no se sobrescriben cambios existentes.

### Validación realizada

WebKit a 375, 390 y 430 px: carga y las cinco secciones sin desbordamiento horizontal ni errores JavaScript. Pruebas de recorridos: separación de perfiles; documento privado y consulta asociada; ausencia de resultado en asistente/avisos; compartir y volver a restringir; revocación/solicitud/aceptación; documento a pendiente; stock con cero unidades y compra; completar/reabrir con historial; crear/editar/cancelar actividad; destinatario de aviso; preguntas; vacunas; notas de cuidadora; persistencia al recargar. Se revisaron capturas de calendario, documento privado, agenda simplificada y medicamentos. También se probaron retiro/restauración de cajas, fechas desconocidas y vencidas, renovación sin duplicados, recepción de receta sin alterar inventario, permisos independientes de documentos/medicación, comentarios descargables y persistencia. Se verificó el ancho del área desplazable, además del ancho de la página. Pendientes pruebas con usuarios y en iPhone físico.

### Límites de esta versión

Los permisos se simulan en cliente con datos ficticios: todos los datos de demostración están en código/almacenamiento del navegador. No hay autenticación, autorización de servidor, cifrado clínico, sincronización entre dispositivos ni servicio de notificaciones. El selector de persona no es login. La persistencia local puede borrarse con los datos del navegador. Los archivos no se suben a un servidor.

La extracción del ejemplo es una simulación declarada; archivos arbitrarios requieren completar datos. El asistente usa búsqueda y reglas, no IA conectada. Reservas, compras y renovaciones se registran para organizar gestiones; no se ejecutan con terceros. Los esquemas de vacunas, representación jurídica de menores/adultos dependientes y autorización de datos reales requieren diseño y validación posteriores. Se representa la preparación del traslado como paso organizativo; transporte externo no está integrado. No prometer completitud de producto productivo ni seguridad clínica por pasar pruebas del prototipo.

## Respuestas, reasignación y carga mínima

Decisiones confirmadas: repetir el aviso al responsable hasta que responda; «No puedo» solicita reasignación a Sofía; medicamentos sigue limitado a stock, vencimientos y recetas; guardar documentos solo exige persona y archivo.

- Avisos reiterados representados en la demo: 60 minutos como valor inicial editable (30, 60, 120 minutos o un día), pendiente de validación con usuarios. «Simular siguiente repetición» permite probar el estado sin esperar ni emitir notificaciones reales.
- «Estoy al tanto» detiene la repetición y conserva la actividad pendiente. Completar o cancelar también la detiene. Reabrir, cambiar fecha/hora o responsable reinicia la respuesta pendiente. Los avisos de repetición corresponden al responsable y respetan su acceso.
- «No puedo» conserva la actividad y registra motivo opcional, autor y fecha. Sofía ve la solicitud solamente si ya tiene acceso; reasigna a otro perfil autorizado sin ampliar permisos, conservando fuente e historial. No se envían mensajes externos.
- Carga mínima: persona y JPG/PNG/WebP/PDF ficticio de hasta 1 MB. Nombre del archivo como título provisional, fecha desconocida y contenido vacío; no inventar datos extraídos. Privacidad opcional al guardar. «Completar datos» permite editar después conservando el archivo original.
- No se implementan horarios ni registro de tomas en esta iteración, por decisión expresa. El problema permanece identificado en la matriz.

Validación de esta ampliación: `responses-and-quick-upload.cjs` comprueba solicitud, candidatos autorizados, reasignación, repetición simulada, respuesta sin cierre, reapertura, carga mínima, edición posterior y conservación del original. Pasaron además scenarios, privacy-and-care, discovery-flows y medication-and-categories. Revisión visual de avisos a 375 px; anchos de 375/390/430 px comprobados. iPhone físico y pruebas con usuarios pendientes.

## Matriz de cobertura para revisar juntos

Esta matriz distingue necesidades reportadas en la síntesis de entrevistas, orientación de la experta y decisiones de diseño del usuario. No contiene citas verificadas contra transcripciones originales. «Implementado» describe un recorrido del prototipo; su utilidad con usuarios sigue sin validarse. Las seis decisiones de esta ronda están confirmadas; la cobertura completa todavía debe revisarse juntos.

| Necesidad / evidencia disponible | Respuesta del prototipo | Estado y comprobación pendiente |
| --- | --- | --- |
| Indicaciones que quedan sin agendar — síntesis de entrevistas | Documento → pendiente → inicio de gestión anticipado → turno confirmado; misma fuente e historial | Navegable y probado. Ver si la familia distingue objetivo, inicio de gestión y fecha confirmada |
| Preparar consultas — propuesta de coordinación y decisión del usuario | Lista editable: documentos, autorización, traslado e indicaciones ingresadas; responsable de cada cambio | Navegable y probado. No genera preparación médica; confirmar utilidad con entrevistados |
| Papeles e información difíciles de recuperar — síntesis de entrevistas | Filtros por persona, fechas y tipo; documento y fuente original | Navegable y probado. Ejemplos sin archivo se identifican como texto; medir recuperación sin ayuda |
| Recetas vencidas y falta de existencias — síntesis de entrevistas | Cajas, vencimientos, corrección, reposición y renovación separadas | Navegable y probado. Inventario manual por persona; sin ubicaciones por decisión del usuario |
| Continuidad entre cuidadores — síntesis y orientación experta | Observación, momento de lo ocurrido, acción realizada, autor, momento del registro y foto opcional | Navegable y probado. Comprobar que el siguiente cuidador entiende qué pasó y qué falta |
| Reparto informal de gestiones — síntesis de entrevistas | Asignación directa y registro de cumplimiento con historial | Navegable. Pendiente decidir cómo resolver una tarea que el responsable no puede hacer |
| Confidencialidad — orientación experta y decisión del usuario | Categorías, excepciones privadas y revocación en vistas relacionadas | Simulado con datos ficticios. Falta seguridad de servidor y definición de representantes |
| Carga y mantenimiento que exigen esfuerzo — síntesis de entrevistas | Captura mínima por persona/archivo, datos completables después y ejemplo de extracción | Parcial: OCR, voz y sincronización no implementados. Medir esfuerzo de carga y actualización |
| Olvidos y recordatorios insuficientes — síntesis y problema inicial del usuario | Configuración de avisos de gestiones y anticipación para recetas | Parcial: repetición hasta respuesta simulada; no hay entrega real ni escalamiento. Tomas fuera del alcance por decisión del usuario |
| Facilidad para mayores — decisión del usuario | Agenda simplificada de Antonio, letras grandes y pocas acciones | Navegable. Pendiente observación en iPhone físico con usuarios |

### Recorridos añadidos en esta ronda

- Objetivo indicado y fecha de inicio de gestión separados. Si el usuario completa el objetivo y deja vacío el inicio, se calcula con la anticipación elegida (14 días como valor editable de demostración, no regla clínica). No se infieren plazos del texto médico.
- Registrar un turno confirmado actualiza la misma actividad, conserva el documento fuente y el historial. Fecha posterior al objetivo se señala sin impedir registrar lo acordado con el prestador.
- Lista de preparación con pasos generales editables mediante agregado y marcado; guarda quién marcó cada paso y cuándo. No interpreta indicaciones médicas.
- Documentos filtrables por persona, tipo e intervalo de fechas; clasificación al cargar. Acceso al archivo adjunto o al texto de ejemplo, claramente diferenciado.
- Notas con fecha/hora del episodio, acción realizada y fecha/autor del registro. Foto ficticia opcional JPG/PNG/WebP de hasta 1 MB, guardada localmente. Registros antiguos siguen visibles sin inventar datos faltantes.
- Prueba `prototype/tests/discovery-flows.cjs`: seguimiento sin duplicados, fuente conservada, preparación persistente, filtros, original, nota con foto y control de acceso. Regresión: mobile, scenarios, privacy-and-care y medication-and-categories. WebKit a 375/390/430 px; pruebas con personas e iPhone físico pendientes.

## Dirección del rediseño — propuesta

Navegación de cinco destinos: Calendario, Documentos, Asistente, Medicamentos y Familia. Tareas dentro de Calendario; notas y vacunas dentro del integrante. Esta agrupación es una propuesta, no una decisión del usuario. Mantener nombres además de colores y distinguir paciente, responsable y destinatario del aviso.

Documentos: elegir persona, mostrar fuente, revisar/corregir campos, confirmar visibilidad, guardar y ofrecer pendiente opcional. No presentar extracción simulada como lectura real de cualquier archivo. Fecha desconocida queda sin fecha.

Permisos: sin acceso, solicitado, concedido y revocado; mismo efecto en todos los módulos. Escenarios de menores y representación de adultos dependientes requieren definición propia. Una demo de cambio de personaje no autentica al titular.

Medicamentos: separar cantidad, cajas, vencimiento del envase y receta. Corregir inventario con fecha de actualización. Renovación y compra son gestiones distintas. Registrar toma no demuestra ingestión.

Calendario: crear/editar/reprogramar/cancelar; registrar responsable; preparar consulta con documentos y preguntas. No prometer reserva externa. Conservar historial al completar/reabrir. Notas de cuidado, vacunas y acompañamiento se representan de manera secundaria.

## Pruebas y prioridades

1. Mantener la coherencia implementada de permisos y trazabilidad ante nuevas funciones.
2. Evaluar con usuarios el calendario y el recorrido documento a pendiente implementados.
3. Evaluar mantenimiento del inventario y claridad de la coordinación familiar.
4. Revisar en iPhone físico teclado, scroll, legibilidad y accesibilidad táctil.
5. Dejar que familiares/cuidadores exploren libremente; después recoger qué intentaron, qué entendieron y dónde se trabaron. No guiar el recorrido salvo que pidan ayuda; registrar esas ayudas.
6. Registrar finalización sin ayuda, errores, retrocesos y comprensión del resultado; iterar.

Criterios de aceptación: sin desbordamiento horizontal en iPhone; eventos editables; recordatorios sin errores; fuente recuperable desde tarea; alta de medicamentos consistente; historial preservado; revocación efectiva en todos los módulos; simulaciones identificadas.

## Operación y publicación

Repositorio: `https://github.com/JuanCortabarria/VaPrototipo_Nido`, rama actual `main`.
Equipo Vercel: `juancortabarrias-projects` (`team_WohC5HtK35faU6BdNXiUqbpU`). Acceso del conector confirmado durante la publicación. Proyecto creado: `nido-prototipo-iphone` (`prj_vKnWajD3DFAU601YSOv74G9GRPqQ`), conectado a GitHub y separado de otros sitios.

Configuración: Root Directory `prototype`, Framework Other, Output Directory `public`, sin instalación ni compilación. Así se publica únicamente el contenido de `prototype/public`; los documentos de proyecto y pruebas quedan fuera del sitio.

Desarrollo local: desde raíz, `python3 -m http.server 8000 --directory prototype/public`. Test móvil: con Playwright disponible, `node prototype/tests/mobile.cjs` (variable opcional `PLAYWRIGHT_MODULE` para indicar ubicación del paquete). El test admite `NIDO_URL` para comprobar un deployment. Prueba de carga y tamaño: `prototype/tests/mobile.cjs`. Recorridos principales: `prototype/tests/scenarios.cjs`. Casos adicionales de privacidad y cuidado: `prototype/tests/privacy-and-care.cjs`. Todos requieren Playwright con WebKit; `PLAYWRIGHT_MODULE` puede indicar el paquete. `scenarios.cjs` y `medication-and-categories.cjs` admiten `NIDO_URL` para verificar el enlace publicado. La prueba nueva cubre cajas, renovación, categorías, agenda simple y comentarios.

No publicar datos de pacientes reales ni credenciales en esta demostración. No cambiar otros proyectos Vercel ni asumir que la landing histórica es este prototipo. URL pública: https://nido-prototipo-iphone.vercel.app. Primer despliegue confirmado READY en producción desde el commit `76cfa7f`, por integración Git; sin autenticación Vercel para abrir la demo. Nuevos pushes a main actualizan el sitio.

## Procedencia y conservación

Consolidado de Contexto_Proyecto_Nido.md, Discovery de Nido.pdf, Formulario_SF.docx, Formulario_Emprendimineto_Cie.docx, HTML original y decisiones del usuario en este chat. El README original solo contenía el nombre del repositorio. Antes de reemplazar la estructura se guardó `respaldo-originales-2026-10-28.zip` en el espacio de trabajo de Tesis-Nido, bajo `outputs/nido-contexto-prototipo/`, con los seis archivos originales y verificación de igualdad de contenido. Los formularios firmables y sus datos académicos se recuperan del respaldo; estos Markdown no sustituyen sus formatos oficiales.

Pendientes académicos: confirmar experta y carta, aval CIE, consolidar identidad de entrevistados/revisitas, auditar landing si se obtienen originales y alinear formularios con decisiones vigentes. Contactos personales y números de estudiantes no se duplican en la documentación de trabajo.
