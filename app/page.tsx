import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import PhotoStrip from "@/components/PhotoStrip";
import OfferCards from "@/components/OfferCards";
import AIBand from "@/components/AIBand";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Pillars />
      <PhotoStrip />
      <OfferCards />
      <AIBand />
      <Gallery />
      <CTA />
      <Footer />
    </>
  );
}
