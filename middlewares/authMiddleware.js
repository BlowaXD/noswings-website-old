'use strict';
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');

function authRequired(req, res, next)
{
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    if (!token)
        return res.sendStatus(403);

    try
    {
        req.user = jwt.verify(token, global.config.secret.jwt_key);
    }
    catch(err)
    {
        return res.sendStatus(403);
    }
    next();
}

module.exports = authRequired;
