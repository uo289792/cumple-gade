import { couple } from "./couple";

export const questions = [
  {
    question: "¿Qué día os visteis por primera vez?",
    options: [
      "23 de septiembre",
      "1 de octubre",
      "16 de diciembre",
      "El calendario lo guarda en secreto",
    ],
    answer: 0,
  },
  {
    question: "¿Cuándo fue vuestro primer beso?",
    options: [
      "16 de diciembre",
      "23 de septiembre",
      "1 de octubre",
      "Lo ha escondido el dragón",
    ],
    answer: 2,
  },
  {
    question: "¿Cuándo empezó oficialmente vuestra relación?",
    options: [
      "1 de octubre",
      "16 de diciembre",
      "23 de septiembre",
      "Una fecha todavía sin descubrir",
    ],
    answer: 1,
  },
  {
    question: "¿Cuál fue vuestro primer viaje juntos?",
    options: [
      "Un bosque encantado",
      "Una isla secreta",
      "La Luna, claramente",
      "Poznań",
    ],
    answer: 3,
  },
  {
    question: couple.showPrivateJoke
      ? "Según vuestro Pajaporte, ¿en cuántos países habéis hecho el amor?"
      : "¿Cuántos países habéis compartido?",
    options: [
      "7",
      "12",
      String(couple.countries),
      couple.showPrivateJoke
        ? "Eso no se declara en aduanas"
        : "El dragón se ha comido la cuenta",
    ],
    answer: 2,
    success: couple.showPrivateJoke
      ? `¡${couple.countries} países en el Pajaporte! El dragón se pone colorado y cierra el registro. Esto se queda entre vosotros.`
      : undefined,
  },
];
