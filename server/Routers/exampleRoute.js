const express = require('express');
const { userC } = require('path/to/your/controller'); // Adjust the path to your controller

let nameOfRoute = express.Router();

nameOfRoute.post('/yourRoute', userC);

module.exports = nameOfRoute;
