'use strict';
const Cookies = require('cookies');

function authRequired(req, res, next)
{
    const cookies = new Cookies(req, res);
    const token = cookies.get(`${global.config.server}-token`);

    /* No token */
    if (!token)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    const params = token.split('.');

    if (params.length !== 3)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* Parse token */
    let user;
    try
    {
        user = JSON.parse(new Buffer(params[1], 'base64').toString('utf-8'));
    }
    catch (e)
    {
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
    }

    /* Check fields */
    if (!user || !user.username || !user.hashedPassword || !user.exp)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* Check expiration date */
    if (Date.now() > parseInt(user.exp) * 1000)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* That's ok */
    req.user = user;
    req.user.token = token;
    next();
}

module.exports = authRequired;
