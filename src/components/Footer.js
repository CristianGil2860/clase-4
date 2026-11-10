/* Pie de página. */

function Footer() {
  const { perfil, contacto } = window.DATA;
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <p>
          © {anio} {perfil.nombreCompleto} — Hecho con React y JavaScript.
        </p>

        <div className="footer-social">
          {contacto.github && (
            <a
              className="icon-btn"
              href={contacto.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <IconGithub size={18} />
            </a>
          )}
          {contacto.linkedin && (
            <a
              className="icon-btn"
              href={contacto.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedin size={18} />
            </a>
          )}
          {contacto.email && (
            <a
              className="icon-btn"
              href={"mailto:" + contacto.email}
              aria-label="Enviar un correo"
            >
              <IconMail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
