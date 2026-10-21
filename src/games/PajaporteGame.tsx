import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Compass, Eye, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { Dragon } from "../components/Art";
import { countryNames } from "../data/couple";
import { pajaporteGame } from "../data/pajaporteGame";
import { createCountryDeck } from "./pajaporteMemory";
import styles from "./PajaporteGame.module.css";

export default function PajaporteGame({ reward }: { reward: ReactNode }) {
  const [deck, setDeck] = useState(() =>
    createCountryDeck(countryNames, pajaporteGame.pairCount),
  );
  const [started, setStarted] = useState(false);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [hint, setHint] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [message, setMessage] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const rewardArea = useRef<HTMLDivElement>(null);
  const pairs = deck.length / 2;
  const complete = pairs > 0 && matched.length === pairs;
  const busy = flipped.length === 2 || hint.length > 0;

  function scrollTo(element: HTMLElement | null) {
    element?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  useEffect(() => {
    if (!complete) return;
    const frame = window.requestAnimationFrame(() =>
      scrollTo(rewardArea.current),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [complete]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const timer = window.setTimeout(() => {
      setFlipped([]);
      setMessage("Estas dos no viajaban juntas. Prueba otra pareja.");
    }, pajaporteGame.mismatchDelay);
    return () => window.clearTimeout(timer);
  }, [flipped]);
  useEffect(() => {
    if (!hint.length) return;
    const timer = window.setTimeout(() => {
      setHint([]);
      setMessage("¿Te has quedado con sus posiciones? Ahora te toca a ti.");
    }, pajaporteGame.hintDuration);
    return () => window.clearTimeout(timer);
  }, [hint]);

  function flip(id: string) {
    const card = deck.find((card) => card.id === id)!;
    if (busy || matched.includes(card.country) || flipped.includes(id)) return;
    if (!flipped.length) {
      setFlipped([id]);
      setMessage(`Has descubierto ${card.country}. Busca su pareja.`);
      return;
    }
    setMoves((value) => value + 1);
    const first = deck.find((card) => card.id === flipped[0])!;
    if (first.country === card.country) {
      setMatched((values) => [...values, card.country]);
      setFlipped([]);
      setMessage(
        matched.length + 1 === pairs
          ? "¡Maleta ordenada! El dragón te entrega la estrella."
          : `¡Pareja encontrada: ${card.country}!`,
      );
    } else {
      setFlipped([flipped[0], id]);
      setMessage("No coinciden. Mira sus posiciones antes de que se escondan.");
    }
  }
  function showHint() {
    if (busy || complete) return;
    setFlipped([]);
    const country = deck.find(
      (card) => !matched.includes(card.country),
    )!.country;
    setHint(
      deck.filter((card) => card.country === country).map((card) => card.id),
    );
    setHintCount((value) => value + 1);
    setMessage(
      `El dragón te enseña una pareja: ${country}. Recuerda dónde está.`,
    );
  }
  function restart() {
    setDeck(createCountryDeck(countryNames, pajaporteGame.pairCount));
    setFlipped([]);
    setMatched([]);
    setHint([]);
    setMoves(0);
    setHintCount(0);
    setSkipped(false);
    setStarted(true);
    setMessage("Nueva maleta, nuevas posiciones. ¡A explorar!");
    window.requestAnimationFrame(() => scrollTo(board.current));
  }

  return (
    <div className={styles.game}>
      <div className={styles.introduction}>
        <p className="eyebrow">UN ENCARGO DEL GUARDIÁN</p>
        <h3>{pajaporteGame.title}</h3>
        <p>{pajaporteGame.description}</p>
        <div className={styles.dragon}>
          <Dragon />
          <span className="handwritten">
            Yo lo tenía todo ordenado.
            <br />
            Más o menos.
          </span>
        </div>
        <p className={styles.instructions}>
          {pairs} parejas · Sin límite de tiempo · Puedes pedir pistas
        </p>
        <button
          className="button gold"
          onClick={() => {
            if (started) {
              scrollTo(board.current);
            } else {
              setStarted(true);
              setSkipped(false);
              setMessage("Elige dos cartas para buscar la primera pareja.");
              window.requestAnimationFrame(() => scrollTo(board.current));
            }
          }}
        >
          {started ? "Volver a las cartas" : "Preparar la maleta"}
          <Compass size={17} />
        </button>
        {!complete && !skipped && (
          <button
            className={styles.skip}
            onClick={() => {
              setSkipped(true);
              setFlipped([]);
              setHint([]);
              setMessage(
                "El dragón te entrega la estrella. Puedes jugar cuando quieras.",
              );
              window.requestAnimationFrame(() => scrollTo(rewardArea.current));
            }}
          >
            Pedir la estrella y seguir sin jugar
          </button>
        )}
      </div>
      <div className={`${styles.playArea} paper`} ref={board}>
        {!started && !skipped ? (
          <div className={styles.ready}>
            <Compass size={48} strokeWidth={1} />
            <p className="handwritten">
              ¿Dónde habíamos guardado
              <br />
              todos esos recuerdos?
            </p>
            <span>Dos cartas. Un mismo país. Una pareja recuperada.</span>
          </div>
        ) : (
          started && (
            <>
              <div className={styles.score}>
                <span>
                  {matched.length}/{pairs} parejas
                </span>
                <span>{moves} intentos</span>
              </div>
              <div
                className={styles.progress}
                role="progressbar"
                aria-label="Parejas encontradas"
                aria-valuemin={0}
                aria-valuemax={pairs}
                aria-valuenow={matched.length}
              >
                <i style={{ width: `${(matched.length / pairs) * 100}%` }} />
              </div>
              <div
                className={styles.cards}
                role="group"
                aria-label="Cartas de países"
              >
                {deck.map((card, index) => {
                  const paired = matched.includes(card.country);
                  const visible =
                    paired ||
                    flipped.includes(card.id) ||
                    hint.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      className={`${styles.card} ${visible ? styles.revealed : ""} ${paired ? styles.paired : ""}`}
                      aria-label={`Carta ${index + 1}${visible ? `: ${card.country}${paired ? ", pareja encontrada" : ""}` : ", boca abajo"}`}
                      aria-pressed={visible}
                      disabled={paired || busy || flipped.includes(card.id)}
                      onClick={() => flip(card.id)}
                    >
                      {visible ? (
                        <>
                          <span>{card.country}</span>
                          {paired ? (
                            <Check size={16} />
                          ) : (
                            <Sparkles size={14} />
                          )}
                        </>
                      ) : (
                        <>
                          <Compass size={24} strokeWidth={1.2} />
                          <small>{String(index + 1).padStart(2, "0")}</small>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className={styles.controls}>
                <button
                  className="text-button"
                  disabled={busy || complete}
                  onClick={showHint}
                >
                  <Eye size={16} />
                  Ver una pareja
                </button>
                <button className="text-button" onClick={restart}>
                  <RotateCcw size={15} />
                  Barajar de nuevo
                </button>
              </div>
            </>
          )
        )}
        <p className={styles.feedback} role="status">
          {message || "El dragón espera a que abras la maleta."}
        </p>
        {(complete || skipped) && (
          <div className={styles.reward} ref={rewardArea}>
            {complete ? (
              <>
                <Trophy size={28} />
                <h4>Guardián del Pajaporte</h4>
                <p>
                  {pairs} parejas en {moves} intentos
                  {hintCount
                    ? ` · ${hintCount} ${hintCount === 1 ? "pista" : "pistas"}`
                    : " · Sin pistas"}
                  . La estrella es tuya.
                </p>
              </>
            ) : (
              <>
                <Sparkles size={25} />
                <h4>Un regalo del guardián</h4>
                <p>Recoge tu estrella y sigue explorando.</p>
              </>
            )}
            {reward}
            {complete && (
              <button className="text-button" onClick={restart}>
                <RotateCcw size={15} />
                Jugar otra vez
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
