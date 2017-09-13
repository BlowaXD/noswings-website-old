'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.WEBSITE.HOME_PAGE.TITLE,
        description: global.translate.WEBSITE.HOME_PAGE.DESC
    };

    res.render('website/home', data);
}

module.exports = get;
