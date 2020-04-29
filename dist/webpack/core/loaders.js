"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const index_1 = __importDefault(require("../../lib/options/index"));
const path_1 = __importDefault(require("path"));
const cssLoader = (config, env) => {
    const cssRegExp = /\.css$/i;
    const cssModuleRegExp = /\.module\.css$/i;
    if (env === typings_1.NODE_ENV.development) {
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
    }
    else {
        config.module
            .rule("css")
            .test(cssRegExp)
            .exclude.add(cssModuleRegExp)
            .end()
            .use("mini-css-extract-plugin-loader")
            .loader(require.resolve(mini_css_extract_plugin_1.default.loader))
            .end();
        config.module
            .rule("cssModule")
            .test(cssModuleRegExp)
            .use("mini-css-extract-plugin-loader")
            .loader(require.resolve(mini_css_extract_plugin_1.default.loader))
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
            path: path_1.default.join(__dirname, "../../postcss.config.js"),
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
            path: path_1.default.join(__dirname, "../../postcss.config.js"),
        },
    })
        .end();
};
const babelLoader = (config) => {
    config.module
        .rule("eslint")
        .test(/\.(jsx|tsx|js|ts)$/)
        .enforce("pre")
        .include.add(index_1.default.includeDir)
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
        .include.add(index_1.default.includeDir)
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
const urlLoader = (config) => {
    config.module
        .rule("url-loader")
        .test(/\.jpe?g|png|gif|svg$/)
        .exclude.add(index_1.default.excludeDir)
        .end()
        .use("url-loader")
        .loader(require.resolve("url-loader"))
        .options({
        limit: 20 * 1024,
        //配置公共资源路径
        publicPath: "/assets/img",
        //配置输出路径
        outputPath: "assets/img",
        name: "[name].[hash:8].[ext]",
    })
        .end();
    return config;
};
const fileLoader = (config) => {
    config.module
        .rule("file-loader")
        .test(/\.(woff|woff2|eot|ttf)$/)
        .exclude.add(index_1.default.excludeDir)
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
const loaders = (config, ENV, options) => {
    babelLoader(config);
    cssLoader(config, ENV);
    fileLoader(config);
    urlLoader(config);
    return config;
};
exports.default = loaders;
