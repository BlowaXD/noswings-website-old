'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.use(auth_middleware);
router.use('/', require('./shop.js'));
router.get('/recharge', require('./recharge.js'));

module.exports = router;
