import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserTie, FaUserShield, FaUserGraduate, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const LandFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6 flex flex-col items-center">
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-7xl"
      >
        {/* Secure Login Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">🔐 Secure Login Portal</h2>
          <p className="text-gray-300 text-lg">Access your account by choosing the appropriate login option below.</p>
        </div>

        {/* Login Buttons */}
        <div id="login" className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-lg font-medium">
          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition px-6 py-4 rounded-xl bg-indigo-700 hover:bg-indigo-600 shadow-lg"
            onClick={() => navigate('/tpo/login')}
          >
            <FaUserTie className="text-white text-xl" /> Login For TPO
          </motion.span>

          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition px-6 py-4 rounded-xl bg-red-700 hover:bg-red-600 shadow-lg"
            onClick={() => navigate('/admin')}
          >
            <FaUserShield className="text-white text-xl" /> Login For Admin
          </motion.span>

          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition px-6 py-4 rounded-xl bg-green-700 hover:bg-green-600 shadow-lg"
            onClick={() => navigate('/student/login')}
          >
            <FaUserGraduate className="text-white text-xl" /> Login For Student
          </motion.span>
        </div>

        {/* OR Divider */}
        <div className="my-8 w-full flex items-center">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-gray-400 font-semibold">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Footer Content */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8">
          {/* College Info */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">🎉 15 YEARS OF EXCELLENCE</h3>
            <p className="text-gray-400 text-justify">
              Bhartiya Institute of Engineering & Technology (BIET) has been established by 
              BPS Shikshan Sansthan Samiti, Sikar, an educational society devoted to spreading 
              quality education in the region.
            </p>
          </div>

          {/* Contact Info */}
          <div id="contact" className="md:w-1/2 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-4">📞 Contact Us</h3>
            <p className="flex items-center gap-3 text-gray-300 font-medium mt-2">
              <FaMapMarkerAlt className="text-red-400 text-xl" /> BIET College, Jhansi, Uttar Pradesh
            </p>
            <p className="flex items-center gap-3 text-gray-300 font-medium mt-2">
              <FaEnvelope className="text-yellow-400 text-xl" />
              <a href="mailto:info@bietplacement.com" className="hover:underline text-blue-400">
                info@bietplacement.com
              </a>
            </p>
            <p className="flex items-center gap-3 text-gray-300 font-medium mt-2">
              <FaPhone className="text-green-400 text-xl" />
              <a href="tel:+919876543210" className="hover:underline text-blue-400">
                +91 98765 43210
              </a>
            </p>

            {/* Social Media */}
            <div className="flex space-x-5 mt-5">
              <motion.a whileHover={{ scale: 1.3 }} href="#" className="rounded-full p-2 bg-gray-700 hover:bg-blue-600 text-blue-400 text-2xl">
                <FaFacebook />
              </motion.a>
              <motion.a whileHover={{ scale: 1.3 }} href="#" className="rounded-full p-2 bg-gray-700 hover:bg-blue-400 text-blue-300 text-2xl">
                <FaTwitter />
              </motion.a>
              <motion.a whileHover={{ scale: 1.3 }} href="#" className="rounded-full p-2 bg-gray-700 hover:bg-pink-400 text-pink-400 text-2xl">
                <FaInstagram />
              </motion.a>
              <motion.a whileHover={{ scale: 1.3 }} href="#" className="rounded-full p-2 bg-gray-700 hover:bg-blue-500 text-blue-500 text-2xl">
                <FaLinkedin />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm text-center mt-10 tracking-wide animate-pulse">
          © {new Date().getFullYear()} Placement Cell | All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}

export default LandFooter;
