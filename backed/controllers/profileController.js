const jwt = require('jwt-simple');
const dotenv = require('dotenv');
const userModel = require('../modals/userModal');
dotenv.config();

const getProfile = async(req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  // console.log(token)
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    // console.log(decoded.email)
    const user = await userModel.findUserDetails(decoded.email);
    // console.log(user,"user")
    return res.json(user);
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { getProfile };
