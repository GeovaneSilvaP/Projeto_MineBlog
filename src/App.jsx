import "./App.css";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
