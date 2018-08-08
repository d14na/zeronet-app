const assert = require('./_util').assert
const crypto = require('crypto')
const platform = require('./platform')
const secp256k1 = require('secp256k1')
const eccrypto = require('secp256k1')

function aes256CbcEncrypt(iv, key, plaintext) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var firstChunk = cipher.update(plaintext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
}

function aes256CbcDecrypt(iv, key, ciphertext) {
    var cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var firstChunk = cipher.update(ciphertext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
}

function hmacSha256(key, msg) {
    return crypto.createHmac('sha256', key).update(msg).digest();
}

function pad32(msg) {
    let buf

    if (msg.length < 32) {
        buf = Buffer.alloc(32)
        msg.copy(buf, 32 - msg.length)
        return buf
    } else {
        return msg
    }
}

function getRandomBytes(_length) {
    const utils = require('ethers').utils
    return Buffer.from(utils.randomBytes(_length), 'hex')
}

const derive = function (privateKeyA, publicKeyB) {
    const EC = require('elliptic').ec
    const ec = new EC('secp256k1')

    return new Promise(function (resolve) {
        assert(Buffer.isBuffer(privateKeyA), 'Bad input')
        assert(Buffer.isBuffer(publicKeyB), 'Bad input')
        assert(privateKeyA.length === 32, 'Bad private key')
        assert(publicKeyB.length === 65, 'Bad public key')
        assert(publicKeyB[0] === 4, 'Bad public key')

        var keyA = ec.keyFromPrivate(privateKeyA)
        var keyB = ec.keyFromPublic(publicKeyB)
        var Px = keyA.derive(keyB.getPublic())  // BN instance

        resolve(new Buffer(Px.toArray()))
    })
}

/**
 * Calculate SHA-1 hash.
 */
const sha1 = exports.sha1 = platform.sha1

/**
 * Calculate SHA-256 hash.
 */
const sha256 = exports.sha256 = platform.sha256

/**
 * Calculate SHA-512 hash.
 */
const sha512 = exports.sha512 = platform.sha512

/**
 * Calculate RIPEMD-160 hash.
 */
exports.ripemd160 = platform.ripemd160

/**
 * Generate cryptographically strong pseudo-random data.
 */
exports.randomBytes = getRandomBytes

/**
 * Generate a new random private key.
 */
exports.getPrivate = function () {
    const utils = require('ethers').utils
    return getRandomBytes(32)
}

/**
 * Generate public key for the given private key.
 */
exports.getPublic = function (privateKey) {
    assert(privateKey.length === 32, "Bad private key")
    // See https://github.com/wanderer/secp256k1-node/issues/46
    // const secp256k1 = require("secp256k1")
    const compressed = eccrypto.publicKeyCreate(privateKey)
    return eccrypto.publicKeyConvert(compressed, false)
}

/**
 * Sign message using ecdsa-with-sha1 scheme.
 */
exports.sign = function(privateKey, msg) {
    return new Promise(function (resolve) {
        let hash = sha1(msg)
        hashedMsg = pad32(hash)
        const sig = secp256k1.sign(hashedMsg, privateKey).signature
        resolve(secp256k1.signatureExport(sig))
    })
}

/**
 * Verify signature using ecdsa-with-sha1 scheme.
 */
exports.verify = function(publicKey, msg, sig) {
    const hash = sha1(msg)
    return eccrypto.verify(publicKey, hash, sig)
}

const SECP256K1_TYPE = 714

// We define this structure here to avoid circular imports. However we
// rexport and document it in `structs` module for consistency.
const encrypted = exports.encrypted = {
    decode: function(buf) {
        assert(buf.length >= 118, 'Buffer is too small')
        assert(buf.readUInt16BE(16, true) === SECP256K1_TYPE, 'Bad curve type')
        assert(buf.readUInt16BE(18, true) === 32, 'Bad Rx length')
        assert(buf.readUInt16BE(52, true) === 32, 'Bad Ry length')

        const iv = new Buffer(16)
        buf.copy(iv, 0, 0, 16)

        const ephemPublicKey = new Buffer(65)
        ephemPublicKey[0] = 0x04
        buf.copy(ephemPublicKey, 1, 20, 52)
        buf.copy(ephemPublicKey, 33, 54, 86)

        // NOTE(Kagami): We do copy instead of slice to protect against
        // possible source buffer modification by user.
        const ciphertext = new Buffer(buf.length - 118)
        buf.copy(ciphertext, 0, 86, buf.length - 32)

        const mac = new Buffer(32)
        buf.copy(mac, 0, buf.length - 32)

        return { iv, ephemPublicKey, ciphertext, mac }
    },

    encode: function(opts) {
        assert(opts.iv.length === 16, 'Bad IV')
        assert(opts.ephemPublicKey.length === 65, 'Bad public key')
        assert(opts.mac.length === 32, 'Bad MAC')

        // 16 + 2 + 2 + 32 + 2 + 32 + ? + 32
        const buf = new Buffer(118 + opts.ciphertext.length)

        opts.iv.copy(buf)
        buf.writeUInt16BE(SECP256K1_TYPE, 16, true)  // Curve type
        buf.writeUInt16BE(32, 18, true)  // Rx length
        opts.ephemPublicKey.copy(buf, 20, 1, 33)  // Rx
        buf.writeUInt16BE(32, 52, true)  // Ry length
        opts.ephemPublicKey.copy(buf, 54, 33)  // Ry
        opts.ciphertext.copy(buf, 86)
        opts.mac.copy(buf, 86 + opts.ciphertext.length)

        return buf
    }
}

const getPublic = function(privateKey) {
    assert(privateKey.length === 32, 'Bad private key')
    // See https://github.com/wanderer/secp256k1-node/issues/46
    const compressed = secp256k1.publicKeyCreate(privateKey)
    return secp256k1.publicKeyConvert(compressed, false)
}

function ecencrypt(publicKeyTo, msg, opts) {
    opts = opts || {}

    // Tmp variable to save context from flat promises;
    let ephemPublicKey

    return new Promise(function (resolve) {
        let ephemPrivateKey = opts.ephemPrivateKey || getRandomBytes(32)
        // let ephemPrivateKey = opts.ephemPrivateKey || crypto.randomBytes(32)
        ephemPublicKey = getPublic(ephemPrivateKey)

        resolve(derive(ephemPrivateKey, publicKeyTo))
    }).then(function (Px) {
      const hash = sha512(Px)
      const iv = opts.iv || getRandomBytes(16)
      // const iv = opts.iv || crypto.randomBytes(16)
      const encryptionKey = hash.slice(0, 32)
      const macKey = hash.slice(32)
      const ciphertext = aes256CbcEncrypt(iv, encryptionKey, msg)
      const dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext])
      const mac = hmacSha256(macKey, dataToMac)

      return { iv, ephemPublicKey, ciphertext, mac }
    })
}

/**
 * Encrypt message for given recepient's public key.
 */
exports.encrypt = function(publicKeyTo, msg, opts) {
    return ecencrypt(publicKeyTo, msg, opts)
        .then(function(encObj) {
            return encrypted.encode(encObj)
        })
}

/**
 * Decrypt message using given private key.
 */
exports.decrypt = function(privateKey, buf) {
    return new Promise(function(resolve) {
        const encObj = encrypted.decode(buf)
        resolve(eccrypto.decrypt(privateKey, encObj))
    })
}
