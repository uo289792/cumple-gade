import { Compass, Heart, MapPin, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import SectionTitle from "../components/SectionTitle";
import { couple, countryNames, memories } from "../data/couple";
import PajaporteGame from "../games/PajaporteGame";
import styles from "./TravelSection.module.css";

export default function TravelSection({
  symbol,
}: {
  symbol: (id: string) => ReactNode;
}) {
  const firstTrip = memories.find((memory) => memory.id === "poznan")!;
  return (
    <section className="section adventures" id="mapa">
      <SectionTitle
        number="04"
        title="El mundo, a nuestra manera."
        text="Algunos recuerdos no necesitan coordenadas. Solo dos personas que los entiendan."
      />
      <div className={`${styles.journal} paper`}>
        <div className={styles.coverPage}>
          <div className={styles.cover}>
            <p className="eyebrow">EDICIÓN PARA DOS</p>
            <Compass size={55} strokeWidth={1} />
            <h3>
              {couple.showPrivateJoke ? couple.travelTitle : "Diario de viajes"}
            </h3>
            <span className={styles.coverSubtitle}>
              {couple.showPrivateJoke
                ? "Amor sin fronteras"
                : "Nuestras aventuras"}
            </span>
            <div className={styles.coverCount}>
              <span>{String(couple.countries).padStart(2, "0")}</span>
              <small>PAÍSES COMPARTIDOS</small>
            </div>
            <Heart size={18} strokeWidth={1.3} />
          </div>
          <p className={`handwritten ${styles.coverNote}`}>
            {couple.showPrivateJoke
              ? "Hay historias que se quedan entre nosotros."
              : "Lo mejor del viaje es compartirlo."}
          </p>
        </div>
        <div className={styles.countriesPage}>
          <div className={styles.pageHeading}>
            <p className="eyebrow">NUESTRO REGISTRO PARTICULAR</p>
            <span>04</span>
          </div>
          <h3>
            {couple.countries} países.
            <br />
            <em>
              {couple.showPrivateJoke
                ? "Nuestro pequeño secreto."
                : "Una historia compartida."}
            </em>
          </h3>
          <p className={styles.intro}>
            {couple.showPrivateJoke
              ? "Los países donde habéis hecho el amor, reunidos en una sola página del Pajaporte."
              : "Los países que ya forman parte de vuestra historia, reunidos en una sola página."}
          </p>
          <ol className={styles.countries} aria-label="Países del diario">
            {countryNames.map((country, index) => (
              <li key={country}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {country}
              </li>
            ))}
          </ol>
          <div className={styles.pageFooter}>
            <span className="handwritten">Y lo que nos queda…</span>
            <Sparkles size={18} aria-hidden="true" />
          </div>
        </div>
      </div>
      <PajaporteGame reward={symbol("star")} />
      <div className={styles.firstTrip}>
        <div className={styles.ticketLabel}>
          <MapPin size={22} strokeWidth={1.4} />
          <span>
            EL PRIMER
            <br />
            VIAJE JUNTOS
          </span>
        </div>
        <div className={styles.ticketDestination}>
          <h3>{firstTrip.date.split(",")[0]}</h3>
          <span>{firstTrip.date.split(",")[1]?.trim()}</span>
        </div>
        <div className={styles.ticketNote}>
          <Sparkles size={18} />
          <p className="handwritten">El primer destino de esta historia.</p>
        </div>
      </div>
    </section>
  );
}
