"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = formatZodError;
exports.isValidUUID = isValidUUID;
exports.isValidEmail = isValidEmail;
exports.sanitizeString = sanitizeString;
exports.isPositiveInteger = isPositiveInteger;
exports.isNonNegativeInteger = isNonNegativeInteger;
function formatZodError(error) {
    const formatted = {};
    error.errors.forEach((err) => {
        const path = err.path.join('.');
        formatted[path] = err.message;
    });
    return formatted;
}
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function sanitizeString(input) {
    return input.trim().replace(/[<>]/g, '');
}
function isPositiveInteger(value) {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
function isNonNegativeInteger(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
//# sourceMappingURL=validation.js.map