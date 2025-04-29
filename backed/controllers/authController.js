const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const axios = require('axios');
const userModel = require('../modals/userModal');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
  const { username, email, password, recaptchaToken } = req.body;
  if (!recaptchaToken) {
    return res.status(400).json({ message: "reCAPTCHA token is required" });
  }
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const captchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const { data: recaptchaData } = await axios.post(captchaURL);

    if (!recaptchaData.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }

    const userExists = await userModel.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await userModel.registerUser(username, email, password);
    return res.status(200).json({ message: "Registration successful. Please log in." });

  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

const login = async (req, res) => {

  const { email, password, captchaToken } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email/username and password are required" });
  }


  const captchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
  const { data: recaptchaData } = await axios.post(captchaURL);

  if (!recaptchaData.success) {
    return res.status(400).json({ message: "Invalid reCAPTCHA" });
  }

  const user = await userModel.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const payload = { id: user.id, username: user.username, email: user.email };
  const token = jwt.encode(payload, process.env.JWT_SECRET, 'HS256');

  return res.json({ token });
};

module.exports = {
  register,
  login,
};
