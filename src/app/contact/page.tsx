"use client";

import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Contact() {
  const contactInfo = [
    {
      title: "電子郵件",
      value: "fscs@fssh.khc.edu.tw",
      icon: (
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "社團教室",
      value: "社會視聽館 3F 電腦教室一 & 綜合教學大樓 1F AI 教室",
      icon: (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "社團時間",
      value: "特定週五下午 2:15-4:05",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

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
            聯絡資訊
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            有任何問題或建議，可以聯絡我們
          </motion.p>
        </section>
      </ScrollSection>

      {/* 聯絡資訊 */}
      <ScrollSection>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <motion.div
                className="w-6 h-6 mx-auto mb-4 text-blue-600 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {info.icon}
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.value}</p>
            </motion.div>
          ))}
        </section>
      </ScrollSection>

      {/* 地圖 */}
      <ScrollSection>
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            社團位置
          </motion.h2>
          <motion.div
            className="aspect-video rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.6442643968207!2d120.34304751120634!3d22.629755579365284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e1b34fd46fdf1%3A0x824525998b0bbb92!2z5ZyL56uL6bOz5bGx6auY57Sa5Lit5a24!5e0!3m2!1szh-TW!2stw!4v1742081911546!5m2!1szh-TW!2stw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </section>
      </ScrollSection>
    </div>
  );
}
