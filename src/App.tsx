/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  ExternalLink, 
  Scale, 
  Cpu, 
  Stethoscope, 
  ShieldAlert, 
  ShoppingBag, 
  ClipboardCheck, 
  Users, 
  MessageSquare, 
  MapPin, 
  HardHat, 
  UserRound, 
  Receipt, 
  Coins, 
  Camera, 
  Globe, 
  Link2,
  Filter
} from "lucide-react";

// Components
import FAQ from "./components/FAQ";
import LanguageSelector from "./components/LanguageSelector";

// Translations
import { translations } from "./i18n/translations";

// =========================
// 1. DATA DEFINITION
// =========================
interface Platform {
  id: string;
  url: string;
  category: string;
  icon: React.ElementType;
}

const platforms: Platform[] = [
  { id: "legal", url: "https://tourit.ceo", category: "legal", icon: Scale },
  { id: "visionu", url: "https://feezone.info", category: "ai", icon: Cpu },
  { id: "doctor", url: "https://p2p.io.kr", category: "medical", icon: Stethoscope },
  { id: "fraud", url: "https://feezone.info", category: "security", icon: ShieldAlert },
  { id: "commerce", url: "https://huan.my", category: "commerce", icon: ShoppingBag },
  { id: "insurance", url: "#", category: "insurance", icon: ClipboardCheck },
  { id: "vietnam", url: "https://feezone.asia", category: "community", icon: Users },
  { id: "factarena", url: "https://meditour.site", category: "social", icon: MessageSquare },
  { id: "jeonrado", url: "https://jt365.me", category: "local", icon: MapPin },
  { id: "safepro", url: "https://p2p.it.kr", category: "iot", icon: HardHat },
  { id: "partner", url: "https://tellai.my", category: "ai", icon: UserRound },
  { id: "snaptax", url: "https://taxs.me", category: "finance", icon: Receipt },
  { id: "usdt", url: "https://club.it.kr", category: "web3", icon: Coins },
  { id: "romantic", url: "https://vipself.art", category: "ai", icon: Camera },
  { id: "klink", url: "https://kstudy.my", category: "community", icon: Globe },
  { id: "ckorea", url: "https://inkorea.me", category: "community", icon: Link2 }
];

// =========================
// 2. COLOR SYSTEM
// =========================
const categoryStyles: Record<string, { gradient: string; accent: string }> = {
  legal: { gradient: "from-purple-500 to-indigo-600", accent: "text-purple-400" },
  ai: { gradient: "from-cyan-400 to-blue-500", accent: "text-cyan-400" },
  medical: { gradient: "from-emerald-400 to-teal-500", accent: "text-emerald-400" },
  security: { gradient: "from-red-400 to-pink-500", accent: "text-red-400" },
  commerce: { gradient: "from-yellow-400 to-orange-500", accent: "text-yellow-400" },
  insurance: { gradient: "from-gray-400 to-slate-500", accent: "text-gray-400" },
  community: { gradient: "from-green-400 to-lime-500", accent: "text-green-400" },
  social: { gradient: "from-fuchsia-500 to-pink-500", accent: "text-fuchsia-400" },
  local: { gradient: "from-orange-400 to-amber-500", accent: "text-orange-400" },
  iot: { gradient: "from-sky-400 to-indigo-400", accent: "text-sky-400" },
  finance: { gradient: "from-emerald-500 to-green-600", accent: "text-emerald-500" },
  web3: { gradient: "from-violet-500 to-purple-600", accent: "text-violet-400" }
};

// =========================
// 3. CARD COMPONENT
// =========================
interface CardProps {
  item: Platform;
  index: number;
  t: (key: string) => any;
  key?: string | number;
}

function Card({ item, index, t }: CardProps) {
  const style = categoryStyles[item.category] || categoryStyles.ai;
  const Icon = item.icon;
  const name = t(`platforms.${item.id}.name`);
  const desc = t(`platforms.${item.id}.desc`);

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block h-full"
    >
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${style.gradient} opacity-0 blur-lg transition duration-500 group-hover:opacity-10`} />
      
      <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#0F1115] p-3 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-[#16191E] hover:shadow-xl hover:shadow-purple-500/20">
        <div className="mb-3 flex items-center justify-between">
          <div className={`rounded-lg bg-white/5 p-2 ${style.accent} transition-colors duration-300 group-hover:bg-white/10`}>
            <Icon size={18} />
          </div>
          <ExternalLink size={14} className="text-gray-600 transition-colors duration-300 group-hover:text-white" />
        </div>

        <h3 className="compact-headline mb-1 text-sm font-semibold tracking-tight text-white">
          {name}
        </h3>

        <p className="mb-3 flex-grow text-xs leading-relaxed text-gray-400 line-clamp-2">
          {desc}
        </p>

        <div className="flex items-center text-[10px] font-medium text-gray-500 transition-colors duration-300 group-hover:text-white">
          <span>{t("button.visit")}</span>
          <motion.span 
            className="ml-1"
            initial={{ x: 0 }}
            whileHover={{ x: 2 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

// =========================
// 4. MAIN APP
// =========================
export default function App() {
  const [lang, setLang] = useState("ko");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // Guest System + Document Title
  useEffect(() => {
    // Set document title
    document.title = "플랫폼 인포메이션";
    
    let uid = localStorage.getItem("uid");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("uid", uid);
    }
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // i18n Hook
  const t = (key: string) => {
    const keys = key.split(".");
    let result = translations[lang] || translations.en;
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  };

  const categories = useMemo(() => ["all", ...new Set(platforms.map(p => p.category))], []);

  const filteredPlatforms = useMemo(() => {
    return platforms.filter(p => {
      const name = t(`platforms.${p.id}.name`).toLowerCase();
      const desc = t(`platforms.${p.id}.desc`).toLowerCase();
      const matchesSearch = name.includes(search.toLowerCase()) || desc.includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, lang]);

  return (
    <div className="min-h-screen bg-[#0B0D10] font-sans">
      <div className="w-full">
        {/* Header (Language Selector) */}
        <div className="flex justify-end px-4 py-2">
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>

        {/* Header Content */}
        <header className="px-4 py-2 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="compact-headline text-lg font-bold tracking-tight text-white whitespace-nowrap">
              {t("header.title")}
            </h1>
          </motion.div>
        </header>

        {/* Search + Filter */}
        <div className="px-4 mb-3 space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder={t("button.search") + "..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#111] p-2 pl-10 text-white outline-none transition-all focus:border-[#6C5CE7]/50"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                  category === cat
                    ? "bg-[#6C5CE7] text-white shadow-lg shadow-[#6C5CE7]/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(`categories.${cat}`).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="px-2">
          <AnimatePresence mode="popLayout">
            {filteredPlatforms.length > 0 ? (
              <motion.div 
                layout
                className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              >
                {filteredPlatforms.map((item, index) => (
                  <Card key={item.id} item={item} index={index} t={t} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-gray-500"
              >
                <Search size={32} className="mb-2 opacity-20" />
                <p className="text-sm">{t("search.no_results")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Systems */}
        <FAQ t={t} isMobile={isMobile} />

        {/* Footer */}
        <footer className="mt-12 border-t border-white/5 pt-6 text-center text-[10px] text-gray-600">
          <p>© 2026 AI Platform Ecosystem. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
