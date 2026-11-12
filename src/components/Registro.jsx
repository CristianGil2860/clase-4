import { useState } from "react";
import Section, { Reveal } from "./Section.jsx";
import { useAuth, RE_EMAIL, MIN_PASSWORD } from "../auth/AuthContext.jsx";
import { IconUserPlus, IconArrow, IconEye, IconEyeOff, IconCheck } from "./Icons.jsx";

/* Mide qué tan fuerte es la contraseña: 0 a 4. */
function fuerza(password) {
  let puntos = 0;
  if (password.length >= MIN_PASSWORD) puntos++;
  if (password.length >= 10) puntos++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) puntos++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) puntos++;
  return puntos;
}

const ETIQUETAS_FUERZA = ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"];

export default function Registro() {
  const { registrar, cargando } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repetir: "",
  });
  const [errores, setErrores] = useState({});
  const [verPassword, setVerPassword] = useState(false);

  const nivel = fuerza(form.password);

  const cambiar = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
    if (errores[campo] || errores.general) {
      const { [campo]: _, general: __, ...resto } = errores;
      setErrores(resto);
    }
  };

  const enviar = async (e) => {
    e.preventDefault();

    const err = {};
    if (form.nombre.trim().length < 2) err.nombre = "Escribí tu nombre.";
    if (!RE_EMAIL.test(form.email.trim())) err.email = "Escribí un correo válido.";
    if (form.password.length < MIN_PASSWORD)
      err.password = `La contraseña necesita al menos ${MIN_PASSWORD} caracteres.`;
    if (form.repetir !== form.password) err.repetir = "Las contraseñas no coinciden.";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const resultado = await registrar(form);
    if (!resultado.ok) setErrores({ general: resultado.error });
    // Si sale bien queda la sesión abierta y App muestra las secciones privadas.
  };

  const irALogin = (e) => {
    e.preventDefault();
    document.getElementById("login")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section
      id="registro"
      eyebrow="Cuenta nueva"
      titulo="Registrarse"
      sub="Creá una cuenta en segundos. Queda guardada en este navegador."
    >
      <div className="auth-grid">
        <Reveal>
          <form className="card auth-form" onSubmit={enviar} noValidate>
            <div className="auth-icon">
              <IconUserPlus size={22} />
            </div>

            <div className="field">
              <label htmlFor="reg-nombre">Nombre</label>
              <input
                id="reg-nombre"
                type="text"
                value={form.nombre}
                onChange={cambiar("nombre")}
                placeholder="Cómo te llamás"
                autoComplete="name"
              />
              {errores.nombre && <span className="err">{errores.nombre}</span>}
            </div>

            <div className="field">
              <label htmlFor="reg-email">Correo</label>
              <input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={cambiar("email")}
                placeholder="tu@correo.com"
                autoComplete="email"
              />
              {errores.email && <span className="err">{errores.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="reg-password">Contraseña</label>
              <div className="input-con-boton">
                <input
                  id="reg-password"
                  type={verPassword ? "text" : "password"}
                  value={form.password}
                  onChange={cambiar("password")}
                  placeholder={`Mínimo ${MIN_PASSWORD} caracteres`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ver-password"
                  onClick={() => setVerPassword((v) => !v)}
                  aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {verPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>

              {form.password && (
                <div className="fuerza" aria-hidden="true">
                  <div className="fuerza-barras">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={i < nivel ? `on n${nivel}` : ""} />
                    ))}
                  </div>
                  <span className="fuerza-texto">{ETIQUETAS_FUERZA[nivel]}</span>
                </div>
              )}

              {errores.password && <span className="err">{errores.password}</span>}
            </div>

            <div className="field">
              <label htmlFor="reg-repetir">Repetir contraseña</label>
              <input
                id="reg-repetir"
                type={verPassword ? "text" : "password"}
                value={form.repetir}
                onChange={cambiar("repetir")}
                placeholder="La misma de arriba"
                autoComplete="new-password"
              />
              {errores.repetir ? (
                <span className="err">{errores.repetir}</span>
              ) : (
                form.repetir &&
                form.repetir === form.password && (
                  <span className="ok-inline">
                    <IconCheck /> Coinciden
                  </span>
                )
              )}
            </div>

            {errores.general && (
              <div className="form-error" role="alert">
                {errores.general}
              </div>
            )}

            <button className="btn btn-primary" type="submit" disabled={cargando}>
              {cargando ? "Creando cuenta…" : "Crear cuenta"} <IconArrow />
            </button>

            <p className="auth-cambiar">
              ¿Ya tenés cuenta?{" "}
              <a href="#login" onClick={irALogin}>
                Iniciá sesión
              </a>
            </p>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <aside className="card auth-aviso">
            <div className="card-title">Qué se desbloquea</div>
            <ul className="check-list">
              <li>
                <IconCheck />
                <span>
                  <strong>Panel</strong>: tus datos de cuenta y un bloc de notas privado que
                  se guarda solo para vos.
                </span>
              </li>
              <li>
                <IconCheck />
                <span>
                  <strong>Recursos</strong>: CV, casos de estudio y material que no está en la
                  parte pública, con favoritos.
                </span>
              </li>
            </ul>

            <p className="nota">
              No pidas datos que no necesites: acá sólo van nombre, correo y contraseña. Y
              como todo vive en este navegador, si borrás los datos de navegación se borra
              también la cuenta.
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
