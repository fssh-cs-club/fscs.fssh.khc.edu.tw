"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-up";
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animations = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-in": "opacity-0",
    "slide-in": "-translate-x-10 opacity-0",
    "scale-up": "scale-95 opacity-0",
  };

  return (
    <div
      ref={sectionRef}
      className={`transform transition-all duration-1000 ease-out ${className} ${
        isVisible ? "" : animations[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
