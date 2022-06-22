"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRatioAnArray = void 0;
const isRatioAnArray = (ratio) => {
    if (Array.isArray(ratio)) {
        return true;
    }
    return false;
};
exports.isRatioAnArray = isRatioAnArray;
