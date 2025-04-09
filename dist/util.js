"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printUsage = exports.ERROR_MSG = exports.DEFAULT_USAGE = void 0;
exports.DEFAULT_USAGE = `
USAGE : node app.js <PROJECTS_PATH>

<PROJECTS_PATH> -- Path where the projects are stored.
`;
exports.ERROR_MSG = `<PROJECTS_PATH> should be provided.`;
const printUsage = (usage) => {
    console.log(usage);
};
exports.printUsage = printUsage;
//# sourceMappingURL=util.js.map