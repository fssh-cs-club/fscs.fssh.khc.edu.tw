"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState, useEffect } from "react";
import crypto from "crypto";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  nickname: string;
  role: string;
  description: string;
  details: {
    skills: string[];
    responsibilities: string[];
    contact?: {
      email?: string;
      instagram?: string;
      github?: string;
    };
  };
}

const defaultEmail = "fscs@fssh.khc.edu.tw";

function getGravatarUrl(email: string, size: number = 200): string {
  const emailHash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
}

export default function About() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // 控制模態框打開時的背景滾動
  useEffect(() => {
    // 當模態框打開時，禁用背景滾動
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      // 當模態框關閉時，恢復背景滾動
      document.body.style.overflow = "auto";
    }

    // 組件卸載時恢復滾動
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedMember]);

  const clubFeatures = [
    {
      title: "程式設計",
      description: "學習各種程式語言和開發技術",
      icon: "💻",
    },
    {
      title: "專題製作",
      description: "實作專案，培養實務經驗",
      icon: "🚀",
    },
    {
      title: "競賽培訓",
      description: "參與各類程式競賽",
      icon: "🏆",
    },
    {
      title: "技術交流",
      description: "分享學習心得與經驗",
      icon: "🤝",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "盧明澤",
      nickname: "Fearnot",
      role: "社長 教學 網管",
      description: "負責當社畜",
      details: {
        skills: ["資訊安全", "Python", "Next.js"],
        responsibilities: [
          "資訊安全教學",
          "社團官網架設",
          "社團伺服器管理",
          "社團活動規劃",
        ],
        contact: {
          email: "kenin221@gmail.com",
          instagram: "https://www.instagram.com/mj_0221_lu/",
          github: "https://github.com/fearnot221",
        },
      },
    },
    {
      name: "盧品碩",
      nickname: "Vic88",
      role: "副社長",
      description: "C+++攝影",
      details: {
        skills: ["演算法", "攝影"],
        responsibilities: ["攝影相關", "社團事務協助處理"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fssa_fscs_vic88/",
          github: "",
        },
      },
    },
    {
      name: "張紘銘",
      nickname: "牛奶麻糬",
      role: "總務",
      description: "管錢的",
      details: {
        skills: ["C", "C++"],
        responsibilities: ["管錢"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fscs29_hhh.hm.077/",
          github: "",
        },
      },
    },
    {
      name: "林葉亭",
      nickname: "MUNE",
      role: "美宣",
      description: "畫畫",
      details: {
        skills: [""],
        responsibilities: ["幫我們在交接前生出社服"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fscs29_m1a0n4/",
          github: "",
        },
      },
    },
    {
      name: "呂科路",
      nickname: "輸了會不奘-kencancyou",
      role: "教學",
      description: "演算法基礎教學",
      details: {
        skills: ["C++"],
        responsibilities: ["演算法基礎教學"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fscs29_kengg/",
          github: "",
        },
      },
    },
    {
      name: "洪冠傑",
      nickname: "mikehung487",
      role: "教學",
      description: "演算法進階教學",
      details: {
        skills: ["C++"],
        responsibilities: ["演算法進階教學"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/mikehung487/",
          github: "",
        },
      },
    },
    {
      name: "施奕婷",
      nickname: "Ariel_ouob",
      role: "公關",
      description: "痾",
      details: {
        skills: ["C++"],
        responsibilities: ["發文"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fscs29_arielshih/",
          github: "",
        },
      },
    },
    {
      name: "陳秉紳",
      nickname: "2.5條悟",
      role: "公關",
      description: "痾",
      details: {
        skills: [""],
        responsibilities: ["發文"],
        contact: {
          email: "",
          instagram: "https://www.instagram.com/fscs29_benson/",
          github: "",
        },
      },
    },
    {
      name: "李冠德",
      nickname: "HARushB",
      role: "文書",
      description: "簽公假單",
      details: {
        skills: [""],
        responsibilities: ["簽公假單"],
        contact: {
          email: "",
          instagram: "",
          github: "",
        },
      },
    },
  ];

  return (
    <div className="space-y-16 relative">
      <AnimatedBackground />

      {/* 社團介紹 */}
      <ScrollSection>
        <section className="text-center">
          <motion.h1 className="text-4xl font-bold mb-6 text-gradient">
            關於我們
          </motion.h1>
          <motion.p className="text-xl text-sky-600 max-w-2xl mx-auto">
            了解鳳山高中電腦資訊社的社畜們
          </motion.p>
        </section>
      </ScrollSection>

      {/* 社團特色 */}
      <ScrollSection>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clubFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div className="text-4xl mb-4">{feature.icon}</motion.div>
              <h3 className="text-xl font-semibold mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </ScrollSection>

      {/* 幹部介紹 */}
      <ScrollSection>
        <section>
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            幹部介紹
          </motion.h2>
          <div className="relative">
            <div className="flex overflow-x-auto custom-scrollbar space-x-6 pb-6 px-4 py-2 -mx-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer flex-shrink-0 w-64"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  onClick={() => setSelectedMember(member)}
                >
                  <motion.div
                    className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={getGravatarUrl(
                        member.details.contact?.email || defaultEmail,
                        200
                      )}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {member.name}
                  </h3>
                  <h4 className="text-lg font-semibold mb-2 text-black">
                    {member.nickname}
                  </h4>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                  <motion.button className="mt-4 text-blue-600 hover:text-blue-700 flex items-center justify-center w-full cursor-pointer">
                    查看詳情
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
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* 幹部詳情模態框 */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
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
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={getGravatarUrl(
                          selectedMember.details.contact?.email || defaultEmail,
                          200
                        )}
                        alt={selectedMember.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-black">
                        {selectedMember.name}
                      </h2>
                      <h3 className="text-xl font-semibold text-black">
                        {selectedMember.nickname}
                      </h3>
                      <p className="text-blue-600">{selectedMember.role}</p>
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setSelectedMember(null)}
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
                  <div>
                    <h3 className="font-semibold mb-2 text-black">專長技能</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.details.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-black">工作職責</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedMember.details.responsibilities.map(
                        (responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {selectedMember.details.contact && (
                    <div>
                      <h3 className="font-semibold mb-2 text-black">
                        聯絡方式
                      </h3>
                      <div className="space-y-2">
                        {selectedMember.details.contact.instagram && (
                          <Link
                            href={selectedMember.details.contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700 flex items-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Instagram
                          </Link>
                        )}
                        {selectedMember.details.contact.github && (
                          <Link
                            href={selectedMember.details.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex items-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </Link>
                        )}
                      </div>
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
