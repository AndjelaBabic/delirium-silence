"use client";

/**
 * "use client" is required here because this component uses:
 * - useState / useEffect (React hooks — browser only)
 * - localStorage (browser API — doesn't exist on the server)
 *
 * NEXT.JS NOTE on localStorage:
 * In Next.js the component renders on the SERVER first, then in the browser.
 * Reading localStorage inside useState initializer would crash on the server.
 * Fix: start with the default value ("en"), then read localStorage in useEffect
 * which only runs in the browser after the page loads.
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "../i18n/translations";
import { translations } from "../i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Read stored language preference after mount (browser only)
  useEffect(() => {
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored === "sr") setLanguage("sr");
  }, []);

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem("lang", lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
