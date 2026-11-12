# Análisis de las entrevistas del 11/11/2026 y dirección del nuevo prototipo

Fuentes: dos sesiones de prueba del prototipo con **Natalia** y **Felipe**, ambas del 11 de noviembre de 2026, más las [capturas del 12/11](capturas-prototipo-2026-11-12/README.md). Natalia razona con criterio clínico: habla de posología, de indicaciones y de cómo trabajan los médicos. Además cuidó de cerca a adultos mayores de la familia. Felipe tiene perfil técnico y piensa en IA, notificaciones y canales.

**Límites.** Son dos personas cercanas al equipo y las sesiones fueron guiadas, con explicaciones durante la prueba. Sirven para detectar problemas de usabilidad y de modelo, pero no prueban que haya demanda. Las transcripciones automáticas tienen fragmentos ilegibles, así que lo que se cita acá es lo que se entiende con claridad.

---

## 1. Lo que dijeron, agrupado por tema

### 1.1 Pantalla inicial: no un calendario, sino «lo que tengo que hacer»
- Natalia: «lo que vos me estás mostrando es un calendario». Esperaba una primera pantalla clara, con componentes grandes que muestren lo del día o lo que está programado.
- Felipe: «lo principal tiene que ser accionable». Puso como ejemplo «tenés esta consulta en 15 minutos». Propuso mostrar unos cinco próximos eventos y no adelantar lo que falta más de una semana, para no llenar la pantalla. También sugirió separar **lo que necesitás ya / esta semana / más adelante**.
- Esto contradice la decisión vigente de usar el «Calendario como inicio». Las dos personas coinciden.

### 1.2 Quién es el destinatario tiene que verse de inmediato
- Natalia: «Si se equivoca y le da la metformina a Sofía, es un quilombo». Pide destacar mucho más, en lo visual, **para quién** es cada cosa.
- Felipe no entendió las líneas «Antonio · Rosa», «Antonio · Antonio» y «Lucía · Sofía»: no sabía quién era el paciente y quién el responsable.
- Hoy el nombre aparece en texto gris chico y el formato «X · Y» es ambiguo.

### 1.3 Fechas y orientación
- Al recorrer pendientes, Natalia perdió la referencia del día: «No les cuesta nada poner la fecha». Cada tarjeta tiene que mostrar el día además de la hora.
- No pudo volver a la pantalla anterior: «no puedo volver para atrás, tengo que tocar una acción distinta». Falta una navegación tipo iOS con botón Atrás y gesto de deslizar.

### 1.4 Lo realizado sale de la lista de pendientes
- Natalia, después de marcar una toma: «no la dejes en la pantalla de cosas a cumplir… te atomiza». Lo realizado pasa a un **historial** («Ver historial» de Antonio), no queda como tarjeta.

### 1.5 Las acciones dependen del tipo de actividad
- En un cuidado («recordarle que se tiene que bañar») aparecía «Agregar pregunta para la consulta». Para ella no tiene sentido. Propone «Agregar observación o comentario».
- En la preparación de consulta había textos repetidos y «está como medio entreverado, medio atomizado».

### 1.6 Preparar una consulta: lo crítico son los estudios
- Natalia: «primer punto, los resultados de estudios prontos». Si el médico pidió hemograma, ecocardiograma y tomografía y no están, la consulta no sirve. Después viene la lista de dudas y, al final, autorización, traslado y acompañamiento.
- Felipe propuso que los estudios ya subidos se adjunten solos a la consulta como un check.

### 1.7 Permisos: «es crítico» y no lo encontró
- La configuración existe en Familia, pero Natalia no la encontró. Además entendió que Sofía veía todo y el resto solo lo suyo. El modelo no se percibe.
- Propone **tres capítulos**, más simples que las cinco categorías actuales:
  1. **Agenda**: cuándo, dónde y con quién.
  2. **Información sensible**, en paquete: qué dijo el médico, estudios pedidos, medicación indicada.
  3. **Accionar**: administrar la medicación o registrar tomas cuando llega el aviso.
- Lo decide cada adulto. Por ejemplo, la cuidadora acompaña a las consultas pero no maneja la medicación.
- Notificaciones y permisos van por caminos distintos. Las notificaciones pueden ser amplias por defecto y apagarse para quien no las necesite. Los permisos deben ser restrictivos por defecto.
- Queda abierto qué pasa con el adulto mayor que no usa la app: ¿quién otorga los permisos en su nombre? Natalia no lo resolvió.

