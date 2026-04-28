"use client";

/**
 * NEXT.JS CONCEPT: MUI Emotion Registry
 *
 * MUI uses emotion for CSS-in-JS styling. Normally emotion generates styles
 * in the browser. In Next.js, pages are first rendered on the SERVER — so we
 * need to collect all the emotion styles during server rendering and inject
 * them into the HTML before sending it to the browser.
 *
 * Without this: components flash as unstyled for a moment on first load.
 * With this: styles arrive in the HTML, page looks correct immediately.
 *
 * This is boilerplate from MUI's official Next.js guide. Write it once, forget it.
 */

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export function MuiRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui-style" });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (selector, serialized, sheet, shouldCache) => {
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(selector, serialized, sheet, shouldCache);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  // useServerInsertedHTML: Next.js hook that lets you inject HTML into the
  // <head> during server rendering. We use it to insert the collected styles.
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
