/**
 * @Author yejiang1015
 * @Date 2020-04-08 22:12:05
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-16 21:24:57
 * @Message production
 */

import * as Chain from "webpack-chain";
import * as TerserPlugin from "terser-webpack-plugin";

import Entry from "./core/entry";
import Loaders from "./core/loaders";
import { NODE_ENV } from "../types";
import Output from "./core/output";
import Plugins from "./core/plugins";
import Resolve from "./core/resolve";
import options from "../lib/config";
import smp from "./core/smp";

process.env.NODE_ENV = NODE_ENV.production;

const config = new Chain();

config.mode(NODE_ENV.production);
config.devtool(false).end();
Entry(config, NODE_ENV.production, options);
Output(config, NODE_ENV.production, options);
Plugins(config, NODE_ENV.production, options);
Loaders(config, NODE_ENV.production, options);
Resolve(config);
config.optimization.minimize(true);
config.optimization.noEmitOnErrors(true);
config.optimization.minimizer("TerserPlugin").use(
  new TerserPlugin({
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
  })
);
config.optimization.splitChunks({
  cacheGroups: {
    vendor: {
      // 抽离第三方插件
      test: /node_modules/, // 指定是node_modules下的第三方包
      chunks: "initial",
      name: "vendor", // 打包后的文件名，任意命名
      priority: 10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
    },
    utils: {
      // 抽离自定义公共代码
      chunks: "initial",
      name: "public",
      minSize: 0, // 只要超出0字节就生成一个新包
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
options.chainWebpack(config, NODE_ENV.production);
/**
 * @export
 */
export default smp(config);
