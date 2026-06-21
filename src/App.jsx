import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Certificates from "./Pages/Certificates";
import Blogs from "./Pages/Blogs";
import Reels from "./Pages/Reels";
import Videos from "./Pages/Videos";

/**
 * Animated route renderer. Wraps Routes with AnimatePresence, using the current
 * route's pathname as a key to trigger page transition exit/entry animations.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/Contact" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}