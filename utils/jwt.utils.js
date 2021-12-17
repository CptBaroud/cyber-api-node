let jwt = require('jsonwebtoken');
const fs = require("fs");

module.exports = {
    generatedToken: function () {
        //TODO stocker la clé publique dans un autre serveur
        const PRIVATE_KEY = fs.readFileSync('keypair.key')

        return jwt.sign({
            createdAt: new Date()
        }, PRIVATE_KEY, {
            expiresIn: '365d',
            algorithm: 'RS512'
        })
    }
};
