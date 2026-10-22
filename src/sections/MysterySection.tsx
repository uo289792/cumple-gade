import {
  ArrowRight,
  BookOpen,
  Leaf,
  LockKeyhole,
  Moon,
  Star,
} from "lucide-react";
import { mystery } from "../data/couple";

type Props = {
  found: string[];
  unlocked: boolean;
  hint: boolean;
  setHint: (value: boolean) => void;
  setSkipped: (value: boolean) => void;
  go: (id: string) => void;
};
export default function MysterySection({
  found,
  unlocked,
  hint,
  setHint,
  setSkipped,
  go,
}: Props) {
  return (
    <section className="section mystery-section" id="misterio">
      <div className="mystery-copy">
        <p className="eyebrow">CAPÍTULO 05 · UN SECRETO ENTRE PÁGINAS</p>
        <h2>
          El diario esconde
          <br />
          algo para ti.
        </h2>
        <p>
          Tres símbolos se han escapado por este universo. Encuéntralos para
          abrir la última carta. Mira con calma: ninguno está demasiado lejos.
        </p>
        <div className="symbol-slots">
          {mystery.map((m, i) => {
            const Icon = [Leaf, Star, Moon][i];
            return (
              <div key={m.id} className={found.includes(m.id) ? "found" : ""}>
                <Icon />
                <span>{found.includes(m.id) ? m.name : "¿…?"}</span>
              </div>
            );
          })}
        </div>
        <p role="status" className="mystery-status">
          {found.length} de 3 símbolos encontrados
          {unlocked ? " · La carta está abierta." : ""}
        </p>
        <div className="mystery-actions">
          <button
            className="button gold"
            disabled={!unlocked}
            onClick={() => go("carta")}
          >
            {unlocked ? <BookOpen size={17} /> : <LockKeyhole size={17} />}{" "}
            {unlocked ? "Abrir la carta" : "La carta espera"}
          </button>
          <button className="text-button" onClick={() => setHint(!hint)}>
            {hint ? "Guardar las pistas" : "Necesito una pista"}
          </button>
        </div>
        {hint && (
          <ul className="hints">
            {mystery
              .filter((m) => !found.includes(m.id))
              .map((m) => (
                <li key={m.id}>
                  <button onClick={() => go(m.target)}>
                    {m.hint}
                    <ArrowRight size={14} />
                  </button>
                </li>
              ))}
          </ul>
        )}
        <button
          className="skip-puzzle"
          onClick={() => {
            setSkipped(true);
            go("carta");
          }}
        >
          Prefiero abrir mi regalo sin acertijo
        </button>
      </div>
      <div className="mystery-envelope" aria-hidden="true">
        <div className="envelope-flap" />
        <span>
          <LockKeyhole size={30} />
        </span>
        <p>
          Para ti.
          <small>Cuando las estrellas se alineen.</small>
        </p>
      </div>
    </section>
  );
}
