const express = require('express');
const { userC } = require('../controllers/UserC.js'); // Adjust the path to your controller

let nameOfRoute = express.Router();

nameOfRoute.post('/createUser', userC);

module.exports = nameOfRoute;
