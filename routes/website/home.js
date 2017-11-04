'use strict';

function get(req, res) {

    /* Store token in cookies */
    const data = {
        user: req.user,
        news: global.news,
        title: global.translate.WEBSITE.HOME_PAGE.TITLE,
        description: global.translate.WEBSITE.HOME_PAGE.DESC
    };
    res.render('website/home', data);
}

module.exports = get;
