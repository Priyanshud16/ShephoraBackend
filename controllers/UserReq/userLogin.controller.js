require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: `Wrong Email, Register first` });
    }

    // Promisify bcryptjs.compare for cleaner code
    const isMatch = await bcryptjs.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          phone: user.phone,
          userID: user._id,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).send({ message: "Login successful", token, user });
    } else {
      return res.status(401).send({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).send({ message: `Server Error: ${error.message}` });
  }
};

module.exports = userLogin;
