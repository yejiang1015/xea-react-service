import * as Config from "webpack-chain";
import * as SpeedMeasurePlugin from "speed-measure-webpack-plugin";

import { Configuration } from "webpack";
import options from "../../lib/config";

const smp = new SpeedMeasurePlugin();

export default (config: Config): Configuration => {
  const _config = config.toConfig();
  if (options.smp) {
    return smp.wrap(_config);
  }
  return _config;
};
