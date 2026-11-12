# Referencias de apps para Nido v2

Investigación del 12/11/2026. Tres categorías: recordatorios y notificaciones, medicamentos y turnos médicos. Para cada app: qué hace bien y qué tomamos para Nido. Los patrones elegidos están volcados en la sección 4 de `prompt-claude-design.md`.

> Ojo: casi todo sale de las fichas del App Store, centros de ayuda y reseñas, no de usar las apps. Antes de citar un dato en la defensa, conviene verificarlo en la app.

## 1. Recordatorios y notificaciones

### Due (iOS)
- **Qué hace bien:** si no marcás el recordatorio, te lo repite cada cierto tiempo hasta que lo completás o lo reprogramás («auto-snooze»). Por defecto lo repite 5 veces y se puede llevar a 10, con intervalos de 1 a 60 minutos.
- **Qué critican:** a algunos les resulta agobiante, y se ve anticuada.
- **Para Nido:** las tomas y las consultas del día se repiten **dos veces como máximo** (a los 15 y a los 30 minutos) y se cortan apenas alguien marca la tarea. Posponer con opciones rápidas: 10 min, 30 min, 1 h.

### 2Do y Easy Reminders
- **Qué hacen bien:** el aviso queda atado a la fecha de la tarea, así que si la movés, el aviso se mueve con ella. Separan «posponer una vez» de «insistir».
- **Para Nido:** los avisos son **relativos a la actividad** («1 hora antes»). Si se reprograma la consulta, el aviso se mueve solo.

### Things 3
- **Qué hace bien:** la pantalla Hoy muestra arriba los eventos del calendario y abajo las tareas, con una sección «Esta noche» que separa el día de la noche. Distingue «cuándo lo hago» de «para cuándo tiene que estar». Ganó un Apple Design Award y la elogian por su aire y su limpieza.
- **Para Nido:** Hoy agrupado en **Mañana · Tarde · Noche**, con lo que tiene hora fija arriba de cada bloque. Una tarea puede tener «para cuándo» sin hora exacta («Renovar receta · antes del viernes»).

### Pautas de Apple para notificaciones
- **Qué dicen:** cada notificación tiene un nivel de interrupción. Las **sensibles al tiempo** atraviesan el modo Concentración y se reservan para lo que importa en ese momento. Las **críticas** suenan incluso en silencio. Abusar de ellas lleva a que la gente las descarte sin leer.
- **Para Nido:**
  - Sensible al tiempo: tomas y consultas del día.
  - Normal: gestiones, vencimientos y cambios hechos por otros.
  - Crítica: ninguna por defecto. La persona puede activarla por medicamento.
  - Un **resumen de la mañana** (una sola notificación con el día) en lugar de diez avisos sueltos.
  - Notificaciones con **botones**: «Tomada» · «Posponer» · «No puedo».

## 2. Medicamentos

### Medisafe
- **Qué hace bien:**
  - **Medfriend:** si la persona no registra una toma, a la hora un familiar recibe un aviso. El aviso **no dice el nombre del medicamento**, solo que hay una toma sin registrar.
  - El Medfriend solo ve, no edita.
  - Recordatorio de reposición: avisa cuando quedan *n* dosis.
- **Para Nido:**
  - Si una toma de Antonio queda **sin registrar 60 minutos**, Sofía recibe «Una toma de Antonio está sin registrar». En la pantalla bloqueada no aparece el medicamento.
  - El aviso de reposición se configura en días: «Avisame cuando queden 7 días».
  - Encaja con el nivel «ver información de salud» sin «registrar medicación».

### Medicamentos de Apple (app Salud)
- **Qué hace bien:** recordatorio de seguimiento a los 30 minutos si la toma no se registró. Se puede registrar una toma no programada (medicación «si hace falta»). Cada toma queda como tomada u omitida. Alertas críticas opcionales por medicamento.
- **Para Nido:**
  - Tres estados para una toma: **Tomada**, **Omitida** (con motivo opcional) y **Sin registrar**. Omitir no es lo mismo que olvidar.
  - Para el Paracetamol «si hay dolor», un botón **Registrar toma** en lugar de horarios.

### MyTherapy
- **Qué hace bien:** junta en un PDF el plan de medicación y el historial de tomas para mostrárselo al médico.
- **Para Nido:** en «Antes de ir» (R5), **Compartir resumen de medicación**: plan actual, tomas de las últimas 2 semanas y omitidas con su motivo. Sin interpretación ni conclusiones.

## 3. Turnos médicos

Nido **no reserva turnos**: no está conectado a las mutualistas. De estas apps tomamos cómo se registra, se recuerda y se prepara un turno, no la reserva.

### Zocdoc
- **Qué hace bien:** el recordatorio llega 24 a 48 horas antes y desde el mismo mensaje se confirma, se cancela o se reprograma. Lo que muestra está disponible de verdad.
- **Para Nido:** aviso **el día anterior** («Mañana 10:30 · Consulta de Antonio») con dos botones: **Ver preparación** y **No puedo**. «No puedo» entra a R3.

### Doctolib
- **Qué hace bien:** desde una cuenta se sacan turnos para los familiares. Antes de la consulta se pueden compartir documentos (sirve una foto del papel). Guarda el historial de citas y los documentos.
- **Para Nido:** la ficha de cada persona tiene **Próximas** y **Pasadas**. Cada consulta pasada tiene adjunto lo que se cargó después (indicación y estudios).

### Doctoralia
- **Qué hace bien:** la confirmación llega por SMS, WhatsApp o mail, con un link para cancelar. Desde la cuenta se cancela o se reprograma sin llamar.
- **Para Nido:** **Registrar turno pegando el mensaje**: la persona pega el SMS o WhatsApp de la mutualista y la IA propone fecha, hora, lugar, especialidad y para quién. Se revisa antes de crear, igual que en R2. Es el atajo más realista para Uruguay, donde los turnos llegan por mensaje.

## 4. Lo que no copiamos

- La insistencia ilimitada de Due: con varias personas recibiendo avisos genera fatiga.
- Alertas críticas activadas por defecto.
- Rangos o interacciones entre medicamentos (Apple solo lo hace en EE. UU. y para Nido sería interpretar).
- Reserva real de turnos o disponibilidad de agenda: Nido no se conecta a prestadores.

## Fuentes

- [Due en el App Store](https://apps.apple.com/app/id390017969)
- [Easy Reminders with Snooze](https://apps.apple.com/app/id382256515)
- [2Do: alarms and nagging](https://www.2doapp.com/docs/macos/alarms-and-nagging)
- [Toolfinder: mejores apps de recordatorios 2026](https://toolfinder.co/best/reminder-apps)
- [MacStories: reseña de Things 3](https://www.macstories.net/reviews/things-3-beauty-and-delight-in-a-task-manager/)
- [Blake Crosley: estudio de diseño de Things](https://blakecrosley.com/blog/design-study-things)
- [Apple HIG: Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications)
- [WWDC21: Time Sensitive notifications](https://developer.apple.com/videos/play/wwdc2021/10091/)
- [Medisafe: All about Medfriends](https://help-center.medisafe.com/en/articles/8395236-all-about-medfriends)
- [Medisafe: Family caregiving](https://medisafe.com/family-caregiving-made-easy-medisafe/)
- [Apple: Add and log medications](https://support.apple.com/en-gb/HT213351)
- [TidBITS: iOS 16 Medications](https://tidbits.com/2022/10/07/an-apple-a-day-ios-16-medications-feature-provides-alerts-logging-and-peace-of-mind/)
- [MyTherapy](https://lab.mytherapyapp.com)
- [Zocdoc: patient self-scheduling](https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/)
- [Zocdoc: how do I make an appointment](https://www.zocdoc.com/patient-help/en/articles/8724858-how-do-i-make-an-appointment)
- [The Local: cómo usar Doctolib](https://www.thelocal.fr/20220128/how-to-use-french-medical-website-doctolib)
- [Doctolib en el App Store](https://apps.apple.com/us/app/id925339063)
- [Doctoralia Chile: consulta en línea](https://www.doctoralia.cl/faq/consulta-en-linea)
- [Doctoralia México en el App Store](https://apps.apple.com/MX/app/id1471632318)
