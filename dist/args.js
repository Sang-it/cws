"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArgs = void 0;
const node_path_1 = __importDefault(require("node:path"));
const extractArgs = (argv) => {
    return {
        unitsRoot: node_path_1.default.resolve(argv[2])
    };
};
const validateArgs = (params) => {
    const { argv, log, DEFAULT_USAGE } = params;
    if (argv.length < 3 || argv[2] == "--help") {
        log.log(DEFAULT_USAGE);
        process.exit();
    }
    return extractArgs(argv);
};
exports.validateArgs = validateArgs;
//# sourceMappingURL=args.js.map