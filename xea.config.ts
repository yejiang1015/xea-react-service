import { Options } from "./types";
import { userRootDir } from "./lib/utils";

const _defaultOptions: Options = {
  publicPath: "/",
  entryPath: userRootDir("src/index.tsx"),
  outputDir: userRootDir("dist"),
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

export default _defaultOptions;
