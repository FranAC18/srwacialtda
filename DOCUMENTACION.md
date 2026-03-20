# 📄 Documentación: Tarjeta Digital

## 📝 1. Introducción y Objetivo
El proyecto consistió en el diseño y desarrollo de una **Tarjeta de Presentación Digital** moderna, rápida y adaptable a dispositivos móviles (mobile-first). El objetivo principal era crear una presencia digital elegante que permitiera a los clientes guardar el contacto directamente en sus teléfonos (vCard), acceder a enlaces rápidos (WhatsApp, Correo, Teléfono, Ubicación) y visitar las redes sociales del profesional o empresa. 

Se diseñó empleando las últimas tendencias de interfaces de usuario (UI), implementando efectos de *Glassmorphism*, difuminados en fondos (*blur*) y animaciones fluidas, inspirándose en los lineamientos actuales de sistemas modernos como iOS, para lograr una sensación *premium*.

## 🛠️ 2. Tecnologías Utilizadas
El proyecto se construyó utilizando tecnologías web estándar (Vanilla) sin depender de frameworks o librerías pesadas, garantizando de esta manera un rendimiento óptimo y tiempos de carga instantáneos:
- **HTML5**: Estructuración semántica de la tarjeta (`index.html`).
- **CSS3 (Vanilla)**: Diseño, maquetación adaptativa y estilos (`style.css`). Uso de variables CSS para consistencia, diseño moderno con Flexbox/Grid, animaciones y efectos visuales de cristal.
- **JavaScript (ES6+)**: Interactividad de la tarjeta (`script.js`), generación dinámica de la vCard para guardar el contacto y renderizado de la UI en base a la configuración.
- **Lucide Icons**: Librería ligera (vía CDN) para la iconografía vectorial.
- **Git y GitHub**: Control de versiones y alojamiento remoto del repositorio de código.
- **Netlify**: Plataforma de hosting en la nube y despliegue continuo (CI/CD).

## 🏗️ 3. Procedimiento del Desarrollo
El desarrollo se llevó a cabo siguiendo buenas prácticas de separación de responsabilidades para garantizar escalabilidad, seguridad y fácil mantenimiento:

1. **Maquetación Estructural (HTML)**:
   - Se generó un archivo `index.html` limpio, separando de forma lógica la interfaz en componentes: Cabecera (foto, nombre y descripción del perfil), Acciones Rápidas, Botón Principal de "Guardar Contacto", Lista de Redes Sociales y la función de Compartir.

2. **Despliegue de Datos Estructurados (JS)**:
   - Toda la información dinámica de la tarjeta se encapsuló en un archivo `data.js`. Este archivo funciona como el único punto de verdad o configuración (una pequeña base de datos local).
   - *Ventaja clave*: Si se necesita actualizar un enlace, color o número telefónico, se edita unívocamente `data.js` sin riesgo de romper o modificar la lógica del sistema o el DOM, proporcionando alta mantenibilidad.

3. **Interactividad y Lógica del Sistema (JavaScript)**:
   - En `script.js` se codificó la lógica encargada de consumir `data.js` e inyectar el contenido correspondiente en el documento HTML automáticamente al cargar.
   - Se programó la lógica para componer, empaquetar y descargar un archivo estándar `.vcf` (vCard) de forma nativa desde el cliente usando la API de *Blob*.
   - Se integró la Web Share API (nativa de los navegadores) garantizando que el usuario pueda compartir el enlace de la tarjeta empleando los medios integrados de su dispositivo móvil.

4. **Estilización y UI (CSS)**:
   - Implementado desde un enfoque *mobile-first* en `style.css`.
   - Se estructuraron clases para inyectar animaciones sutiles progresivas y retardadas (*staggered fade-in*) al renderizado de la página, mejorando drásticamente la experiencia del usuario (UX).

## 🚀 4. Despliegue y Hosting (Buenas prácticas con GitHub + Netlify)
Para publicar la tarjeta digital y habilitar su acceso mediante una URL global, se seleccionó **Netlify**. Para cumplir con los estándares y mejores prácticas de la industria, el despliegue no se efectuó subiendo los archivos manual y directamente, sino que se integró en un flujo automatizado de CI/CD (Integración y Despliegue Continuos):

1. **Alojamiento en GitHub**:
   - Una vez consolidado y probado el proyecto en desarrollo local, se inicializó un repositorio (Git) y se hizo commit (guardado de historial) del código fuente.
   - El código fue enviado (*pushed*) a un repositorio previamente creado en GitHub asegurando que el proyecto quede **versionado de manera segura en la nube**.

2. **Vinculación Automática con Netlify**:
   - Dentro del panel de Netlify, en lugar de subir la carpeta de forma directa (Drop), se optó por vincular la plataforma seleccionando la opción *"Import an existing project from a Git repository"*.
   - Tras conceder los permisos, se enlazó el repositorio específico de la tarjeta alojado en GitHub.
   - Al ser un sitio web estático tradicional, la configuración en Netlify fue sencilla (ambos parámetros de comando de construcción (build) y directorio origen apuntan a la carpeta raíz sin requerir Node o procesos adicionales).

3. **Flujo de Actualización Automatizado (CI/CD)**:
   - **El gran beneficio de esta buena práctica** radica en la comunicación en tiempo real entre ambos sistemas. A partir de esta vinculación, ya no es necesario acceder a Netlify para actualizar el sitio manualmente.
   - Al requerirse modificaciones futuras en la tarjeta (ej. un cambio de URL en `data.js`), basta con ejecutar el flujo de trabajo natural en Git (`git add`, `git commit` y `git push`) hacia la rama principal en GitHub.
   - Netlify detecta automáticamente la actualización remota y auto-reconstruye la versión del sitio en cuestión de segundos, manteniendo la tarjeta siempre sincronizada y al día de forma segura e independiente del entorno de desarrollo subyacente.

---
*Generado para documentación interna y registro de proyecto.*
