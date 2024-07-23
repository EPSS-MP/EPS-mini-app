const express = require('express');
const { userC } = require('../controllers/UserC.js'); 

let userCreateRouter = express.Router();

userCreateRouter.post('/createUser', userC);

module.exports = {userCreateRouter};