### 1.8 Avisos
- Deben llegar como notificación de la app. «No sé si el mail agrega valor».
- Una familiar que no está con el abuelo, Sofía, quiere recibir también los avisos de medicación de Antonio aunque la que se la da sea Rosa. Hay que poder **elegir quién recibe qué aviso**.
- Felipe propone avisos automáticos según el tipo, por ejemplo un día antes y dos horas antes, y que se puedan editar. También recordatorios de preparación, como el ayuno.

### 1.9 «No puedo» tiene que generar el siguiente paso
- Al reasignar, Natalia esperaba que se creara una **tarea concreta**, como «llamar al odontólogo para cambiar la hora», no solo un cambio de responsable. Tampoco vio feedback: «no cambió nada».

### 1.10 Documentos: archivo sin vencimientos
- Natalia sobre la pantalla de Vigencias: «hicieron una ensalada». Solo el carné de salud, las vacunas y el carné de deportista tienen vigencia. Una mamografía, un estudio o un resultado **no vencen**.
- Los documentos son un **reservorio o historial**: orden por fecha, filtros por tipo y por grandes capítulos para encontrarlos rápido. Puso a SUMMUM como referencia de buen manejo del historial.
- Felipe: no hay que mostrarle a una persona vigencias que nunca le van a aplicar.
- Los documentos los carga el usuario. No hay integración con mutualistas: «el dueño de esa historia es el paciente».

### 1.11 Asistente con IA: organizar sí, interpretar no
- Natalia rechaza que la IA interprete estudios, porque condiciona al paciente antes de ver al médico. Acepta que lea recetas o indicaciones y proponga tareas.
- Su idea más fuerte es el asistente como «tour por el sistema de salud»: «Sofía, cuando vayas el martes 17, aprovechá y hacé esto, esto y esto». Agrupar gestiones (farmacia, sacar hora con el dermatólogo) alrededor de una salida que ya está planificada.
- Felipe quiere preguntar «¿cómo me fue en la última resonancia?» y que el asistente encuentre el archivo. Hay que conciliar las dos posturas: **devolver el documento fuente y los datos objetivos**, sin interpretarlos.
- Natalia advierte que un enfoque centrado en el chat exige mucho más testeo que el código tradicional.

### 1.12 Gráficas de valores repetidos
- Natalia propone graficar valores objetivos que se repiten, como la glucemia de una persona diabética o el peso y la talla en pediatría, sin análisis.

### 1.13 Medicación: la brecha más grande
- La cadena según Natalia es:
  1. **Indicación médica**: qué, dosis o posología, cada cuánto, por cuánto tiempo.
  2. **Compra o retiro** de la cantidad que cubra el tratamiento.
  3. **Stock en casa**.
  4. **Tomas programadas con aviso**.
- «La indicación tiene que estar adentro de la app para que pueda salir la alerta.»
- Las dos personas esperan que **registrar la toma descuente stock**. Hoy el prototipo hace a propósito lo contrario.
- Inventario por cajas con vencimientos distintos: «¿se la están complicando?». Felipe propone un **+/−** simple para la cantidad.
- Hay dos conceptos válidos que conviene mantener separados pero simples: el **vencimiento del medicamento** y la **receta vigente** para poder retirarlo.
- La pantalla de registrar toma está «media wow, la hicieron global». Pide una pantalla específica de la toma.
- Caso real que justifica el producto: la persona que armaba los pastilleros y le dejaba a la cuidadora la indicación «de mañana, de tarde», «cruzando los dedos». La app reemplaza esa memoria frágil.
- Recomendó hablar con la madre de Juan, que se ocupó de esto día a día.

### 1.14 Negocio y servicios (contexto, no foco del prototipo)
- La farmacia asociada es la vía de ingresos más mencionada: carrito, descuento, comisión. La suscripción paga «no creo que funcione».
- **Traslado con acompañamiento**: seguridad y tranquilidad, alguien que espera en la sala. El ejemplo es una suegra cada vez más limitada en lo físico. No pude verificar en internet el servicio «Toto» que mencionan. Hay referentes regionales, como Kualia en Colombia.
- Felipe propone un canal por WhatsApp para quien no usa la app (Rosa, Antonio): cargar y consultar por chat.

### 1.15 Detalles de la demo
- Los colores no gustan.
- Los ejemplos se entienden poco. Felipe pide ejemplos más simples.
- El cambio de perfil confunde: cuesta distinguir qué es la demo y qué es el producto.
- Felipe preguntó si Antonio puede o debería editar las tareas.

