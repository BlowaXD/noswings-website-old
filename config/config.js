module.exports = {
    domain: "NosWings",
    "NosWings": {
        ip: "127.0.0.1",
        port: 5050,
        multiclient: true,
        tokensecret: 'yolo',
        database: {
            user: "",
            password: "",
            server: "",
            database: "opennos"
        },
        email: '',
        email_config: {
            host: '',
            port: 1337,
            secure: false,
            auth: {
                user: '',
                pass: ''
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    },
    "NosFun": {
        ip: "127.0.0.1",
        port: 5050,
        multiclient: true,
        tokensecret: 'yolo',
        database: {
            user: "",
            password: "",
            server: "",
            database: "opennos"
        },
        email: '',
        email_config: {
            host: '',
            port: 1337,
            secure: false,
            auth: {
                user: '',
                pass: ''
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    },
};