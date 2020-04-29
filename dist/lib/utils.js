"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.join = (baseDir, dir) => {
    return path_1.default.join(baseDir, dir);
};
exports.userRootDir = (dir = "") => {
    return path_1.default.join(process.cwd(), dir);
};
exports.rootDir = (dir = "") => {
    return path_1.default.join(__dirname, "../", dir);
};
