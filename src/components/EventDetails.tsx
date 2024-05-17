import { Image } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import { PropsWithChildren, useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideLeft, slideRight, slideUp } from "../utils/animations";

import TitleImage from "../assets/images/event-details-title.png";
import LinesImage from "../assets/images/event-details-lines.png";
import ProfileImage from "../assets/images/dj-profile.png";

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
        "border-2 border-[#f35ae5] rounded-xl px-4 pb-2 max-w-[265px]",
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
      <div className="relative bg-gradient-to-b from-[#09080e] to-[#652287]">
        <div className="py-12 px-4 max-content-wrapper">
          <div ref={titleRef} className="w-[290px] mx-auto">
            <Image src={TitleImage} />
          </div>

          <div
            role="listbox"
            className="relative flex flex-col gap-[47px] mx-auto odd:ml-auto mt-6 w-[328px]"
          >
            <EventDetail title="Theme" className="uppercase">
              <p>Alternativa - Retro - Arcade</p>
            </EventDetail>
            <EventDetail title="Music" className="ml-[90px]" direction="right">
              <div className="flex gap-[18px]">
                <Image
                  src={ProfileImage}
                  className="w-[77px] aspect-ratio-square flex-shrink-0"
                />
                <p>
                  DAVID DEHEZA
                  <br />
                  Founder of
                  <br />
                  @davidehezadjs
                </p>
              </div>
            </EventDetail>
            <EventDetail title="Where|When" className="uppercase">
              <p>Loading...</p>
            </EventDetail>

            <div className="absolute w-[234px] top-[21px] left-[60px]">
              <Image src={LinesImage} />
            </div>
          </div>
        </div>

        <div className="absolute top-[100%] left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#652287"
                fill-opacity="1"
                d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,69.3C672,43,768,53,864,90.7C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
