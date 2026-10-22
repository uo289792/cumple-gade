export type ArtWorld = "dragons" | "woods" | "anime";
export interface ArtPiece {
  id: string;
  world: ArtWorld;
  image: string;
  title: string;
  work: string;
  artist: string;
  kind: string;
  alt: string;
  note: string;
  focus: string;
  palette: string[];
  source: string;
  copyright: string;
}

const dragon = {
  world: "dragons" as const,
  work: "Cómo entrenar a tu dragón 3 · El mundo oculto",
  artist: "Woonyoung Jung",
  kind: "Estudio de color · concept art",
  source:
    "https://www.awn.com/animationworld/designing-spectacular-realm-dragons-dreamworks-animations-hidden-world",
  copyright: "© 2019 DreamWorks Animation LLC. Todos los derechos reservados.",
};
const woods = {
  world: "woods" as const,
  work: "Más allá del jardín · Over the Garden Wall",
  artist: "Nick Cross",
  kind: "Fondo conceptual",
  source:
    "https://ncrossanimation.tumblr.com/post/101848993177/heres-another-couple-of-concept-backgrounds-done",
  copyright:
    "Arte de Nick Cross para Over the Garden Wall. © Cartoon Network.",
};
const howl = {
  world: "anime" as const,
  work: "El castillo ambulante",
  artist: "Studio Ghibli · dirección de Hayao Miyazaki",
  kind: "Fotograma oficial",
  source: "https://www.ghibli.jp/works/howl/",
  copyright: "© 2004 Diana Wynne Jones/Hayao Miyazaki/Studio Ghibli, NDDMT",
};
const chihiro = {
  world: "anime" as const,
  work: "El viaje de Chihiro",
  artist: "Studio Ghibli · dirección de Hayao Miyazaki",
  kind: "Fotograma oficial",
  source: "https://www.ghibli.jp/works/chihiro/",
  copyright: "© 2001 Hayao Miyazaki/Studio Ghibli, NDDTM",
};

