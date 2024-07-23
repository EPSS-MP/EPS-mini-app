
const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { sequelize, User } = require('../models');

 const userC = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password)

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

  // If validation passes, create the user
  User.create({
    firstName,
    lastName,
    email,
    password,
    role:'student'
  })
  .then((user) => {
    console.log(user);
    res.end('User added successfully');
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).end('Error adding user');
  });
};

module.exports ={userC}