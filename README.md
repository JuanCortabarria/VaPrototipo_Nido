# Nido

Prototipo de gestión de salud familiar para iPhone, desarrollado como proyecto final de Ingeniería en Sistemas de Universidad ORT Uruguay. Ayuda a organizar consultas, pendientes, documentos y medicamentos de hijos y adultos mayores.

## Índice

- [IDEA.md](IDEA.md): problema, usuarios, propuesta de valor y alcance del producto.
- [CONTEXT.md](CONTEXT.md): decisiones vigentes, investigación, pendientes y guía técnica.
- [prototype/](prototype/): prototipo web, configuración de publicación y pruebas.

## Probar

**[Abrir el prototipo en iPhone](https://nido-prototipo-iphone.vercel.app)**

Desde la raíz del repositorio: `python3 -m http.server 8000 --directory prototype/public`. Abrir `http://localhost:8000`.

Para Vercel: importar este repositorio, elegir **Other**, usar **Root Directory: prototype** y **Output Directory: public**, sin comandos de instalación ni compilación. El proyecto `nido-prototipo-iphone` está conectado a `main`; los nuevos commits generan despliegues automáticamente.

Elegí un perfil desde el botón superior: **Sofía** (administradora), **Antonio** (abuelo), **Rosa** (cuidadora) o **Lucía** (hija). Cada perfil tiene su propia vista; Antonio abre una agenda simplificada. Antonio conserva un resultado confidencial que no aparece para Sofía.

Demostración con datos ficticios y cambios persistidos en este navegador. Calendario, documentos, pendientes, cajas de medicamentos, renovación de recetas y permisos por categoría son interactivos. En Familia se pueden guardar y descargar comentarios después de explorar libremente. No hay autenticación ni backend: los permisos representan la experiencia de producto, no seguridad para información clínica real. IA, reservas y notificaciones externas no están conectadas.
