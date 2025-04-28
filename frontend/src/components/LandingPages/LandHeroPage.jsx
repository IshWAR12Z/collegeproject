import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaUsers, FaUniversity, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CareerImage from "../../assets/placements.png";

function LandingHeroPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden max-w-screen-2xl mx-auto min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-br from-blue-50 via-white to-purple-100 text-gray-800 px-6 lg:px-20 py-16 pt-24">

      {/* 🔮 Background Light Effect */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 z-0"></div>

      {/* 🔹 Left Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center z-10">
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Supercharge Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career</span> with Placements
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Empowering students with top placement opportunities.
          <br className="hidden sm:block" />
          Your future starts here!
        </motion.p>
        
        {/* 🔹 Call-to-Action Buttons */}
        <motion.div 
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <button 
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            onClick={() => navigate("/student/login")}
          >
            <FaArrowRight /> Get Started
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 font-bold text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
            Learn More
          </button>
        </motion.div>

        {/* 🔹 Placement Stats */}
        <motion.div 
          className="mt-12 flex flex-wrap gap-8 sm:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {[ 
            { icon: <FaBriefcase />, label: "500+ Job Offers" },
            { icon: <FaUsers />, label: "100+ Hiring Companies" },
            { icon: <FaUniversity />, label: "Top Campus Placements" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-white border border-gray-300 shadow-md p-6 rounded-xl hover:shadow-lg transition duration-300 w-40">
              <div className="text-4xl text-blue-600">{item.icon}</div>
              <h3 className="text-md sm:text-lg font-semibold mt-3 text-center">{item.label}</h3>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 🔹 Right Image Section */}
      <motion.div 
        className="w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0 px-4 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src={CareerImage} 
          alt="Placement Success"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  );
}

export default LandingHeroPage;
