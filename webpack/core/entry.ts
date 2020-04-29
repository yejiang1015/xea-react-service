import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../typings";

import WebpackChain from "webpack-chain";
import path from "path";

const Entry = (config: WebpackChain, env: NODE_ENV_TYPE, options: Options) => {
  if (env === NODE_ENV.development) {
    config
      .entry("index")
      .add(path.join(__dirname, "../../../node_modules/webpack-dev-server/client"))
      .add(options.entryPath)
      .end();
    return config;
  } else {
    config.entry("index").add(options.entryPath).end();
    return config;
  }
};

export default Entry;
