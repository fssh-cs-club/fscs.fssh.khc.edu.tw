"use client";

import { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Photo {
  id: number;
  src: string;
  alt: string;
  event?: string;
  date?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  columns?: number;
}

const PhotoGallery = ({ photos, columns = 4 }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div
        className={`grid gap-4`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedPhoto(photo)}
          >
            <ImageWithFallback
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-7xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-xl p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>

            <div className="relative aspect-video">
              <ImageWithFallback
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold">{selectedPhoto.event}</h3>
              <p className="text-gray-300">{selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
