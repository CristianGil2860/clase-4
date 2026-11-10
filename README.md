# Landing personal — Cristian Gil

Landing page personal hecha con **React 18** y **JavaScript**, sin build ni dependencias
para instalar: React, ReactDOM y Babel se cargan por CDN y el JSX se compila en el navegador.

## Cómo verla

Con XAMPP corriendo, la carpeta va dentro de `htdocs`:

```
http://localhost/clase4/
```

También se puede abrir con cualquier servidor estático. **No funciona** abriendo
`index.html` con doble clic (`file://`), porque Babel necesita cargar los archivos
de `src/` por HTTP.

## Estructura

```
clase4/
├── index.html                  # Carga React, Babel y los componentes
├── css/
│   └── styles.css              # Estilos: variables de color, tema claro/oscuro, responsive
├── src/
│   ├── data.js                 # ← TODO el contenido de la página (editá solo esto)
│   ├── app.js                  # Componente raíz, tema y sección activa
│   └── components/
│       ├── Icons.js            # Íconos SVG inline
│       ├── Section.js          # Reveal (animación al scrollear) + envoltorio de sección
│       ├── Nav.js              # Navbar con menú mobile y botón de tema
│       ├── Hero.js             # Portada con efecto de tipeo y métricas
│       ├── Sobre.js            # Sobre mí
│       ├── Skills.js           # Tecnologías agrupadas
│       ├── Proyectos.js        # Grilla de proyectos con filtro por rubro
│       ├── Experiencia.js      # Línea de tiempo
│       ├── Contacto.js         # Formulario validado + enlaces
│       └── Footer.js
└── README.md
```

## Personalizar

Todo el contenido vive en [`src/data.js`](src/data.js): nombre, rol, textos, métricas,
tecnologías, proyectos, experiencia y datos de contacto. No hace falta tocar los componentes.

Para poner una foto: guardala en `img/foto.jpg` y escribí esa ruta en
`perfil.foto` dentro de `data.js`. Si queda vacío, se muestran las iniciales.

Los colores están todos como variables CSS en `:root` (tema oscuro) y
`:root[data-theme="light"]` (tema claro), al principio de `css/styles.css`.

## Qué incluye

- Tema claro / oscuro con detección del sistema y recuerdo de la elección (`localStorage`)
- Navegación con resaltado de la sección visible y menú desplegable en celular
- Filtro de proyectos con estado de React
- Formulario de contacto con validación propia (abre el cliente de correo; no hay back-end)
- Animaciones de entrada con `IntersectionObserver`, respetando `prefers-reduced-motion`
- Diseño responsive y accesible (`aria-*`, foco visible, enlace para saltar al contenido)

## Pasar a Vite (opcional)

Si más adelante se quiere un build real, el camino es:
`npm create vite@latest -- --template react`, mover los componentes a `.jsx`,
reemplazar las funciones globales por `import` / `export` y quitar los `<script>`
de CDN del `index.html`.
