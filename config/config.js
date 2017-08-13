'use strict';
const api_host = 'http://localhost.darkyz.io:3000';

module.exports = {
    server: 'NosWings',
    api: {
        login_route: `${api_host}/user/login`,
    },
    secret: {
        jwt_key: ''
    },
};
