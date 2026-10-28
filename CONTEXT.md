# Nido — contexto de trabajo

Actualizado: 28 de octubre de 2026. Este archivo reúne estado, decisiones, evidencia y operación. IDEA.md explica el producto; README.md sirve de entrada. Evitar duplicar decisiones en documentos paralelos.

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

## Estado real del prototipo

`prototype/public/index.html` es una copia adaptada del HTML exportado de Claude Design. Contiene plantilla, estilos, recursos incrustados y lógica de estado. No es una aplicación nativa ni tiene backend. Usa datos ficticios, fechas de demostración de agosto de 2026 y estado en memoria que se pierde al recargar.

Cambios realizados: diseño fluido para iPhone, altura dinámica de Safari, zonas seguras, campos de 16 px, eliminación del marco y controles de hardware simulados, calendario inicial y cabecera reordenable. Corrección del error de destinatarios del recordatorio y de la estructura del medicamento agregado. Fechas desconocidas de medicamento se deben mostrar como desconocidas, sin inventarlas.

Prueba realizada: carga inicial en WebKit a 375, 390 y 430 px, sin errores JavaScript ni desplazamiento horizontal. No equivale a pruebas de todos los recorridos ni a una prueba en iPhone físico.

### Limitaciones pendientes

- Interfaz mayormente en inglés; selector de español no traduce realmente.
- Asistente por palabras clave y respuestas prefijadas; audio simulado.
- Aparente reserva de turnos, compra y transporte sin integración externa.
- Acceso amplio de administradora; filtros inconsistentes entre carpetas, agenda, medicamentos y chat; enlaces directos sin revalidación.
- Otorgar acceso elige un candidato automáticamente; falta una aceptación real representada por el titular.
- Reabrir tareas elimina autor/hora anteriores; falta historial acumulado.
- Tareas pasadas sin registro aparecen como incumplidas; distinguir falta de registro.
- Stock sin lotes/cajas múltiples y con umbral fijo; falta conexión explícita con registros de administración.
- Documentos almacenan metadatos de ejemplo, no archivos clínicos reales.
- Vacunas precargadas sin verificación de pauta vigente; familia y parentescos ficticios con inconsistencias.
- Persistencia, estados vacíos, validaciones y cancelaciones necesitan revisión del recorrido completo.

## Dirección del rediseño — propuesta

Navegación de cinco destinos: Calendario, Documentos, Asistente, Medicamentos y Familia. Tareas dentro de Calendario; notas y vacunas dentro del integrante. Esta agrupación es una propuesta, no una decisión del usuario. Mantener nombres además de colores y distinguir paciente, responsable y destinatario del aviso.

Documentos: elegir persona, mostrar fuente, revisar/corregir campos, confirmar visibilidad, guardar y ofrecer pendiente opcional. No presentar extracción simulada como lectura real de cualquier archivo. Fecha desconocida queda sin fecha.

Permisos: sin acceso, solicitado, concedido y revocado; mismo efecto en todos los módulos. Escenarios de menores y representación de adultos dependientes requieren definición propia. Una demo de cambio de personaje no autentica al titular.

Medicamentos: separar cantidad, cajas, vencimiento del envase y receta. Corregir inventario con fecha de actualización. Renovación y compra son gestiones distintas. Registrar toma no demuestra ingestión.

Calendario: crear/editar/reprogramar/cancelar; registrar responsable; preparar consulta con documentos y preguntas. No prometer reserva externa. Conservar historial al completar/reabrir. Notas de cuidado, vacunas y acompañamiento se representan de manera secundaria.

## Pruebas y prioridades

1. Corregir coherencia de permisos, trazabilidad y acciones simuladas.
2. Completar calendario y recorrido documento a pendiente.
3. Completar medicamentos/reposición y coordinación familiar.
4. Unificar español y accesibilidad táctil; revisar tamaños, teclado, scroll y estados vacíos.
5. Probar con familiares/cuidadores: encontrar turno, crear pendiente desde indicación, corregir existencias, repartir tarea y restringir documento.
6. Registrar finalización sin ayuda, errores, retrocesos y comprensión del resultado; iterar.

Criterios de aceptación: sin desbordamiento horizontal en iPhone; eventos editables; recordatorios sin errores; fuente recuperable desde tarea; alta de medicamentos consistente; historial preservado; revocación efectiva en todos los módulos; simulaciones identificadas.

## Operación y publicación

Repositorio: `https://github.com/JuanCortabarria/VaPrototipo_Nido`, rama actual `main`.
Equipo Vercel: `juancortabarrias-projects` (`team_WohC5HtK35faU6BdNXiUqbpU`). Acceso del conector confirmado en esta sesión. En el listado consultado no figura aún un proyecto de Nido. Proyecto propuesto: `nido-prototipo-iphone`, separado de otros sitios.

Configuración: Root Directory `prototype`, Framework Other, Output Directory `public`, sin instalación ni compilación. Así se publica únicamente el contenido de `prototype/public`; los documentos de proyecto y pruebas quedan fuera del sitio.

Desarrollo local: desde raíz, `python3 -m http.server 8000 --directory prototype/public`. Test móvil: con Playwright disponible, `node prototype/tests/mobile.cjs` (variable opcional `PLAYWRIGHT_MODULE` para indicar ubicación del paquete). El test admite `NIDO_URL` para comprobar un deployment. La prueba es de carga y tamaño, no de aceptación integral.

No publicar datos de pacientes reales ni credenciales en esta demostración. No cambiar otros proyectos Vercel ni asumir que la landing histórica es este prototipo. URL pública y estado final se actualizan cuando exista un deployment verificado.

## Procedencia y conservación

Consolidado de Contexto_Proyecto_Nido.md, Discovery de Nido.pdf, Formulario_SF.docx, Formulario_Emprendimineto_Cie.docx, HTML original y decisiones del usuario en este chat. El README original solo contenía el nombre del repositorio. Antes de reemplazar la estructura se conserva un respaldo externo con los seis archivos originales. Los formularios firmables y sus datos académicos se recuperan del respaldo; estos Markdown no sustituyen sus formatos oficiales.

Pendientes académicos: confirmar experta y carta, aval CIE, consolidar identidad de entrevistados/revisitas, auditar landing si se obtienen originales y alinear formularios con decisiones vigentes. Contactos personales y números de estudiantes no se duplican en la documentación de trabajo.
