const fs = require("fs");
const crypto = require('crypto');
const buffer = require('buffer');
const nodeRsa = require('node-rsa')
const {text} = require("express");

function encrypt(data, key) {
    // Si un des deux paramètres est vide on avorte l'opération
    if (!data || !key) return null
    // On initl
    const INI_VECTOR = crypto.randomBytes(16)
    const ALGO = 'aes-256-cbc'

    let KEY = key.length > 32 ? key.slice(0, 32) : key

    const cipher = crypto.createCipheriv(ALGO, Buffer.from(KEY), INI_VECTOR)

    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return INI_VECTOR.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(data, key) {
    // Si un des deux paramètres est vide on avorte l'opération
    if (!data || !key) return null
    const ALGO = 'aes-256-cbc'
    const TEXT_PARTS = data.split(':')
    const INI_VECTOR = Buffer.from(TEXT_PARTS.shift(), 'hex')
    const ENCRYPTED_TEXT = Buffer.from(TEXT_PARTS.join(':'), 'hex')

    let KEY = key.length > 32 ? key.slice(0, 32) : key

    const decipher = crypto.createDecipheriv(ALGO, Buffer.from(KEY), INI_VECTOR)

    let decrypted = decipher.update(ENCRYPTED_TEXT)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}

function rsaEncrypt(data, rsaPath) {
    if (!data) return null

    const RSA_PATH = rsaPath !== undefined ? rsaPath : 'keypair.key'
    const RSA_KEY = fs.readFileSync(RSA_PATH).toString()

    const KEY = new nodeRsa(RSA_KEY)
    return KEY.encrypt(data, 'base64')
}

function rsaDecrypt(encryptedData, rsaPath) {
    if (!encryptedData) return null

    const RSA_PATH = rsaPath !== undefined ? rsaPath : 'keypair.key'
    const RSA_KEY = fs.readFileSync(RSA_PATH).toString()

    const KEY = new nodeRsa(RSA_KEY)
    let decrypted = null

    try {
        decrypted = KEY.decrypt(encryptedData, 'utf-8')
    } catch (e) {
        console.log(e)
        return null
    }

    return decrypted
}

function generateDiffieHellman () {
    // On créer le DH afin de généré une clé
    const DH = crypto.createDiffieHellman(256)
    // On génère la clé
    DH.generateKeys()
    // On renvoi la clé
    return DH
}

const aes256gcm = (key) => {
    const ALGO = 'aes-256-gcm';

    // encrypt returns base64-encoded ciphertext
    const encrypt = (str) => {
        // The `iv` for a given key must be globally unique to prevent
        // against forgery attacks. `randomBytes` is convenient for
        // demonstration but a poor way to achieve this in practice.
        //
        // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
        const iv = new Buffer.from((crypto.randomBytes(16), 'utf8'));
        const cipher = crypto.createCipheriv(ALGO, Buffer.from(key), iv);

        // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        let enc = cipher.update(str, 'utf8', 'base64');
        enc += cipher.final('base64');
        return [enc, iv, cipher.getAuthTag()];
    };

    // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = (enc, iv, authTag) => {
        console.log(authTag)
        const decipher = crypto.createDecipheriv(ALGO, Buffer.from(key), iv);
        decipher.setAuthTag(authTag);
        let str = decipher.update(enc, 'base64', 'utf8');
        str += decipher.final('utf8');
        return str;
    };

    return {
        encrypt,
        decrypt,
    };
};

/**
 * Permet générer la clé de chiffrement grâce aux infos de la clé locale ALICE(back) et la clé publique(front)
 * @param alice la partie locale de la clé (P,g et X)
 * @param bobPublicKey la partie publique Y permet de calculer la clé
 * @returns {*}
 */
function generateDiffieHellmanKey (alice, bobPublicKey) {
    // Si un des deux paramètres est vide on avorte l'opération
    if (!alice || !bobPublicKey) return null

    try {
        return alice.computeSecret(bobPublicKey).toString('hex')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { encrypt, aes256gcm, decrypt, rsaEncrypt, rsaDecrypt }
