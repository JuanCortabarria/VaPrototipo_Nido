# Nido · prototipo

> Que nadie en casa se olvide del próximo paso de salud: qué hay que hacer, para quién, cuándo y quién lo hace.

Prototipo navegable de **Nido**, una app que organiza las indicaciones, estudios, recetas y tomas de medicación de una familia. Complementa al prestador de salud: los documentos los sube la familia y la IA solo ordena y propone tareas. No interpreta resultados ni recomienda tratamientos.

**Demo con datos ficticios · Proyecto final ORT Uruguay**

**Demo en vivo:** `https://<tu-proyecto>.vercel.app` *(completar después del primer deploy)*

---

## Cómo probarlo

1. Abrí la demo. La portada muestra los perfiles, los recorridos y los conceptos.
2. Tocá un **recorrido** (R1–R5) o un **concepto** (C1–C4). La app abre en el punto de partida y arriba aparece una pista con los pasos.
3. Usá **«ver como»** (arriba de la app) para cambiar entre Sofía, Antonio, Rosa y Lucía y ver qué le muestra la app a cada una.
4. **Reiniciar** vuelve todo al estado inicial. Recargar la página hace lo mismo.

En escritorio, la app se ve dentro de un marco de iPhone. En el celular (pantallas de hasta 520 px de ancho) ocupa toda la pantalla, como una app real.

### Perfiles

| Perfil | Qué ve |
|---|---|
| **Sofía** · organizadora, mamá | Todo. Lo de los demás, solo en la medida en que se lo permitieron. |
| **Antonio** · papá de Sofía, 79 años | Vista simple, con letra grande y una sola acción por tarjeta. |
| **Rosa** · cuidadora de Antonio | La agenda de Antonio y el registro de tomas. No ve la información de salud. |
| **Lucía** · hija, 16 años | Solo lo suyo. |

También aparecen Fernando (pareja de Sofía) y Mateo (hijo, 8 años, lo gestiona Sofía).

### Recorridos

| # | Recorrido | Pasos |
|---|---|---|
| **R1** | Sofía revisa su día | Tocá la tarjeta «Para Antonio · Tomar Losartán» → **Tomada** → **Deshacer**. Queda en el historial de Antonio. |
| **R2** | De la indicación a las tomas | **＋** → Sacar foto → Leer la indicación → Revisá lo que encontramos → Crear plan → Reponer. |
| **R3** | «No puedo» y reasignación | En el aviso de las 15:30 tocá **No puedo** → elegí el motivo → Pedirle a Fernando. Después abrí la tarjeta de Lucía. |
| **R4** | Permisos y representante | Personas → Antonio → Quién ve su información. Cambiá un permiso de Rosa y después tocá «Rosa» en «ver como». |
| **R5** | Preparar una consulta | Consulta de Antonio · Hoy 10:30 → en «Antes de ir» falta un estudio: adjuntalo → compartí el resumen de medicación. |

### Conceptos

Muestran la idea. No hay ningún servicio real detrás.

| # | Concepto | Qué muestra |
|---|---|---|
| **C1** | Pedir a la farmacia | Editar la lista de reposición y enviarla a una farmacia ficticia. |
| **C2** | Traslado con acompañante | Alguien lleva a Antonio, espera con él y lo trae de vuelta. |
| **C3** | Nido por WhatsApp | Rosa confirma una toma respondiendo un mensaje. |
| **C4** | Valores en el tiempo | La presión registrada de Antonio, con la fuente de cada punto. |

### Acceso rápido a la medicación

- En **Hoy**, la tarjeta «Medicación de Antonio» muestra las tomas del día y avisa si queda poco stock. Con un toque abre Medicación.
- En el **detalle de cada toma**, el botón «Ver en Medicación» lleva directo al medicamento: stock, receta y reposición.
- Las dos respetan los permisos: Sofía y Rosa las ven; Lucía no.

### Sistema visual

El botón **«Sistema visual y notificaciones»** de la portada muestra los colores por persona, los tipos de actividad, las tarjetas, los botones, los estados y los avisos en la pantalla bloqueada.

---

## Estructura del repo

