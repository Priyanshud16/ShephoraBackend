const bcryptjs = require("bcryptjs");
const UserModel = require("../../models/user.model");

const userRegistration = async (req, res) => {
  const { username, email, password, phone, ZIP } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(401).send({ message: "User already Exists." });
    }

    // Promisify bcryptjs.hash using async/await
    const hashedPassword = await bcryptjs.hash(password, 10); // 10 is a common salt round value

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      phone,
      ZIP,
    });

    await newUser.save();

    res.status(201).send({
      message: `Congratulations ${username} you are registered`,
      User: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Registration failed: ${error.message}` });
  }
};

module.exports = userRegistration;
