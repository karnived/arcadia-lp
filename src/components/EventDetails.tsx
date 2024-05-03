import { Image } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideLeft, slideRight, slideUp } from "../utils/animations";

import TitleImage from "../assets/images/event-details-title.png";
import LinesImage from "../assets/images/event-details-lines-short.png";

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
          <div ref={titleRef} className="w-[290px] mx-auto">
            <Image src={TitleImage} />
          </div>

          <div
            role="listbox"
            className="relative flex flex-col gap-[74px] mx-auto odd:ml-auto mt-6 w-[328px]"
          >
            <EventDetail title="Theme" className="uppercase">
              <p>Alternativa - Retro - Arcade</p>
            </EventDetail>
            <EventDetail
              title="Music"
              className="ml-[90px] uppercase"
              direction="right"
            >
              <p>Loading...</p>
            </EventDetail>
            <EventDetail title="Where|When" className="uppercase">
              <p>Loading...</p>
            </EventDetail>

            <div className="absolute w-[234px] top-[25px] left-[60px]">
              <Image src={LinesImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
