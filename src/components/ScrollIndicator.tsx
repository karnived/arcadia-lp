import { ChevronsDown, Mouse } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-[22lvh] right-4 text-gray-400">
      <Mouse className="mb-2" />
      <ChevronsDown className="animate-bounce" />
    </div>
  );
};

export default ScrollIndicator;
