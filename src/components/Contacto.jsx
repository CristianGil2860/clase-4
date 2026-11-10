import { useState } from "react";
import Section, { Reveal } from "./Section.jsx";
import { contacto, contactoSeccion } from "../data.js";
import { IconMail, IconGithub, IconLinkedin, IconPhone, IconArrow } from "./Icons.jsx";

/* Formulario controlado con validación propia.
   No hay back-end: al enviar se abre el cliente de correo con el mensaje armado.
   Si más adelante querés guardarlo, reemplazá enviar() por un fetch a tu API. */
export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
    if (errores[campo]) {
      const { [campo]: _, ...resto } = errores;
      setErrores(resto);
    }
  };

  const validar = () => {
    const err = {};
    if (form.nombre.trim().length < 2) err.nombre = "Escribí tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      err.email = "Revisá el correo, no parece válido.";
    if (form.mensaje.trim().length < 10)
      err.mensaje = "Contame un poco más (mínimo 10 caracteres).";
    return err;
  };

  const enviar = (e) => {
    e.preventDefault();

    const err = validar();
    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const asunto = `Contacto desde la web — ${form.nombre.trim()}`;
    const cuerpo = `${form.mensaje.trim()}\n\n—\n${form.nombre.trim()}\n${form.email.trim()}`;

    window.location.href =
      `mailto:${contacto.email}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  const links = [
    contacto.email && {
      label: "Correo",
      valor: contacto.email,
      href: `mailto:${contacto.email}`,
      icono: <IconMail />,
    },
    contacto.github && {
      label: "GitHub",
      valor: contacto.github.replace(/^https?:\/\//, ""),
      href: contacto.github,
      icono: <IconGithub />,
    },
    contacto.linkedin && {
      label: "LinkedIn",
      valor: contacto.linkedin.replace(/^https?:\/\//, ""),
      href: contacto.linkedin,
      icono: <IconLinkedin />,
    },
    contacto.telefono && {
      label: "Teléfono",
      valor: contacto.telefono,
      href: `tel:${contacto.telefono.replace(/\s/g, "")}`,
      icono: <IconPhone />,
    },
  ].filter(Boolean);

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      titulo={contactoSeccion.titulo}
      sub={contactoSeccion.bajada}
    >
      <div className="contact">
        <Reveal>
          <form className="contact-form" onSubmit={enviar} noValidate>
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={cambiar("nombre")}
                placeholder="Cómo te llamás"
                autoComplete="name"
              />
              {errores.nombre && <span className="err">{errores.nombre}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={cambiar("email")}
                placeholder="tu@correo.com"
                autoComplete="email"
              />
              {errores.email && <span className="err">{errores.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                value={form.mensaje}
                onChange={cambiar("mensaje")}
                placeholder="Contame qué necesitás resolver"
              />
              {errores.mensaje && <span className="err">{errores.mensaje}</span>}
            </div>

            <button className="btn btn-primary" type="submit">
              Enviar mensaje <IconArrow />
            </button>

            {enviado && (
              <div className="form-ok" role="status">
                Listo: se abrió tu correo con el mensaje armado. Si no se abrió,
                escribime directo a <strong>{contacto.email}</strong>.
              </div>
            )}
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="contact-links">
            {links.map((l) => {
              const externo = l.href.startsWith("http");
              return (
                <a
                  className="contact-link"
                  key={l.label}
                  href={l.href}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noopener noreferrer" : undefined}
                >
                  {l.icono}
                  <span>
                    <span className="cl-label">{l.label}</span>
                    <br />
                    <span className="cl-value">{l.valor}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
