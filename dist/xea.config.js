"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./lib/utils");
exports.default = () => {
    return {
        publicPath: "/",
        entryPath: utils_1.userRootDir("src/index.tsx"),
        outputDir: utils_1.userRootDir("dist"),
        assetsDir: "assets",
        includeDir: [/src/],
        excludeDir: [/node_modules/],
        smp: false,
        chainWebpack: (config, env) => config,
        htmlTitle: "hello word",
        devServer: {
            port: 9090,
            hot: true,
            open: false,
            hotOnly: false,
            noInfo: true,
            injectClient: true,
            injectHot: true,
            stats: "errors-only",
            disableHostCheck: true,
            clientLogLevel: "error",
        },
    };
};
