import React from "react";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  lang: string;
  setLang: (lang: string) => void;
}

const langs = ["ko","en","zh","ja","ru","hi","pt","id","ar","af","es","vi","pl","th","uz"];

export default function LanguageSelector({ lang, setLang }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10 hover:bg-white/10 transition-colors">
      <Globe size={16} className="text-gray-400" />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer uppercase"
      >
        {langs.map(l => (
          <option key={l} value={l} className="bg-[#16191E] text-white">
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
