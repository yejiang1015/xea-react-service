import { Options } from "../../typings";
import SystemOptions from "./system";
import UserOptions from "./user";

const mergeOptions = (): Options => {
  const _default = SystemOptions;
  const _user = UserOptions;
  let _conf = {};
  Object.keys(_default).forEach((key) => {
    if (typeof _user[key] !== "undefined") {
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
          _conf[key] = _user[key];
      }
    } else {
      _conf[key] = _default[key];
    }
  });
  return _conf as Options;
};
export default mergeOptions();
