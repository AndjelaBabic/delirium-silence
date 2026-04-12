import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import { LoadingScreen } from "./components/LoadingScreen";

const LOADING_DURATION = 1800; // ms
const EXIT_DURATION = 800;     // matches fadeOut animation

const App = () => {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), LOADING_DURATION);
    const hideTimer = setTimeout(() => setLoading(false), LOADING_DURATION + EXIT_DURATION);
    return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      {loading && <LoadingScreen exiting={exiting} />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
