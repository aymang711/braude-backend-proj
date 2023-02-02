const jwt = require("jsonwebtoken");
const Student = require("../models/Student.model");
const Professor = require("../models/Professor.model");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { role } = req.headers;
  switch (role) {
    case "PROFESSOR":
      try {
        const user = await Professor.login(email, password);
        const id = user._id;
        //create a token for login
        const token = createToken(id);
        res.status(200).json({ email, role, token, id });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case "STUDENT":
      try {
        const user = await Student.login(email, password);
        const id = user._id;

        //create a token for login
        const token = createToken(id);
        res.status(200).json({ email, role, token, id });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.status(400).json({ error: "no such role!" });
  }
};

module.exports = { loginUser };
