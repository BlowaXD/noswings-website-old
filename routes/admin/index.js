'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.use(auth_middleware);
router.use((req, res, next) => {
    if (req.user.permissions.IS_ADMIN)
        return next();
    res.redirect(req.protocol + '://' + req.get('host') + '/login');
});
router.use('/patch', require('./patch.js'));
router.use('/addMoney', require('./addmoney.js'));
router.get('/', require('./dashboard.js'));
router.get('*', require('./dashboard.js'));

module.exports = router;
