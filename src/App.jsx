import { Routes, Route } from "react-router-dom";
import Pilot from "./pages/Pilot";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Pilot />} />
    </Routes>
  );
}
