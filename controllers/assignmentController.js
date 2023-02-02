const Assignment = require("../models/Assignment.model");
const mongoose = require("mongoose");
const Submission = require("../models/Submission.model");

//get all assignment
const getAssignments = async (req, res) => {
  const assignemnts = await Assignment.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: "parentCourse",
      populate: {
        path: "students",
        model: "Student",
      },
    });
  res.status(200).json(assignemnts);
};

const getSinglAssignmentGrades = async (req, res) => {
  const { id } = req.params;
  const submissions = await Submission.find({ parentAssignment: id })
    .sort({
      submissionDate: -1,
    })
    .populate("student")
    .populate({
      path: "parentAssignment",
      populate: { path: "parentCourse", model: "Course" },
    });

  if (!submissions) {
    return res.status(404).json({ error: "Submissions not found" });
  }

  res.status(200).json({ submissions });
};

//get a single assignment
const getSingleAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No Such Valid ID" });

  const assignemnt = await Assignment.findById(id).populate({
    path: "parentCourse",
    populate: { path: "students", model: "Student" },
  });

  if (!assignemnt)
    return res.status(404).json({ error: "No Such Valid Assignment" });
  res.status(200).json(assignemnt);
};

// create a new assignment
const createAssignment = async (req, res) => {
  const { name, deadLine, parentCourse, assignmentStatus, assignmentfile } =
    req.body;
  try {
    const assignemnt = await Assignment.create({
      name,
      deadLine,
      parentCourse,
      assignmentStatus,
      assignmentfile,
    });
    res.status(200).json(assignemnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete an assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No Such Valid Assignment" });

  const assignment = await Assignment.findOneAndDelete({ _id: id });
  if (!assignment) return res.status(400).json({ error: "No Such Assignment" });
  res.status(200).json(assignment);
};

//update an assignemnt
const updateAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "No Such Valid Assignment" });

    const assignment = await Assignment.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!assignment)
      return res.status(400).json({ error: "No Such Valid Assignment" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  getSingleAssignment,
  deleteAssignment,
  updateAssignment,
  getSinglAssignmentGrades,
};
