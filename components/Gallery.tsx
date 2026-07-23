const photos = [
  { src: "/assets/g1.jpg", alt: "Group photo" },
  { src: "/assets/g2.jpg", alt: "Runners" },
  { src: "/assets/g3.jpg", alt: "Yoga" },
  { src: "/assets/g4.jpg", alt: "Cyclists" },
  { src: "/assets/g5.jpg", alt: "Team with KAC flag" },
];

export default function Gallery() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Moments that inspire</span>
          <h2 className="sec-title">
            Our Community <span style={{ color: "var(--accent)" }}>In Action</span>
          </h2>
          <p className="sec-sub">
            From early-morning runs to weekend treks, from yoga sessions to
            finish-line celebrations — this is KAC.
          </p>
        </div>
      </div>
      <div className="cgal">
        {photos.map((p) => (
          <div className="cell" key={p.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} className="grayscale-img" />
          </div>
        ))}
      </div>
    </section>
  );
}
