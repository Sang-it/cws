"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.getValidUnitConfigs = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const getFolderContents = (folder) => {
    return node_fs_1.default.readdirSync(folder);
};
const isValidUnit = (params) => {
    const { unitPath, log, validateConfig, CONFIG_FILE_NAME } = params;
    if (node_fs_1.default.statSync(unitPath).isDirectory()) {
        const config_path = node_path_1.default.join(unitPath, CONFIG_FILE_NAME);
        if (node_fs_1.default.existsSync(config_path)) {
            try {
                const content = require(config_path);
                if (validateConfig(content)) {
                    return content;
                }
                log.error(`${config_path} doesn't align with the required schema.`);
                log.error(validateConfig.errors);
            }
            catch (error) {
                log.error(`${config_path} isn't valid js config file.`);
                log.error(error);
                return;
            }
        }
        log.warn(`${CONFIG_FILE_NAME} doesn't exist for unit - ${unitPath}.`);
    }
    return;
};
const getValidUnitConfigs = (params) => {
    const validUnitConfigs = [];
    const { unitsRoot, log, validateConfig, CONFIG_FILE_NAME } = params;
    for (const _path of getFolderContents(unitsRoot)) {
        const unitPath = node_path_1.default.join(unitsRoot, _path);
        const unitConfig = isValidUnit({ unitPath, validateConfig, log, CONFIG_FILE_NAME });
        if (unitConfig) {
            validUnitConfigs.push(Object.assign({ cwd: _path }, unitConfig));
        }
    }
    return validUnitConfigs;
};
exports.getValidUnitConfigs = getValidUnitConfigs;
const writeFile = (params) => {
    const { content, path } = params;
    if (node_fs_1.default.existsSync(path)) {
        node_fs_1.default.rmSync(path);
    }
    node_fs_1.default.writeFileSync(path, content);
};
exports.writeFile = writeFile;
//# sourceMappingURL=fs.js.map