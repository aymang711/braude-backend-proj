const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../middlewares/intiateStorageBucket");
const { uploadFile, getSingleFile } = require("../controllers/fileController");

router.post("/upload/", uploadMiddleware, uploadFile);

router.get("/:id", getSingleFile);

module.exports = router;
