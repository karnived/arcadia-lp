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
    <div className="flex-1 flex flex-col items-center justify-center bg-purple-700 rounded-xl">
      <span className="text-3xl">{value}</span>
      <span className="text-sm">{label}</span>
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
      <div className="fixed top-6 left-0 right-0 px-2 w-full z-10 text-white max-w-[400px] mx-auto">
        <time
          className="w-full flex space-x-4 h-20"
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
