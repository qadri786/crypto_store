const { JWT, JWK } = require("jose");
const { auth } = require("../config/app");

module.exports = {
    generateKey: (payload = {}) => {
        return JWT.sign(payload, JWK.asKey(auth.key), {audience: auth.audience, expiresIn: auth.expiresIn});
    },

    verify: (token = null) => {
        return JWT.verify(token, JWK.asKey("e31fda67-b94c-4e92-a9c3-20c204d6289d"))
    }
}