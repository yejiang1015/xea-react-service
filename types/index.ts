import * as Config from "webpack-chain";
import * as WebpackDevServer from "webpack-dev-server";

export enum NODE_ENV {
  development = "development",
  production = "production",
  test = "test",
  none = "none",
}

export type NODE_ENV_TYPE = "development" | "production" | "test" | "none";

export interface DevServer extends WebpackDevServer.Configuration {}

export interface Options {
  entryPath?: string;
  outputDir?: string;
  publicPath?: string;
  assetsDir?: string;
  includeDir?: RegExp[],
  excludeDir?: RegExp[],
  chainWebpack?: (config: Config, env: NODE_ENV_TYPE) => Config;
  devServer?: DevServer;
  htmlTitle?: string;
  /** 是否显示每个模块构建时间 */
  smp?: boolean;
}
