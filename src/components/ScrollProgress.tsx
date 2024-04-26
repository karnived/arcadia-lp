import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-2.5 bg-purple-500/50 origin-left z-10"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
