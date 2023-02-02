const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getSingleAssignment,
  deleteAssignment,
  updateAssignment,
  getSinglAssignmentGrades,
} = require("../controllers/assignmentController");
const {
  checkProfAuthorization,
  requireAuth,
} = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getAssignments);

router.get("/:id/grades", getSinglAssignmentGrades);

router.get("/:id", getSingleAssignment);

router.post("/add-a-assignment", checkProfAuthorization, createAssignment);

router.delete("/:id", checkProfAuthorization, deleteAssignment);

router.patch("/:id", checkProfAuthorization, updateAssignment);

module.exports = router;
