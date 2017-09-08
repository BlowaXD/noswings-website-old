'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        global: global,
        title: global.translate.DONATE_PAGE.TITLE
    };

    res.render('shop/recharge', data);
}

module.exports = get;