---

## 2. Qué cambia respecto de las decisiones vigentes

| Decisión vigente (CONTEXT.md) | Qué dicen las entrevistas | Propuesta |
| --- | --- | --- |
| Calendario como inicio | Las dos personas piden una pantalla «Hoy» accionable | Inicio = **Hoy**. El calendario pasa a ser una pestaña secundaria |
| Registrar toma no descuenta stock | Las dos esperan que descuente | Descontar al marcar «Tomada», con la posibilidad de deshacer y corregir. Sigue sin probar que la persona la ingirió |
| No calcular dosis ni duración | Natalia pide cargar posología, frecuencia y duración | Los datos **los ingresa la persona**, copiados de la indicación. La app los usa para programar tomas y estimar cuándo se termina. No recomienda nada |
| Inventario por cajas con fecha cada una | «Se la están complicando» | Cantidad total con +/−, un vencimiento opcional y receta vigente aparte. Las cajas quedan como detalle avanzado o se eliminan |
| 5 categorías de permisos | 3 capítulos: agenda / sensible / accionar | Pasar a **3 niveles por persona**, y que se encuentren desde el perfil de cada persona |
| Vigencias junto a documentos | «Ensalada»: los documentos no vencen | Separar **Documentos** (archivo) de **Vencimientos** (carné de salud, vacunas, deportista, receta), mostrando solo los que aplican |
| Asistente solo de búsqueda | Valor en organizar y agrupar gestiones | Asistente que propone un **plan de salida** y encuentra documentos. Nunca interpreta |

---

## 3. Qué priorizar en el nuevo prototipo

### Imprescindible (lo que tiene que estar y estar bien)
1. **Pantalla Hoy** con secciones Ahora, Hoy, Esta semana y Más adelante. Tarjetas grandes con **avatar y nombre del destinatario** destacados, tipo, fecha y hora, y responsable.
2. **Tarjeta de actividad clara**: «Para Antonio · Lo hace Rosa». Las acciones dependen del tipo: consulta, estudio, toma, cuidado, gestión o vacuna.
3. **Navegación iOS**: atrás, gesto de deslizar, hojas que se cierran, títulos grandes.
4. **Completar quita la tarjeta** de la lista y la manda al historial de la persona, con la opción de deshacer.
5. **Medicación de punta a punta**: indicación (qué, dosis, frecuencia, duración) → compra o stock → tomas con aviso → «Tomada» descuenta stock → aviso de reposición y de receta por vencer.
6. **Permisos en 3 niveles**, visibles desde la ficha de cada persona («Quién ve mi información»), más un selector de **quién recibe cada aviso**.
7. **Preparar consulta** enfocado en: estudios necesarios (listos o faltantes, con adjunto), preguntas para el médico y logística.
8. **«No puedo»** → reasignar y crear la tarea siguiente, como llamar para cambiar la hora, con un feedback visible.

### Importante
9. **Documentos** como archivo cronológico con filtros por persona, tipo y fecha, y captura con foto. La IA propone tareas desde una indicación o receta, y la persona revisa antes de guardar.
10. **Vencimientos** separados y solo cuando aplican.
11. **Asistente** que arma el «plan de salida» del día y encuentra documentos con su fuente.
12. **Vista simple para el adulto mayor**, que se mantiene: letra grande, Hoy y Mañana, botón «Tomada».

### Deseable (se puede mostrar como concepto)
13. Gráficas de valores objetivos repetidos.
14. Lista de reposición enviada a una farmacia (concepto comercial).
15. Traslado con acompañamiento.
16. Canal de WhatsApp para quien no usa la app.

### Fuera de alcance
Interpretar resultados, integrarse con mutualistas, suscripción paga y cualquier recomendación clínica.

---

## 4. Cómo hacer el nuevo prototipo

1. **Primero la arquitectura, después la pantalla.** Pestañas propuestas:
   - **Hoy** · **Calendario** · **＋** (central: foto o documento, actividad, medicamento) · **Personas** · **Asistente**.
   - Documentos, medicación, vencimientos, notas, vacunas e historial viven dentro de **la ficha de cada persona**. Responde al pedido de Natalia de ver todo lo de Antonio en un lugar.
   - Hay un buscador global para encontrar documentos sin entrar a cada persona.
