import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../utils/animations";

import LineSeparatorImage from "../assets/images/footer-separator.png";

const team = [
  {
    name: "Nicolas Aybar",
    role: "Organización",
  },
  {
    name: "David Deheza",
    role: "Música",
  },
  {
    name: "JC Producción de Eventos",
    role: "Producción",
  },
  {
    name: "Sofia Becerra",
    role: "Estilismo",
  },
  {
    name: "Fernando Adad",
    role: "Frontend Engineer",
  },
  {
    name: "Clementina Stenvers",
    role: "UX/UI Design",
  },
];

const Footer = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      ScrollReveal().reveal(titleRef.current, slideUp);
    }

    if (listRef.current) {
      const items = listRef.current.childNodes as NodeListOf<HTMLElement>;
      items.forEach((item, idx) =>
        ScrollReveal().reveal(item, { ...slideUp, delay: idx * 150 + 200 })
      );
    }
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-[#392048] to-[#4C305D]"
    >
      <div className="py-16 px-6 max-content-wrapper">
        <h3
          className="text-4xl font-bold uppercase mb-10 text-center"
          ref={titleRef}
        >
          Dream Team
        </h3>
        <ul className="flex flex-col items-center gap-7" ref={listRef}>
          {team.map((item, idx) => (
            <li key={idx} className="shrink-0 w-full max-w-[100px] min-w-max">
              <div className="flex flex-col items-center gap-2">
                <p className="font-thin uppercase tracking-[20%] py-[6px] px-[16px] bg-[#513662] rounded-[33px] shadow-[0_0_9px_0_#231636BF]">
                  {item.name}
                </p>
                <img src={LineSeparatorImage} />
                <p className="font-thin">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
