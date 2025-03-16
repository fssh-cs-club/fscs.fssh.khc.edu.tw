"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const lightGradients = [
    "linear-gradient(to right, #60a5fa, #3b82f6)",
    "linear-gradient(to right, #3b82f6, #2563eb)",
    "linear-gradient(to right, #2563eb, #1d4ed8)",
  ];

  const darkGradients = [
    "linear-gradient(to right, #1e3a8a, #1e40af)",
    "linear-gradient(to right, #1e40af, #1d4ed8)",
    "linear-gradient(to right, #1d4ed8, #2563eb)",
  ];

  const gradients =
    mounted && theme === "dark" ? darkGradients : lightGradients;

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], gradients);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.15, 0.2]);

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{ background: backgroundColor, opacity }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50" />
    </motion.div>
  );
}
