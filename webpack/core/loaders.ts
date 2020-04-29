import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../typings";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackChain from "webpack-chain";
import options from "../../lib/options/index";
import path from "path";

const cssLoader = (config: WebpackChain, env: NODE_ENV_TYPE) => {
  const cssRegExp = /\.css$/i;
  const cssModuleRegExp = /\.module\.css$/i;
  if (env === NODE_ENV.development) {
    /** style-loader */
    config.module
      .rule("css")
      .test(cssRegExp)
      .exclude.add(cssModuleRegExp)
      .end()
      .use("style-loader")
      .loader(require.resolve("style-loader"))
      .end();
    config.module
      .rule("cssModule")
      .test(cssModuleRegExp)
      .use("style-loader")
      .loader(require.resolve("style-loader"))
      .end();
  } else {
    config.module
      .rule("css")
      .test(cssRegExp)
      .exclude.add(cssModuleRegExp)
      .end()
      .use("mini-css-extract-plugin-loader")
      .loader(require.resolve(MiniCssExtractPlugin.loader))
      .end();
    config.module
      .rule("cssModule")
      .test(cssModuleRegExp)
      .use("mini-css-extract-plugin-loader")
      .loader(require.resolve(MiniCssExtractPlugin.loader))
      .end();
  }

  /** css-loader */
  config.module
    .rule("css")
    .test(cssRegExp)
    .exclude.add(cssModuleRegExp)
    .end()
    .use("css-loader")
    .loader(require.resolve("css-loader"))
    .end();
  config.module
    .rule("cssModule")
    .test(cssModuleRegExp)
    .use("css-loader")
    .loader(require.resolve("css-loader"))
    .options({
      modules: true,
    })
    .end();
  /** postcss-loader */
  config.module
    .rule("css")
    .test(cssRegExp)
    .exclude.add(cssModuleRegExp)
    .end()
    .use("postcss-loader")
    .loader(require.resolve("postcss-loader"))
    .options({
      config: {
        path: path.join(__dirname, "../../postcss.config.js"),
      },
    })
    .end();
  config.module
    .rule("cssModule")
    .test(cssModuleRegExp)
    .use("postcss-loader")
    .loader(require.resolve("postcss-loader"))
    .options({
      config: {
        path: path.join(__dirname, "../../postcss.config.js"),
      },
    })
    .end();
};

const babelLoader = (config: WebpackChain): WebpackChain => {
  config.module
    .rule("eslint")
    .test(/\.(jsx|tsx|js|ts)$/)
    .enforce("pre")
    .include.add(options.includeDir)
    .end()
    .use("eslint")
    .loader(require.resolve("eslint-loader"))
    .options({
      cache: false,
      emitError: true,
      emitWarning: true,
      formatter: require.resolve("eslint-friendly-formatter"),
    });

  config.module
    .rule("compile")
    .test(/\.(jsx|tsx|js|ts)$/)
    .include.add(options.includeDir)
    .end()
    .use("babel")
    .loader(require.resolve("babel-loader"))
    .options({
      presets: [
        require.resolve("@babel/preset-typescript"),
        require.resolve("@babel/preset-env"),
        require.resolve("@babel/preset-react"),
      ],
      plugins: [
        [
          require.resolve("@babel/plugin-proposal-decorators"),
          { legacy: true },
        ],
        [
          require.resolve("@babel/plugin-proposal-class-properties"),
          {
            loose: true,
          },
        ],
        [require.resolve("@babel/plugin-proposal-object-rest-spread")],
        [require.resolve("@babel/plugin-syntax-dynamic-import")],
        [
          require.resolve("babel-plugin-import"),
          {
            libraryName: "antd",
            /**
             *  es export es规范导出；
             * lib exports commonjs规范导出；
             * default lib；
             */
            libraryDirectory: "es",
            /**
             * true less
             * css  css
             */
            style: "css",
          },
        ],
      ],
    })
    .end();
  return config;
};

const urlLoader = (config: WebpackChain): WebpackChain => {
  config.module
    .rule("url-loader")
    .test(/\.jpe?g|png|gif|svg$/)
    .exclude.add(options.excludeDir)
    .end()
    .use("url-loader")
    .loader(require.resolve("url-loader"))
    .options({
      limit: 20 * 1024, // 20k
      //配置公共资源路径
      publicPath: "/assets/img",
      //配置输出路径
      outputPath: "assets/img",
      name: "[name].[hash:8].[ext]",
    })
    .end();
  return config;
};

const fileLoader = (config: WebpackChain): WebpackChain => {
  config.module
    .rule("file-loader")
    .test(/\.(woff|woff2|eot|ttf)$/)
    .exclude.add(options.excludeDir)
    .end()
    .use("file-loader")
    .loader(require.resolve("file-loader"))
    .options({
      //配置公共资源路径
      publicPath: "/assets/font",
      //配置输出路径
      outputPath: "assets/font",
      name: "[name].[hash:8].[ext]",
    })
    .end();
  return config;
};

const loaders = (
  config: WebpackChain,
  ENV: NODE_ENV_TYPE,
  options: Options
) => {
  babelLoader(config);
  cssLoader(config, ENV);
  fileLoader(config);
  urlLoader(config);
  return config;
};

export default loaders;
