import { Button } from "@nextui-org/button";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../utils/animations";

const MemeUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.childNodes as NodeListOf<Element>;
      ScrollReveal().reveal(items, slideUp);
    }
  }, []);

  return (
    <section id="meme-upload" className="py-20 px-6">
      <input
        ref={inputRef}
        id="upload"
        type="file"
        className="hidden"
        aria-hidden="true"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onInput={console.log}
      />

      <div
        className="flex flex-col items-center justify-center"
        ref={containerRef}
      >
        <h2 className="text-3xl font-secondary uppercase font-bold">
          Meme Time
        </h2>

        <h3 className="text-md mt-4 text-center">
          Llenemos la fiesta de memes, copate y subí los tuyos
        </h3>

        <Button onPress={handleOnClick} color="primary" className="mt-14">
          <UploadCloud className="w-4 h-4" />
          <span>Subi tus memes</span>
        </Button>
      </div>
    </section>
  );
};

export default MemeUpload;
