/**
 * @Author yejiang1015
 * @Date 2020-04-08 22:12:05
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-14 00:19:51
 * @Message production
 */

import * as Chain from "webpack-chain";

import Entry from "./core/entry";
import Loaders from "./core/loaders";
import { NODE_ENV } from "../types";
import Output from "./core/output";
import Plugins from "./core/plugins";
import Resolve from "./core/resolve";
import options from "../lib/config";
import smp from "./core/smp";

process.env.NODE_ENV = NODE_ENV.development;

const config = new Chain();

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
options.chainWebpack(config, NODE_ENV.development);

/**
 * @export
 */
export default smp(config);
