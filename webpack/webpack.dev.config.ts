/**
 * @Author yejiang1015
 * @Date 2020-04-08 22:12:05
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-29 23:29:31
 * @Message development
 */

import Entry from "./core/entry";
import Loaders from "./core/loaders";
import { NODE_ENV } from "../typings";
import Output from "./core/output";
import Plugins from "./core/plugins";
import Resolve from "./core/resolve";
import WebpackChain from "webpack-chain";
import options from "../lib/options/index";
import smp from "./core/smp";

process.env.NODE_ENV = NODE_ENV.development;

const config = new WebpackChain();

/**
 * @config
 */
config.mode(NODE_ENV.development).end();
config.devtool("cheap-module-source-map").end();
Entry(config, NODE_ENV.development, options);
Output(config, NODE_ENV.development, options);
Plugins(config, NODE_ENV.development, options);
Loaders(config, NODE_ENV.development, options);
Resolve(config);

/**
 * @end [config]
 */

if (options && typeof options.chainWebpack === "function") {
  options.chainWebpack(config, NODE_ENV.development);
}

/**
 * @export
 */
export default smp(config);
