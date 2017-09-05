'use strict';
const Cookies = require('cookies');

function authRequired(req, res, next)
{
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    /* No token */
    if (!token)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    const params = token.split('.');

    /* Test token
    ** - check params.length === 3
    ** - check expiration date
    ** - check 'basic' variables (username, hashedPassword, permissions)'
    **
    ** OK : set req.user
    ** KO : return res.redirect(req.protocol + '://' + req.get('host') + '/login')
    */
    next();
}

module.exports = authRequired;
