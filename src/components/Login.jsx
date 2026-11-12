import { useState } from "react";
import Section, { Reveal } from "./Section.jsx";
import { useAuth, RE_EMAIL } from "../auth/AuthContext.jsx";
import { IconUser, IconArrow, IconEye, IconEyeOff, IconLock } from "./Icons.jsx";

export default function Login() {
  const { ingresar, cargando } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errores, setErrores] = useState({});
  const [verPassword, setVerPassword] = useState(false);

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
    if (!RE_EMAIL.test(form.email.trim())) err.email = "Escribí un correo válido.";
    if (!form.password) err.password = "Escribí tu contraseña.";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const resultado = await ingresar(form);
    if (!resultado.ok) setErrores({ general: resultado.error });
    // Si sale bien, App deja de renderizar esta sección: ya hay sesión.
  };

  const irARegistro = (e) => {
    e.preventDefault();
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section
      id="login"
      eyebrow="Acceso"
      titulo="Iniciar sesión"
      sub="Entrá con tu cuenta para ver el panel y los recursos privados."
    >
      <div className="auth-grid">
        <Reveal>
          <form className="card auth-form" onSubmit={enviar} noValidate>
            <div className="auth-icon">
              <IconUser size={22} />
            </div>

            <div className="field">
              <label htmlFor="login-email">Correo</label>
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={cambiar("email")}
                placeholder="tu@correo.com"
                autoComplete="email"
              />
              {errores.email && <span className="err">{errores.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="login-password">Contraseña</label>
              <div className="input-con-boton">
                <input
                  id="login-password"
                  type={verPassword ? "text" : "password"}
                  value={form.password}
                  onChange={cambiar("password")}
                  placeholder="••••••"
                  autoComplete="current-password"
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
              {errores.password && <span className="err">{errores.password}</span>}
            </div>

            {errores.general && (
              <div className="form-error" role="alert">
                {errores.general}
              </div>
            )}

            <button className="btn btn-primary" type="submit" disabled={cargando}>
              {cargando ? "Entrando…" : "Entrar"} <IconArrow />
            </button>

            <p className="auth-cambiar">
              ¿No tenés cuenta?{" "}
              <a href="#registro" onClick={irARegistro}>
                Creá una acá
              </a>
            </p>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <aside className="card auth-aviso">
            <div className="card-title">
              <IconLock size={15} /> Cómo funciona
            </div>
            <ul className="check-list">
              <li>
                <span>
                  Las cuentas se guardan en el <strong>localStorage</strong> de tu navegador,
                  bajo la clave <code>landing.usuarios</code>.
                </span>
              </li>
              <li>
                <span>
                  La contraseña no se guarda en texto plano: se guarda su <strong>hash
                  SHA-256</strong> con un salt distinto por usuario.
                </span>
              </li>
              <li>
                <span>
                  La sesión queda en <code>landing.sesion</code>, así que si recargás la
                  página seguís adentro.
                </span>
              </li>
              <li>
                <span>
                  Es un ejercicio de front-end: al no haber servidor que valide,{" "}
                  <strong>no es seguridad real</strong>.
                </span>
              </li>
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
