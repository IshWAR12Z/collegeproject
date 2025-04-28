import React from "react";
import { motion } from "framer-motion";
import img from '../../assets/biet.jpg';

const AboutUs = () => {
  return (
    <section id="about" className="bg-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-blue-700 text-center uppercase mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h1>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left - Image */}
          <motion.div
            className="flex-1 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={img}
              alt="Bhartiya Institute of Engineering & Technology"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg object-cover"
            />
          </motion.div>

          {/* Right - Text */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 text-center md:text-left mb-6">
              Bhartiya Institute Of <br /> Engineering & Technology
            </h2>

            <p className="text-gray-700 text-justify mb-4">
              Bhartiya Institute of Engineering & Technology (BIET) has been established by 
              BPS Shikshan Sansthan Samiti, Sikar, an educational society devoted to the 
              noble cause of spreading quality education in the region. The college is 
              affiliated with Bikaner Technical University, Bikaner and approved by AICTE & 
              Ministry of HRD, New Delhi.
            </p>
            <p className="text-gray-700 text-justify">
              BIET is committed to fostering excellence in students, offering B.Tech courses 
              in Civil, Mechanical, Electrical, and Computer Science streams.
            </p>

            {/* Information Cards */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-8">
              <div className="flex-1 p-5 rounded-xl shadow-md bg-white text-center">
                <h6 className="text-lg font-bold text-red-600 mb-1">16+ Years Of</h6>
                <p className="text-sm text-gray-600">Education Experience</p>
              </div>
              <div className="flex-1 p-5 rounded-xl shadow-md bg-white text-center">
                <h6 className="text-lg font-bold text-blue-700 mb-1">Mr. Hariram Ranwa</h6>
                <p className="text-sm text-gray-600">Chairman and Founder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
