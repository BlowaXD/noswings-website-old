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

    if (params.length !== 3)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    try
    {
        const data = new Buffer(params[1], 'base64').toString('utf-8');

        console.log(data);
    }
    catch (e)
    {
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
    }


    /* Test token
    ** - check expiration date
    ** - check 'basic' variables (username, hashedPassword, permissions)'
    **
    ** OK : set req.user
    ** KO : return res.redirect(req.protocol + '://' + req.get('host') + '/login')
    */
    next();
}

module.exports = authRequired;
