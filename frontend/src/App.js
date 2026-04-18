import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import FlyerPopup from "./components/FlyerPopup";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/"             element={<HomePage />}         />
            <Route path="/about"        element={<AboutPage />}        />
            <Route path="/programs"     element={<ProgramsPage />}     />
            <Route path="/gallery"      element={<GalleryPage />}      />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact"      element={<ContactPage />}      />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <FlyerPopup />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
