"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const minimist_1 = __importDefault(require("minimist"));
const argv = minimist_1.default(process.argv.slice(2))["_"].join("_");
!(async () => {
    try {
        if (typeof command_1.default[argv] === "function") {
            return await command_1.default[argv]();
        }
        await command_1.default.help();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
