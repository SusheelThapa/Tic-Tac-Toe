import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Developer from "../pages/Developer";
import FAQ from "../pages/FAQ";
import Game from "../pages/Game";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-game" element={<Game />} />
      <Route path="/developer" element={<Developer />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
