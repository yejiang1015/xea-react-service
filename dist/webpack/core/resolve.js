"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
exports.default = (config) => {
    config.resolve.extensions.add(".js").add(".jsx").add(".ts").add(".tsx").end();
    config.resolve.alias.set("@", utils_1.userRootDir("src")).set("~", utils_1.userRootDir(""));
};
