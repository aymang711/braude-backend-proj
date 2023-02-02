const mongoose = require("mongoose");
const Student = require("./Student.model");
const Schema = mongoose.Schema;
const daysEnum = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      enum: daysEnum,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: Student }],
  },
  { timestamps: true }
);

courseSchema.path("days").validate(function (value) {
  return value && value.length > 0;
}, "days cannot be empty");

module.exports = mongoose.model("Course", courseSchema);
