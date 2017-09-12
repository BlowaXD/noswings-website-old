'use strict';
const api_host = 'http://localhost:4500';

module.exports = {
    server: 'NosWings',
    api: {
        get_info: `${api_host}/user/get_info`,
        get_token: `${api_host}/user/token`,
        get_packs: `${api_host}/shop/packs`,
        post_buy: `${api_host}/shop/buy`,
        post_register: `${api_host}/register`,
        post_forgotten: `${api_host}/forgotten`
    },
    links:
        {
            launcher: `https://static.noswings.fr/NosWings.exe`,
            website: `https://noswings.fr/`,
            forum: `https://forum.noswings.fr/`,
            discord: `https://`,
        },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_GM: 0b00000010,
    },
};