2. **Un sistema visual iOS de verdad**: tipografía SF, componentes nativos (listas agrupadas, hojas, swipe para completar o posponer, botones de 44 pt o más). Un color por persona en el avatar y un ícono por tipo de actividad. El color nunca es el único indicador.
3. **Datos de ejemplo simples y creíbles**: menos actividades, nombres claros, el mismo día visible.
4. **Separar la demo del producto**: el selector de perfil queda como un control de demostración fuera de la interfaz de la app, con una etiqueta clara.
5. **Recorridos guionados para probar**, idealmente 4 o 5:
   - Sofía revisa el día y completa una toma.
   - Sofía carga una indicación y salen las tomas y la compra.
   - Rosa dice «No puedo» y se reasigna con la tarea siguiente.
   - Antonio decide qué ve Rosa.
   - Sofía prepara la consulta con los estudios.
6. **Claude Design genera la interfaz.** Le pasamos un prompt con contexto, perfiles, arquitectura, recorridos, principios y lo que NO debe hacer, junto con las capturas actuales como antirreferencia. Después lo validamos con las mismas personas y con la madre de Juan.

---

## 5. Preguntas abiertas

- ¿Quién otorga los permisos de un adulto mayor que no usa la app? ¿Representante designado, consentimiento registrado por Sofía?
- ¿Antonio puede editar tareas o solo marcarlas y ver?
- ¿El prototipo muestra el canal de WhatsApp y la farmacia como concepto o los deja afuera?
- ¿Las tomas deben poder registrarse sin abrir la app, desde la notificación?
- Hay que confirmar el rol de Natalia: ¿es la experta del proyecto o una familiar con formación clínica?

## Referencias consultadas

- [Mi Historia Clínica Digital (MSP)](https://www.gub.uy/ministerio-salud-publica/tramites-y-servicios/servicios/mi-historia-clinica-digital): historial con filtros por fecha y categoría. No pude confirmar el detalle de la app de SUMMUM ([App Store](https://apps.apple.com/us/app/summum-app/id1250969060)).
- [Medisafe y Medfriend](https://medisafe.com/family-caregiving-made-easy-medisafe/): un familiar recibe aviso si se omite una dosis. Es el modelo de «Sofía recibe los avisos de Antonio».
- Acompañamiento a consultas: [Kualia en Colombia](https://www.las2orillas.co/la-empresa-creada-por-una-cirujana-bogotana-para-acompanar-a-los-abuelos-a-sus-citas-medicas/), [AMEC en Uruguay](https://amec.uy/uploads/multimedia/8417b365a208fedf05e553b6fde074e2.pdf), [El Observador 2018](https://www.elobservador.com.uy/nota/acompanar-a-los-mayores-las-24-horas-a-traves-de-un-boton-una-nueva-oportunidad-de-negocio-201859500).

---

## 6. Decisiones confirmadas por Juan (12/11/2026)

1. **Inicio = pantalla «Hoy»** (Ahora / Hoy / Esta semana / Más adelante). El calendario pasa a una pestaña secundaria.
2. **Medicación: indicación → tomas → stock.**
   - La persona carga qué, dosis, frecuencia y duración tal como figuran en la indicación.
   - Se programan las tomas.
   - «Tomada» descuenta stock y se puede deshacer.
   - La cantidad se maneja con +/−, sin cajas.
   - El vencimiento del medicamento y la receta vigente quedan separados.
3. **Permisos en 3 niveles:** ver agenda / ver información sensible / accionar medicación. «Solo yo» sigue como excepción por documento.
4. **Alcance: 4 o 5 recorridos clave profundos.** Hoy, medicación de punta a punta, «No puedo» con reasignación, permisos y preparar consulta. El resto con pantallas simples.
5. **Representante designado:** Antonio designa a Sofía para gestionar sus permisos. Queda registrado el rol y su historial.
6. **Vista simple de Antonio:** ve, marca «Tomada» o «Hecho» y puede tocar «Necesito ayuda». No edita ni borra.
7. **Avisos amplios por defecto:** todos los que tienen acceso reciben el aviso y cada uno lo apaga. Los permisos, en cambio, son restrictivos por defecto.
8. **Pantallas conceptuales extra:**
   - Enviar la lista a la farmacia.
   - Solicitar traslado con acompañante.
   - Rosa marca una toma por WhatsApp.
   - Gráfica de un valor objetivo repetido.

   Las cuatro se identifican como concepto: sin compra, servicio ni integración reales.
