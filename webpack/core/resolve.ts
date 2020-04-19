import * as Config from "webpack-chain";

import { userRootDir } from "../../lib/utils";

export default (config: Config) => {
  config.resolve.extensions.add(".js").add(".jsx").add(".ts").add(".tsx").end();
  config.resolve.alias.set("@", userRootDir("src")).set("~", userRootDir(""));
};
