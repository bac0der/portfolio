import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { DEMO_PROJECTS, DEMO_SKILLS, DEMO_PROFILE } from "../data/demoData";
import Navbar from "../components/Navbar";
import ProjectForm from "../components/admin/ProjectForm";
import SkillManager from "../components/admin/SkillManager";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Star,
  FolderKanban,
  Mail,
  UserCog,
  Save,
} from "lucide-react";

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!isFirebaseConfigured) {
      const localProjects = JSON.parse(localStorage.getItem("demo_projects")) || DEMO_PROJECTS;
      const localSkills = JSON.parse(localStorage.getItem("demo_skills")) || DEMO_SKILLS;
      const localMessages = JSON.parse(localStorage.getItem("demo_messages")) || [];
      const localProfile = JSON.parse(localStorage.getItem("demo_profile")) || DEMO_PROFILE;
      setProjects(localProjects);
      setSkills(localSkills);
      setMessages(localMessages);
      setProfile(localProfile);
      return;
    }

    const q = query(collection(db, "projects"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

    const skillSnap = await getDocs(collection(db, "skills"));
    setSkills(skillSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

    const msgQuery = query(collection(db, "messages"), orderBy("created_at", "desc"));
    const msgSnap = await getDocs(msgQuery);
    setMessages(msgSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleSaveProject = async (projectData) => {
    if (!isFirebaseConfigured) {
      let updated;
      if (editingProject) {
        updated = projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectData } : p
        );
      } else {
        const newProj = {
          ...projectData,
          id: "demo-" + Date.now(),
          created_at: Date.now(),
        };
        updated = [newProj, ...projects];
      }
      setProjects(updated);
      localStorage.setItem("demo_projects", JSON.stringify(updated));
      setShowForm(false);
      setEditingProject(null);
      return;
    }

    if (editingProject) {
      await updateDoc(doc(db, "projects", editingProject.id), projectData);
    } else {
      await addDoc(collection(db, "projects"), {
        ...projectData,
        created_at: Date.now(),
      });
    }
    setShowForm(false);
    setEditingProject(null);
    loadData();
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Ushbu loyihani o‘chirishni tasdiqlaysizmi?")) return;

    if (!isFirebaseConfigured) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem("demo_projects", JSON.stringify(updated));
      return;
    }

    await deleteDoc(doc(db, "projects", id));
    loadData();
  };

  const handleAddSkill = async (skillData) => {
    if (!isFirebaseConfigured) {
      const updated = [...skills, { ...skillData, id: "s-" + Date.now() }];
      setSkills(updated);
      localStorage.setItem("demo_skills", JSON.stringify(updated));
      return;
    }
    await addDoc(collection(db, "skills"), skillData);
    loadData();
  };

  const handleDeleteSkill = async (id) => {
    if (!isFirebaseConfigured) {
      const updated = skills.filter((s) => s.id !== id);
      setSkills(updated);
      localStorage.setItem("demo_skills", JSON.stringify(updated));
      return;
    }
    await deleteDoc(doc(db, "skills", id));
    loadData();
  };

  const handleDeleteMessage = async (id) => {
    if (!isFirebaseConfigured) {
      const updated = messages.filter((m) => m.id !== id);
      setMessages(updated);
      localStorage.setItem("demo_messages", JSON.stringify(updated));
      return;
    }
    await deleteDoc(doc(db, "messages", id));
    loadData();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("demo_profile", JSON.stringify(profile));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 space-y-10">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white">Boshqaruv Paneli</h1>
            <p className="text-xs text-slate-400 mt-1">
              Kirilgan: <span className="text-indigo-400">{user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingProject(null);
                setShowForm(!showForm);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi loyiha</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 text-slate-300 hover:text-red-300 text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        {/* Add / Edit Project Form */}
        {showForm && (
          <ProjectForm
            initialData={editingProject}
            onSubmit={handleSaveProject}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        )}

        {/* Projects List Table */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4 mb-6">
            <FolderKanban className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">
              Mavjud Loyihalar ({projects.length})
            </h2>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900/90 border border-white/5 hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      proj.cover_image ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=60"
                    }
                    alt={proj.title}
                    className="w-16 h-12 rounded-lg object-cover bg-dark-800 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{proj.title}</h3>
                      {proj.featured && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {proj.category} • {(proj.tech_stack || []).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 text-xs font-medium transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-300 text-xs font-medium transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>O‘chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Management */}
        <SkillManager
          skills={skills}
          onAddSkill={handleAddSkill}
          onDeleteSkill={handleDeleteSkill}
        />

        {/* Profile & Contact Info Settings */}
        <form onSubmit={handleSaveProfile} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <UserCog className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Shaxsiy Ma'lumotlar (About & Contact)</h2>
            </div>
            {profileSaved && (
              <span className="text-xs text-emerald-400 font-medium">Saqlandi ✓</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">To‘liq ism</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Mutaxassislik</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Telegram havola</label>
              <input
                type="text"
                value={profile.telegram}
                onChange={(e) => setProfile({ ...profile, telegram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Bio (Men haqimda matni)</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold"
          >
            <Save className="w-4 h-4" />
            <span>Profilni saqlash</span>
          </button>
        </form>

        {/* Inbox Messages */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4 mb-6">
            <Mail className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Kelgan Xabarlar ({messages.length})
            </h2>
          </div>

          {messages.length === 0 ? (
            <p className="text-sm text-slate-400">Hozircha yangi xabarlar yo‘q.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-dark-900/90 border border-white/5 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{msg.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-mono">
                        {msg.contact}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">{msg.message}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-2 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
