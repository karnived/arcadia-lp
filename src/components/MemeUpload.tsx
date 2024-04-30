import { useEffect, useRef } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { UploadCloud } from "lucide-react";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../utils/animations";

import TitleImage from "../assets/images/meme-title.png";

const MemeUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (cardRef.current) {
      ScrollReveal().reveal(cardRef.current, slideUp);
    }
  }, []);

  return (
    <section id="meme-upload">
      <div className="bg-[url('../assets/images/hero-background.png')] bg-no-repeat bg-cover">
        <div className="pt-12 pb-36 px-5 max-content-wrapper">
          <Card className="pt-5 pb-7 px-4 custom-transparent-bg" ref={cardRef}>
            <CardHeader className="flex flex-col items-center justify-center text-center p-0">
              <Image src={TitleImage} className="h-[80px]" />
              <h3 className="text-md text-center">
                Queremos llenar la fiesta de memes y nos coparía tu colaboración
                y buen sentido del humor.
                <br />
                Subilos con tu autoría o anónimos
              </h3>
            </CardHeader>
            <CardBody>
              <input
                ref={inputRef}
                id="upload"
                type="file"
                className="hidden"
                aria-hidden="true"
                accept="image/png, image/jpeg, image/webp, image/gif"
                onInput={console.log}
              />

              <Button
                onPress={handleOnClick}
                color="primary"
                className="max-w-[188px] self-center bg-black rounded-3xl border-1 border-[#FF1BF4] hover:bg-[#FF1BF4]"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subi tus memes</span>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MemeUpload;
