import gsap from "gsap";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";

import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: ".smooth-wrapper", // your outer div
      content: ".smooth-content", // your inner div
      smooth: 4,
      effects: true,
    });

    // cleanup on unmount so React dev/strict mode doesn't duplicate
    return () => {
      smoother.kill();
    };
  }, []); // run once

  return (
    <main>
      <NavBar />
      <div className="smooth-wrapper">
        <div className="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
        </div>
      </div>
    </main>
  );
};

export default App;
