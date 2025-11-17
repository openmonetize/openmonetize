"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = generateApiKey;
exports.hashApiKey = hashApiKey;
exports.generateUUID = generateUUID;
exports.generateIdempotencyKey = generateIdempotencyKey;
exports.isValidApiKeyFormat = isValidApiKeyFormat;
const crypto_1 = require("crypto");
function generateApiKey(prefix = 'om') {
    const randomPart = (0, crypto_1.randomBytes)(32).toString('hex');
    return `${prefix}_${randomPart}`;
}
function hashApiKey(apiKey) {
    return (0, crypto_1.createHash)('sha256').update(apiKey).digest('hex');
}
function generateUUID() {
    return (0, crypto_1.randomBytes)(16).toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}
function generateIdempotencyKey() {
    return `idem_${(0, crypto_1.randomBytes)(16).toString('hex')}`;
}
function isValidApiKeyFormat(apiKey, prefix = 'om') {
    const regex = new RegExp(`^${prefix}_[a-f0-9]{64}$`);
    return regex.test(apiKey);
}
//# sourceMappingURL=crypto.js.map