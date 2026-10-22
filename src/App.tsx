import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Menu,
  Moon,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Dragon } from "./components/Art";
import Modal from "./components/Modal";
import PhotoView from "./components/PhotoView";
import SectionTitle from "./components/SectionTitle";
import BookOpening from "./components/BookOpening";
import { couple, memories, mystery } from "./data/couple";
import { photos } from "./data/photos";
import Quiz from "./games/Quiz";
import ArtAtlas from "./sections/ArtAtlas";
import ArtistPortfolio from "./sections/ArtistPortfolio";
import { useSaved } from "./hooks/useSaved";
import AlbumSection from "./sections/AlbumSection";
import FinaleSection from "./sections/FinaleSection";
import MysterySection from "./sections/MysterySection";
import StorySection from "./sections/StorySection";
import TravelSection from "./sections/TravelSection";

const chapters = [
  ["historia", "La historia"],
  ["album", "El álbum"],
  ["quiz", "El desafío"],
  ["mapa", "El Pajaporte"],
  ["misterio", "El misterio"],
  ["artista", "La artista"],
  ["su-arte", "Nulliusterra"],
];
export default function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [menu, setMenu] = useState(false);
  const [memory, setMemory] = useState(0);
  const [discovered, setDiscovered] = useSaved<string[]>(
    "universo-memories",
    [],
  );
  const [found, setFound] = useSaved<string[]>("universo-symbols", []);
  const [skipped, setSkipped] = useSaved("universo-skipped", false);
  const [hint, setHint] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [companion, setCompanion] = useState(false);
  const [scroll, setScroll] = useState(0);
  const gallery = photos.filter((p) => p.id.startsWith("galeria"));
  const current = memories[memory];
  const foundCount = mystery.filter((m) => found.includes(m.id)).length;
  const unlocked = mystery.every((m) => found.includes(m.id)) || skipped;
  useEffect(() => {
    const onScroll = () =>
      setScroll(
        window.scrollY /
          Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight,
          ),
      );
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id: string) => {
    setOpened(true);
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  const chime = () => {
    try {
      const ctx = new AudioContext();
      // Dos notas suaves, disparadas solo por el gesto de recoger un secreto.
      const play = () => {
        const start = ctx.currentTime;
        [880, 1174.66].forEach((frequency, i) => {
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          const time = start + i * 0.06;
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0.0001, time);
          gain.gain.exponentialRampToValueAtTime(0.035, time + 0.006);
          gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
          oscillator.connect(gain);
          gain.connect(ctx.destination);
          oscillator.start(time);
          oscillator.stop(time + 0.13);
          if (i === 1) oscillator.onended = () => void ctx.close();
        });
      };
      if (ctx.state === "suspended") {
        void ctx
          .resume()
          .then(play)
          .catch(() => void ctx.close());
      } else play();
    } catch {
      /* Audio is optional. */
    }
  };
  const symbol = (id: string) => {
    const index = mystery.findIndex((m) => m.id === id);
    const Icon = [Leaf, Star, Moon, Heart][index];
    return (
      <button
        className={`hidden-symbol ${found.includes(id) ? "collected" : ""}`}
        aria-label={`Recoger símbolo ${mystery[index].name}`}
        title={`Un símbolo del diario: ${mystery[index].name}`}
        onClick={() => {
          chime();
          if (!found.includes(id)) {
            setFound([...found, id]);
          }
        }}
      >
        <Icon size={25} />
        {found.includes(id) && <span>Encontrado</span>}
      </button>
    );
  };
  const chooseMemory = (i: number) => {
    setMemory(i);
    if (!discovered.includes(memories[i].id))
      setDiscovered([...discovered, memories[i].id]);
  };
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  return (
    <MotionConfig reducedMotion="user">
      {opening && (
        <BookOpening
          onComplete={() => {
            setOpening(false);
            chooseMemory(0);
            go("historia");
          }}
        />
      )}
      <a href="#historia" className="skip-link">
        Saltar al contenido
      </a>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          <BookOpen size={22} />
          <span>
            NUESTRO UNIVERSO<small>UN DIARIO EXTRAORDINARIO</small>
          </span>
        </a>
        <nav aria-label="Capítulos" className={menu ? "nav open" : "nav"}>
          {chapters.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="small-button"
            onClick={() => {
              chime();
              go("misterio");
            }}
          >
            <Sparkles size={14} />
            <span>
              {foundCount}/{mystery.length} secretos
            </span>
          </button>
          <button
            className="icon-button mobile-menu"
            aria-label="Abrir navegación"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        <div
          className="reading-progress"
          style={{ transform: `scaleX(${scroll})` }}
        />
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-shade" />
          <div className="hero-stars" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${(i * 31) % 100}%`,
                  top: `${(i * 17) % 90}%`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>
          <div className="falling-leaves" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <Leaf
                key={i}
                style={{
                  left: `${i * 16}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${14 + i}s`,
                }}
              />
            ))}
          </div>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="hero-label">
              <span /> UNA HISTORIA QUE SOLO PODÍA SER NUESTRA <span />
            </div>
            <div className="celestial" aria-hidden="true">
              <Star size={13} />
              <Moon size={29} />
              <Star size={13} />
            </div>
            <h1>
              El misterio de
              <br />
              nuestro <em>universo</em>
            </h1>
            <p>{couple.subtitle}</p>
            <motion.div
              className="diary-mark"
              animate={opened ? { rotateY: 180, scale: 0.85 } : { rotateY: 0 }}
              transition={{ duration: 0.8 }}
              aria-hidden="true"
            >
              <BookOpen />
              <span>J</span>
              <i>✦</i>
            </motion.div>
            <button
              className="button gold"
              onClick={() => {
                setOpened(true);
                setOpening(true);
              }}
            >
              <BookOpen size={18} />
              {opened ? "Volver al diario" : "Abrir el diario"}
              <ArrowRight size={17} />
            </button>
            <button className="hero-skip" onClick={() => go("historia")}>
              Saltar introducción <ArrowDown size={12} />
            </button>
          </motion.div>
          <div className="hero-bottom">
            <span>EST. EN UN PEQUEÑO RINCÓN DEL UNIVERSO</span>
            <span>
              Hay mucho por descubrir <ArrowDown size={14} />
            </span>
            <span>EDICIÓN ESPECIAL · CUMPLEAÑOS</span>
          </div>
        </section>
        <div className="chapter-strip">
          <span className="eyebrow">TU MAPA DE EXPLORACIÓN</span>
          {chapters.map(([id, label], i) => (
            <button key={id} onClick={() => go(id)}>
              <small>0{i + 1}</small>
              {label}
            </button>
          ))}
        </div>
        <StorySection
          memory={memory}
          current={current}
          chooseMemory={chooseMemory}
          discovered={discovered}
          symbol={symbol}
        />
        <AlbumSection
          symbol={symbol}
          gallery={gallery}
          flipped={flipped}
          setFlipped={setFlipped}
          setLightbox={setLightbox}
        />
        <section className="section quiz-section" id="quiz">
          <div>
            <SectionTitle
              number="03"
              title="A ver esa memoria…"
              text="Cinco preguntas. Un montón de recuerdos. Y un dragón que sospecha que lo sabes todo."
            />
            <div className="quiz-dragon">
              <Dragon />
              <span className="handwritten">
                Prometo no soplar.
                <br />
                Bueno, solo un poquito.
              </span>
            </div>
          </div>
          <Quiz />
        </section>
        <TravelSection symbol={symbol} />
        <MysterySection
          found={found}
          unlocked={unlocked}
          hint={hint}
          setHint={setHint}
          setSkipped={setSkipped}
          go={go}
        />
        <section className="section artist" id="artista">
          <SectionTitle
            number="06"
            title="Los mundos que llevas dentro."
            text="Un atlas de dragones, bosques y lugares imposibles. Para ti, que sabes mirarlos con ojos de artista."
          />
          <ArtAtlas />
          <div className="artist-symbol">
            {symbol("moon")}
            <span className="handwritten">
              Para quien encuentra magia hasta en las sombras.
            </span>
          </div>
        </section>
        <ArtistPortfolio />
        <FinaleSection unlocked={unlocked} go={go} />
      </main>
      <footer>
        <BookOpen size={20} />
        <span>Un pequeño universo. Una historia irrepetible.</span>
        <button
          className="reset-discoveries"
          onClick={() => {
            setFound([]);
            setDiscovered([]);
            setSkipped(false);
            go("inicio");
          }}
        >
          Reiniciar descubrimientos
        </button>
        <small>HECHO PARA TI · CON UN POCO DE MAGIA</small>
      </footer>
      <aside className="companion">
        <AnimatePresence>
          {companion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="dragon-message"
            >
              <button
                aria-label="Cerrar pista"
                onClick={() => setCompanion(false)}
              >
                <X size={13} />
              </button>
              <strong>Guardián de páginas</strong>
              <p>
                {unlocked
                  ? "La carta te espera. Yo me quedo vigilando las galletas."
                  : mystery.find((m) => !found.includes(m.id))?.hint}
              </p>
              <button
                className="text-button"
                onClick={() =>
                  go(
                    unlocked
                      ? "carta"
                      : mystery.find((m) => !found.includes(m.id))!.target,
                  )
                }
              >
                Llévame
                <ArrowRight size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className="dragon-button"
          aria-label="Hablar con el pequeño dragón"
          onClick={() => setCompanion(!companion)}
        >
          <Dragon />
          <span>¿Una pista?</span>
        </button>
      </aside>
      {lightbox !== null && (
        <Modal label="Álbum de fotografías" close={() => setLightbox(null)}>
          <div
            className="lightbox"
            onTouchStart={(e) =>
              setTouchStart(
                e.touches.length === 1
                  ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                  : null,
              )
            }
            onTouchCancel={() => setTouchStart(null)}
            onTouchEnd={(e) => {
              if (!touchStart) return;
              const dx = e.changedTouches[0].clientX - touchStart.x;
              const dy = e.changedTouches[0].clientY - touchStart.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
                setLightbox(
                  (lightbox + (dx < 0 ? 1 : -1) + gallery.length) %
                    gallery.length,
                );
              setTouchStart(null);
            }}
          >
            <PhotoView key={gallery[lightbox].id} photo={gallery[lightbox]} />
            <div className="lightbox-controls">
              <button
                className="icon-button"
                aria-label="Foto anterior"
                onClick={() =>
                  setLightbox((lightbox - 1 + gallery.length) % gallery.length)
                }
              >
                <ChevronLeft />
              </button>
              <span>
                {gallery[lightbox].caption} · {lightbox + 1}/{gallery.length}
              </span>
              <button
                className="icon-button"
                aria-label="Foto siguiente"
                onClick={() => setLightbox((lightbox + 1) % gallery.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </MotionConfig>
  );
}
