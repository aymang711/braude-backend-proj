const mongoose = require("mongoose");

require("dotenv").config();
const mongoURI = process.env.URI;
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "files",
  });
});

const deleteImage = (id) => {
  if (!id || id === "undefined") return res.status(400).send("no file id");
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) return res.status(500).send("file deletion error");
  });
};

const uploadFile = async (req, res) => {
  try {
    // get the .file property from req that was added by the upload middleware
    const { file } = req;
    // and the id of that new image file
    const { id } = file;
    // we can set other, smaller file size limits on routes that use the upload middleware
    // set this and the multer file size limit to whatever fits your project
    if (file.size > 50000000) {
      // if the file is too large, delete it and send an error
      deleteImage(id);
      return res.status(400).send("file may not exceed 5mb");
    }
    console.log("uploaded file: ", file);
    return res.send(file.id);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getSingleFile = async (req, res) => {
  const { id } = req.params;
  if (!id || id === "undefined") return res.status(400).send("no file id");

  const _id = new mongoose.Types.ObjectId(id);
  try {
    gfs.find({ _id }).toArray((err, files) => {
      if (!files || files.length === 0)
        return res.status(400).send("no files exist");
      // if a file exists, send the data
      gfs.openDownloadStream(_id).pipe(res);
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = { getSingleFile, uploadFile };
