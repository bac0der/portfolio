import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { Send, Mail, MessageSquare, CheckCircle2, Loader2, Github } from "lucide-react";

export default function ContactSection({ profile }) {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);
    try {
      const payload = {
        name: name.trim(),
        contact: contactInfo.trim(),
        message: message.trim(),
        created_at: Date.now(),
        read: false,
      };

      if (!isFirebaseConfigured) {
        const existing = JSON.parse(localStorage.getItem("demo_messages")) || [];
        localStorage.setItem(
          "demo_messages",
          JSON.stringify([{ id: "msg-" + Date.now(), ...payload }, ...existing])
        );
      } else {
        await addDoc(collection(db, "messages"), payload);
      }

      setSent(true);
      setName("");
      setContactInfo("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Xabar yuborishda xatolik:", err);
      alert("Xabar yuborishda xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-white/5 bg-dark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>BOG‘LANISH</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Loyihangiz bormi? Keling, muhokama qilamiz.
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Yangi veb-sayt, Telegram bot yoki hamkorlik bo‘yicha takliflaringiz bo‘lsa, xabar qoldiring — tez orada aloqaga chiqaman.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {profile?.telegram && (
                <a
                  href={profile.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-card text-slate-200 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Telegram orqali</p>
                    <p className="text-sm font-semibold">Tezkor yozish</p>
                  </div>
                </a>
              )}

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-card text-slate-200 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Elektron pochta</p>
                    <p className="text-sm font-semibold">{profile.email}</p>
                  </div>
                </a>
              )}

              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-card text-slate-200 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">GitHub</p>
                    <p className="text-sm font-semibold">Kodlar va ochiq loyihalar</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white">Xabar yuborish</h3>

              {sent && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Telegram username yoki Telefon *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="@username yoki +998..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Xabar matni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Loyiha yoki savolingiz haqida qisqacha yozing..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all w-full sm:w-auto"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{sending ? "Yuborilmoqda..." : "Xabarni yuborish"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
