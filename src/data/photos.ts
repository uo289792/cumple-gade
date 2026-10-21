// Rutas relativas a public/. Ejemplo: 'images/couple/primer-beso.jpg'.
// Usa alt descriptivo; las imágenes se muestran completas, sin recortar rostros.
export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  secret?: string;
};
import gallery from "./gallery.json";
export const photos: Photo[] = [
  {
    id: "portada",
    src: gallery[0]?.src ?? "",
    alt: "Fotografía de portada de la pareja",
    caption: "Nuestro pequeño universo",
  },
  {
    id: "encuentro",
    src: "",
    alt: "El primer encuentro",
    caption: "El comienzo de todo",
    secret: "[Añade un mensaje secreto.]",
  },
  { id: "beso", src: "", alt: "El primer beso", caption: "1 de octubre" },
  {
    id: "aniversario",
    src: "",
    alt: "Un recuerdo de la pareja",
    caption: "16 de diciembre",
  },
  {
    id: "poznan",
    src: "",
    alt: "El primer viaje juntos a Poznań",
    caption: "Nuestra primera aventura",
    secret: "[Añade vuestro recuerdo del viaje.]",
  },
  ...gallery,
  {
    id: "carta",
    src: gallery[gallery.length - 1]?.src ?? "",
    alt: "Fotografía final de la pareja",
    caption: "Y todas las páginas que quedan…",
  },
];
export const drawings: Photo[] = [];
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
