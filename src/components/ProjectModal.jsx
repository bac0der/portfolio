import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Layers } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 shadow-2xl"
        >
          <div className="relative h-64 sm:h-80 bg-dark-900">
            <img
              src={
                project.cover_image ||
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
              }
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12121D] via-transparent to-black/30" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-600/90 text-white">
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {project.title}
            </h2>

            <p className="text-slate-300 leading-relaxed whitespace-pre-line mb-6">
              {project.full_desc || project.short_desc}
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Ishlatilgan texnologiyalar</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.tech_stack || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-indigo-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Loyihani ochish</span>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Manba kodi (GitHub)</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
