import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import PhotoView from "../components/PhotoView";
import SectionTitle from "../components/SectionTitle";
import { type Photo } from "../data/photos";

type Props = {
  gallery: Photo[];
  flipped: string[];
  setFlipped: (next: string[]) => void;
  setLightbox: (i: number) => void;
};
export default function AlbumSection({
  gallery,
  flipped,
  setFlipped,
  setLightbox,
}: Props) {
  return (
    <section className="section album" id="album">
      <div className="album-heading">
        <SectionTitle
          number="02"
          title="Instantes que se quedan."
          text="Nuestro álbum secreto. Pequeños fragmentos de un universo enorme."
        />
        <span className="handwritten side-note">
          Hay cosas que ninguna
          <br />
          foto puede explicar…
          <Heart size={25} />
        </span>
      </div>
      <div className="collage">
        {gallery.map((p, i) => (
          <motion.article
            key={p.id}
            className={`polaroid collage-photo photo-${i % 5}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            style={{ rotate: `${[-5, 3, -3, 5, -2][i % 5]}deg` }}
          >
            <span className="tape" />
            <button
              className="photo-open"
              aria-label={`Ampliar ${p.alt}`}
              onClick={() => setLightbox(i)}
            >
              {flipped.includes(p.id) ? (
                <div className="photo-back">
                  <Heart />
                  <p>{p.secret}</p>
                </div>
              ) : (
                <PhotoView photo={p} variant={i} />
              )}
            </button>
            <div className="photo-caption">
              <span className="handwritten">{p.caption}</span>
              {p.secret && (
                <button
                  className="icon-button"
                  aria-label="Girar fotografía para leer el mensaje"
                  onClick={() =>
                    setFlipped(
                      flipped.includes(p.id)
                        ? flipped.filter((x) => x !== p.id)
                        : [...flipped, p.id],
                    )
                  }
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>
      <p className="album-footnote">
        <Sparkles size={14} /> Toca una foto para acercarte. Algunas guardan
        algo al dorso.
      </p>
    </section>
  );
}
