'use strict';

function post(req, res)
{
    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.post_kick,
        headers: { 'x-access-token': req.user.token }
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/user/');
    });
}

module.exports = post;
