const fs = require("fs");
const path = require("path");

const defaultConf = {
  /** postcss 解析器 */
  parser: require.resolve("postcss-safe-parser"),
  plugins: [
    /** 扩展 sass 语法 += */
    require("precss"),
    /** 压缩 解析时不处理。打包时用 webpack-plugin 处理压缩 */
    // require("cssnano"),
    /** css next css4 * /
    require("cssnext"),
    /** --moz --webkit ... */
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions"],
      flexbox: "no-2009",
    }),
    require("postcss-flexbugs-fixes"),
    /** css background-image: resolve("assets/img/logo.png") */
    require("postcss-assets")({
      loadPaths: ["src"],
      relative: true,
    }),
  ],
};

const postcssConfPath = path.join(process.cwd(), "postcss.config.js");
const getUserConf = () => {
  let userConf = {};
  if (fs.existsSync(postcssConfPath)) {
    try {
      userConf = require(postcssConfPath);
    } catch (error) {
      console.error(error);
    }
  }
  if (Object.keys(userConf).length && (userConf.parser || userConf.plugins)) {
    return userConf;
  }
  return undefined;
};

const mergeConf = () => {
  const _userConf = getUserConf();
  if (!_userConf) return defaultConf;
  if (_userConf.parser) {
    defaultConf.parser = _userConf.parser;
  }
  if (_userConf.plugins && _userConf.plugins.length) {
    defaultConf.plugins = [...defaultConf.plugins, ...userConf.plugins];
  }
  return defaultConf;
};

module.exports = mergeConf();
