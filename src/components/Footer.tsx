import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { ExternalLink } from "lucide-react";
import LineSeparatorImage from "../assets/images/footer-separator.png";
import { slideUp } from "../utils/animations";

const team = [
  {
    name: "Nicolas Aybar",
    role: "Event Director",
    url: "https://www.instagram.com/__zniko/",
  },
  {
    name: "David Deheza",
    role: "Sound Architect",
    url: "https://www.instagram.com/davidehezadjs",
  },
  {
    name: "Estudio Brutal",
    role: "Creative Styling",
    url: "https://www.instagram.com/estudio_brutal",
  },
  {
    name: "Fernando Adad",
    role: "Code Wizard",
    url: "https://ar.linkedin.com/in/fer-adad",
  },
  {
    name: "Clementina Stenvers",
    role: "Visionary Digital Designer",
    url: "https://hiclem.art/",
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
        ScrollReveal().reveal(item, {
          ...slideUp,
          delay: idx * 150,
        })
      );
    }
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-[#392048] to-[#4C305D]"
    >
      <div className="py-16 pt-24  px-6 max-content-wrapper">
        <h3
          className="text-[18px] font-bold uppercase mb-10 text-center"
          ref={titleRef}
        >
          Ultimate Lineup
        </h3>
        <ul className="flex flex-col items-center gap-7" ref={listRef}>
          {team.map((item, idx) => (
            <li key={idx} className="shrink-0 w-full max-w-[100px] min-w-max">
              <div className="flex flex-col items-center gap-2">
                <a
                  href={item.url ?? "#"}
                  className="group flex items-center cursor-pointer gap-1 py-[6px] px-[16px] bg-[#513662] rounded-[33px] shadow-[0_0_9px_0_#231636BF]"
                >
                  <p className="font-thin uppercase tracking-[20%] text-[14px]">
                    {item.name}
                  </p>
                  {item.url && (
                    <ExternalLink className="h-3 w-0 group-hover:w-3 group-focus:w-3 transition-all" />
                  )}
                </a>
                <img src={LineSeparatorImage} />
                <p className="font-thin text-[12px]">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
