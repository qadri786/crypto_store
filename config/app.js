const config = {
    "development": {
        auth: {
            key: "e31fda67-b94c-4e92-a9c3-20c204d6289d",
            audience: 'project-tss', expiresIn: '1 year',
            encryptKey: [1,0,7,0,9,0,7,8,6,0,0,0,1,5,2,9]
        },
        middlewares: [
            {"url": "./middlewares/response", "pos": "before"},
            {"url": "./middlewares/authentication", "pos": "before"},
            {"url": "./middlewares/error", "pos": "after"},
        ],
        pagination: {
            limit: 20
        }
    },
    "test": {
        auth: {
            key: "e31fda67-b94c-4e92-a9c3-20c204d6289d",
            audience: 'project-tss', expiresIn: '1 year',
            encryptKey: [1,0,7,0,9,0,7,8,6,0,0,0,1,5,2,9]
        },
        middlewares: [
            {"url": "./middlewares/response", "pos": "before"},
            {"url": "./middlewares/authentication", "pos": "before"},
        ],
        pagination: {
            limit: 20
        }
    },
    "production": {
        auth: {
            key: "e31fda67-b94c-4e92-a9c3-20c204d6289d",
            audience: 'project-tss', expiresIn: '1 year',
            encryptKey: [1,0,7,0,9,0,7,8,6,0,0,0,1,5,2,9]
        },
        middlewares: [
            "./middlewares/response",
            "./middlewares/authentication",
            "./middlewares/location",
        ],
        pagination: {
            limit: 20
        }
    }
};
module.exports = config[process.env.NODE_ENV];