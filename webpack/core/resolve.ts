import WebpackChain from "webpack-chain";
import { userRootDir } from "../../lib/utils";

export default (config: WebpackChain) => {
  config.resolve.extensions.add(".js").add(".jsx").add(".ts").add(".tsx").end();
  config.resolve.alias.set("@", userRootDir("src")).set("~", userRootDir(""));
};
