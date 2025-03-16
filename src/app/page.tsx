"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: "活動" | "公告" | "課程";
  content: string;
  location?: string;
  time?: string;
  organizer?: string;
  link?: string;
  linkText?: string;
}

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // 控制模態框打開時的背景滾動
  useEffect(() => {
    // 當模態框打開時，禁用背景滾動
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      // 當模態框關閉時，恢復背景滾動
      document.body.style.overflow = "auto";
    }

    // 組件卸載時恢復滾動
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNews]);

  const heroButtons = [
    {
      text: "🔥社服火熱預購中！🔥",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSc3ZD3UGkdNWJABi5FqyDRUZkpkqXf_oGTbAXZRuUMfOhESUA/viewform?usp=header",
    },
    {
      text: "🧑‍💻 30th 幹部熱烈招募中！👩‍💻",
      href: "https://forms.gle/eNpbUm7ZUQybPieA9",
    },
  ];

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Vic88好電",
      description: "想要成為 Vic88 嗎？",
      date: "2025-08-07",
      category: "公告",
      content: `趕快來加入 Vic88 吧！

加入 Vic88 教，你將可以：
• 變成大電神
• 變成大大電神
• 變成大大大電神
• 變成大大大大電神
• 變成大大大大大電神
• 變成大大大大大大電神
• 變成大大大大大大大電神
• 變成大大大大大大大大電神
• 變成大大大大大大大大大電神

時間：2025/08/07 (七) 25:61-35:61
地點：校長室

報名方式：點擊下方連結報名`,
      location: "校長室",
      time: "25:61-35:61",
      organizer: "Vic87",
      link: "https://forms.gle/eNpbUm7ZUQybPieA9",
      linkText: "按這裡成為 Vic88",
    },
  ];

  return (
    <div className="relative space-y-8">
      <AnimatedBackground />

      {/* Hero Section */}
      <ScrollSection>
        <section className="text-center py-12">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            FSCS 鳳山高中電腦資訊社
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-sky-600 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            29th
          </motion.p>
          <motion.div className="flex flex-col gap-4 items-center">
            {heroButtons.map((button, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  mass: 0.8,
                }}
              >
                <Link
                  target="_blank"
                  href={button.href}
                  className="inline-block bg-white/90 backdrop-blur-sm text-blue-600 px-10 py-4 rounded-full font-bold border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-white"
                >
                  {button.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </ScrollSection>
      {/* Latest News Section */}
      <ScrollSection>
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <motion.h2
            className="text-3xl font-bold mb-6 text-black text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            最新消息
          </motion.h2>
          <div className="grid gap-6">
            {newsItems.map((news) => (
              <motion.div
                key={news.id}
                className="p-4 border rounded-lg text-black hover:bg-blue-50 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: news.id * 0.1 }}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedNews(news)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-black">{news.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-sm rounded-full ${
                      news.category === "活動"
                        ? "bg-blue-100 text-blue-700"
                        : news.category === "公告"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <p className="text-gray-600 mb-2">{news.description}</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center">
                  了解更多
                  <svg
                    className="w-4 h-4 ml-1"
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
            ))}
          </div>
        </section>
      </ScrollSection>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg max-w-2xl w-full shadow-xl border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl text-black font-bold mb-2">
                      {selectedNews.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 text-sm rounded-full ${
                          selectedNews.category === "活動"
                            ? "bg-blue-100 text-blue-700"
                            : selectedNews.category === "公告"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {selectedNews.category}
                      </span>
                      <span className="text-gray-500">{selectedNews.date}</span>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setSelectedNews(null)}
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

                <div className="space-y-4">
                  {selectedNews.location && (
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
                      {selectedNews.location}
                    </div>
                  )}
                  {selectedNews.time && (
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
                      {selectedNews.time}
                    </div>
                  )}
                  {selectedNews.organizer && (
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
                      {selectedNews.organizer}
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-gray-600 whitespace-pre-line">
                      {selectedNews.content}
                    </p>
                  </div>

                  {selectedNews.link && (
                    <div className="mt-6 flex justify-center">
                      <Link
                        href={selectedNews.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center border border-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedNews.linkText || selectedNews.link}
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
    </div>
  );
}