```
nido-prototipo/
├── index.html          # Portada + app + sistema visual: plantilla y lógica (clase Component)
├── support.js          # Runtime: interpreta la plantilla de index.html y la dibuja con React
├── vendor/
│   ├── react.production.min.js       # React 18.3.1 (UMD)
│   ├── react-dom.production.min.js   # ReactDOM 18.3.1 (UMD)
│   └── phosphor/                     # Íconos Phosphor 2.1.2 (regular y fill) con sus fuentes
├── vercel.json         # URLs limpias y caché larga para vendor/
├── .gitignore
└── README.md
```

El sitio es **100 % estático**: no tiene backend, build, dependencias que instalar ni base de datos. Todo pasa en el navegador y no se guarda nada.

### Cómo funciona por dentro

- `index.html` tiene la plantilla dentro de `<x-dc>`, con valores `{{ ... }}`, condiciones `<sc-if>` y listas `<sc-for>`. Cada pantalla está marcada con `data-screen-label` (Hoy, Calendario, Personas, Medicación, etc.).
- La lógica está en la clase `Component`, en el `<script>` del final de `index.html`. Guarda el estado de la demo (`state`), lo cambia con `setState()` y arma los valores de cada pantalla en `renderVals()`.
- `support.js` lee la plantilla, la convierte en elementos de React y vuelve a dibujar la pantalla cada vez que cambia el estado.

Para cambiar textos o pantallas, editá `index.html`. `support.js` no hace falta tocarlo.

---

## Probarlo en local

No abras `index.html` con doble clic: los navegadores bloquean parte de los archivos cuando se abren desde `file://`. Levantá un servidor estático en la carpeta del repo:

```bash
npx serve .
# o
python3 -m http.server 8080
```

Abrí `http://localhost:3000` (o `http://localhost:8080`).

---

## Subirlo a GitHub

```bash
cd nido-prototipo
git init
git add .
git commit -m "Prototipo de Nido"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/nido-prototipo.git
git push -u origin main
```

---

## Deploy en Vercel

### Desde la web (recomendado)

1. Entrá a <https://vercel.com/new> e importá el repo `nido-prototipo`.
2. **Framework Preset**: `Other`.
3. Dejá vacíos **Build Command**, **Output Directory** e **Install Command**.
4. Tocá **Deploy**.

Cada `git push` a `main` vuelve a publicar el sitio, y cada Pull Request genera su propia URL de preview, útil para mostrar un cambio antes de mergearlo.

### Desde la terminal

```bash
npm i -g vercel
vercel          # primer deploy (preview)
vercel --prod   # producción
```

### Checklist después del deploy

- [ ] La portada muestra los 4 perfiles, los 5 recorridos y los 4 conceptos (sin `{{ }}` a la vista).
- [ ] Se ven los íconos (si aparecen cuadraditos vacíos, falta `vendor/phosphor/`).
- [ ] «Entrar a la app» abre Hoy como Sofía, con la tarjeta «Medicación de Antonio».
- [ ] R1 a R5 y C1 a C4 abren en su punto de partida.
- [ ] «Ver como» cambia entre Sofía, Antonio, Rosa y Lucía.
- [ ] Desde el celular, la app ocupa toda la pantalla.

Si la página queda en blanco o se ven las `{{ }}`, abrí la consola del navegador (F12): casi siempre es un 404 de `support.js` o de un archivo de `vendor/`. Revisá que las rutas y las mayúsculas coincidan, porque Vercel distingue mayúsculas de minúsculas.

---

## Para la presentación

- Empezá por la **portada**: explica el problema, los perfiles y los recorridos sin que tengas que contarlo.
- Orden sugerido: **R1 → R2 → R3 → R4 → R5**, y al final un concepto (C1 o C3 suelen ser los más llamativos).
- Para mostrar los permisos, alterná **«ver como»** entre Sofía, Rosa y Lucía en la misma pantalla.
- Si algo queda en un estado raro, tocá **Reiniciar** o recargá la página.

---

## Notas

- Todos los datos son ficticios. No se envía nada a ninguna farmacia, prestador ni WhatsApp.
- La consola puede mostrar dos avisos sobre `<polyline>` al cargar. Son del navegador leyendo la plantilla antes de que se dibuje y no afectan la demo.
- Librerías de terceros incluidas en `vendor/`: [React](https://react.dev) (MIT) y [Phosphor Icons](https://phosphoricons.com) (MIT).
