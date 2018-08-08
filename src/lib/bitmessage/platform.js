const createHash = require('crypto').createHash

exports.sha1 = function (buf) {
    return createHash('sha1').update(buf).digest()
}

exports.sha256 = function (buf) {
    return createHash('sha256').update(buf).digest()
}

exports.sha512 = function (buf) {
    return createHash('sha512').update(buf).digest()
}

exports.ripemd160 = function (buf) {
    return createHash('ripemd160').update(buf).digest()
}
