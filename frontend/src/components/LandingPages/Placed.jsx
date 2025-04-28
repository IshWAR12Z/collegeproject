import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config/config";

function PlacedStudents() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(""); // Admission Year filter
  const defaultImage = "/profileImgs/default/defaultProfileImg.jpg"; // Default image if none exists

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchPlacedStudents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/student/hired`);
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching placed students:", error);
      }
    };

    fetchPlacedStudents();
  }, []);

  // 🔹 Filter by Admission Year
  const filteredStudents = students.filter((student) => {
    return selectedYear
      ? student.addmissionYear?.toString() === selectedYear
      : true;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-primary mb-4">Our Placed Students</h2>

      {/* 🔹 Horizontal Card List */}
      <div className="d-flex justify-content-center gap-3 flex-nowrap overflow-auto p-3">
        {students.slice(0, 5).map((student, index) => (
          <motion.div
            key={index}
            className="card border-0 shadow-sm rounded-3"
            style={{ width: "180px", background: "#f8f9fa" }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={student.profileImage ? `${BASE_URL}${student.profileImage}` : defaultImage}  // Combine BASE_URL with profile image path
              alt={student.name}
              className="card-img-top rounded-top-3"
              style={{ height: "120px", objectFit: "cover" }}
            />
            <div className="card-body text-center p-2">
              <h6 className="fw-bold text-dark mb-1">{student.name}</h6>
              <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
                {student.company}
              </p>
              <p className="fw-bold text-primary mb-1" style={{ fontSize: "12px" }}>
                {student.ctc} LPA
              </p>
              <p className="text-muted mb-0" style={{ fontSize: "10px" }}>
                Batch: {student.addmissionYear} -{" "}
                {parseInt(student.addmissionYear) + 3}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 View More Button */}
      <div className="d-flex justify-content-end mt-3">
        <motion.button
          className="btn btn-primary px-3 py-1 rounded-pill shadow-sm fw-bold"
          style={{ fontSize: "14px" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
        >
          View More
        </motion.button>
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content p-4">
            <h3 className="text-center text-primary fw-bold">All Placed Students</h3>

            {/* 🔹 Filter by Admission Year */}
            <div className="d-flex justify-content-center my-3">
              <select
                className="form-select w-auto"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Filter by Admission Year</option>
                {[...Array(currentYear - 2018)].map((_, i) => {
                  const year = 2019 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 🔹 Grid */}
            <div className="row">
              {filteredStudents.map((student, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <motion.div
                    className="card border-0 shadow-sm rounded-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={student.profileImage ? `${BASE_URL}${student.profileImage}` : defaultImage}  // Combine BASE_URL with profile image path
                      alt={student.name}
                      className="card-img-top rounded-top-3"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center p-2">
                      <h6 className="fw-bold text-dark mb-1">{student.name}</h6>
                      <p className="text-muted mb-1">{student.company}</p>
                      <p className="fw-bold text-primary mb-1">{student.ctc} LPA</p>
                      <p className="text-muted mb-0">
                        Batch: {student.addmissionYear} -{" "}
                        {parseInt(student.addmissionYear) + 3}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* 🔹 Close Button */}
            <div className="text-center mt-3">
              <motion.button
                className="btn btn-danger px-3 py-1 rounded-pill fw-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            border-radius: 10px;
            width: 80%;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
}

export default PlacedStudents;
