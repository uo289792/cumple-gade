export default function SectionTitle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">
        CAPÍTULO {number} <span>✦</span> DEL DIARIO
      </p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
