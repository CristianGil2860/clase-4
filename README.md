# Landing personal — Cristian Gil

Landing page personal hecha con **React 18** y **Vite**, con login y registro de usuarios
guardados en **localStorage** y dos secciones privadas que sólo se ven con la sesión abierta.

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
│   ├── main.jsx                 # Punto de entrada: envuelve App en <AuthProvider>
│   ├── App.jsx                  # Componente raíz + hooks useTema y useSeccionActiva
│   ├── data.js                  # ← TODO el contenido de la página (editá solo esto)
│   ├── styles.css               # Variables de color, tema claro/oscuro, responsive
│   ├── auth/
│   │   ├── almacenamiento.js    # Capa de datos: localStorage, hash, sesión (sin React)
│   │   └── AuthContext.jsx      # Context + hook useAuth(): estado de la sesión
│   └── components/
│       ├── Icons.jsx            # Íconos SVG inline
│       ├── Section.jsx          # Section + Reveal (animación al scrollear)
│       ├── Nav.jsx              # Navbar: menú mobile, tema y estado de la sesión
│       ├── Hero.jsx             # Portada con efecto de tipeo y métricas
│       ├── Sobre.jsx            # Sobre mí
│       ├── Skills.jsx           # Tecnologías agrupadas
│       ├── Proyectos.jsx        # Grilla de proyectos con filtro por rubro
│       ├── Experiencia.jsx      # Línea de tiempo
│       ├── Login.jsx            # Iniciar sesión
│       ├── Registro.jsx         # Crear cuenta
│       ├── Candado.jsx          # Aviso que tapa una sección privada sin sesión
│       ├── Panel.jsx            # PRIVADA 1: datos de la cuenta + notas
│       ├── Recursos.jsx         # PRIVADA 2: material con favoritos
│       ├── Contacto.jsx         # Formulario controlado + enlaces
│       └── Footer.jsx
└── README.md
```

## Login, registro y secciones privadas

### Cuenta de prueba

Para entrar sin registrarse, la app crea sola esta cuenta al abrir la página:

```
correo:      demo@demo.com
contraseña:  demo1234
```

En la sección **Iniciar sesión** aparece el recuadro con esos datos y un botón
**Completar** que llena el formulario. Si la cuenta ya existe no se vuelve a crear, así
que no se pierden sus notas ni sus favoritos; y las cuentas que registres vos no se tocan.
Para desactivarla, poné `cuentaDemo = null` en [`src/data.js`](src/data.js).

### Cómo probarlo

1. `npm run dev` y entrá con la cuenta de prueba, o bajá hasta **Registrarse** y creá una
   con cualquier nombre, correo y una contraseña de 6 caracteres o más.
2. Con la sesión abierta desaparecen Ingresar y Registrarse, y se desbloquean **Panel** y
   **Recursos**.
3. Escribí algo en las notas del Panel y marcá un par de recursos con la estrella.
4. Recargá la página: seguís adentro y tus notas y favoritos siguen ahí, porque están en
   `localStorage`.
5. Cerrá sesión con el botón de la navbar: las dos secciones privadas vuelven a mostrar
   el candado.

### Qué se guarda y dónde

| Clave de localStorage | Contenido |
|---|---|
| `landing.usuarios` | Array de usuarios: `nombre`, `email`, `salt`, `hash`, `creado` y `datos` (notas y favoritos) |
| `landing.sesion` | `{ email, desde }` del usuario con la sesión abierta |
| `tema` | `"dark"` o `"light"` |

Se puede ver todo en las DevTools: **Application → Local Storage**.

### Decisiones de la implementación

- **La contraseña no se guarda en texto plano.** Se guarda el hash SHA-256 de
  `salt:contraseña`, con un salt aleatorio distinto por usuario (vía Web Crypto). Por eso
  dos usuarios con la misma contraseña tienen hashes distintos.
- **El usuario que circula por la app no lleva el hash ni el salt**: `aPublico()` los
  saca antes de pasar el objeto a los componentes.
- **Login y contraseña incorrecta dan el mismo mensaje**, para no revelar qué correos
  están registrados.
- **Las secciones privadas no esconden el contenido con CSS**: cuando no hay sesión,
  `Panel` y `Recursos` directamente no renderizan su contenido, devuelven `<Candado />`.
- **Toda la lógica de datos está en `auth/almacenamiento.js`**, separada de React, así se
  puede probar sin montar componentes.

### Lo que esto NO es

Es un ejercicio de front-end: **no es seguridad real**. Las cuentas viven en el navegador
de cada visitante, cualquiera puede abrir las DevTools y editarlas, y no hay servidor que
valide nada. En un sistema de verdad el registro y el login se verifican en el back-end,
la contraseña se hashea ahí con bcrypt o Argon2, y el navegador sólo recibe un token.
El punto acá es practicar estado, contexto y renderizado condicional en React.

## Conceptos de React que se usan

| Concepto | Dónde verlo |
|---|---|
| Componentes y props | todos los archivos de `src/components/` |
| `useState` | `Proyectos.jsx` (filtro), `Login.jsx` y `Registro.jsx` (formularios) |
| `useEffect` | `App.jsx` (tema y scroll), `Panel.jsx` (autoguardado), `Nav.jsx` |
| `useMemo` | `App.jsx` (secciones visibles), `Proyectos.jsx` (rubros) |
| `useRef` | `Section.jsx` (nodo para el observer), `Panel.jsx` (primer render) |
| `useContext` + `createContext` | `auth/AuthContext.jsx`, consumido con `useAuth()` |
| Hooks propios | `useAuth`, `useTema`, `useSeccionActiva`, `useTipeo` |
| Renderizado condicional | secciones privadas, menú mobile, errores de los formularios |
| Listas con `key` | `.map()` en Skills, Proyectos, Experiencia y Recursos |
| Composición con `children` | `Section.jsx`, `Reveal` y `AuthProvider` |
| Formularios controlados | `Login.jsx`, `Registro.jsx`, `Contacto.jsx`, notas del `Panel.jsx` |
| Estado derivado | medidor de fuerza de la contraseña en `Registro.jsx` |

## Personalizar

Todo el contenido vive en [`src/data.js`](src/data.js): nombre, rol, textos, métricas,
tecnologías, proyectos, experiencia, recursos privados y datos de contacto. No hace falta
tocar los componentes.

Para poner una foto: guardala en `public/` (por ejemplo `public/foto.jpg`) y escribí
`foto: "/foto.jpg"` en `perfil`, dentro de `data.js`. Si queda vacío, se muestran las iniciales.

Para ofrecer una descarga real en Recursos (por ejemplo el CV), poné el archivo en
`public/` y en el recurso escribí `url: "/cv.pdf"` con `descarga: true`.

Los colores son variables CSS al principio de [`src/styles.css`](src/styles.css):
`:root` para el tema oscuro y `:root[data-theme="light"]` para el claro.

## Qué incluye

- Registro e inicio de sesión con los datos en `localStorage` y contraseñas hasheadas
- Dos secciones privadas (Panel y Recursos) que sólo renderizan con sesión abierta
- Notas privadas con autoguardado y favoritos, guardados por usuario
- Sesión que sobrevive a recargar y que se sincroniza entre pestañas (evento `storage`)
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
