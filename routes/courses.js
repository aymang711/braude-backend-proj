const express = require("express");
const router = express.Router();
const {
  createCourse,
  getSingleCourse,
  getCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");
const {
  checkProfAuthorization,
  requireAuth,
} = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getCourses);

router.get("/:id", getSingleCourse);

router.post("/add-a-course", checkProfAuthorization, createCourse);

router.delete("/:id", checkProfAuthorization, deleteCourse);

router.patch("/:id", checkProfAuthorization, updateCourse);

module.exports = router;
