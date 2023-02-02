const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Assignment = require("./Assignment.model");
const File = require("./File.model");
const Student = require("./Student.model");

const submissionSchema = new Schema(
  {
    grade: {
      type: Number,
      min: 0,
      max: 100,
    },
    freeText: {
      type: String,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: File,
    },
    parentAssignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Assignment,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Student,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
