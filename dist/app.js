"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const log_1 = require("./log");
const args_1 = require("./args");
const fs_1 = require("./fs");
const config_1 = require("./config");
const usage_js_1 = require("./usage.js");
const sync_1 = __importDefault(require("@prettier/sync"));
const { unitsRoot } = (0, args_1.validateArgs)({ log: log_1.log, argv: process.argv, DEFAULT_USAGE: usage_js_1.DEFAULT_USAGE });
const validUnitsConfigs = (0, fs_1.getValidUnitConfigs)({ log: log_1.log, unitsRoot, validateConfig: config_1.validateConfig, CONFIG_FILE_NAME: config_1.CONFIG_FILE_NAME });
const configContent = sync_1.default.format((0, config_1.getExecutableConfig)(validUnitsConfigs), { parser: "babel" });
(0, fs_1.writeFile)({
    content: configContent,
    path: node_path_1.default.join(unitsRoot, config_1.CONFIG_FILE_NAME)
});
log_1.log.log(`Server config written to - ${node_path_1.default.join(unitsRoot, config_1.CONFIG_FILE_NAME)}`);
//# sourceMappingURL=app.js.map