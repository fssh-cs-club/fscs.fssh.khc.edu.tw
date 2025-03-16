"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

type Category = "活動" | "課程" | "競賽" | "公告";

interface ImageWithCaption {
  url: string;
  caption?: string;
}

interface Announcement {
  title: string;
  date: string;
  category: Category;
  description: string;
  link?: string;
  linkText?: string;
  content?: string;
  images?: (string | ImageWithCaption)[];
  location?: string;
  time?: string;
  organizer?: string;
}

export default function Announcements() {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 控制模態框打開時的背景滾動
  useEffect(() => {
    // 當任何模態框打開時，禁用背景滾動
    if (selectedAnnouncement || selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      // 當模態框關閉時，恢復背景滾動
      document.body.style.overflow = "auto";
    }

    // 組件卸載時恢復滾動
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedAnnouncement, selectedImage]);

  // 獲取圖片URL，兼容新舊格式
  const getImageUrl = (image: string | ImageWithCaption): string => {
    return typeof image === "string" ? image : image.url;
  };

  // 獲取圖片說明，兼容新舊格式
  const getImageCaption = (
    image: string | ImageWithCaption
  ): string | undefined => {
    return typeof image === "string" ? undefined : image.caption;
  };

  const announcements: Announcement[] = [
    {
      title: "29th 社服預購開始！！！",
      date: "2025-03-14",
      category: "公告",
      description: "鳳中電資社第29屆社服預購開始！",
      content: `歡迎踴躍預購！`,
      link: "https://docs.google.com/forms/d/e/1FAIpQLSc3ZD3UGkdNWJABi5FqyDRUZkpkqXf_oGTbAXZRuUMfOhESUA/viewform?usp=header",
      linkText: "立即預購",
      location: "",
      time: "",
      organizer: "美宣 MUNE",
      images: [
        {
          url: "/images/announcements/club_cloth/size.png",
          caption: "社服尺寸對照表，請務必確認好自己的尺寸再訂購",
        },
      ],
    },
  ];

  const categoryColors: Record<Category, string> = {
    活動: "bg-green-100 text-green-800",
    課程: "bg-blue-100 text-blue-800",
    競賽: "bg-purple-100 text-purple-800",
    公告: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-16 relative">
      <AnimatedBackground />

      {/* 頁面標題 */}
      <ScrollSection>
        <section className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            活動公告
          </motion.h1>
          <motion.p
            className="text-xl text-sky-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            最新的公告、社團活動、課程和競賽資訊
          </motion.p>
        </section>
      </ScrollSection>

      {/* 公告列表 */}
      <ScrollSection>
        <section className="grid gap-8">
          {announcements.map((announcement, index) => (
            <motion.article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => setSelectedAnnouncement(announcement)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <h2 className="text-2xl font-semibold text-black mb-2">
                      {announcement.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{announcement.date}</span>
                      <span
                        className={`px-3 py-1 rounded-full ${
                          categoryColors[announcement.category]
                        }`}
                      >
                        {announcement.category}
                      </span>
                    </div>
                  </motion.div>
                </div>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {announcement.description}
                </motion.p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAnnouncement(announcement);
                    }}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    了解更多
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </button>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </section>
      </ScrollSection>

      {/* 公告詳情模態框 */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAnnouncement(null)}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg max-w-4xl w-full shadow-xl border border-white/20 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      {selectedAnnouncement.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 text-sm rounded-full ${
                          categoryColors[selectedAnnouncement.category]
                        }`}
                      >
                        {selectedAnnouncement.category}
                      </span>
                      <span className="text-gray-500">
                        {selectedAnnouncement.date}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setSelectedAnnouncement(null)}
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
                  </button>
                </div>

                <div className="space-y-6">
                  {/* 活動資訊 */}
                  <div className="space-y-4">
                    {selectedAnnouncement.location && (
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2"
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
                        {selectedAnnouncement.location}
                      </div>
                    )}
                    {selectedAnnouncement.time && (
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2"
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
                        {selectedAnnouncement.time}
                      </div>
                    )}
                    {selectedAnnouncement.organizer && (
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2"
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
                        {selectedAnnouncement.organizer}
                      </div>
                    )}
                  </div>

                  {/* 內容 */}
                  {selectedAnnouncement.content && (
                    <div className="mt-4">
                      <p className="text-gray-600 whitespace-pre-line">
                        {selectedAnnouncement.content}
                      </p>
                    </div>
                  )}

                  {/* 圖片區 - 動態調整大小 */}
                  {selectedAnnouncement.images &&
                    selectedAnnouncement.images.length > 0 && (
                      <div className="mt-6">
                        <div
                          className={`grid ${
                            selectedAnnouncement.images.length > 1
                              ? "grid-cols-1 md:grid-cols-2"
                              : "grid-cols-1"
                          } gap-4`}
                        >
                          {selectedAnnouncement.images.map((image, index) => {
                            const imageUrl = getImageUrl(image);
                            const imageCaption = getImageCaption(image);

                            return (
                              <motion.div
                                key={index}
                                className="group relative rounded-lg overflow-hidden cursor-zoom-in bg-white flex flex-col"
                                whileHover={{
                                  boxShadow:
                                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                  scale: 1.02,
                                }}
                              >
                                <div
                                  className="relative"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    minHeight: "200px",
                                    maxHeight:
                                      selectedAnnouncement.images!.length > 1
                                        ? "300px"
                                        : "500px",
                                  }}
                                  onClick={() => setSelectedImage(imageUrl)}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center transition-all z-10">
                                    <motion.div
                                      className="text-blue-500 bg-white/70 p-2 rounded-full"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileHover={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.2 }}
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
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                        />
                                      </svg>
                                    </motion.div>
                                  </div>
                                  <div className="w-full h-full group-hover:brightness-105 transition-all">
                                    <Image
                                      src={imageUrl}
                                      alt={
                                        imageCaption ||
                                        `${selectedAnnouncement.title} - 圖片 ${
                                          index + 1
                                        }`
                                      }
                                      className="object-contain w-full h-full"
                                      width={800}
                                      height={600}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      priority={index < 2}
                                    />
                                  </div>
                                </div>
                                {imageCaption && (
                                  <div className="p-2 text-sm text-gray-600 text-center bg-gray-50 rounded-b-lg border-t border-gray-100">
                                    {imageCaption}
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 連結按鈕 */}
                  {selectedAnnouncement.link && (
                    <div className="mt-6 flex justify-center">
                      <Link
                        href={selectedAnnouncement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center border border-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedAnnouncement.linkText || "前往連結"}
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 圖片全屏模態框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
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

            <motion.div
              className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="放大查看"
                className="object-contain max-h-[80vh] max-w-[90vw]"
                width={1200}
                height={900}
                sizes="90vw"
                priority
              />

              {/* 圖片說明 - 在全屏模式下顯示 */}
              {selectedAnnouncement?.images &&
                (() => {
                  const foundImage = selectedAnnouncement.images.find(
                    (img) => getImageUrl(img) === selectedImage
                  );
                  const caption = foundImage
                    ? getImageCaption(foundImage)
                    : undefined;

                  return caption ? (
                    <div className="mt-4 px-6 py-3 bg-white/10 text-white rounded-lg text-center max-w-3xl">
                      {caption}
                    </div>
                  ) : null;
                })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
