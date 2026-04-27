"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations, Lang } from "./translations";

type T = typeof translations["en"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}>({ lang: "en", setLang: () => {}, t: translations["en"] });

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    // Check localStorage for manual override
    const stored = localStorage.getItem("lang") as Lang;
    if (stored && ["en", "fr", "es", "ht"].includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
