import { IconLock, IconArrow } from "./Icons.jsx";

/* Lo que se ve en una sección privada cuando no hay sesión abierta.
   No trae nada del contenido real: sólo el aviso y el acceso. */
export default function Candado({ que }) {
  const irA = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="candado">
      <div className="candado-icono">
        <IconLock size={26} />
      </div>

      <h3>Contenido sólo para usuarios registrados</h3>
      <p>{que}</p>

      <div className="candado-cta">
        <a className="btn btn-primary" href="#login" onClick={(e) => irA(e, "login")}>
          Iniciar sesión <IconArrow />
        </a>
        <a className="btn btn-ghost" href="#registro" onClick={(e) => irA(e, "registro")}>
          Crear una cuenta
        </a>
      </div>
    </div>
  );
}
