import gsap from "gsap";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <div className="h-dvh border border-black"></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default App;
