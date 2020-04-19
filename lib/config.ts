import { rootDir, userRootDir } from "./utils";

import { Options } from "../types";

const getUserOptions = (): Options => {
  let userOptions = {
    default: {},
  };
  try {
    userOptions = require(`${userRootDir("xea.config.ts")}`);
  } catch (error) {
    userOptions = { default: {} };
  }
  return userOptions.default as Options;
};

const getDefaultOptions = (): Options => {
  let defaultOptions = {
    default: {},
  };
  try {
    defaultOptions = require(`${rootDir("xea.config.ts")}`);
  } catch (error) {
    defaultOptions = { default: {} };
  }
  return defaultOptions.default as Options;
};

const mergeOptions = (): Options => {
  const _default = getDefaultOptions();
  const _user = getUserOptions();
  let _conf = {};
  Object.keys(_default).forEach((key) => {
    if (_user[key] && typeof _user[key] !== "undefined") {
      /** dev-server */
      switch (key) {
        case "devServer":
          _conf[key] = Object.assign({}, _default[key], _user[key]);
          break;
        case "includeDir":
        case "excludeDir":
          _conf[key] = [..._default[key], ..._user[key]];
          break;
        default:
          _conf[key] = _default[key];
      }
    } else {
      _conf[key] = _default[key];
    }
  });
  return _conf as Options;
};
export default mergeOptions();
