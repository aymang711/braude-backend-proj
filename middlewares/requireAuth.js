const jwt = require("jsonwebtoken");
const Student = require("../models/Student.model");
const Professor = require("../models/Professor.model");

const requireAuth = async (req, res, next) => {
  //verify Auth
  const { authorization } = req.headers;
  const { role } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    switch (role) {
      case "PROFESSOR":
        req.user = await Professor.findOne({ _id }).select("_id");
        if (!req.user)
          return res.status(401).json({ error: "Request is not Authorized" });
        next();
        break;
      case "STUDENT":
        req.user = await Student.findOne({ _id }).select("_id");
        if (!req.user)
          return res.status(401).json({ error: "Request is not Authorized" });
        next();
        break;
      default:
        return res.status(401).json({ error: "Request is not Authorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not Authorized" });
  }
};

const checkProfAuthorization = async (req, res, next) => {
  const { role } = req.headers;
  if (!(role === "PROFESSOR"))
    return res.status(404).json({ error: "not authorized" });
  next();
};

module.exports = { requireAuth, checkProfAuthorization };
