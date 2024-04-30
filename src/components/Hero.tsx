import RegisterForm from "./RegisterForm";
import Countdown from "./Countdown";
import { Image } from "@nextui-org/react";

import HeroTitleImage from "../assets/images/hero-title.png";

const Hero = () => {
  return (
    <section id="hero">
      <div className="bg-[url('../assets/images/hero-background.png')] bg-no-repeat bg-cover">
        <div className="px-6 py-10 text-center relative min-h-screen max-content-wrapper">
          <Image src={HeroTitleImage} />

          <RegisterForm />
          <Countdown targetDate={"2024-05-24"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
