import React from "react";
import { User, MapPin, Briefcase, Code, Sparkles } from "lucide-react";

export default function AboutSection({ profile, projectCount, skillCount }) {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-2xl p-3 max-w-sm mx-auto">
              <img
                src="/profile.jpg"
                alt={profile?.name || "Baxtiyor"}
                className="w-full aspect-[4/5] object-cover object-top rounded-xl"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
                <User className="w-4 h-4" />
                <span>MEN HAQIMDA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {profile?.name || "Baxtiyor Abduraimov"}
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {profile?.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-medium mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Tugallangan loyihalar</span>
                </div>
                <p className="text-2xl font-bold text-white">{projectCount}+</p>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                  <Code className="w-4 h-4" />
                  <span>Texnologiyalar</span>
                </div>
                <p className="text-2xl font-bold text-white">{skillCount}+</p>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-medium mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Joylashuv</span>
                </div>
                <p className="text-sm font-semibold text-white mt-1.5">
                  {profile?.location || "Toshkent, O‘zbekiston"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
