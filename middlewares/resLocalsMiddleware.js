'use strict';

module.exports = function (req, res, next) {
    res.locals.domain = global.config.domain;
    res.locals.discordLink = global.config.urls.discord;
    res.locals.forumLink = global.config.urls.forumLink;
    res.locals.siteLink = global.config.urls.site;
    res.locals.logoLink = global.config.urls.logo;
    next();
};
