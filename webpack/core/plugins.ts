import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../typings";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ErrorOverlayWebpackPlugin from "error-overlay-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import WebpackChain from "webpack-chain";
import Webpackbar from "webpackbar";
import XeaCompiledNoteWebpackPlugin from "../plugins/xea-compiled-note-webpack-plugin";
import { join } from "../../lib/utils";
import path from "path";
import webpack from "webpack";

const BasePlugins = (
  config: WebpackChain,
  ENV: NODE_ENV_TYPE,
  options: Options
) => {
  config
    .plugin("html")
    .use(HtmlWebpackPlugin, [
      {
        title: options.htmlTitle,
        filename: "index.html",
        template: join(__dirname, "../../public/index.html"),
        minify: {
          /** 移除HTML中的注释 */
          removeComments: true,
          /** 删除空白符与换行符 */
          collapseWhitespace: true,
          /** 压缩内联css */
          minifyCSS: true,
        },
      },
    ])
    .end();
  config
    .plugin("Webpackbar")
    .use(
      new Webpackbar({
        name: "React Service",
      })
    )
    .end();
  return config;
};
const DevPlugins = (
  config: WebpackChain,
  ENV: NODE_ENV_TYPE,
  options: Options
) => {
  config
    .plugin("HotModuleReplacementPlugin")
    .use(new webpack.HotModuleReplacementPlugin())
    .end();
  config
    .plugin("NoEmitOnErrorsPlugin")
    .use(new webpack.NoEmitOnErrorsPlugin())
    .end();
  config
    .plugin("NamedModulesPlugin")
    .use(new webpack.NamedModulesPlugin())
    .end();
  config
    .plugin("ErrorOverlayWebpackPlugin")
    .use(new ErrorOverlayWebpackPlugin())
    .end();
  config
    .plugin("XeaCompiledNoteWebpackPlugin")
    .use(
      new XeaCompiledNoteWebpackPlugin({
        port: options.devServer.port,
      })
    )
    .end();
  return config;
};
const ProPlugins = (
  config: WebpackChain,
  ENV: NODE_ENV_TYPE,
  options: Options
) => {
  config.plugin("MiniCssExtractPlugin").use(
    new MiniCssExtractPlugin({
      filename: path.join(options.assetsDir, "/css/[name].[hash:8].css"),
    })
  );
  config.plugin("OptimizeCSSAssetsPlugin").use(
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
      canPrint: true, //是否将插件信息打印到控制台
    })
  );
  config.plugin("CleanWebpackPlugin").use(new CleanWebpackPlugin());
  return config;
};

const plugins = (
  config: WebpackChain,
  ENV: NODE_ENV_TYPE,
  options: Options
) => {
  if (ENV === NODE_ENV.development) {
    BasePlugins(config, ENV, options);
    DevPlugins(config, ENV, options);
  } else {
    BasePlugins(config, ENV, options);
    ProPlugins(config, ENV, options);
  }
  return config;
};

export default plugins;
