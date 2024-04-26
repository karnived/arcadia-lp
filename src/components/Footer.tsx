import { Card } from "@nextui-org/react";
import ScrollReveal from "scrollreveal";
import { useEffect, useRef } from "react";
import { slideUp } from "../utils/animations";

const team = [
  {
    name: "Nicolas Aybar",
    role: "Organizador",
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
        ScrollReveal().reveal(item, { ...slideUp, delay: idx * 150 })
      );
    }
  }, []);

  return (
    <footer className="py-16 px-6">
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

        <h3
          className="text-4xl font-bold font-secondary uppercase mb-10 text-center"
          ref={titleRef}
        >
          Dream Team
        </h3>
        <ul className="flex flex-wrap gap-4" ref={listRef}>
          {team.map((item, idx) => (
            <li key={idx} className="shrink-0 w-full max-w-[100px] min-w-max">
              <Card className="p-3 bg-purple-400/30 text-white">
                <p className="font-bold">{item.role}</p>
                <p className="font-light">{item.name}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
