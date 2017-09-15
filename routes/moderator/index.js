'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.use(auth_middleware);
router.use((req, res, next) => {
    if (req.user.permissions >= global.config.e_permissions.IS_GM)
    {
        return (next);
    }
    else
        res.redirect(req.protocol + '://' + req.get('host') + '/');
});
router.get('/', require('./dashboard.js'));

module.exports = router;
