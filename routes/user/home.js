'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.USER.HOME_PAGE.TITLE
    };

    res.render('user/home', data);
}

module.exports = get;
