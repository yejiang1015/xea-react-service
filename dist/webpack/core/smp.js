"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
const index_1 = __importDefault(require("../../lib/options/index"));
exports.default = (config) => {
    const smp = new speed_measure_webpack_plugin_1.default();
    const _config = config.toConfig();
    if (index_1.default.smp) {
        return smp.wrap(_config);
    }
    return _config;
};
