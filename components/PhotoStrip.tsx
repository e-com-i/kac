const photos = [
  { src: "/assets/s1.png", alt: "Cyclists" },
  { src: "/assets/s2.png", alt: "Group photo" },
  { src: "/assets/s3.png", alt: "Yoga in the park" },
  { src: "/assets/s4.png", alt: "Morning run" },
  { src: "/assets/s5.png", alt: "Strength training" },
];

export default function PhotoStrip() {
  return (
    <section className="strip" id="gallery">
      {photos.map((p) => (
        <div className="cell" key={p.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} className="grayscale-img" />
        </div>
      ))}
    </section>
  );
}
