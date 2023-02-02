const express = require("express");
const router = express.Router();

const {
  createSubmission,
  getSubmissions,
  getSingleSubmission,
  deleteSubmission,
  updateSubmission,
} = require("../controllers/submissionController");

const { requireAuth } = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getSubmissions);

router.get("/:id", getSingleSubmission);

router.post("/add-a-submission", createSubmission);

router.delete("/:id", deleteSubmission);

router.patch("/:id", updateSubmission);

module.exports = router;
