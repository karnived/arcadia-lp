import { Image } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideLeft, slideRight, slideUp } from "../utils/animations";

import DjImage from "../assets/dj.png";
import TitleImage from "../assets/images/event-details-title.png";
import LineImage from "../assets/images/line.svg";

type EventDetailProps = PropsWithChildren & {
  className?: string;
  title: string;
  direction?: "left" | "right";
};

const EventDetail = ({
  title,
  className,
  children,
  direction = "left",
}: EventDetailProps) => {
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
        "border-2 border-[#f35ae5] rounded-xl px-4 pb-2 w-[300px]",
        className
      )}
    >
      <legend className="uppercase text-[12px] font-bold text-[#fff500] mx-3 font-arcade event-legend">
        {title}
      </legend>
      {children}
    </fieldset>
  );
};

const EventDetails = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      ScrollReveal().reveal(titleRef.current, slideUp);
    }
  }, []);

  return (
    <section id="event-details">
      <div className="relative">
        <div className="event-details-bg"></div>
        <div className="py-12 px-4 max-content-wrapper relative">
          <div ref={titleRef}>
            <Image src={TitleImage} />
          </div>

          <div
            role="listbox"
            className="flex flex-col gap-[52px] odd:ml-auto mt-6"
          >
            <EventDetail title="Tematica" className="uppercase">
              <span className="block mt-2">Alternavida - Retro - Arcade</span>
            </EventDetail>
            <EventDetail title="Musica" className="ml-auto" direction="right">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <Image src={DjImage} />
                </div>
                <div className="flex flex-col">
                  <span className="uppercase">David Deheza</span>
                  <span>Founder of @davidehezadjs</span>
                  <ul className="list-disc ml-6">
                    <li className="leading-4">Arcadia</li>
                    <li className="leading-4">Ella Miami</li>
                    <li className="leading-4">Shampoo</li>
                    <li className="leading-4">Las Cañas</li>
                  </ul>
                </div>
              </div>
            </EventDetail>
            <EventDetail title="Lugar y Hora" className="uppercase">
              <span className="block mt-2">
                La Maité - Sto. Domino 1395 (Y.B) - 23:00hs.
              </span>
            </EventDetail>
          </div>

          <div className="absolute top-[31%] right-[90px] w-full max-w-[260px]">
            <img src={LineImage} className="w-full" />
          </div>

          <div className="absolute bottom-[13.5%] left-[78px] w-full max-w-[260px] scale-y-[-1]">
            <img src={LineImage} className="w-full" />
          </div>

          {/* <div className="absolute top-[31%] right-[20%] w-full max-w-[260px]">
            <img src={LineImage} className="w-full" />
          </div>

          <div className="absolute bottom-[13.5%] left-[19.3%] w-full max-w-[260px] scale-y-[-1]">
            <img src={LineImage} className="w-full" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
