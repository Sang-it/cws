"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const node_util_1 = require("node:util");
const APP_NAME = (0, node_util_1.styleText)("blue", "CWS");
const ERROR_TEXT = (0, node_util_1.styleText)("red", "ERROR");
const WARN_TEXT = (0, node_util_1.styleText)("yellow", "WARN");
exports.log = {
    error: (message) => {
        console.error(`[${APP_NAME}:${ERROR_TEXT}]: ${message}`);
    },
    warn: (message) => {
        console.warn(`[${APP_NAME}:${WARN_TEXT}]: ${message}`);
    },
    log: (message) => {
        console.log(`[${APP_NAME}]: ${message}`);
    },
};
//# sourceMappingURL=log.js.map