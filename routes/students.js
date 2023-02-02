const express = require("express");
const router = express.Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getSingleStudentGrades,
  getSingleStudentAssignments,
} = require("../controllers/studentController");
const {
  requireAuth,
  checkProfAuthorization,
} = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", checkProfAuthorization, getStudents);

router.get("/:id/grades", getSingleStudentGrades);

router.get("/:id/assignments",  getSingleStudentAssignments);

router.get("/:id", checkProfAuthorization, getSingleStudent);

router.post("/add-a-student", checkProfAuthorization, createStudent);

router.delete("/:id", checkProfAuthorization, deleteStudent);

router.patch("/:id", checkProfAuthorization, updateStudent);

module.exports = router;
