const Course = require("../models/Course.model");
const mongoose = require("mongoose");
//get all courses
const getCourses = async (req, res) => {
  const courses = await Course.find({})
    .sort({ createdAt: -1 })
    .populate("students");
  res.status(200).json(courses);
};
// get a single course
const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid id" });

  const course = await Course.findById(id).populate("students");
  if (!course) return res.status(404).json({ error: "No Such Course" });
  res.status(200).json(course);
};

// create a new course
const createCourse = async (req, res) => {
  const { name, days, students } = req.body;
  try {
    const course = await Course.create({ name, days, students });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid course" });

  const course = await Course.findOneAndDelete({ _id: id });
  if (!course) return res.status(400).json({ error: "No Such Course" });
  res.status(200).json(course);
};
// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such valid course" });

  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!course) return res.status(400).json({ error: "No Such Course" });
  res.status(200).json(course);
};

module.exports = {
  createCourse,
  getSingleCourse,
  getCourses,
  deleteCourse,
  updateCourse,
};
