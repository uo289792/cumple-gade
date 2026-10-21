import { motion } from "framer-motion";
import { ArrowRight, Leaf, LockKeyhole, RotateCcw } from "lucide-react";
import PhotoView from "../components/PhotoView";
import { couple } from "../data/couple";
import { photos } from "../data/photos";

type Props = { unlocked: boolean; go: (id: string) => void };
export default function FinaleSection({ unlocked, go }: Props) {
  return (
    <section className="section finale" id="carta">
      <div className="finale-stars" aria-hidden="true">
        ✦ · ✧ · ✦
      </div>
      <p className="eyebrow">LA ÚLTIMA PÁGINA. POR AHORA.</p>
      <h2>Feliz cumpleaños.</h2>
      {unlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="letter paper"
        >
          <p className="eyebrow">
            {couple.letter.personalized
              ? "UNA CARTA PARA TI"
              : "BORRADOR · PENDIENTE DE PERSONALIZAR"}
          </p>
          <h3>{couple.letter.title}</h3>
          {couple.letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 * i }}
            >
              {p}
            </motion.p>
          ))}
          <span className="handwritten signature">
            {couple.letter.signature}
          </span>
          <div className="letter-photo polaroid">
            <PhotoView photo={photos.find((p) => p.id === "carta")} />
            <span className="handwritten">Y todas las páginas que quedan…</span>
          </div>
          <Leaf className="letter-leaf" size={46} />
        </motion.div>
      ) : (
        <div className="locked-letter">
          <LockKeyhole size={32} />
          <p>Hay una carta esperándote al otro lado del misterio.</p>
          <button className="button gold" onClick={() => go("misterio")}>
            Volver a los símbolos
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      <button
        className="text-button explore-again"
        onClick={() => go("historia")}
      >
        <RotateCcw size={16} /> Volver a explorar el diario
      </button>
    </section>
  );
}
