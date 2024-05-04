import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";

import { calculateTimeLeft } from "../utils/calculateTimeLeft";
import { slideUp } from "../utils/animations";

type CountdownProps = {
  targetDate: string | Date;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const listRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.childNodes as NodeListOf<HTMLElement>;

      items.forEach((item, idx) =>
        ScrollReveal().reveal(item, { ...slideUp, delay: idx * 150 })
      );
    }
  }, []);

  return (
    <section id="countdown">
      <div className="px-2 w-full z-10 text-white max-w-[400px] mx-auto">
        <time
          className="w-full grid grid-cols-4 gap-4 min-[375px]:gap-6"
          dateTime={targetDate.toLocaleString()}
          ref={listRef}
        >
          {Object.keys(timeLeft).map((interval) => (
            <div
              key={interval}
              className="flex-1 flex flex-col items-center justify-center countdown-box-container"
            >
              <span className="mb-2 uppercase text-[13px]">
                {interval.charAt(0).toUpperCase() + interval.slice(1)}
              </span>
              <div className="relative aspect-square w-full rounded-xl flex items-center justify-center countdown-box">
                <span className="text-[28px] min-[375px]:text-[40px] countdown-value">
                  {timeLeft[interval as keyof typeof timeLeft]
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </time>
      </div>
    </section>
  );
}
