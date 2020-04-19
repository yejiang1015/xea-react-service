import * as Config from "webpack-chain";

import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../types";

import { join } from "../../lib/utils";

export default (config: Config, ENV: NODE_ENV_TYPE, options: Options) => {
  let assetsHashName = "js/[name].[hash:8].js";
  if (ENV === NODE_ENV.development) {
    assetsHashName = "js/[name].js";
  }
  config.output
    .path(options.outputDir)
    .publicPath(options.publicPath)
    .filename(join(options.assetsDir, assetsHashName));
  return config;
};
