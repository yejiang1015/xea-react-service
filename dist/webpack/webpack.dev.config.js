"use strict";
/**
 * @Author yejiang1015
 * @Date 2020-04-08 22:12:05
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-29 23:29:31
 * @Message development
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
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const index_1 = __importDefault(require("../lib/options/index"));
const smp_1 = __importDefault(require("./core/smp"));
process.env.NODE_ENV = typings_1.NODE_ENV.development;
const config = new webpack_chain_1.default();
/**
 * @config
 */
config.mode(typings_1.NODE_ENV.development).end();
config.devtool("cheap-module-source-map").end();
entry_1.default(config, typings_1.NODE_ENV.development, index_1.default);
output_1.default(config, typings_1.NODE_ENV.development, index_1.default);
plugins_1.default(config, typings_1.NODE_ENV.development, index_1.default);
loaders_1.default(config, typings_1.NODE_ENV.development, index_1.default);
resolve_1.default(config);
/**
 * @end [config]
 */
if (index_1.default && typeof index_1.default.chainWebpack === "function") {
    index_1.default.chainWebpack(config, typings_1.NODE_ENV.development);
}
/**
 * @export
 */
exports.default = smp_1.default(config);
