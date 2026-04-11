import { CoverVideo } from "../cover-video/CoverVideo";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { BookTable } from "../sections/book-table/BookTable";
import { ChefSection } from "../sections/chef/ChefSection";
import { Gallery } from "../sections/galery/Galery";
import { SetMenus } from "../sections/menu/SetMenu";
import { OurStory } from "../sections/our-story/OurStory";
import { PhilosophySection } from "../sections/philosophy/PhilosophySection";

export const Home = () => {
  return (
    <>
      <Header />
      <CoverVideo />
      <PhilosophySection />
      <ChefSection />
      <OurStory />
      <SetMenus />
      <Gallery />
      <BookTable />
      <Footer />
    </>
  );
};
