'use strict';

function get(req, res)
{
    res.render('user/home', {title: global.translate.SERVER_NAME});
}

module.exports = get;
