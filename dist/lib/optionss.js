"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const getDefaultOptions = () => {
    let defaultOptions = {
        default: {},
    };
    try {
        defaultOptions = require(`${utils_1.rootDir("xea.config.ts")}`);
    }
    catch (error) {
        defaultOptions = { default: {} };
    }
    return defaultOptions.default;
};
const mergeOptions = () => {
    const _default = getDefaultOptions();
    const _user = {};
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
        }
        else {
            _conf[key] = _default[key];
        }
    });
    return _conf;
};
exports.default = mergeOptions();
