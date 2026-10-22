import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Expand,
  Eye,
  Sparkles,
} from "lucide-react";
import Modal from "../components/Modal";
import { artPieces, artWorlds, type ArtPiece } from "../data/artAtlas";
import { useSaved } from "../hooks/useSaved";
import styles from "./ArtAtlas.module.css";

function Palette({ piece }: { piece: ArtPiece }) {
  return (
    <div
      className={styles.palette}
      aria-label="Paleta orientativa de la imagen"
    >
      {piece.palette.map((color) => (
        <span key={color} style={{ background: color }} />
      ))}
    </div>
  );
}

export default function ArtAtlas() {
  const [world, setWorld] = useState<string>("all");
  const [onlySaved, setOnlySaved] = useState(false);
  const [saved, setSaved] = useSaved<string[]>("universo-art-favorites", []);
  const favorites = Array.isArray(saved) ? saved : [];
  const [selected, setSelected] = useState<string | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const pieces = artPieces.filter(
    (p) =>
      (world === "all" || p.world === world) &&
      (!onlySaved || favorites.includes(p.id)),
  );
  const currentIndex = pieces.findIndex((p) => p.id === selected);
  const current = pieces[currentIndex];
  const toggle = (id: string) =>
    setSaved(
      favorites.includes(id)
        ? favorites.filter((s) => s !== id)
        : [...favorites, id],
    );
  const move = (step: number) =>
    setSelected(
      pieces[(currentIndex + step + pieces.length) % pieces.length].id,
    );
  useEffect(() => {
    if (!current) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setSelected(
          pieces[
            (currentIndex + (e.key === "ArrowRight" ? 1 : -1) + pieces.length) %
              pieces.length
          ].id,
        );
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected, world, onlySaved, saved]);

  return (
    <div className={styles.atlas}>
      <div className={styles.intro}>
        <div>
          <span className={styles.kicker}>
            <Sparkles size={14} /> EL ATLAS DE LA IMAGINACIÓN
          </span>
          <p>
            Hay mundos a los que siempre apetece volver.
            <br />
            Estos son para esa mirada tuya que encuentra magia en los detalles.
          </p>
        </div>
        <span className={styles.edition}>
          PARA GADE
          <br />
          <b>Vol. 01</b>
          <small>ARTE · LUZ · MUNDOS</small>
        </span>
      </div>
      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filtrar por mundo"
        >
          {artWorlds.map((w) => (
            <button
              key={w.id}
              aria-pressed={world === w.id}
              onClick={() => setWorld(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>
        <button
          className={styles.savedFilter}
          aria-pressed={onlySaved}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} /> Mi
          colección{" "}
          <span>
            {
              favorites.filter((id) => artPieces.some((p) => p.id === id))
                .length
            }
          </span>
        </button>
      </div>
      <div className={styles.resultLine} aria-live="polite">
        <span>
          {pieces.length} láminas{" "}
          {onlySaved ? "en tu colección" : "para perderse un rato"}
        </span>
        <span>
          <Eye size={13} /> Toca una imagen para explorar
        </span>
      </div>
      {pieces.length ? (
        <div className={styles.grid}>
          {pieces.map((piece, i) => (
            <article
              key={piece.id}
              className={`${styles.card} ${i === 0 ? styles.featured : ""}`}
            >
              <button
                className={styles.imageButton}
                onClick={() => setSelected(piece.id)}
                aria-label={`Explorar ${piece.title}`}
              >
                <img
                  src={`images/art-atlas/${piece.image}.webp`}
                  alt={piece.alt}
                  loading="lazy"
                  width="1600"
                  height="865"
                />
                <span className={styles.imageHint}>
                  <Expand size={15} /> Explorar lámina
                </span>
                <span className={styles.plate}>
                  LÁMINA {String(artPieces.indexOf(piece) + 1).padStart(2, "0")}
                </span>
              </button>
              <div className={styles.caption}>
                <div>
                  <span className={styles.kind}>{piece.kind}</span>
                  <h3>
                    <button onClick={() => setSelected(piece.id)}>
                      {piece.title}
                    </button>
                  </h3>
                  <p>{piece.work}</p>
                  <small>{piece.artist}</small>
                </div>
                <div className={styles.cardAside}>
                  <button
                    className={styles.bookmark}
                    aria-label={`${favorites.includes(piece.id) ? "Quitar de" : "Guardar en"} mi colección: ${piece.title}`}
                    aria-pressed={favorites.includes(piece.id)}
                    onClick={() => toggle(piece.id)}
                  >
                    <Bookmark
                      size={20}
                      fill={
                        favorites.includes(piece.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                  <Palette piece={piece} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Bookmark size={30} />
          <h3>Tu colección empieza con una mirada.</h3>
          <p>Marca las láminas que te inspiren con el marcapáginas.</p>
          <button
            className="text-button"
            onClick={() => {
              setOnlySaved(false);
              setWorld("all");
            }}
          >
            Explorar todos los mundos <ArrowUpRight size={16} />
          </button>
        </div>
      )}
      <div className={styles.footnote}>
        <span>UN PEQUEÑO MUSEO PARA TU IMAGINACIÓN</span>
        <p>
          Concept art, fondos y fotogramas: cada lámina conserva sus créditos y
          su fuente. Tus favoritos se guardan en este navegador.
        </p>
      </div>
      {current && (
        <Modal
          className={styles.artDialog}
          label={`Atlas de arte: ${current.title}`}
          close={() => setSelected(null)}
        >
          <div className={styles.viewer}>
            <div className={styles.viewerTop}>
              <span>
                LÁMINA {String(artPieces.indexOf(current) + 1).padStart(2, "0")}{" "}
                / {artPieces.length}
              </span>
              <span>{current.kind}</span>
            </div>
            <div
              className={styles.fullImage}
              onTouchStart={(e) => {
                start.current =
                  e.touches.length === 1
                    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                    : null;
              }}
              onTouchCancel={() => {
                start.current = null;
              }}
              onTouchEnd={(e) => {
                if (!start.current) return;
                const dx = e.changedTouches[0].clientX - start.current.x,
                  dy = e.changedTouches[0].clientY - start.current.y;
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
                  move(dx < 0 ? 1 : -1);
                start.current = null;
              }}
            >
              <img
                key={current.id}
                src={`images/art-atlas/${current.image}.webp`}
                alt={current.alt}
              />
            </div>
            <div className={styles.controls}>
              <button onClick={() => move(-1)} aria-label="Lámina anterior">
                <ChevronLeft size={20} />
              </button>
              <span aria-live="polite">
                {currentIndex + 1} de {pieces.length}
              </span>
              <button onClick={() => move(1)} aria-label="Lámina siguiente">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className={styles.viewerBody}>
              <div>
                <span className={styles.kind}>{current.work}</span>
                <h3>{current.title}</h3>
                <p className={styles.credit}>{current.artist}</p>
                <a
                  className={styles.source}
                  href={current.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver fuente y obra original <ArrowUpRight size={15} />
                </a>
                <small className={styles.copyright}>{current.copyright}</small>
              </div>
              <aside className={styles.observation}>
                <span className={styles.kicker}>
                  <Eye size={14} /> UNA MIRADA DE ARTISTA
                </span>
                <h4>{current.focus}</h4>
                <p>{current.note}</p>
                <Palette piece={current} />
                <small>Paleta orientativa · nota de observación</small>
              </aside>
            </div>
            <button
              className={styles.saveAction}
              aria-pressed={favorites.includes(current.id)}
              onClick={() => {
                // Al quitar la lámina de la colección filtrada, cerramos para devolver el foco.
                if (onlySaved && favorites.includes(current.id))
                  setSelected(null);
                toggle(current.id);
              }}
            >
              <Bookmark
                size={17}
                fill={favorites.includes(current.id) ? "currentColor" : "none"}
              />
              {favorites.includes(current.id)
                ? "Guardada en mi colección"
                : "Guardar en mi colección"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