// Los títulos y las notas de observación son editoriales, no títulos de los artistas.
export const artPieces: ArtPiece[] = [
  {
    ...dragon,
    id: "hidden-world",
    image: "dragon-2",
    title: "Un mundo bajo el mundo",
    alt: "Una enorme caverna de cristales y corales iluminada en azules y rosas, con diminutas siluetas de dragones.",
    focus: "Escala y luz",
    note: "Las siluetas pequeñas hacen inmensa la cueva. Sigue la luz azul hasta los corales cálidos: el color te lleva de la mano.",
    palette: ["#25393f", "#6f939d", "#d1cfd2", "#c98677"],
  },
  {
    ...woods,
    id: "woods-light",
    image: "forest-1",
    title: "Donde el bosque guarda la luz",
    alt: "Fondo pintado de un bosque dorado, con grandes troncos oscuros y un claro luminoso al fondo.",
    focus: "Siluetas y profundidad",
    note: "Los troncos casi negros enmarcan el claro. Mira cómo basta una zona luminosa para insinuar un camino y una historia.",
    palette: ["#282718", "#69613c", "#a59352", "#e0cf94"],
  },
  {
    ...howl,
    id: "falling-stars",
    image: "howl-43",
    title: "La noche en que cayeron estrellas",
    alt: "Sophie bajo un cielo azul nocturno atravesado por estrellas fugaces.",
    focus: "Dirección y contraste",
    note: "Las diagonales de las estrellas rompen la quietud del retrato. Una paleta breve puede hacer que un instante parezca mágico.",
    palette: ["#142d59", "#255aa4", "#aaa6e1", "#e6cea2"],
  },
  {
    ...dragon,
    id: "toothless-pencil",
    image: "toothless-pencil",
    title: "Desdentao, una mirada entre sombras",
    artist: "Manuel Reartes",
    kind: "Lápices de colores sobre papel · fan art",
    work: "Cómo entrenar a tu dragón · Desdentao",
    source:
      "https://www.saatchiart.com/en-gt/art/Drawing-Toothless-in-Colored-Pencil/2959419/13687177/view",
    copyright:
      "Dibujo de Manuel Reartes (2021). Personaje © DreamWorks Animation. Ilustración de un artista, no arte oficial de producción.",
    alt: "Retrato de Desdentao dibujado con lápices de colores sobre papel, con ojos verdes luminosos y escamas detalladas en tonos azules y violetas.",
    focus: "Textura, luz y mirada",
    note: "Los ojos claros destacan entre las sombras azules y violetas. Busca los pequeños puntos de luz sobre las escamas: dan relieve sin dibujar cada borde con la misma intensidad.",
    palette: ["#17232c", "#647c8b", "#8d83a5", "#becd59"],
  },
  {
    ...woods,
    id: "woods-character-sketches",
    image: "woods-characters-1",
    title: "Antes de adentrarse en el bosque",
    work: "Más allá del jardín · Tome of the Unknown (piloto)",
    artist: "Mikkel Sommer",
    kind: "Diseño de personajes · bocetos del piloto",
    source:
      "https://mikkelsommer.blogspot.com/2014/07/tome-of-unknown-over-garden-wall.html",
    copyright:
      "Diseños de Mikkel Sommer para Tome of the Unknown. © Cartoon Network.",
    alt: "Bocetos a lápiz de Wirt, Greg y John Crops, con sus siluetas y expresiones vistas de frente.",
    focus: "Siluetas y personalidad",
    note: "El gorro de Wirt, la tetera de Greg y la guitarra de John Crops se reconocen con muy pocas líneas. Mira cómo las proporciones ya cuentan quién es cada uno.",
    palette: ["#252522", "#79776e", "#c1bfb3", "#f4f2e8"],
  },
  {
    ...woods,
    id: "woods-character-colors",
    image: "woods-characters-2",
    title: "Del trazo al color",
    work: "Más allá del jardín · Tome of the Unknown (piloto)",
    artist: "Mikkel Sommer",
    kind: "Diseño de personajes · exploración de color",
    source:
      "https://mikkelsommer.blogspot.com/2014/07/tome-of-unknown-over-garden-wall.html",
    copyright:
      "Diseños de Mikkel Sommer para Tome of the Unknown. © Cartoon Network.",
    alt: "Diseños coloreados de Wirt con gorro rojo, Greg con tetera y John Crops con guitarra.",
    focus: "Una paleta para tres personajes",
    note: "Compara esta lámina con el boceto anterior. El rojo, los verdes apagados y los tonos tierra conservan el aire de cuento sin perder la claridad de las siluetas.",
    palette: ["#964c3a", "#666b51", "#b3ad6c", "#d0a666"],
  },
  {
    ...dragon,
    id: "dragon-horizon",
    image: "dragon-1",
    title: "El horizonte de los dragones",
    alt: "Dos dragones contemplan un reino de cristales y estructuras de coral que se pierde en la distancia.",
    focus: "Capas de color",
    note: "El primer plano es claro y definido; el fondo se vuelve azulado. La profundidad también se puede dibujar con temperatura de color.",
    palette: ["#393738", "#a67e76", "#d9bdae", "#8497b2"],
  },
  {
    ...chihiro,
    id: "water-train",
    image: "chihiro-43",
    title: "Un tren hacia lo imposible",
    alt: "Un tren amarillo viaja sobre un mar tranquilo bajo nubes rosadas al atardecer.",
    focus: "Espacio y calma",
    note: "Deja respirar al cielo y al agua. El tren ocupa muy poco, pero su línea horizontal sostiene toda la escena.",
    palette: ["#686b9a", "#bd9cbb", "#edc39f", "#b5a15f"],
  },
  {
    ...woods,
    id: "woods-stump",
    image: "forest-2",
    title: "Historias entre las raíces",
    alt: "Un tocón dorado entre árboles oscuros, con hierba, niebla y luz suave al fondo.",
    focus: "Textura y atención",
    note: "El tocón tiene luz y detalle; el fondo, bordes suaves. No hace falta dibujarlo todo con la misma intensidad.",
    palette: ["#26271d", "#685b39", "#bf964f", "#b9bda7"],
  },
  {
    ...howl,
    id: "sky-home",
    image: "howl-50",
    title: "Una casa con vistas al cielo",
    alt: "Howl y Sophie abrazados en una barandilla sobre nubes blancas y cielo azul.",
    focus: "Gesto y espacio",
    note: "La curva del balcón dirige la mirada hacia el abrazo. El cielo abierto deja que un gesto pequeño sea el centro de todo.",
    palette: ["#1684b8", "#a8d8e7", "#f3eee1", "#d49a74"],
  },
  {
    ...dragon,
    id: "crystal-throne",
    image: "dragon-3",
    title: "El corazón de cristal",
    alt: "Dragones reunidos ante una gran formación de cristal iluminada por haces de luz.",
    focus: "Foco y formas",
    note: "Las formas oscuras de los lados apuntan hacia el cristal. Prueba a mirar la imagen como tres grandes masas antes de buscar los detalles.",
    palette: ["#494340", "#818b96", "#e6deb1", "#a17e54"],
  },
  {
    ...chihiro,
    id: "lantern-town",
    image: "chihiro-8",
    title: "La ciudad que despierta de noche",
    alt: "Una calle del mundo de los espíritus, con faroles rojos encendidos y edificios de madera.",
    focus: "Perspectiva y atmósfera",
    note: "Las fachadas estrechan el camino y los faroles marcan el recorrido. Unos puntos de rojo cálido hacen habitable la oscuridad.",
    palette: ["#2d292a", "#69413d", "#b85557", "#d89e79"],
  },
];
export const artWorlds = [
  { id: "all", label: "Todos los mundos" },
  { id: "dragons", label: "Dragones" },
  { id: "woods", label: "Más allá del jardín" },
  { id: "anime", label: "Anime · Ghibli" },
] as const;
