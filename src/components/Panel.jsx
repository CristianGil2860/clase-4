import { useEffect, useRef, useState } from "react";
import Section, { Reveal } from "./Section.jsx";
import Candado from "./Candado.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { IconUser, IconLogout, IconCheck } from "./Icons.jsx";

/* SECCIÓN PRIVADA 1 — Panel de la cuenta.
   Sin sesión abierta muestra el candado y nada del contenido. */
export default function Panel() {
  const { usuario, logueado, salir, guardarDatos } = useAuth();

  const [notas, setNotas] = useState(usuario?.datos?.notas ?? "");
  const [guardado, setGuardado] = useState(false);
  const primeraVez = useRef(true);

  // Si cambia de usuario (o entra otro), recarga sus notas.
  useEffect(() => {
    setNotas(usuario?.datos?.notas ?? "");
    primeraVez.current = true;
  }, [usuario?.email]);

  // Autoguardado: espera 600 ms sin tipear y recién entonces escribe.
  useEffect(() => {
    if (!logueado) return;
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }

    const id = setTimeout(() => {
      guardarDatos({ notas });
      setGuardado(true);
    }, 600);

    return () => clearTimeout(id);
  }, [notas, logueado]);

  // El cartel de "guardado" se va solo.
  useEffect(() => {
    if (!guardado) return;
    const id = setTimeout(() => setGuardado(false), 1800);
    return () => clearTimeout(id);
  }, [guardado]);

  if (!logueado) {
    return (
      <Section id="panel" eyebrow="Área privada" titulo="Panel">
        <Reveal>
          <Candado que="Acá ves los datos de tu cuenta y un bloc de notas privado que se guarda solo para vos." />
        </Reveal>
      </Section>
    );
  }

  const desde = new Date(usuario.creado);
  const favoritos = usuario.datos?.favoritos?.length ?? 0;

  return (
    <Section
      id="panel"
      eyebrow="Área privada"
      titulo={`Hola, ${usuario.nombre.split(" ")[0]}`}
      sub="Esta sección se renderiza sólo cuando hay una sesión abierta."
    >
      <div className="panel-grid">
        <Reveal>
          <div className="card">
            <div className="usuario-cabecera">
              <span className="usuario-avatar">
                <IconUser size={20} />
              </span>
              <div>
                <strong>{usuario.nombre}</strong>
                <div className="tl-place">{usuario.email}</div>
              </div>
            </div>

            <dl className="datos-cuenta">
              <div>
                <dt>Miembro desde</dt>
                <dd>
                  {desde.toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
              <div>
                <dt>Recursos marcados</dt>
                <dd>{favoritos}</dd>
              </div>
              <div>
                <dt>Contraseña</dt>
                <dd>Guardada como hash SHA-256 + salt</dd>
              </div>
            </dl>

            <button className="btn btn-ghost" onClick={salir}>
              <IconLogout size={18} /> Cerrar sesión
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card">
            <div className="card-title">Notas privadas</div>
            <p className="nota">
              Se guardan solas en tu cuenta, dentro de <code>localStorage</code>. Probá
              escribir algo y recargar la página.
            </p>

            <div className="field">
              <label className="visually-hidden" htmlFor="notas">
                Notas privadas
              </label>
              <textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Lo que escribas acá queda solo en este navegador…"
                rows={8}
              />
            </div>

            <div className="guardado-aviso">
              {guardado ? (
                <span className="ok-inline">
                  <IconCheck /> Guardado
                </span>
              ) : (
                <span className="tl-place">{notas.length} caracteres</span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
