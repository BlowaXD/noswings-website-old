'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.DONATE_PAGE.TITLE
    };

    res.render('shop/recharge', data);
}

module.exports = get;
