'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.use('/login', require('./login.js'));
router.use('/register', require('../website/register.js'));

/* Require authentification */
router.use(auth_middleware);
router.get('/', require('./home.js'));
router.get('/account', require('./account.js'));

module.exports = router;
