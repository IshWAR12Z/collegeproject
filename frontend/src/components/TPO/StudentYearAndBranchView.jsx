import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import StudentTable from './StudentTableTemplate';
import { Form, Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function StudentYearAndBranchFilter() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredStudentsData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            year: selectedYear,
            branch: selectedBranch,
          }
        });
        setStudentsData(response.data);
      } catch (error) {
        console.log("Error fetching filtered students data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedYear || selectedBranch) {
      fetchFilteredStudentsData();
    }
  }, [selectedYear, selectedBranch]);

  const exportToExcel = () => {
    if (studentsData.length === 0) {
      alert("No student data to export.");
      return;
    }

    const filteredData = studentsData.map((student) => {
      const profile = student.studentProfile || {};
      const sgpa = profile.SGPA || {};
      const ssc = profile.pastQualification?.ssc || {};
      const hsc = profile.pastQualification?.hsc || {};
      const diploma = profile.pastQualification?.diploma || {};

      return {
        Name: `${student.first_name || ''} ${student.middle_name || ''} ${student.last_name || ''}`.trim(),
        Email: student.email || '',
        Phone: student.number || '',
        Gender: student.gender || '',
        Role: student.role || '',
        DOB: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : '',
        Address: student.fullAddress?.address || '',
        Pincode: student.fullAddress?.pincode || '',
        RollNumber: profile.rollNumber || '',
        UIN: profile.UIN || '',
        Year: profile.year || '',
        Department: profile.department || '',
        AdmissionYear: profile.addmissionYear || '',
        Gap: profile.gap ? 'Yes' : 'No',
        LiveKT: profile.liveKT || 0,
        SGPA_Sem1: sgpa.sem1 || '',
        SGPA_Sem2: sgpa.sem2 || '',
        SGPA_Sem3: sgpa.sem3 || '',
        SGPA_Sem4: sgpa.sem4 || '',
        SGPA_Sem5: sgpa.sem5 || '',
        SGPA_Sem6: sgpa.sem6 || '',
        SGPA_Sem7: sgpa.sem7 || '',
        SGPA_Sem8: sgpa.sem8 || '',
        SSC_Board: ssc.board || '',
        SSC_Percentage: ssc.percentage || '',
        SSC_Year: ssc.year || '',
        HSC_Board: hsc.board || '',
        HSC_Percentage: hsc.percentage || '',
        HSC_Year: hsc.year || '',
        Diploma_Dept: diploma.department || '',
        Diploma_Percentage: diploma.percentage || '',
        Diploma_Year: diploma.year || '',
        Resume_File: profile.resume?.filename || '',
        Resume_Link: profile.resume?.filepath || '',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Filtered_Students.xlsx');
  };

  const searchByRollNumber = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          rollNumber: rollNumber,
        }
      });

      setStudentsData(response.data);
    } catch (error) {
      console.log("Error searching by roll number:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <Card className="p-4 shadow-sm border-0" style={{ background: '#f8f9fa' }}>
        <h2 className="text-center mb-4">🎓 Filter Students</h2>

        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="yearSelect">
                <Form.Label className="text-primary fw-semibold">Year</Form.Label>
                <Form.Control
                  as="select"
                  className="bg-white"
                  onChange={(e) => setSelectedYear(e.target.value)}
                  value={selectedYear}
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="branchSelect">
                <Form.Label className="text-primary fw-semibold">Branch</Form.Label>
                <Form.Control
                  as="select"
                  className="bg-white"
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  value={selectedBranch}
                >
                  <option value="">Select Branch</option>
                  <option value="Computer">Computer</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="rollNumberInput">
                <Form.Label className="text-primary fw-semibold">Roll Number</Form.Label>
                <Form.Control
                  type="text"
                  className="bg-white"
                  placeholder="Search by Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3} className="d-flex align-items-end">
              <Button variant="primary" onClick={searchByRollNumber} className="w-100 fw-semibold">
                🔍 Search Roll Number
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="text-end mb-3">
          <Button variant="success" onClick={exportToExcel}>
            ⬇️ Download Excel
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="mt-4">
            {studentsData.length > 0 ? (
              <StudentTable studentData={studentsData} />
            ) : (
              <p className="text-center text-muted mt-3">
                No students found with the selected filters.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default StudentYearAndBranchFilter;
