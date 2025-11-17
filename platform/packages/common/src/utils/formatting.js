"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCredits = formatCredits;
exports.formatUSD = formatUSD;
exports.formatLargeNumber = formatLargeNumber;
exports.formatDate = formatDate;
exports.formatRelativeTime = formatRelativeTime;
exports.truncate = truncate;
function formatCredits(credits) {
    const num = typeof credits === 'bigint' ? Number(credits) : credits;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(num);
}
function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(amount);
}
function formatLargeNumber(num) {
    if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toString();
}
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString();
}
function formatRelativeTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60)
        return `${diffSecs} seconds ago`;
    if (diffMins < 60)
        return `${diffMins} minutes ago`;
    if (diffHours < 24)
        return `${diffHours} hours ago`;
    if (diffDays < 30)
        return `${diffDays} days ago`;
    return formatDate(d);
}
function truncate(str, maxLength) {
    if (str.length <= maxLength)
        return str;
    return `${str.slice(0, maxLength - 3)}...`;
}
//# sourceMappingURL=formatting.js.map