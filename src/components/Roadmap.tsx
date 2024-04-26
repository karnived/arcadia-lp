import { Image } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";

import DjImage from "../assets/dj.png";
import { slideLeft, slideRight, slideUp } from "../utils/animations";

type RoadmapItemProps = PropsWithChildren & {
  className?: string;
  title: string;
  direction?: "left" | "right";
};

const RoadmapItem = ({
  title,
  className,
  children,
  direction = "left",
}: RoadmapItemProps) => {
  const itemRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      ScrollReveal().reveal(
        itemRef.current,
        direction === "left" ? slideLeft : slideRight
      );
    }
  }, [direction]);

  return (
    <fieldset
      ref={itemRef}
      className={cn(
        "border-2 border-[#f35ae5] rounded-xl px-4 pb-2 w-[300px] drop-shadow-lg",
        className
      )}
    >
      <legend className="uppercase text-lg font-bold text-[#fff500] mx-3 font-secondary">
        {title}
      </legend>
      {children}
    </fieldset>
  );
};

const RoadmapBackground = ({ children }: PropsWithChildren) => (
  <div className="relative h-full w-full bg-slate-950">
    <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
    <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

    <div>{children}</div>
  </div>
);

const Roadmap = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      ScrollReveal().reveal(titleRef.current, slideUp);
    }
  }, []);

  return (
    <section id="roadmap" className="pb-20 px-6">
      <RoadmapBackground>
        <h2
          ref={titleRef}
          className="text-center font-bold font-secondary text-3xl uppercase mb-8"
        >
          Roadmap
        </h2>

        <div role="listbox" className="flex flex-col gap-12 odd:ml-auto">
          <RoadmapItem title="Tematica" className="uppercase">
            Alternavida - Retro - Arcade
          </RoadmapItem>
          <RoadmapItem title="Musica" className="ml-auto" direction="right">
            <div className="flex gap-3">
              <div className="shrink-0">
                <Image src={DjImage} />
              </div>
              <div className="flex flex-col">
                <span className="uppercase">David Deheza</span>
                <span>Founder of @davidehezadjs</span>
                <ul className="list-disc ml-6">
                  <li>Arcadia</li>
                  <li>Ella Miami</li>
                  <li>Shampoo</li>
                  <li>Las Cañas</li>
                </ul>
              </div>
            </div>
          </RoadmapItem>
          <RoadmapItem title="Lugar y Hora" className="uppercase">
            La Maité - Sto. Domino 1395 (Y.B) - 23:00hs.
          </RoadmapItem>
        </div>
      </RoadmapBackground>
    </section>
  );
};

export default Roadmap;
