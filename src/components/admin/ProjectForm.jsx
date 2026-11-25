import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "../../firebase/config";
import { Upload, X, Plus, Loader2, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Web App", "Telegram Bot", "Python", "UI/UX", "Mobile App"];

export default function ProjectForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web App");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "Web App");
      setShortDesc(initialData.short_desc || "");
      setFullDesc(initialData.full_desc || "");
      setCoverImage(initialData.cover_image || "");
      setTechStack(initialData.tech_stack || []);
      setLiveUrl(initialData.live_url || "");
      setGithubUrl(initialData.github_url || "");
      setFeatured(Boolean(initialData.featured));
    }
  }, [initialData]);

  const handleAddTech = (e) => {
    e.preventDefault();
    const trimmed = techInput.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechStack(techStack.filter((t) => t !== techToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFirebaseConfigured) {
      const localUrl = URL.createObjectURL(file);
      setCoverImage(localUrl);
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Rasm yuklashda xatolik:", error);
        alert("Rasm yuklashda xatolik yuz berdi. URL manzil kiritishdan foydalaning.");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setCoverImage(downloadURL);
        setUploading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !shortDesc.trim()) return;

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        category,
        short_desc: shortDesc.trim(),
        full_desc: fullDesc.trim() || shortDesc.trim(),
        cover_image: coverImage.trim(),
        tech_stack: techStack,
        live_url: liveUrl.trim(),
        github_url: githubUrl.trim(),
        featured,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white">
          {initialData ? "Loyihani tahrirlash" : "Yangi loyiha qo‘shish"}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Loyiha nomi *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masalan: AI Telegram Assistant"
            className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Yo‘nalish (Kategoriya)
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          Qisqa tavsif (Kartochkada ko‘rinadi) *
        </label>
        <input
          type="text"
          required
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="Loyiha vazifasi haqida 1-2 gap..."
          className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          Batafsil tavsif (Modal oynada ochiladi)
        </label>
        <textarea
          rows={4}
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          placeholder="Muammo, texnik yechim va erishilgan natijalar haqida batafsil..."
          className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          Muqova rasmi (Fayl yuklang yoki rasm havolasini kiriting)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 cursor-pointer transition-colors shrink-0">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{uploadProgress}%</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Rasm yuklash</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="relative flex-1">
            <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Yoki rasm URL manzilini joylang (https://...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {coverImage && (
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-dark-900">
            <img
              src={coverImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-500/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          Texnologiyalar (Enter yoki + tugmasi bilan qo‘shing)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTech(e)}
            placeholder="React, Python, Firebase..."
            className="flex-1 px-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Qo‘shish</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="hover:text-red-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Jonli havola (Live URL / Telegram Bot)
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            GitHub havolasi (Ixtiyoriy)
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="w-4 h-4 rounded accent-indigo-600"
        />
        <span className="text-sm text-slate-300">
          Asosiy loyiha sifatida ajratib ko‘rsatish (Featured)
        </span>
      </label>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium"
          >
            Bekor qilish
          </button>
        )}
        <button
          type="submit"
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{initialData ? "O‘zgarishlarni saqlash" : "Loyihani nashr qilish"}</span>
        </button>
      </div>
    </form>
  );
}
