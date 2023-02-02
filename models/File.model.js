const mongoose = require("mongoose");

const filesEnum = ["submission", "assignment"];

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: filesEnum,
    },
    data: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
