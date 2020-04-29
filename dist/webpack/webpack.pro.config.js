"use strict";
/**
 * @Author yejiang1015
 * @Date 2020-04-08 22:12:05
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-29 23:35:19
 * @Message production
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entry_1 = __importDefault(require("./core/entry"));
const loaders_1 = __importDefault(require("./core/loaders"));
const typings_1 = require("../typings");
const output_1 = __importDefault(require("./core/output"));
const plugins_1 = __importDefault(require("./core/plugins"));
const resolve_1 = __importDefault(require("./core/resolve"));
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const index_1 = __importDefault(require("../lib/options/index"));
const smp_1 = __importDefault(require("./core/smp"));
process.env.NODE_ENV = typings_1.NODE_ENV.production;
const config = new webpack_chain_1.default();
config.mode(typings_1.NODE_ENV.production);
config.devtool(false).end();
entry_1.default(config, typings_1.NODE_ENV.production, index_1.default);
output_1.default(config, typings_1.NODE_ENV.production, index_1.default);
plugins_1.default(config, typings_1.NODE_ENV.production, index_1.default);
loaders_1.default(config, typings_1.NODE_ENV.production, index_1.default);
resolve_1.default(config);
config.optimization.minimize(true);
config.optimization.noEmitOnErrors(true);
config.optimization.minimizer("TerserPlugin").use(new terser_webpack_plugin_1.default({
    /** 多进程 进程数 */
    parallel: true,
    /** sourceMap */
    sourceMap: false,
    /**
     * 提取资源文件的注释和描述和 license。如下
     *  @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     * */
    extractComments: false,
}));
config.optimization.splitChunks({
    cacheGroups: {
        vendor: {
            // 抽离第三方插件
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
        },
        utils: {
            // 抽离自定义公共代码
            chunks: "initial",
            name: "public",
            minSize: 0,
        },
    },
});
config.performance.set("hints", "warning");
/** 资源大小报警阈值 （以字节为单位） */
config.performance.set("maxAssetSize", 30000000);
/** 入口文件大小报警阈值 （以字节为单位） */
config.performance.set("maxEntrypointSize", 50000000);
config.performance.set("assetFilter", (assetFilename) => {
    return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
});
/**
 * @end [config]
 */
if (index_1.default && typeof index_1.default.chainWebpack === "function") {
    index_1.default.chainWebpack(config, typings_1.NODE_ENV.production);
}
/**
 * @export
 */
exports.default = smp_1.default(config);
