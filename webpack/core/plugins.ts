import * as Config from "webpack-chain";
import * as ErrorOverlayWebpackPlugin from "error-overlay-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as Webpackbar from "webpackbar";
import * as path from "path";
import * as webpack from "webpack";

import { NODE_ENV, NODE_ENV_TYPE, Options } from "../../types";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { join } from "../../lib/utils";

const BasePlugins = (config: Config, ENV: NODE_ENV_TYPE, options: Options) => {
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
const DevPlugins = (config: Config, ENV: NODE_ENV_TYPE, options: Options) => {
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
  return config;
};
const ProPlugins = (config: Config, ENV: NODE_ENV_TYPE, options: Options) => {
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

const plugins = (config: Config, ENV: NODE_ENV_TYPE, options: Options) => {
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
