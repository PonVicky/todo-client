import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <LandingPage />
      <ToastContainer autoClose={1500} draggable pauseOnHover newestOnTop />
    </BrowserRouter>
  );
}

export default App;
