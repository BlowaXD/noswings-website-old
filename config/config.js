'use strict';
const api_host = 'http://localhost:4000';

module.exports = {
    server: 'NosWings',
    api: {
        login_route: `${api_host}/user/login`,
    },
    smtp: {
        host: 'noswings.fr',
        port: 465,
        secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'username@example.com',
            pass: 'userpass'
        }
    },
    secret: {
        jwt_key: ''
    },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_MODERATOR: 0b00000010,
    },
    urls: {
        logo: "https://static.noswings.fr/assets/img/logo.png",
        site: "https://noswings.fr/",
        discord: "http://discord.noswings.fr/",
        forum: "https://forum.noswings.fr/"
    },
    db: {}
};
