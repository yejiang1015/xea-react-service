"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const error_overlay_webpack_plugin_1 = __importDefault(require("error-overlay-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const webpackbar_1 = __importDefault(require("webpackbar"));
const xea_compiled_note_webpack_plugin_1 = __importDefault(require("../plugins/xea-compiled-note-webpack-plugin"));
const utils_1 = require("../../lib/utils");
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const BasePlugins = (config, ENV, options) => {
    config
        .plugin("html")
        .use(html_webpack_plugin_1.default, [
        {
            title: options.htmlTitle,
            filename: "index.html",
            template: utils_1.join(__dirname, "../../public/index.html"),
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
        .use(new webpackbar_1.default({
        name: "React Service",
    }))
        .end();
    return config;
};
const DevPlugins = (config, ENV, options) => {
    config
        .plugin("HotModuleReplacementPlugin")
        .use(new webpack_1.default.HotModuleReplacementPlugin())
        .end();
    config
        .plugin("NoEmitOnErrorsPlugin")
        .use(new webpack_1.default.NoEmitOnErrorsPlugin())
        .end();
    config
        .plugin("NamedModulesPlugin")
        .use(new webpack_1.default.NamedModulesPlugin())
        .end();
    config
        .plugin("ErrorOverlayWebpackPlugin")
        .use(new error_overlay_webpack_plugin_1.default())
        .end();
    config
        .plugin("XeaCompiledNoteWebpackPlugin")
        .use(new xea_compiled_note_webpack_plugin_1.default({
        port: options.devServer.port,
    }))
        .end();
    return config;
};
const ProPlugins = (config, ENV, options) => {
    config.plugin("MiniCssExtractPlugin").use(new mini_css_extract_plugin_1.default({
        filename: path_1.default.join(options.assetsDir, "/css/[name].[hash:8].css"),
    }));
    config.plugin("OptimizeCSSAssetsPlugin").use(new optimize_css_assets_webpack_plugin_1.default({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
            discardComments: { removeAll: true },
        },
        canPrint: true,
    }));
    config.plugin("CleanWebpackPlugin").use(new clean_webpack_plugin_1.CleanWebpackPlugin());
    return config;
};
const plugins = (config, ENV, options) => {
    if (ENV === typings_1.NODE_ENV.development) {
        BasePlugins(config, ENV, options);
        DevPlugins(config, ENV, options);
    }
    else {
        BasePlugins(config, ENV, options);
        ProPlugins(config, ENV, options);
    }
    return config;
};
exports.default = plugins;
