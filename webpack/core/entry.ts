import * as Config from "webpack-chain";
import * as path from "path";

import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../types";

export default (
  config: Config,
  env: NODE_ENV_TYPE,
  options: Options
): Config => {
  if (env === NODE_ENV.development) {
    config
      .entry("index")
      .add(path.join(__dirname, "../../node_modules/webpack-dev-server/client"))
      .add(options.entryPath)
      .end();
    return config;
  } else {
    config.entry("index").add(options.entryPath).end();
    return config;
  }
};
