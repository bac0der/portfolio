import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(project)}
      className="glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
    >
      <div className="relative h-52 overflow-hidden bg-dark-800">
        <img
          src={
            project.cover_image ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
          }
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80" />

        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-xs font-medium bg-black/60 backdrop-blur-md border border-white/10 text-slate-200">
          {project.category}
        </span>

        {project.featured && (
          <span className="absolute top-3.5 right-3.5 p-1.5 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300" title="Asosiy loyiha">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 mb-5 flex-1 leading-relaxed">
          {project.short_desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {(project.tech_stack || []).slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-indigo-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onSelect(project)}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Batafsil ko‘rish →
          </button>

          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="GitHub Kod"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Jonli Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
