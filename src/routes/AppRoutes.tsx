import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from '../pages/About';
import Developer from "../pages/Developer";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact"
import Game from "../pages/Game";
import GamePlay from "../pages/Gameplay";
import GameModeSelector from "../pages/GameModeSelector";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game-mode-selector" element={<GameModeSelector />} />
        <Route path="/new-game" element={<Game />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gameplay" element={<GamePlay />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
