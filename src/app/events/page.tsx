"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  category: "活動" | "講座" | "競賽";
  location?: string;
  time?: string;
  participants?: string;
  organizer?: string;
  content?: string;
  previewImages?: number[];
  albumId?: string;
}

interface Album {
  id: string;
  title: string;
  date: string;
  images: string[];
  coverIndex?: number;
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedEvent || galleryImages.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedEvent, galleryImages]);

  const openGallery = (images: string[], startIndex: number = 0) => {
    setGalleryImages(images);
    setActiveImageIndex(startIndex);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeGallery = () => {
    setGalleryImages([]);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (galleryImages.length === 0) return;

      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        closeGallery();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryImages]);

  const albums: Album[] = [
    {
      id: "1",
      title: "ALT+F4 五校聯合迎新",
      date: "2024-11-03",
      coverIndex: 4,
      images: [
        "/images/events/welcome/29-1.jpg",
        "/images/events/welcome/29-2.jpg",
        "/images/events/welcome/29-3.jpg",
        "/images/events/welcome/29-4.jpg",
        "/images/events/welcome/29-5.jpg",
        "/images/events/welcome/29-6.jpg",
      ],
    },
    {
      id: "2",
      title: "2025 六校聯合社遊",
      date: "2025-01-21 - 2025-01-23",
      coverIndex: 8,
      images: [
        "/images/events/travel/29-1.jpg",
        "/images/events/travel/29-2.jpg",
        "/images/events/travel/29-3.jpg",
        "/images/events/travel/29-4.jpg",
        "/images/events/travel/29-5.jpg",
        "/images/events/travel/29-6.jpg",
        "/images/events/travel/29-7.jpg",
        "/images/events/travel/29-8.jpg",
        "/images/events/travel/29-9.jpg",
        "/images/events/travel/29-10.jpg",
        "/images/events/travel/29-11.jpg",
      ],
    },
  ];

  const events: Event[] = [
    {
      id: "1",
      title: "ALT+F4 五校聯合迎新",
      date: "2024-11-03",
      time: "09:00 - 17:00",
      location: "高雄中學",
      description:
        "舉辦了為期一天的迎新活動，大家玩了許多有趣的團康活動，也認識了許多新朋友。",
      category: "活動",
      participants: "30+",
      organizer: "雄中x雄女x鳳中x莊中x屏中",
      content: `- 破冰遊戲
        - 團康活動
        - 猜歌遊戲
      `,
      images: [
        "/images/events/welcome/29-1.jpg",
        "/images/events/welcome/29-2.jpg",
        "/images/events/welcome/29-3.jpg",
        "/images/events/welcome/29-4.jpg",
      ],
      previewImages: [0, 3],
      albumId: "1",
    },
    {
      id: "2",
      title: "2025 六校聯合社遊",
      date: "2025-01-21 - 2025-01-23",
      time: "",
      location: "",
      description:
        "為期三天的社遊，去了許多科技業的公司參訪，也去了台大電機聽講座。",
      category: "活動",
      participants: "80+",
      organizer: "鳳中x雄女x竹中x竹女x武陵x附中",
      content: `- 企業參訪
        - 校園講座
        - 團康活動
      `,
      images: [
        "/images/events/travel/29-4.jpg",
        "/images/events/travel/29-6.jpg",
        "/images/events/travel/29-9.jpg",
        "/images/events/travel/29-8.jpg",
      ],
      previewImages: [2, 3],
      albumId: "2",
    },
  ];

  const categoryColors = {
    活動: "bg-blue-500",
    講座: "bg-green-500",
    競賽: "bg-yellow-500",
  };

  const findAlbumById = (id: string): Album | undefined => {
    return albums.find((album) => album.id === id);
  };

  return (
    <div className="space-y-16 relative">
      <AnimatedBackground />

      <ScrollSection>
        <section className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            活動紀錄
          </motion.h1>
          <motion.p
            className="text-xl text-sky-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            回顧我們舉辦過的精彩活動
          </motion.p>
        </section>
      </ScrollSection>

      {/* 時間軸 */}
      <ScrollSection>
        <section className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* 時間軸線 */}
            <motion.div
              className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600"
              initial={{ scaleY: 0, transformOrigin: "top" }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.05 }}
            />

            {/* 活動項目 */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  } justify-end`}
                  initial={{
                    opacity: 0,
                    y: -20,
                    x: index % 2 === 0 ? -20 : 20,
                  }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  {/* 時間點 */}
                  <motion.div
                    className={`absolute md:left-1/2 left-4 transform md:-translate-x-1/2 w-4 h-4 ${
                      categoryColors[event.category]
                    } rounded-full ring-4 ring-white  shadow-lg z-10`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.5 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.08 + 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    viewport={{ once: false, amount: 0.6 }}
                  />

                  <motion.div
                    className={`md:w-5/12 w-[calc(100%-2rem)] ${
                      index % 2 === 0 ? "md:pr-8 pl-8" : "md:pl-8 pl-8"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.08 + 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-100">
                      <div className="mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            categoryColors[event.category]
                          }`}
                        >
                          {event.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold mt-3 mb-2 text-black">
                          {event.title}
                        </h3>
                        <p className="text-blue-600 text-sm md:text-base">
                          {event.date}
                        </p>
                      </div>
                      <p className="text-gray-600  text-sm md:text-base mb-4">
                        {event.description}
                      </p>

                      <motion.button
                        className="mb-4 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer text-sm md:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        查看詳情
                      </motion.button>

                      <motion.div
                        className="grid grid-cols-2 gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.08 + 0.2,
                          ease: "easeOut",
                        }}
                      >
                        {(event.previewImages
                          ? event.previewImages.map((idx) => event.images[idx])
                          : event.images.slice(0, 2)
                        ).map((image, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() =>
                              openGallery(
                                event.images,
                                event.previewImages
                                  ? event.previewImages[imgIndex]
                                  : imgIndex
                              )
                            }
                          >
                            <Image
                              src={image}
                              alt={`${event.title} 照片 ${imgIndex + 1}`}
                              fill
                              className="object-cover text-black"
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      <ScrollSection>
        <section className="bg-white  p-4 md:p-8 rounded-lg shadow-lg mx-4 md:mx-0">
          <motion.h2
            className="text-xl md:text-2xl font-semibold mb-6 text-center text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            相簿集錦
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="bg-gray-50  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative aspect-video cursor-pointer group"
                  onClick={() =>
                    album.images.length > 0 && openGallery(album.images, 0)
                  }
                >
                  {album.images.length > 0 ? (
                    <>
                      <Image
                        src={
                          album.images[album.coverIndex ?? 0] ||
                          "/images/placeholder.jpg"
                        }
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-lg line-clamp-1">
                          {album.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 ">
                      <p className="text-gray-500  text-center px-4">無圖片</p>
                    </div>
                  )}
                </div>

                <div className="p-3 flex justify-between items-center">
                  <p className="text-gray-500  text-sm">{album.date}</p>
                  <p className="text-gray-500  text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {album.images.length}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </ScrollSection>

      {/* 活動詳情模態框 */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="modal-content max-h-[80vh] overflow-y-auto w-[95%] md:w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-white text-xs md:text-sm ${
                        categoryColors[selectedEvent.category]
                      }`}
                    >
                      {selectedEvent.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold mt-2 md:mt-3 ">
                      {selectedEvent.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-500  hover:text-gray-700  cursor-pointer"
                    onClick={() => setSelectedEvent(null)}
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      日期：{selectedEvent.date}
                    </p>
                    {selectedEvent.time && (
                      <p className="flex items-center text-gray-600 text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        時間：{selectedEvent.time}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {selectedEvent.location && (
                      <p className="flex items-center text-gray-600  text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        地點：{selectedEvent.location}
                      </p>
                    )}
                    {selectedEvent.participants && (
                      <p className="flex items-center text-gray-600  text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        參與人數：{selectedEvent.participants} 人
                      </p>
                    )}
                    {selectedEvent.organizer && (
                      <p className="flex items-center text-gray-600 text-sm md:text-base">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        主辦單位：{selectedEvent.organizer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-2 text-base md:text-lg">
                    活動介紹
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm md:text-base">
                    {selectedEvent.content}
                  </p>
                </div>

                <div className="border-t border-gray-200  pt-4">
                  {selectedEvent.images.length > 0 ? (
                    <>
                      <div className="flex justify-between items-center mb-3 md:mb-4">
                        <h3 className="font-semibold  text-base md:text-lg">
                          活動照片
                        </h3>
                        <motion.button
                          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (selectedEvent.albumId) {
                              const album = findAlbumById(
                                selectedEvent.albumId
                              );
                              if (album && album.images.length > 0) {
                                openGallery(album.images, 0);
                                setSelectedEvent(null);
                              }
                            } else if (selectedEvent.images.length > 0) {
                              openGallery(selectedEvent.images, 0);
                              setSelectedEvent(null);
                            }
                          }}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {selectedEvent.albumId
                            ? "查看完整相簿"
                            : "查看所有照片"}
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {selectedEvent.images.map((image, index) => (
                          <motion.div
                            key={index}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            onClick={() => {
                              openGallery(selectedEvent.images, index);
                            }}
                          >
                            <Image
                              src={image || "/images/placeholder.jpg"}
                              alt={`${selectedEvent.title} 照片 ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 ">此活動暫無照片</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal - 改為多張照片瀏覽 */}
      <AnimatePresence mode="sync">
        {galleryImages.length > 0 && (
          <motion.div
            className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-all duration-300 ${
              isFullscreen ? "p-0" : "p-4 md:p-6"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            onClick={closeGallery}
          >
            <motion.div
              className={`relative bg-black/95 rounded-lg shadow-xl flex flex-col ${
                isFullscreen
                  ? "w-full h-[95vh] rounded-none"
                  : "max-w-[95vw] w-full h-[80vh] max-h-[80vh]"
              }`}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.5,
                },
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 10,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              onClick={(e) => e.stopPropagation()}
              transition={{
                layout: { duration: 0.3, ease: "easeOut" },
              }}
              layout
            >
              {/* 控制按鈕區 */}
              <motion.div
                className="absolute top-4 right-4 z-50 flex space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.3 },
                }}
              >
                {/* 全螢幕切換按鈕 */}
                <motion.button
                  className="text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFullscreen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  )}
                </motion.button>

                {/* 關閉按鈕 */}
                <motion.button
                  className="text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeGallery();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* 主圖片區域 */}
              <div className="flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeImageIndex}
                    className="relative w-full h-full flex items-center justify-center"
                    initial={{
                      opacity: 0,
                      x: 100 * (Math.random() > 0.5 ? 1 : -1),
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 200,
                        duration: 0.4,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100 * (Math.random() > 0.5 ? 1 : -1),
                      scale: 0.9,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                  >
                    <Image
                      src={galleryImages[activeImageIndex]}
                      alt={`image ${activeImageIndex + 1}/${
                        galleryImages.length
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className={`object-contain ${
                        isFullscreen ? "px-0" : "px-4"
                      } transition-all duration-300`}
                      priority
                      quality={95}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* 照片計數器 */}
                <motion.div
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2,
                      duration: 0.3,
                    },
                  }}
                  transition={{
                    layoutId: "counter",
                    duration: 0.3,
                  }}
                  layout
                >
                  {activeImageIndex + 1} / {galleryImages.length}
                </motion.div>

                {/* 左右箭頭 */}
                {galleryImages.length > 1 && (
                  <>
                    <motion.button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.3 },
                      }}
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(0,0,0,0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </motion.button>
                    <motion.button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.3 },
                      }}
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(0,0,0,0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </>
                )}
              </div>

              {/* 縮略圖區域 - 只在非全螢幕模式顯示 */}
              {galleryImages.length > 1 && !isFullscreen && (
                <motion.div
                  className="h-[90px] mt-4 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.3 },
                  }}
                >
                  <div className="flex space-x-2 overflow-x-auto overflow-y-hidden pb-2 h-full items-center no-scrollbar">
                    {galleryImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        className={`relative h-20 w-32 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all ${
                          activeImageIndex === idx
                            ? "ring-2 ring-blue-500 scale-105"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setActiveImageIndex(idx)}
                        whileHover={{ scale: 1.08, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: activeImageIndex === idx ? 1 : 0.7,
                          y: 0,
                          scale: activeImageIndex === idx ? 1.05 : 1,
                          transition: {
                            delay: 0.3 + idx * 0.05,
                            duration: 0.3,
                          },
                        }}
                        transition={{
                          layoutId: `thumbnail-${idx}`,
                          duration: 0.3,
                        }}
                        layout
                      >
                        <Image
                          src={img}
                          alt={`缩略图 ${idx + 1}`}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                        {activeImageIndex === idx && (
                          <motion.div
                            className="absolute inset-0 ring-2 ring-blue-500"
                            layoutId="activeThumb"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
