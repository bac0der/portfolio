import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, Terminal, Send } from "lucide-react";

export default function Hero({ projectCount = 0, profile }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile?.role || "Full-Stack Dasturchi & UI/UX Dizayner"}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              G‘oyalarni{" "}
              <span className="text-gradient">mukammal raqamli mahsulotlarga</span>{" "}
              aylantiraman.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-9 max-w-2xl">
              Zamonaviy veb-ilovalar, avtomatlashtirilgan Telegram botlar va estetik interfeyslar yaratishga ixtisoslashganman. Quyida real vaqtda yangilanib boruvchi saralangan loyihalarim bilan tanishishingiz mumkin.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Loyihalarni ko‘rish</span>
                <ArrowDownRight className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold transition-all"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Bog‘lanish</span>
              </a>

              <div className="inline-flex items-center gap-2.5 px-4 py-3.5 rounded-xl glass-panel text-xs sm:text-sm text-slate-300">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>
                  Loyihalar: <strong className="text-white">{projectCount} ta</strong>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[360px]">
              {/* Ambient Backlight */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500/30 via-amber-500/15 to-cyan-500/30 blur-xl opacity-80" />

              <div className="relative rounded-3xl overflow-hidden glass-panel p-2.5 border border-white/15 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-dark-900">
                  <img
                    src="/profile.jpg"
                    alt={profile?.name || "Baxtiyor"}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060A] via-transparent to-transparent opacity-75" />

                  <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-3.5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">
                          {profile?.name || "Baxtiyor Abduraimov"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {profile?.location || "Toshkent, O‘zbekiston"}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Ochiq
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
