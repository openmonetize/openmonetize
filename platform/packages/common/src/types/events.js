"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderName = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["TOKEN_USAGE"] = "TOKEN_USAGE";
    EventType["API_CALL"] = "API_CALL";
    EventType["IMAGE_GENERATION"] = "IMAGE_GENERATION";
    EventType["AUDIO_PROCESSING"] = "AUDIO_PROCESSING";
    EventType["CUSTOM"] = "CUSTOM";
})(EventType || (exports.EventType = EventType = {}));
var ProviderName;
(function (ProviderName) {
    ProviderName["OPENAI"] = "OPENAI";
    ProviderName["ANTHROPIC"] = "ANTHROPIC";
    ProviderName["GOOGLE"] = "GOOGLE";
    ProviderName["COHERE"] = "COHERE";
    ProviderName["MISTRAL"] = "MISTRAL";
})(ProviderName || (exports.ProviderName = ProviderName = {}));
//# sourceMappingURL=events.js.map