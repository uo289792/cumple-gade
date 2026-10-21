import { ChevronLeft, ChevronRight, Download, Eraser } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dragon } from "../components/Art";
import PhotoView from "../components/PhotoView";
import { drawings } from "../data/photos";
export default function Sketchbook() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<number | null>(null);
  const [color, setColor] = useState("#35261e");
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(4);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fcf5e4";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);
  const position = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = ref.current!,
      r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * c.width) / r.width,
      y: ((e.clientY - r.top) * c.height) / r.height,
    };
  };
  const save = () => {
    const a = document.createElement("a");
    a.download = "un-pedacito-de-mi-universo.png";
    a.href = ref.current!.toDataURL("image/png");
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus("PNG preparado. Revisa las descargas de tu navegador.");
  };
  return (
    <div className="sketchbook paper">
      <div className="sketch-left">
        <p className="eyebrow">CUADERNO DE CAMPO · {page + 1}</p>
        {drawings.length ? (
          <PhotoView photo={drawings[page]} />
        ) : (
          <>
            <Dragon />
            <h3>Hay mundos que solo tú puedes dibujar.</h3>
            <p>
              Este rincón espera tus criaturas, tus ideas y esos garabatos que
              acaban siendo magia.
            </p>
            <span className="handwritten">
              Tu imaginación también es un destino.
            </span>
          </>
        )}
        <div className="page-controls">
          <button
            className="icon-button"
            aria-label="Dibujo anterior"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft />
          </button>
          <span>
            {drawings.length
              ? `${page + 1} / ${drawings.length}`
              : "Tus dibujos, próximamente"}
          </span>
          <button
            className="icon-button"
            aria-label="Dibujo siguiente"
            disabled={page >= drawings.length - 1}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="sketch-right">
        <div className="sketch-heading">
          <span className="handwritten">Deja una pequeña huella</span>
          <span>ESTUDIO ABIERTO</span>
        </div>
        <canvas
          ref={ref}
          width="800"
          height="640"
          aria-label="Lienzo para dibujar con el ratón o el dedo"
          onPointerDown={(e) => {
            if (
              drawing.current !== null ||
              (e.pointerType === "mouse" && e.button !== 0)
            )
              return;
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = e.pointerId;
            const p = position(e),
              ctx = e.currentTarget.getContext("2d")!;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + 0.1, p.y + 0.1);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }}
          onPointerMove={(e) => {
            if (drawing.current !== e.pointerId) return;
            const p = position(e),
              ctx = e.currentTarget.getContext("2d")!;
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }}
          onPointerUp={(e) => {
            if (drawing.current === e.pointerId) drawing.current = null;
          }}
          onPointerCancel={(e) => {
            if (drawing.current === e.pointerId) drawing.current = null;
          }}
          onLostPointerCapture={(e) => {
            if (drawing.current === e.pointerId) drawing.current = null;
          }}
        />
        <div className="tools">
          <div className="palette">
            {["#35261e", "#c66a32", "#344c3c", "#713d43", "#d5ac62"].map(
              (c) => (
                <button
                  key={c}
                  aria-label={`Pincel ${c}`}
                  aria-pressed={color === c}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              ),
            )}
          </div>
          <label className="brush">
            Pincel
            <input
              type="range"
              min="2"
              max="16"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </label>
          <button
            className="icon-button"
            aria-label="Borrar lienzo"
            onClick={() => {
              const c = ref.current!,
                ctx = c.getContext("2d")!;
              ctx.fillStyle = "#fcf5e4";
              ctx.fillRect(0, 0, c.width, c.height);
              setStatus("Lienzo limpio.");
            }}
          >
            <Eraser size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Guardar dibujo como PNG"
            onClick={save}
          >
            <Download size={18} />
          </button>
        </div>
        <p className="sr-only" role="status">
          {status}
        </p>
        <p className="canvas-help">
          También puedes dibujar con el dedo. Guarda tu creación antes de salir.
        </p>
      </div>
    </div>
  );
}
