'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.USER.DONATE_PAGE.TITLE
    };

    res.render('shop/recharge', data);
}

module.exports = get;
