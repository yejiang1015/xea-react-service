"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
const path_1 = __importDefault(require("path"));
const Entry = (config, env, options) => {
    if (env === typings_1.NODE_ENV.development) {
        config
            .entry("index")
            .add(path_1.default.join(__dirname, "../../../node_modules/webpack-dev-server/client"))
            .add(options.entryPath)
            .end();
        return config;
    }
    else {
        config.entry("index").add(options.entryPath).end();
        return config;
    }
};
exports.default = Entry;
