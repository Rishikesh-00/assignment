const bcrypt = require('bcryptjs');
const db = require('../config/db');

const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, email, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
};

const findUserDetails = async (email) => {
    const query = 'SELECT username,email,"createdAt" FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserDetails,
};
