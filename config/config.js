'use strict';
const api_host = 'https://api.noswings.fr';

module.exports = {
    server: 'NosWings',
    api: {
        admin : {
            get_patch : `${api_host}/admin/patch`,
            post_patch : `${api_host}/admin/patch`,
            post_add_money: `${api_host}/admin/addmoney`,
        },
        get_news: `${api_host}/get_news`,
        get_info: `${api_host}/user/get_info`,
        get_token: `${api_host}/user/token`,
        get_packs: `${api_host}/shop/packs`,
        get_validate: `${api_host}/register/validate/`,
        post_kick: `${api_host}/user/kick`,
        post_buy: `${api_host}/shop/buy`,
        post_register: `${api_host}/register`,
        post_forgotten: `${api_host}/forgotten`
    },
    links:
        {
            staticDomain: `https://static.noswings.fr`,
            launcher: `https://static.noswings.fr/NosWings.exe`,
            website: `https://noswings.fr/`,
            forum: `https://forum.noswings.fr/`,
            discord: `https://discord.gg/uyFs2yz`,
        },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_GM: 0b00000010,
    },
};
