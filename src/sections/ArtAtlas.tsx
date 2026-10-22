import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Eye,
  Maximize,
  Palette as PaletteIcon,
  Shuffle,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Modal from "../components/Modal";
import { artPieces, artWorlds, type ArtPiece } from "../data/artAtlas";
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
  const [selected, setSelected] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [challenge, setChallenge] = useState(false);
  const [monochrome, setMonochrome] = useState(false);
  const [clue, setClue] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pieces = artPieces.filter((p) => world === "all" || p.world === world);
  const currentIndex = pieces.findIndex((p) => p.id === selected);
  const current = pieces[currentIndex];
  const open = (id: string, asChallenge = false) => {
    setSelected(id);
    setZoomed(false);
    setScale(1);
    setChallenge(asChallenge);
    setMonochrome(asChallenge);
    setClue(false);
  };
  const move = (step: number) => {
    setSelected(
      pieces[(currentIndex + step + pieces.length) % pieces.length].id,
    );
    setClue(false);
  };
  const randomChallenge = () => {
    const choices = pieces.filter((p) => p.id !== selected);
    open(
      (choices.length ? choices : pieces)[
        Math.floor(Math.random() * (choices.length || pieces.length))
      ].id,
      true,
    );
  };
  const enlarge = () => {
    setZoomed(true);
    setScale(2);
  };
  useEffect(() => {
    if (!zoomed || !stage.current) return;
    const element = stage.current;
    const frame = requestAnimationFrame(() => {
      element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
      element.scrollTop = (element.scrollHeight - element.clientHeight) / 2;
    });
    return () => cancelAnimationFrame(frame);
  }, [zoomed, scale]);
  useEffect(() => {
    if (!current || zoomed) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setSelected(
          pieces[
            (currentIndex + (e.key === "ArrowRight" ? 1 : -1) + pieces.length) %
              pieces.length
          ].id,
        );
        setClue(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected, world, zoomed]);

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
        <button className={styles.challengeButton} onClick={randomChallenge}>
          <Eye size={16} /> Reto de mirada
        </button>
      </div>
      <div className={styles.resultLine} aria-live="polite">
        <span>{pieces.length} láminas para perderse un rato</span>
        <span>
          <Eye size={13} /> Toca una imagen para explorar
        </span>
      </div>
      <div className={styles.grid}>
        {pieces.map((piece, i) => (
          <article
            key={piece.id}
            className={styles.card + (i === 0 ? " " + styles.featured : "")}
          >
            <button
              className={styles.imageButton}
              onClick={() => open(piece.id)}
              aria-label={"Explorar " + piece.title}
            >
              <img
                src={"images/art-atlas/" + piece.image + ".webp"}
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
                  <button onClick={() => open(piece.id)}>{piece.title}</button>
                </h3>
                <p>{piece.work}</p>
                <small>{piece.artist}</small>
              </div>
              <div className={styles.cardAside}>
                <Palette piece={piece} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.footnote}>
        <span>UN PEQUEÑO MUSEO PARA TU IMAGINACIÓN</span>
        <p>
          Concept art, fondos y dibujos: cada lámina conserva sus créditos y su
          fuente. Explora los detalles con la lupa o prueba el reto de mirada.
        </p>
      </div>
      {current && (
        <Modal
          className={zoomed ? styles.zoomDialog : styles.artDialog}
          label={
            (zoomed ? "Imagen ampliada: " : "Atlas de arte: ") + current.title
          }
          close={() => {
            setSelected(null);
            setZoomed(false);
          }}
        >
          {zoomed ? (
            <div className={styles.zoomViewer}>
              <div className={styles.zoomToolbar}>
                <button onClick={() => setZoomed(false)}>
                  <ArrowLeft size={16} /> Volver a la ficha
                </button>
                <div className={styles.zoomActions}>
                  <button
                    aria-label="Reducir imagen"
                    disabled={scale <= 1}
                    onClick={() => setScale(Math.max(1, scale - 0.5))}
                  >
                    <ZoomOut size={19} />
                  </button>
                  <span aria-live="polite">{Math.round(scale * 100)}%</span>
                  <button
                    aria-label="Ampliar imagen"
                    disabled={scale >= 3}
                    onClick={() => setScale(Math.min(3, scale + 0.5))}
                  >
                    <ZoomIn size={19} />
                  </button>
                  <button onClick={() => setScale(1)}>
                    <Maximize size={16} /> Ajustar
                  </button>
                </div>
              </div>
              <div
                ref={stage}
                className={styles.zoomStage}
                tabIndex={0}
                role="region"
                aria-label="Imagen ampliada. Desplázate para ver los detalles."
              >
                <div
                  className={styles.zoomCanvas}
                  style={{
                    width: scale * 100 + "%",
                    height: scale * 100 + "%",
                  }}
                >
                  <img
                    className={monochrome ? styles.monochrome : ""}
                    src={"images/art-atlas/" + current.image + ".webp"}
                    alt={current.alt}
                  />
                </div>
              </div>
              <p className={styles.zoomCaption}>
                {current.title} ·{" "}
                {scale > 1
                  ? "Desplázate por la imagen para ver los detalles."
                  : "Imagen completa."}
              </p>
            </div>
          ) : (
            <div className={styles.viewer}>
              <div className={styles.viewerTop}>
                <span>
                  LÁMINA{" "}
                  {String(artPieces.indexOf(current) + 1).padStart(2, "0")} /{" "}
                  {artPieces.length}
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
                <button
                  className={styles.enlargeImage}
                  onClick={enlarge}
                  aria-label={"Ampliar imagen: " + current.title}
                >
                  <img
                    key={current.id}
                    className={monochrome ? styles.monochrome : ""}
                    src={"images/art-atlas/" + current.image + ".webp"}
                    alt={current.alt}
                  />
                  <span className={styles.imageHint}>
                    <ZoomIn size={16} /> Toca para ampliar
                  </span>
                </button>
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
                  <small className={styles.copyright}>
                    {current.copyright}
                  </small>
                </div>
                <aside className={styles.observation}>
                  <span className={styles.kicker}>
                    <Eye size={14} />{" "}
                    {challenge ? "RETO DE MIRADA" : "UNA MIRADA DE ARTISTA"}
                  </span>
                  <h4>
                    {challenge ? "¿Dónde se va tu mirada?" : current.focus}
                  </h4>
                  {challenge ? (
                    <>
                      <p>
                        Sin el color, busca la zona que más destaca. ¿La
                        reconoces por la luz, la silueta o el contraste?
                      </p>
                      <button
                        className={styles.revealClue}
                        aria-expanded={clue}
                        onClick={() => setClue(!clue)}
                      >
                        {clue ? "Ocultar la pista" : "Descubrir una pista"}{" "}
                        <Eye size={15} />
                      </button>
                      {clue && (
                        <p className={styles.clue} role="status">
                          {current.note}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>{current.note}</p>
                  )}
                  <Palette piece={current} />
                  <small>Paleta orientativa · nota de observación</small>
                </aside>
              </div>
              <div className={styles.studyActions}>
                <button
                  aria-pressed={monochrome}
                  onClick={() => setMonochrome(!monochrome)}
                >
                  <PaletteIcon size={17} />
                  {monochrome ? "Ver en color" : "Ver en blanco y negro"}
                </button>
                <button onClick={randomChallenge}>
                  <Shuffle size={17} />
                  {challenge ? "Otro reto" : "Probar un reto de mirada"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
