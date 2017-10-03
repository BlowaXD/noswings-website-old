'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.USER.ACCOUNT_PAGE.TITLE
    };

    res.render('user/account', data);
}

module.exports = get;
