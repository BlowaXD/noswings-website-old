'use strict';
const api_host = 'http://localhost:4500';

module.exports = {
    server: 'NosWings',
    api: {
        get_token: `${api_host}/user/token`,
        get_packs: `${api_host}/shop/packs`,
    },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_MODERATOR: 0b00000010,
    },
};
