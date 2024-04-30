import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";

import { calculateTimeLeft } from "../utils/calculateTimeLeft";
import { slideUp } from "../utils/animations";

type BoxProps = {
  label: string;
  value: number;
};

const Box = ({ label, value }: BoxProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center countdown-box-container">
      <span className="text-sm mb-2 uppercase text-[13px]">{label}</span>
      <div className="w-[60px] h-[60px] rounded-xl flex justify-center countdown-box">
        <span className="text-[40px] countdown-value">{value}</span>
      </div>
    </div>
  );
};

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
          className="w-full flex space-x-6"
          dateTime={targetDate.toLocaleString()}
          ref={listRef}
        >
          <Box label="Days" value={timeLeft.days} />
          <Box label="Hours" value={timeLeft.hours} />
          <Box label="Minutes" value={timeLeft.minutes} />
          <Box label="Seconds" value={timeLeft.seconds} />
        </time>
      </div>
    </section>
  );
}
