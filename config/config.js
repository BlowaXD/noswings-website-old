'use strict';
const api_host = 'http://localhost:4500';

module.exports = {
    server: 'NosWings',
    api: {
        login_route: `${api_host}/user/login`,
    },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_MODERATOR: 0b00000010,
    },
};
