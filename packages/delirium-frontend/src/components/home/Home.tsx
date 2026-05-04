"use client";

import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CoverVideo } from "../cover-video/CoverVideo";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { LoadingScreen } from "../LoadingScreen";
import { ReserveButton } from "../ReserveButton";
import { ChefSection } from "../sections/chef/ChefSection";
import { Gallery } from "../sections/galery/Galery";
import { SetMenus } from "../sections/menu/SetMenu";
import { OurStory } from "../sections/our-story/OurStory";
import { PhilosophySection } from "../sections/philosophy/PhilosophySection";
import { PressRecognition } from "../sections/press/PressRecognition";
import { SpaceSection } from "../sections/space/SpaceSection";
import { WineSection } from "../sections/wine/WineSection";

const MIN_DURATION = 600; // minimum time loading screen shows (ms)
const EXIT_DURATION = 800; // matches LoadingScreen fadeOut animation (ms)
const MAX_DURATION = 8000; // failsafe — never stuck longer than this (ms)

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  const minElapsed = useRef(false);
  const videoReady = useRef(false);
  const hasExited = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    if (!minElapsed.current || !videoReady.current) return;
    hasExited.current = true;
    setExiting(true);
    setTimeout(() => setLoading(false), EXIT_DURATION);
  }, []);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      minElapsed.current = true;
      triggerExit();
    }, MIN_DURATION);

    // Hard failsafe — if video never fires canPlay, dismiss anyway
    const maxTimer = setTimeout(() => {
      videoReady.current = true;
      minElapsed.current = true;
      triggerExit();
    }, MAX_DURATION);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [triggerExit]);

  const onVideoReady = useCallback(() => {
    videoReady.current = true;
    triggerExit();
  }, [triggerExit]);

  return (
    <>
      {loading && <LoadingScreen exiting={exiting} />}
      <Header />
      <main>
        <CoverVideo onReady={onVideoReady} />
        <PhilosophySection />
        <ChefSection />
        <SpaceSection />
        <OurStory />
        <SetMenus />
        <WineSection />
        <Gallery />
        <PressRecognition />
      </main>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: 4, md: 12 },
          py: 3,
          backgroundColor: "var(--ds-dark)",
        }}
      >
        <Box sx={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,169,106,0.25))" }} />
        <Box sx={{ mx: 3, color: "var(--ds-accent)", fontSize: "0.45rem", opacity: 0.7, letterSpacing: "0.6em" }}>◆ ◆ ◆</Box>
        <Box sx={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(201,169,106,0.25))" }} />
      </Box>
      <Footer />
      <ReserveButton />
    </>
  );
};
