"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedComponentProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "scale" | "bounce";
  delay?: number;
  className?: string;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  bounce: {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.5,
      },
    },
    exit: { opacity: 0, y: 50 },
  },
};

export default function AnimatedComponent({
  children,
  animation = "fadeIn",
  delay = 0,
  className = "",
}: AnimatedComponentProps) {
  return (
    <motion.div
      className={className}
      variants={animations[animation]}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
