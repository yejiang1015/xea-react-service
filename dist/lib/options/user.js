"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(process.cwd(), "xea.config.ts");
require("ts-node").register({
    project: path_1.default.join(__dirname, "../../../tsconfig.json"),
});
let UserOptions = {};
if (fs_1.default.existsSync(configPath)) {
    const UserOptionsFunc = require(path_1.default.join(process.cwd(), "xea.config.ts"));
    UserOptions = UserOptionsFunc.default
        ? UserOptionsFunc.default()
        : UserOptionsFunc();
}
exports.default = UserOptions;
