import { motion } from "framer-motion";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import PhotoView from "../components/PhotoView";
import SectionTitle from "../components/SectionTitle";
import { albumSecretPhotoId, type Photo } from "../data/photos";

type Props = {
  symbol: (id: string) => ReactNode;
  gallery: Photo[];
  flipped: string[];
  setFlipped: Dispatch<SetStateAction<string[]>>;
  setLightbox: (i: number) => void;
};
export default function AlbumSection({
  symbol,
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
            <div className="photo-frame">
              {flipped.includes(p.id) ? (
                <div className="photo-back photo-celebration">
                  {p.id === albumSecretPhotoId ? (
                    <div className="album-hidden-heart">{symbol("heart")}</div>
                  ) : (
                    <div
                      className="photo-balloons"
                      role="img"
                      aria-label="Globos de cumpleaños"
                    >
                      <svg viewBox="0 0 180 180" aria-hidden="true">
                        {[
                          { x: 44, y: 62, color: "#b97668" },
                          { x: 76, y: 39, color: "#d6b163" },
                          { x: 133, y: 59, color: "#829480" },
                          { x: 106, y: 34, color: "#b69cbe" },
                          { x: 88, y: 76, color: "#c98c57" },
                        ].map((balloon, n) => (
                          <g
                            key={n}
                            className="birthday-balloon"
                            style={{ animationDelay: `${n * -0.6}s` }}
                          >
                            <path
                              d={`M ${balloon.x} ${balloon.y + 24} Q ${balloon.x + 15} 130 90 162`}
                              fill="none"
                              stroke="#897955"
                              strokeWidth="1.2"
                            />
                            <ellipse
                              cx={balloon.x}
                              cy={balloon.y}
                              rx="20"
                              ry="26"
                              fill={balloon.color}
                            />
                            <path
                              d={`M ${balloon.x - 4} ${balloon.y + 24} l 8 0 l -4 -6 Z`}
                              fill={balloon.color}
                            />
                            <path
                              d={`M ${balloon.x - 11} ${balloon.y - 12} q -5 7 -3 13`}
                              fill="none"
                              stroke="#fff8"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </g>
                        ))}
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="photo-open"
                  aria-label={`Ampliar ${p.alt}`}
                  onClick={() => setLightbox(i)}
                >
                  <PhotoView photo={p} variant={i} />
                </button>
              )}
            </div>
            <div className="photo-caption">
              <span className="handwritten">{p.caption}</span>
              <button
                className="icon-button"
                aria-label={`Girar fotografía ${i + 1}`}
                aria-pressed={flipped.includes(p.id)}
                onClick={() =>
                  setFlipped((previous) =>
                    previous.includes(p.id)
                      ? previous.filter((x) => x !== p.id)
                      : [...previous, p.id],
                  )
                }
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
      <p className="album-footnote">
        <Sparkles size={14} /> Toca una foto para acercarte. Al girarlas,
        encontrarás globos… y un secreto escondido entre las quince.
      </p>
    </section>
  );
}
