const Professor = require("../models/Professor.model");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginProfessor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Professor.login(email, password);
    //create a token for login
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginProfessor };
