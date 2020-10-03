const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UsersController = require('../controllers/users');

const secret = 'secret'

router.post('/signup', UsersController.users_signup);

router.delete('/:userId', UsersController.user_delete);

router.post('/login', UsersController.user_login);

module.exports = router