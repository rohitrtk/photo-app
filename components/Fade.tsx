import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface IFade {
  children: ReactNode;
  useExit?: boolean;
}

const initialExitAnim = {
  opacity: 0
}

const anim = {
  opacity: 1,
  transition: { duration: 0.5 }
}

const Fade = ({ children, useExit }: IFade) => {
  return (
    <motion.div
      initial={initialExitAnim}
      exit={useExit ? initialExitAnim : ""}
      animate={anim}
    >
      {children}
    </motion.div>
  );
}

export default Fade;