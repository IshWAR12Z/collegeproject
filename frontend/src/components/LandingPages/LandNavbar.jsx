import React, { useEffect, useState } from "react";
import Logo from "../../assets/CPMS.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 z-50
        backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled ? "bg-blue-950/80 shadow-lg border-blue-800/50" : "bg-blue-900/40 border-transparent"
        }`}
    >
      {/* Left Section - Logo and Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 md:gap-4"
      >
        <img src={Logo} alt="Logo" className="w-9 h-9 md:w-12 md:h-12 object-contain" />
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">Placement Cell</h1>
      </motion.div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 lg:gap-8 items-center text-sm md:text-base font-semibold tracking-wide text-gray-100">
        <a href="/" className="no-underline hover:text-blue-400 transition-colors">Home</a>
        <a href="#about" className="no-underline hover:text-blue-400 transition-colors">About Us</a>
        <a href="#contact" className="no-underline hover:text-blue-400 transition-colors">Contact Us</a>
        <a
          href="#login"
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white shadow-md no-underline"
        >
          Log In
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-4 right-4 mx-auto mt-2 bg-blue-900/95 shadow-xl rounded-xl flex flex-col items-center py-6 space-y-5 md:hidden backdrop-blur-md"
          >
            <a href="/" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition-colors no-underline">Home</a>
            <a href="#about" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition-colors no-underline">About Us</a>
            <a href="#contact" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition-colors no-underline">Contact Us</a>
            <a
              href="#login"
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white shadow-md no-underline"
            >
              Log In
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default LandingNavbar;
