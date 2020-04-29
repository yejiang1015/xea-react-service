"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = __importDefault(require("./system"));
const user_1 = __importDefault(require("./user"));
const mergeOptions = () => {
    const _default = system_1.default;
    const _user = user_1.default;
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
