// Países confirmados, sin repetidos. El contador y el quiz usan esta lista.
export const countryNames = [
  "Polonia",
  "Italia",
  "Hungría",
  "Noruega",
  "Alemania",
  "Albania",
  "Montenegro",
  "Islandia",
  "Malta",
  "República Checa",
  "Grecia",
  "Reino Unido",
  "España",
  "Nepal",
];

export const couple = {
  author: "Javi",
  title: "El misterio de nuestro universo",
  subtitle:
    "Hay historias que parecen casualidad… hasta que descubres que eran una aventura esperando a comenzar.",
  countries: countryNames.length,
  travelTitle: "Pajaporte",
  showPrivateJoke: true,
  letter: {
    personalized: true,
    title: "Felicidades, Gade.",
    paragraphs: [
      "Espero que hoy y siempre seas tan feliz como me haces a mí cada día.",
      "Gracias por existir y por hacer mi vida más bonita. Te mereces todo lo bueno del mundo.",
      "Te quiero muchísimo.",
    ],
    signature: "Javi",
  },
};
export const memories = [
  {
    id: "encuentro",
    date: "23 de septiembre",
    title: "El primer encuentro",
    caption: "Donde empieza el mapa.",
    text: "La primera vez que os visteis. El punto de partida de esta historia.",
  },
  {
    id: "beso",
    date: "1 de octubre",
    title: "El primer beso",
    caption: "Una fecha para guardar.",
    text: "El primer beso tiene su propia página en este diario.",
  },
  {
    id: "aniversario",
    date: "16 de diciembre",
    title: "El comienzo oficial",
    caption: "El siguiente capítulo.",
    text: "El día que decidisteis empezar oficialmente vuestra relación.",
  },
  {
    id: "poznan",
    date: "Poznań, Polonia",
    title: "La primera aventura",
    caption: "El primer destino juntos.",
    text: "Vuestro primer viaje juntos: Poznań. La primera parada de muchas aventuras compartidas.",
  },
];
export const mystery = [
  {
    id: "leaf",
    name: "Hoja",
    hint: "El primer símbolo duerme entre las páginas de vuestra historia.",
    target: "historia",
  },
  {
    id: "star",
    name: "Estrella",
    hint: "El dragón guarda una estrella en el juego del Pajaporte. Puedes jugar o pedirle que te la entregue.",
    target: "mapa",
  },
  {
    id: "moon",
    name: "Luna",
    hint: "La imaginación guarda una luna al final del atlas de la artista.",
    target: "artista",
  },
  {
    id: "heart",
    name: "Corazón",
    hint: "Una de las quince fotos del álbum esconde un corazón al dorso. Gíralas para encontrarlo entre los globos.",
    target: "album",
  },
  {
    id: "feather",
    name: "Pluma",
    hint: "Una pequeña pluma se ha quedado junto a la última obra de Nulliusterra. Busca entre sus trazos.",
    target: "su-arte",
  },
];
