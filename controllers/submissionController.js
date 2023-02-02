const Submission = require("../models/Submission.model");
const mongoose = require("mongoose");
const Assignment = require("../models/Assignment.model");
const Student = require("../models/Student.model");

require("dotenv").config();
const mongoURI = process.env.URI;
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "files",
  });
});

// get all submissions
const getSubmissions = async (req, res) => {
  const submissions = await Submission.find({})
    .sort({ createdAt: -1 })
    .populate("parentAssignment")
    .populate("student");
  res.status(200).json(submissions);
};

// get a single submission
const getSingleSubmission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no valid submission id found" });

  const submission = await Submission.findById(id)
    .populate("parentAssignment")
    .populate("student");
  if (!submission)
    return res.status(404).json({ error: "no valid submission found" });

  return res.status(200).json(submission);
};
// create a submission
const createSubmission = async (req, res) => {
  const { parentAssignment, file, student } = req.body;
  const assignment = await Assignment.findById(parentAssignment);
  if (!assignment)
    return res.status(404).json({ error: "no valid assignment found" });

  const subFile = await gfs.find({ file });
  if (!subFile) return res.status(400).send("no files exist");

  const submitterStudent = await Student.findById(student);
  if (!submitterStudent)
    return res.status(404).json({ error: "no valid student found" });

  try {
    const submission = await Submission.create({
      parentAssignment,
      file,
      student,
    });
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a submission
const deleteSubmission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid submission" });

  const submission = await Submission.findOneAndDelete({ _id: id });
  if (!submission) return res.status(400).json({ error: "no such submission" });
  return res.status(200).json(submission);
};

// update a submission
const updateSubmission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such submission" });

  const submission = await Submission.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!submission) return res.status(400).json({ error: "no such submission" });
  res.status(200).json(submission);
};

module.exports = {
  getSingleSubmission,
  getSubmissions,
  createSubmission,
  deleteSubmission,
  updateSubmission,
};
