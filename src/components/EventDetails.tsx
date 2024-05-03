import { Image } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideLeft, slideRight, slideUp } from "../utils/animations";

import DjProfileImage from "../assets/images/dj-profile.png";
import TitleImage from "../assets/images/event-details-title.png";
import LinesImage from "../assets/images/event-details-lines.png";

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
        "border-2 border-[#f35ae5] rounded-xl px-4 pb-2 w-[265px]",
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
        <div className="py-12 px-4 max-content-wrapper">
          <div ref={titleRef} className="w-[300px] mx-auto">
            <Image src={TitleImage} />
          </div>

          <div
            role="listbox"
            className="relative flex flex-col gap-12 odd:ml-auto mt-6"
          >
            <EventDetail title="Tematica" className="uppercase">
              <span className="block mt-2">Alternavida - Retro - Arcade</span>
            </EventDetail>
            <EventDetail title="Musica" className="ml-[90px]" direction="right">
              <div className="flex gap-3">
                <div className="shrink-0 max-w-[80px]">
                  <Image src={DjProfileImage} />
                </div>
                <div className="flex flex-col">
                  <span className="uppercase">David Deheza</span>
                  <span>Founder of @davidehezadjs</span>
                </div>
              </div>
            </EventDetail>
            <EventDetail title="Lugar y Hora" className="uppercase">
              <span className="block mt-2">
                La Maité - Sto. Domino 1395 (Y.B) - 23:00hs.
              </span>
            </EventDetail>

            <div className="absolute w-[234px] top-[35px] left-[60px]">
              <Image src={LinesImage} />
            </div>
          </div>

          {/* <div className="absolute top-[31%] right-[90px] w-full max-w-[260px]">
            <img src={LineImage} className="w-full" />
          </div>

          <div className="absolute bottom-[13.5%] left-[78px] w-full max-w-[260px] scale-y-[-1]">
            <img src={LineImage} className="w-full" />
          </div> */}

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
