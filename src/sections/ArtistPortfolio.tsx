import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Palette,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import SectionTitle from "../components/SectionTitle";
import { asset } from "../data/photos";
import { personalArt, personalArtist } from "../data/personalArt";
import styles from "./ArtistPortfolio.module.css";

export default function ArtistPortfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const work = selected === null ? null : personalArt[selected];
  const move = (step: number) => {
    setSelected((index) =>
      index === null
        ? null
        : (index + step + personalArt.length) % personalArt.length,
    );
    setZoomed(false);
  };
  useEffect(() => {
    if (selected === null || zoomed) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected, zoomed]);
  useEffect(() => {
    if (!stage.current) return;
    const area = stage.current;
    const frame = requestAnimationFrame(() => {
      area.scrollLeft = zoomed ? (area.scrollWidth - area.clientWidth) / 2 : 0;
      area.scrollTop = zoomed ? (area.scrollHeight - area.clientHeight) / 2 : 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [zoomed, selected]);
  return (
    <section
      className={"section " + styles.portfolio}
      id="su-arte"
      aria-label="Galería de Nulliusterra"
    >
      <SectionTitle
        number="07"
        title={personalArtist}
        text="Los mundos que nacen de tu imaginación."
      />
      <div className={styles.heading}>
        <span>
          <Palette size={15} /> EL ARTE QUE LLEVA TU FIRMA
        </span>
        <p>Tu forma de mirar. Tu forma de crear.</p>
      </div>
      <div className={styles.gallery}>
        {personalArt.map((art, index) => (
          <figure key={art.id} className={styles.work}>
            <button
              className={styles.image}
              aria-label={"Ver obra de Nulliusterra: " + art.label}
              onClick={() => {
                setSelected(index);
                setZoomed(false);
              }}
            >
              <img src={asset(art.src)} alt={art.alt} loading="lazy" />
              <span className={styles.expand}>
                <Expand size={15} /> Ver obra
              </span>
            </button>
            <figcaption>
              <span className={styles.number}>0{index + 1}</span>
              <div>
                <h3>{art.label}</h3>
                <span>{personalArtist}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className={styles.signature}>
        Nulliusterra <span>Una pequeña galería. Un universo muy tuyo.</span>
      </p>
      {work && (
        <Modal
          className={styles.dialog}
          label={personalArtist + " · " + work.label}
          close={() => {
            setSelected(null);
            setZoomed(false);
          }}
        >
          <div className={styles.viewer}>
            <p className={styles.credit}>
              {personalArtist}{" "}
              <span>
                · OBRA {selected! + 1} / {personalArt.length}
              </span>
            </p>
            <div
              ref={stage}
              className={styles.stage}
              role="region"
              aria-label="Obra ampliada de Nulliusterra"
              tabIndex={0}
              onTouchStart={(e) => {
                touch.current =
                  !zoomed && e.touches.length === 1
                    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                    : null;
              }}
              onTouchCancel={() => {
                touch.current = null;
              }}
              onTouchEnd={(e) => {
                if (!touch.current || zoomed) return;
                const dx = e.changedTouches[0].clientX - touch.current.x,
                  dy = e.changedTouches[0].clientY - touch.current.y;
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                  e.preventDefault();
                  move(dx < 0 ? 1 : -1);
                }
                touch.current = null;
              }}
            >
              <button
                className={
                  styles.artImage + (zoomed ? " " + styles.zoomed : "")
                }
                aria-label={
                  zoomed ? "Ver obra completa" : "Ampliar detalles de la obra"
                }
                onClick={() => setZoomed(!zoomed)}
              >
                <img src={asset(work.src)} alt={work.alt} />
              </button>
            </div>
            <div className={styles.viewerFooter}>
              <h3>{work.label}</h3>
              <button
                className={styles.zoomButton}
                onClick={() => setZoomed(!zoomed)}
              >
                {zoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
                {zoomed ? "Ver obra completa" : "Ampliar detalles"}
              </button>
            </div>
            <div className={styles.controls}>
              <button aria-label="Obra anterior" onClick={() => move(-1)}>
                <ChevronLeft size={20} />
              </button>
              <span aria-live="polite">
                {selected! + 1} de {personalArt.length}
              </span>
              <button aria-label="Obra siguiente" onClick={() => move(1)}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
