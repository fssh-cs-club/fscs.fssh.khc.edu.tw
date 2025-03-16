"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Image from "next/image";
import { useState, useEffect } from "react";
import crypto from "crypto";

interface Member {
  name: string;
  nickname: string;
  role: string;
  year: string;
  description: string;
  achievements?: string[];
  image?: string;
  currentJob?: string;
  contact?: {
    email?: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
}

interface YearGroup {
  year: string;
  members: Member[];
}

const defaultEmail = "fscs@fssh.khc.edu.tw";

function getGravatarUrl(email: string, size: number = 200): string {
  const emailHash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
}

export default function Alumni() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

  const alumniData: YearGroup[] = [
    {
      year: "28th",
      members: [
        {
          name: "謝昀哲",
          nickname: "Abao0109",
          role: "社長",
          year: "28th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "國立鳳山高級中學",
          contact: {
            email: "",
            linkedin: "",
            website: "",
            github: "",
          },
        },
        {
          name: "溫力漢",
          nickname: "Dreamyee",
          role: "副社長",
          year: "28th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "國立鳳山高級中學",
          contact: {
            email: "",
            website: "",
            github: "",
          },
        },
        {
          name: "余柏緯",
          nickname: "浮生OWO",
          role: "教學",
          year: "28th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "國立鳳山高級中學",
          contact: {
            email: "",
            website: "",
            github: "",
          },
        },
      ],
    },
    {
      year: "27th",
      members: [
        {
          name: "林紘騰",
          nickname: "飛龍 Flydragon",
          role: "社長",
          year: "27th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "臺灣大學資訊工程學系",
          contact: {
            email: "",
            linkedin: "",
            website: "https://龍.tw",
            github: "https://github.com/FlyDragonW",
          },
        },
      ],
    },
    {
      year: "26th",
      members: [
        {
          name: "楊詠旭",
          nickname: "淺羽 ShalowFeather",
          role: "社長",
          year: "26th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "國立中山大學資訊工程學系",
          contact: {
            email: "",
            github: "https://github.com/ShalowFeather",
            website: "",
          },
        },
      ],
    },
    {
      year: "25th",
      members: [
        {
          name: "陳思惟",
          nickname: "思惟",
          role: "社長",
          year: "25th",
          description: "",
          achievements: ["", "", ""],
          currentJob: "國立中央大學",
          contact: {
            email: "swchen1217@gmail.com",
            github: "https://github.com/swchen1217",
            website: "https://swchen1217.github.io",
          },
        },
      ],
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
            歷屆幹部
          </motion.h1>
          <motion.p
            className="text-xl text-sky-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            感謝各位順利傳承，沒有倒社ＴＴ
          </motion.p>
        </section>
      </ScrollSection>

      {/* 歷屆幹部列表 */}
      {alumniData.map((yearGroup, yearIndex) => (
        <ScrollSection key={yearGroup.year}>
          <section className="relative">
            <motion.div
              className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="pl-8">
              <motion.h2
                className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: yearIndex * 0.2 }}
              >
                {yearGroup.year}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearGroup.members.map((member, index) => (
                  <motion.div
                    key={`${member.name}-${member.role}`}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={getGravatarUrl(
                            member.contact?.email || defaultEmail,
                            200
                          )}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          {member.name}
                        </h3>
                        <h4 className="text-lg font-medium text-gray-700">
                          {member.nickname}
                        </h4>
                        <p className="text-blue-600">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{member.description}</p>
                    <div className="flex justify-end">
                      <motion.button
                        className="text-blue-600 hover:text-blue-700 flex items-center cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollSection>
      ))}

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
                          selectedMember.contact?.email || defaultEmail,
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
                      <p className="text-gray-500">{selectedMember.year}</p>
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
                    <h3 className="font-semibold mb-2 text-black">簡介</h3>
                    <p className="text-gray-600">
                      {selectedMember.description}
                    </p>
                  </div>

                  {selectedMember.achievements && (
                    <div>
                      <h3 className="font-semibold mb-2 text-black">
                        重要成就
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {selectedMember.achievements.map(
                          (achievement, index) => (
                            <li key={index}>{achievement}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedMember.currentJob && (
                    <div>
                      <h3 className="font-semibold mb-2 text-black">現況</h3>
                      <p className="text-gray-600">
                        {selectedMember.currentJob}
                      </p>
                    </div>
                  )}

                  {selectedMember.contact && (
                    <div>
                      <h3 className="font-semibold mb-2 text-black">
                        個人連結
                      </h3>
                      <div className="space-y-2">
                        {selectedMember.contact.website && (
                          <a
                            href={selectedMember.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex items-center"
                          >
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
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                            個人網站
                          </a>
                        )}
                        {selectedMember.contact.github && (
                          <a
                            href={selectedMember.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-black flex items-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {selectedMember.contact.linkedin && (
                          <a
                            href={selectedMember.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex items-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                          </a>
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
