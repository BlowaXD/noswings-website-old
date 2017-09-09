'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.ACCOUNT_PAGE.TITLE
    };

    res.render('user/account', data);
}

module.exports = get;
