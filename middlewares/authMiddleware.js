'use strict';
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');

function authRequired(req, res, next)
{
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    if (!token)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    try
    {
        req.user = jwt.verify(token, global.config.secret.jwt_key);
        res.locals.user = req.user;
    }
    catch(err)
    {
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
    }
    next();
}

module.exports = authRequired;
