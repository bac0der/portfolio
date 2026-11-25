import React, { useState } from "react";
import { Plus, Trash2, Cpu } from "lucide-react";

export default function SkillManager({ skills, onAddSkill, onDeleteSkill }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [level, setLevel] = useState(85);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onAddSkill({
      name: name.trim(),
      category,
      level: Number(level),
    });
    setName("");
    setLevel(85);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
        <Cpu className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Ko‘nikmalar (Skills) Boshqaruvi</h2>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Texnologiya (masalan: FastAPI)"
          className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Design">Design</option>
          <option value="Tools">Tools</option>
        </select>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Qo‘shish</span>
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-dark-900/90 border border-white/5"
          >
            <div>
              <p className="text-sm font-medium text-white">{skill.name}</p>
              <span className="text-xs text-slate-400">{skill.category}</span>
            </div>
            <button
              onClick={() => onDeleteSkill(skill.id)}
              className="p-2 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-colors"
              title="O'chirish"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
