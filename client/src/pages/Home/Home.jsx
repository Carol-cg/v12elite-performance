import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import ServicesPreview from "../../components/ServicesPreview/ServicesPreview";
import StatsStrip from "../../components/StatsStrip/StatsStrip";

function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <StatsStrip />
      <About />
    </>
  );
}

export default Home;