import { Image } from "lucide-react";
import { useState } from "react";
import { asset, type Photo } from "../data/photos";
import { Landscape } from "./Art";
export default function PhotoView({
  photo,
  variant = 0,
}: {
  photo?: Photo;
  variant?: number;
}) {
  const [failed, setFailed] = useState(false);
  return photo?.src && !failed ? (
    <img
      src={asset(photo.src)}
      alt={photo.alt}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  ) : (
    <div className="photo-placeholder">
      <Landscape variant={variant} />
      <span>
        <Image size={14} />
        {failed ? "Imagen no disponible" : "Aquí irá vuestro recuerdo"}
      </span>
    </div>
  );
}
