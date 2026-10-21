import { ArrowRight, Check, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { questions } from "../data/quiz";
export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const previousIndex = useRef(0);
  useEffect(() => {
    if (previousIndex.current !== index) {
      container.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      previousIndex.current = index;
    }
  }, [index]);
  const q = questions[index];
  const answer = (n: number) => {
    if (selected !== null) return;
    setSelected(n);
    if (n === q.answer) setScore((s) => s + 1);
  };
  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
  };
  if (index === questions.length)
    return (
      <div ref={container} className="quiz-result paper">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${i * 4.3}%`,
                animationDelay: `${(i % 5) * 0.15}s`,
                background: i % 2 ? "#c66a32" : "#d5ac62",
              }}
            />
          ))}
        </div>
        <Sparkles size={42} />
        <p className="eyebrow">EXPEDICIÓN COMPLETADA</p>
        <h3>
          {score} de {questions.length} recuerdos
        </h3>
        <p>
          {score === questions.length
            ? "El dragón pide que le firmes el diario. Menuda memoria."
            : "El diario recomienda una segunda visita. Con merienda, a ser posible."}
        </p>
        <button className="button dark" onClick={reset}>
          <RotateCcw size={16} />
          Volver a jugar
        </button>
      </div>
    );
  return (
    <div ref={container} className="quiz paper">
      <div className="quiz-top">
        <span>ARCHIVO DE RECUERDOS</span>
        <span>
          0{index + 1} / 0{questions.length}
        </span>
      </div>
      <div className="quiz-progress">
        <i style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <h3>{q.question}</h3>
      <div className="answers">
        {q.options.map((o, i) => (
          <button
            key={o}
            disabled={selected !== null}
            className={
              selected !== null
                ? i === q.answer
                  ? "correct"
                  : i === selected
                    ? "wrong"
                    : ""
                : ""
            }
            onClick={() => answer(i)}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {o}
            {selected !== null && i === q.answer && <Check size={18} />}
            {selected === i && i !== q.answer && <X size={18} />}
          </button>
        ))}
      </div>
      <div className="quiz-feedback" aria-live="polite">
        {selected !== null && (
          <>
            <p>
              {selected === q.answer
                ? (q.success ??
                  "¡Recuerdo recuperado! El dragón asiente con mucha solemnidad.")
                : `Casi… La página dice: ${q.options[q.answer]}. El dragón promete no contarlo.`}
            </p>
            <button
              className="text-button"
              onClick={() => {
                setIndex(index + 1);
                setSelected(null);
              }}
            >
              {index === questions.length - 1
                ? "Ver resultado"
                : "Siguiente recuerdo"}
              <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
