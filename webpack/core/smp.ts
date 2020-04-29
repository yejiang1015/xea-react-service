import { Configuration } from "webpack";
import  SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import WebpackChain from "webpack-chain";
import options from "../../lib/options/index";

export default (config: WebpackChain): Configuration => {
  const smp = new SpeedMeasurePlugin();
  const _config = config.toConfig();
  if (options.smp) {
    return smp.wrap(_config);
  }
  return _config;
};
