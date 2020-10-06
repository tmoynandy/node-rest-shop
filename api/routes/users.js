const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

const secret = 'secret'

router.post('/signup', UsersController.users_signup);

router.delete('/:userId', checkAuth, UsersController.user_delete);

router.post('/login', UsersController.user_login);

module.exports = router