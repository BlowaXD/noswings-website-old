'use strict';
const request = require('request');

function get(req, res) {
    let url = global.config.api.get_news;
    url += `?server=${global.config.server}`;
    request.get(url, (err, response, body) => {
        if (err) {
            console.log(err);
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }

        /* Parse body */
        let req_res;
        try {
            req_res = JSON.parse(body);
        } catch (e) {
            console.log(err);
        }

        /* Check if token */
        if (!req_res || !req_res.success || !req_res.recordset)
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');

        /* Store token in cookies */
        const data = {
            user: req.user,
            news: req_res.recordset,
            title: global.translate.WEBSITE.HOME_PAGE.TITLE,
            description: global.translate.WEBSITE.HOME_PAGE.DESC
        };
        res.render('website/home', data);
    });
}

module.exports = get;
