// Rutas relativas a public/. Ejemplo: 'images/couple/primer-beso.jpg'.
// Usa alt descriptivo; las imágenes se muestran completas, sin recortar rostros.
export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
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
    src: "images/couple/hito-encuentro.webp",
    alt: "El primer encuentro",
    caption: "El comienzo de todo",
  },
  {
    id: "beso",
    src: "images/couple/hito-beso.webp",
    alt: "El primer beso",
    caption: "1 de octubre",
  },
  {
    id: "aniversario",
    src: "images/couple/hito-aniversario.webp",
    alt: "El lugar donde le pediste salir",
    caption: "16 de diciembre",
  },
  {
    id: "poznan",
    src: "images/couple/hito-poznan.webp",
    alt: "El primer viaje juntos a Poznań",
    caption: "Nuestra primera aventura",
  },
  ...gallery,
  {
    id: "carta",
    src: "images/couple/carta-final.webp",
    alt: "La pareja besándose frente al mar al atardecer",
    caption: "Y todas las páginas que quedan…",
  },
];
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// Una sola fotografía del álbum contiene el cuarto símbolo, siempre en el mismo lugar.
export const albumSecretPhotoId = "galeria-11";
