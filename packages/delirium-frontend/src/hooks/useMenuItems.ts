"use client";

import { useQuery } from "@tanstack/react-query";

export interface MenuItem {
  id: number;
  title: string;
  title_sr: string;
  courses: string;
  courses_sr: string;
  description: string;
  description_sr: string;
  price: string;
  tag: string | null;
  tag_sr: string | null;
  display_order: number;
  is_active: number;
}

export function useMenuItems() {
  return useQuery<MenuItem[]>({
    queryKey: ["menu"],
    queryFn: async () => {
      const r = await fetch("/api/menu");
      if (!r.ok) throw new Error("Failed to fetch menu");
      return r.json();
    },
  });
}
