const crypto = require('crypto');
const key = "6779b10fab61c8754ff6c4a2d562dd07da6df1b82dee74b35271d10459a5f994";

function hashStringWithKey(string) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(string);
    const hashedString = hmac.digest('hex');
    return hashedString;
}

module.exports = {
    hashStringWithKey
};