
const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
// initialize cors 
dotenv.config()

const { sequelize, User } = require('../models');

 const userC = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation checks
  const errors = [];

  // Check if any field is empty
  if (!firstName || !lastName || !email || !password) {
    errors.push('All fields are required');
  }

  // Validate firstName and lastName to contain only letters
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(firstName)) {
    errors.push('First name must contain only letters');
  }
  if (!nameRegex.test(lastName)) {
    errors.push('Last name must contain only letters');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  // Validate password: at least one uppercase letter, one lowercase letter, one special character, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number');
  }

  // If there are validation errors, respond with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
 let salt = await bcrypt.genSalt(10);
 let hashPassword = await bcrypt.hash(password,salt)


  // If validation passes, create the user
  User.create({
    firstName,
    lastName,
    email,
    password :hashPassword,
    role:'student'
  })
  .then((user) => {
     let token = jwt.sign({user_id:user.userId,email:user.email,role:user.role},process.env.SECRET_KEY,{expiresIn :"3d"})
    res.end(token);
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).end(err.message);
  });
};

module.exports ={userC}