import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { DEMO_PROJECTS, DEMO_SKILLS, DEMO_PROFILE } from "../data/demoData";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import { Layers, Sparkles } from "lucide-react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!isFirebaseConfigured) {
        const localProjects = JSON.parse(localStorage.getItem("demo_projects"));
        const localSkills = JSON.parse(localStorage.getItem("demo_skills"));
        const localProfile = JSON.parse(localStorage.getItem("demo_profile"));
        setProjects(localProjects || DEMO_PROJECTS);
        setSkills(localSkills || DEMO_SKILLS);
        if (localProfile) setProfile(localProfile);
        setLoading(false);
        return;
      }

      try {
        let projList = [];
        try {
          const projQuery = query(collection(db, "projects"), orderBy("created_at", "desc"));
          const projSnap = await getDocs(projQuery);
          projList = projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch {
          const projSnap = await getDocs(collection(db, "projects"));
          projList = projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }

        const skillSnap = await getDocs(collection(db, "skills"));
        const skillList = skillSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setProjects(projList);
        setSkills(skillList.length > 0 ? skillList : DEMO_SKILLS);
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
        setProjects(DEMO_PROJECTS);
        setSkills(DEMO_SKILLS);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const categories = ["Barchasi", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    selectedCategory === "Barchasi"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero projectCount={projects.length} profile={profile} />

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>PORTFOLIO</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Tanlangan Loyihalar
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                        : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
                Hozircha bu yo‘nalishda loyihalar qo‘shilmagan.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setActiveProject}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 border-t border-white/5 bg-dark-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>TEXNOLOGIYALAR</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Asosiy Ko‘nikmalar
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((skill) => (
                <div key={skill.id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-cyan-300 font-mono">
                      {skill.category}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      style={{ width: `${skill.level || 85}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection
          profile={profile}
          projectCount={projects.length}
          skillCount={skills.length}
        />

        {/* Contact Section */}
        <ContactSection profile={profile} />
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BA Coder — Barcha huquqlar himoyalangan.
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}