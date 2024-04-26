import { PropsWithChildren } from "react";

const Background = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-full w-full bg-slate-950 text-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="max-w-[428px] mx-auto">{children}</div>
    </div>
  );
};

export default Background;