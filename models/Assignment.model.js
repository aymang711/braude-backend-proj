const mongoose = require("mongoose");
const Course = require("./Course.model");
const Schema = mongoose.Schema;
const File = require("./File.model");

const assignmentStatus = ["Active", "Canceled", "Finished", "OnHold"];

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  deadLine: {
    type: Date,
    required: true,
  },
  parentCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
  },
  assignmentStatus: {
    type: String,
    enum: assignmentStatus,
  },
  assignmentfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: File,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
