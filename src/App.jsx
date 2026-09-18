import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PositionDetail from "./pages/PositionDetail";
import SafetyGuide from "./pages/SafetyGuide";

export default function App() {
  return (
    <BrowserRouter basename="/sex-position-app/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/position/:id" element={<PositionDetail />} />
        <Route path="/safety" element={<SafetyGuide />} />
      </Routes>
    </BrowserRouter>
  );
}
