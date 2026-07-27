import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Donate from "./pages/Donate";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/donate" element={<Donate/>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;