"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
const utils_1 = require("../../lib/utils");
const Output = (config, ENV, options) => {
    let assetsHashName = "js/[name].[hash:8].js";
    if (ENV === typings_1.NODE_ENV.development) {
        assetsHashName = "js/[name].js";
    }
    config.output
        .path(options.outputDir)
        .publicPath(options.publicPath)
        .filename(utils_1.join(options.assetsDir, assetsHashName));
    return config;
};
exports.default = Output;
