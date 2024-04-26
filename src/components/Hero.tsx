import { useEffect, useRef } from "react";
import { glitch } from "../utils/glitch";
import RegisterModal from "./RegisterModal";
import ScrollIndicator from "./ScrollIndicator";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../utils/animations";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    glitch(titleRef.current);
  }, []);

  useEffect(() => {
    if (subtitleRef.current) {
      ScrollReveal().reveal(subtitleRef.current, {
        ...slideUp,
        distance: "20px",
        delay: 700,
      });

      if (ctaRef.current) {
        ScrollReveal().reveal(ctaRef.current, { ...slideUp, delay: 900 });
      }
    }
  }, []);

  return (
    <section id="hero">
      <div className="py-80 px-6 grid place-content-center text-center relative">
        <h1
          ref={titleRef}
          data-value="Arcadia"
          className="text-6xl font-bold font-secondary uppercase"
        >
          Arcadia
        </h1>
        <h2 className="text-xl font-light mt-2" ref={subtitleRef}>
          Coming Soon
        </h2>

        <ScrollIndicator />
        <RegisterModal ref={ctaRef} />
      </div>
    </section>
  );
};

export default Hero;
