const crypto = require('crypto')

function aes(data, session) {
    let key = session.substring(0,16)
    let cipher = crypto.createCipheriv("aes-128-cbc", key, key)
    let res = cipher.update(data, 'utf8', 'base64')
    return res+=cipher.final('base64')
}

module.exports = aes