const User = require("../../models/user.model");
const Job = require("../../models/job.model");

const StudentDataYearBranchWise = async (req, res) => {
  try {
    const { year, branch, rollNumber } = req.query;

    let filter = { role: "student" };

    if (year) filter["studentProfile.year"] = parseInt(year);
    if (branch) filter["studentProfile.department"] = branch;
  if (rollNumber) filter["studentProfile.rollNumber"] = rollNumber; // exact match

    const students = await User.find(filter);

    return res.json(students);

  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};



const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: 'student',
      'studentProfile.appliedJobs.status': { $in: ['interview', 'hired'] }
    })
      .select('_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs')
      .lean();

    const studentsWithJobDetails = [];

    for (const student of filteredStudents) {
      const appliedJobs = student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status));

      const jobDetails = await Job.find({
        _id: { $in: appliedJobs.map(job => job.jobId) }
      })
        .populate('company', 'companyName')
        .select('company jobTitle _id')
        .lean();

      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId));
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || 'Unknown Company',
          jobId: jobDetail?._id || 'Unknown JobId',
          jobTitle: jobDetail?.jobTitle || 'Unknown Job Title'
        };
      });

      studentsWithJobDetails.push({
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails
      });
    }

    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = {
  StudentDataYearBranchWise,
  NotifyStudentStatus
};
