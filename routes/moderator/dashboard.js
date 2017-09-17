'use strict';

function get(req, res)
{
    let data = {
        user: req.user,
        title: global.translate.MODERATOR.HOME_PAGE.TITLE,
        desc: global.translate.MODERATOR.HOME_PAGE.DESC,
    };
    res.render('moderator/dashboard', data);
}

module.exports = get;
