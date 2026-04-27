import React from "react";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  lang: string;
  setLang: (lang: string) => void;
}

const langs = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ru", name: "Русский" },
  { code: "hi", name: "हिन्दी" },
  { code: "pt", name: "Português" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ar", name: "العربية" },
  { code: "af", name: "Afrikaans" },
  { code: "es", name: "Español" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "pl", name: "Polski" },
  { code: "th", name: "ไทย" },
  { code: "uz", name: "O'zbekcha" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" }
];

export default function LanguageSelector({ lang, setLang }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10 hover:bg-white/10 transition-colors">
      <Globe size={16} className="text-gray-400" />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer"
      >
        {langs.map(l => (
          <option key={l.code} value={l.code} className="bg-[#16191E] text-white">
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
