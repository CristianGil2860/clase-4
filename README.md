# Landing personal — Cristian Gil

Landing page personal hecha con **React 18** y **Vite**.

## Cómo levantarla

Hace falta [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install     # instala React, ReactDOM y Vite
npm run dev     # abre http://localhost:5173
```

Otros comandos:

```bash
npm run build    # genera la versión de producción en dist/
npm run preview  # sirve dist/ para probar el build
```

## Estructura

```
clase4/
├── index.html                   # Único HTML: React monta todo en <div id="root">
├── package.json                 # Dependencias y scripts
├── vite.config.js               # Configuración de Vite + plugin de React
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                 # Punto de entrada: createRoot().render(<App />)
│   ├── App.jsx                  # Componente raíz + hooks useTema y useSeccionActiva
│   ├── data.js                  # ← TODO el contenido de la página (editá solo esto)
│   ├── styles.css               # Variables de color, tema claro/oscuro, responsive
│   └── components/
│       ├── Icons.jsx            # Íconos SVG inline
│       ├── Section.jsx          # Section + Reveal (animación al scrollear)
│       ├── Nav.jsx              # Navbar con menú mobile y botón de tema
│       ├── Hero.jsx             # Portada con efecto de tipeo y métricas
│       ├── Sobre.jsx            # Sobre mí
│       ├── Skills.jsx           # Tecnologías agrupadas
│       ├── Proyectos.jsx        # Grilla de proyectos con filtro por rubro
│       ├── Experiencia.jsx      # Línea de tiempo
│       ├── Contacto.jsx         # Formulario controlado + enlaces
│       └── Footer.jsx
└── README.md
```

## Conceptos de React que se usan

| Concepto | Dónde verlo |
|---|---|
| Componentes y props | todos los archivos de `src/components/` |
| `useState` | `Proyectos.jsx` (filtro), `Contacto.jsx` (formulario controlado) |
| `useEffect` | `App.jsx` (tema y scroll), `Nav.jsx`, `Hero.jsx` |
| `useMemo` | `Proyectos.jsx` (rubros derivados de los datos) |
| `useRef` | `Section.jsx` (referencia al nodo para el observer) |
| Hooks propios | `useTema` y `useSeccionActiva` en `App.jsx`, `useTipeo` en `Hero.jsx` |
| Renderizado de listas con `key` | `.map()` en Skills, Proyectos, Experiencia |
| Renderizado condicional | badge de disponibilidad, menú mobile, errores del formulario |
| Composición con `children` | `Section.jsx` y `Reveal` envuelven otros componentes |

## Personalizar

Todo el contenido vive en [`src/data.js`](src/data.js): nombre, rol, textos, métricas,
tecnologías, proyectos, experiencia y datos de contacto. No hace falta tocar los componentes.

Para poner una foto: guardala en `public/` (por ejemplo `public/foto.jpg`) y escribí
`foto: "/foto.jpg"` en `perfil`, dentro de `data.js`. Si queda vacío, se muestran las iniciales.

Los colores son variables CSS al principio de [`src/styles.css`](src/styles.css):
`:root` para el tema oscuro y `:root[data-theme="light"]` para el claro.

## Qué incluye

- Tema claro / oscuro con detección del sistema y memoria en `localStorage`
- Navegación con resaltado de la sección visible y menú desplegable en celular
- Filtro de proyectos con estado de React
- Formulario de contacto con validación propia (abre el cliente de correo; no hay back-end)
- Animaciones de entrada con `IntersectionObserver`, respetando `prefers-reduced-motion`
- Diseño responsive y accesible (`aria-*`, foco visible, enlace para saltar al contenido)

## Subirla a un hosting

`npm run build` deja todo en `dist/`. Como `vite.config.js` usa `base: "./"`, esa carpeta
funciona tal cual dentro de una subcarpeta: se puede copiar a `htdocs` y abrirla en
`http://localhost/clase4/dist/`, o subir su contenido por FTP a cualquier hosting estático.
