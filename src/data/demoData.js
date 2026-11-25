export const DEMO_PROJECTS = [
  {
    id: "demo-1",
    title: "Barbershop Booking Telegram Bot",
    category: "Telegram Bot",
    short_desc: "Mijozlar navbatini avtomatlashtiruvchi, eslatmalar yuboruvchi va Firebase bilan sinxronlashgan aqlli Telegram bot.",
    full_desc: "Sartaroshxona mijozlari uchun qulay vaqt tanlash, band qilingan vaqtlarni real vaqtda bloklash hamda uchrashuvdan 1 soat oldin avtomatik eslatma yuborish tizimi. Admin panel orqali usta o'z jadvalini to'liq nazorat qila oladi.",
    cover_image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
    tech_stack: ["Python", "Aiogram 3", "Firebase", "REST API"],
    live_url: "https://t.me/",
    github_url: "https://github.com/",
    featured: true,
    created_at: Date.now() - 100000
  },
  {
    id: "demo-2",
    title: "Shaxsiy Moliya Nazorati Web App",
    category: "Web App",
    short_desc: "Kunlik kirim-chiqimlarni tahlil qiluvchi, oflayn va onlayn ishlovchi tezkor moliyaviy boshqaruv ilovasi.",
    full_desc: "Kategoriyalar kesimida xarajatlarni kuzatish, oylik byudjet limitlarini belgilash va vizual grafiklar orqali moliyaviy intizomni shakllantirish uchun yaratilgan zamonaviy veb-ilova.",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tech_stack: ["React", "Tailwind CSS", "Chart.js", "LocalStorage"],
    live_url: "https://example.com",
    github_url: "https://github.com/",
    featured: true,
    created_at: Date.now() - 200000
  },
  {
    id: "demo-3",
    title: "3D Particle & Visual Animation Engine",
    category: "Python",
    short_desc: "Matematik formulalar asosida zarrachalar harakati va geometrik shakllarni generatsiya qiluvchi Python dasturi.",
    full_desc: "Yuqori unumdorlikka ega vizual animatsiyalar yaratish, markaziy protsessor yuklamasini optimallashtirish va silliq kadrlar almashinuvini ta'minlovchi grafik skriptlar to'plami.",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tech_stack: ["Python", "PyGame", "Math / Physics", "Optimization"],
    live_url: "",
    github_url: "https://github.com/",
    featured: false,
    created_at: Date.now() - 300000
  }
];

export const DEMO_SKILLS = [
  { id: "s1", name: "React & JavaScript", category: "Frontend", level: 88 },
  { id: "s2", name: "Tailwind CSS", category: "Frontend", level: 92 },
  { id: "s3", name: "Python (Aiogram / Automation)", category: "Backend", level: 90 },
  { id: "s4", name: "Firebase & Firestore", category: "Database", level: 85 },
  { id: "s5", name: "UI/UX Prototyping", category: "Design", level: 84 },
  { id: "s6", name: "Git & Deployment", category: "Tools", level: 86 }
];

export const DEMO_PROFILE = {
  name: "Baxtiyor Abduraimov",
  role: "Full-Stack Dasturchi & UI/UX Dizayner",
  location: "Toshkent, O‘zbekiston",
  bio: "Zamonaviy veb-ilovalar, biznes jarayonlarini avtomatlashtiruvchi Telegram botlar va foydalanuvchilar uchun qulay interfeyslar yarataman. Har bir loyihada tezlik, toza arxitektura va mukammal vizual estetikani birinchi o‘ringa qo‘yaman.",
  telegram: "https://t.me/baxtiyor_abduraimov",
  github: "https://github.com/bac0der",
  email: "baxtiyorjonabduraimv@gmail.com",
  available: true
};
