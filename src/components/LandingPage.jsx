import Login from "./Login";
import Signup from "./Signup";
import MainPage from "./MainPage";
import { Routes, Route } from "react-router-dom";
export default function LandingPage() {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-emerald-50 border-8 border-emerald-600 rounded-tl-[700px] rounded-br-[700px]">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
    // </div>
  );
}
