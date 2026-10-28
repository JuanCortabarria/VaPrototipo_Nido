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

Es una demostración con datos ficticios. Las funciones de IA, reservas, compras y avisos externos están simuladas; los cambios se pierden al recargar. El rediseño completo está pendiente.
