import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, X, ChevronDown } from "lucide-react";

interface FAQProps {
  t: (key: string) => any;
  isMobile: boolean;
}

export default function FAQ({ t, isMobile }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqItems = t("faq.items") || [];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-[#FF6321] text-white shadow-lg shadow-[#FF6321]/30"
      >
        <HelpCircle size={28} />
      </motion.button>

      {/* FAQ Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { x: "100%" } : { opacity: 0, scale: 0.9, x: 20 }}
            animate={isMobile ? { x: 0 } : { opacity: 1, scale: 1, x: 0 }}
            exit={isMobile ? { x: "100%" } : { opacity: 0, scale: 0.9, x: 20 }}
            className={`fixed z-50 overflow-hidden bg-[#16191E] shadow-2xl ${
              isMobile 
                ? "inset-0 h-full w-full" 
                : "bottom-20 right-5 h-[50vh] w-[350px] rounded-2xl border border-white/10"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#1F2329] p-4">
              <h3 className="text-sm font-semibold text-white">{t("faq.title")}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="no-scrollbar h-[calc(100%-60px)] overflow-y-auto p-4 space-y-2">
              {faqItems.map((item: any, i: number) => (
                <div key={i} className="rounded-xl bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left text-sm text-gray-200 hover:bg-white/10"
                  >
                    <span>{item.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${activeIdx === i ? "rotate-180" : ""}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {activeIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 bg-white/5 p-4 text-xs leading-relaxed text-gray-400"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
