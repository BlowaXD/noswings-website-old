'use strict';
const express = require('express');
const router = express.Router();



router.get('/', require('./home.js'));
router.get('/ranking', require('./ranking.js').get);
router.get('/ranks/:rankingType', require('./ranking.js').getRanks);

router.use('/login', require('./login.js'));
router.use('/register', require('./register.js'));
router.use('/forgotten', require('./forgotten.js'));

/*
// catch 404 and forward to error handler
router.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
router.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.error(err);
    res.status(err.status || 500);
    res.render('website/home', { title: 'Error', user: {} });
});
*/

module.exports = router;
