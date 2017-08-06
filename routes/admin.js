const express = require('express');
const router = express.Router();

/* GET Packs. */
router.get('/', function (req, res) {
    res.render('admin/dashboard', {title: global.translate.TITLE_DASHBOARD});
});

module.exports = router;
