'use strict';
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

/* GET Packs. */
router.use(authMiddleware);
router.get('/', function (req, res) {
    const permissions = req.user.permissions;

    if (!permissions || (permissions | global.config.e_permissions.IS_MODERATOR) === 0)
        return res.sendStatus(403);

    res.render('moderator/dashboard', {title: global.translate.TITLE_DASHBOARD});
});

module.exports = router;
