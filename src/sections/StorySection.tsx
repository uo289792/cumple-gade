import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Heart,
  LockKeyhole,
} from "lucide-react";
import type { ReactNode } from "react";
import PhotoView from "../components/PhotoView";
import SectionTitle from "../components/SectionTitle";
import { memories } from "../data/couple";
import { photos } from "../data/photos";

type Props = {
  unlocked: boolean;
  goToQuiz: () => void;
  memory: number;
  current: (typeof memories)[number];
  chooseMemory: (i: number) => void;
  discovered: string[];
  symbol: (id: string) => ReactNode;
};
export default function StorySection({
  unlocked,
  goToQuiz,
  memory,
  current,
  chooseMemory,
  discovered,
  symbol,
}: Props) {
  if (!unlocked)
    return (
      <section
        className="section story story-sealed"
        id="historia"
        tabIndex={-1}
        aria-label="Nuestra historia, bloqueada"
      >
        <SectionTitle
          number="01"
          title="Hay páginas que guardan un secreto."
          text="El diario reconoce los recuerdos. Solo necesita que tú también los recuerdes."
        />
        <div className="story-lock paper">
          <div className="story-lock-seal" aria-hidden="true">
            <LockKeyhole size={30} />
          </div>
          <p className="eyebrow">ARCHIVO SELLADO · NUESTRA HISTORIA</p>
          <h3>La llave está en vuestra memoria.</h3>
          <p>
            Completa las cinco preguntas del desafío para descubrir estas
            páginas. No hace falta acertarlas todas: cada respuesta abre un poco
            más el diario.
          </p>
          <button className="button dark" onClick={goToQuiz}>
            <BookOpen size={18} /> Ir al desafío <ArrowRight size={17} />
          </button>
          <span className="story-lock-note">
            Cinco preguntas. Cuatro recuerdos por descubrir.
          </span>
        </div>
      </section>
    );
  return (
    <section
      className="section story"
      id="historia"
      tabIndex={-1}
      aria-label="Nuestra historia, desbloqueada"
    >
      <p className="story-unlocked" role="status">
        <BookOpen size={16} /> Las páginas de nuestra historia están abiertas.
      </p>
      <SectionTitle
        number="01"
        title="Todo empezó con una casualidad."
        text="Cuatro coordenadas. Una historia que merece su propio diario."
      />
      <div className="timeline" role="tablist" aria-label="Recuerdos">
        {memories.map((m, i) => (
          <button
            role="tab"
            aria-selected={memory === i}
            aria-controls="memory-page"
            id={`tab-${m.id}`}
            key={m.id}
            className={memory === i ? "active" : ""}
            onClick={() => chooseMemory(i)}
            onKeyDown={(e) => {
              const target =
                e.key === "ArrowRight"
                  ? (i + 1) % memories.length
                  : e.key === "ArrowLeft"
                    ? (i - 1 + memories.length) % memories.length
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? memories.length - 1
                        : null;
              if (target !== null) {
                e.preventDefault();
                chooseMemory(target);
                document.getElementById(`tab-${memories[target].id}`)?.focus();
              }
            }}
            tabIndex={memory === i ? 0 : -1}
          >
            <span className="timeline-dot" />
            <small>0{i + 1}</small>
            <strong>{m.date}</strong>
            <span>{m.title}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          id="memory-page"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="memory-book paper"
          initial={{ opacity: 0, rotateX: 4 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="memory-photo polaroid">
            <PhotoView
              photo={photos.find((p) => p.id === current.id)}
              variant={memory}
            />
            <span className="handwritten">{current.caption}</span>
          </div>
          <div className="memory-writing">
            <p className="eyebrow">
              PÁGINA 0{memory + 1} / EL DIARIO DE NUESTRA HISTORIA
            </p>
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <div className="memory-footer">
              <span>
                <Heart size={14} /> Un recuerdo para siempre
              </span>
              {symbol("leaf")}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="discovery-count">
        <Compass size={14} />
        {discovered.length} de {memories.length} recuerdos explorados
      </p>
    </section>
  );
}
