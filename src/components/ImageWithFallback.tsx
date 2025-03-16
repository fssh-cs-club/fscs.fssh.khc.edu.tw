"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className={`duration-700 ease-in-out ${
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setError(true)}
          priority={priority}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
