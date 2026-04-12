import { CoverVideo } from "../cover-video/CoverVideo";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { BookTable } from "../sections/book-table/BookTable";
import { ChefSection } from "../sections/chef/ChefSection";
import { Gallery } from "../sections/galery/Galery";
import { SetMenus } from "../sections/menu/SetMenu";
import { OurStory } from "../sections/our-story/OurStory";
import { PhilosophySection } from "../sections/philosophy/PhilosophySection";
import { PressRecognition } from "../sections/press/PressRecognition";
import { SpaceSection } from "../sections/space/SpaceSection";
import { WineSection } from "../sections/wine/WineSection";

export const Home = () => {
  return (
    <>
      <Header />
      <CoverVideo />
      <PhilosophySection />
      <ChefSection />
      <SpaceSection />
      <OurStory />
      <SetMenus />
      <WineSection />
      <Gallery />
      <PressRecognition />
      <BookTable />
      <Footer />
    </>
  );
};
