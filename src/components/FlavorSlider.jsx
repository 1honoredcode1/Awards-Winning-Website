import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );

    // Mouse-follow parallax on each flavor card
    gsap.utils.toArray(".flavor-card").forEach((card) => {
      const drink = card.querySelector(".drinks");
      const elems = card.querySelector(".elements");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // normalized from -1 to 1
        const xPercent = (x / rect.width) * 2 - 1;
        const yPercent = (y / rect.height) * 2 - 1;

        // main drink: move opposite horizontally, but only slight vertical movement
        gsap.to(drink, {
          x: -xPercent * 20, // invert horizontal movement (stronger)
          y: yPercent * 4, // very slight vertical movement
          rotate: -xPercent * 2, // reduced rotation to match subtle Y
          duration: 0.35,
          ease: "power3.out",
        });

        // background elements softer
        gsap.to(elems, {
          x: xPercent * 12,
          y: yPercent * 12,
          duration: 0.4,
          ease: "power3.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        // reset positions smoothly
        gsap.to([drink, elems], {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    });
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`flavor-card relative z-30 lg:w-[49vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt="slidder"
              className="absolute bottom-0 "
            />
            <div className="drinks-wrap absolute left-1/2 -translate-x-1/2 bottom-0">
              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt="drinks"
                className="drinks"
              />
            </div>
            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt="elements"
              className="elements"
            />
            <h1>{flavor.name} </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
