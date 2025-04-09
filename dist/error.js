"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const catchError = async (promise) => {
    return promise
        .then((data) => {
        return [undefined, data];
    })
        .catch((error) => {
        return [error];
    });
};
exports.catchError = catchError;
//# sourceMappingURL=error.js.map