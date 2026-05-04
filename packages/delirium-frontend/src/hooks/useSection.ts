"use client";

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

type SectionKey = keyof typeof translations.en;

export function useSection<T>(section: SectionKey): T {
  const { language, t } = useLanguage();

  const { data } = useQuery<{ en: T; sr: T }>({
    queryKey: ["section", section],
    queryFn: async () => {
      const r = await fetch(`/api/content/${section}`);
      if (!r.ok) throw new Error("Failed to fetch");
      return r.json();
    },
  });

  if (data) {
    return (language === "sr" ? data.sr : data.en) as T;
  }

  return t[section] as unknown as T;
}
