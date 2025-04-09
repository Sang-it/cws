"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutableConfig = exports.validateConfig = exports.CONFIG_FILE_NAME = void 0;
const ajv_1 = __importDefault(require("ajv"));
exports.CONFIG_FILE_NAME = "ecosystem.config.js";
const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        script: { type: "string" },
        env: {
            type: "object",
            properties: {
                PORT: { type: "number" },
            },
            required: ["PORT"],
            additionalProperties: false
        }
    },
    required: ["name", "script", "env"],
    additionalProperties: false
};
const validator = new ajv_1.default();
exports.validateConfig = validator.compile(schema);
const getExecutableConfig = (validUnitConfigs) => {
    return `module.exports = { apps : ${JSON.stringify(validUnitConfigs)} };`;
};
exports.getExecutableConfig = getExecutableConfig;
//# sourceMappingURL=config.js.map