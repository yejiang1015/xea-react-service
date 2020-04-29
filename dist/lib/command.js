"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("./options/index"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_config_1 = __importDefault(require("../webpack/webpack.dev.config"));
const webpack_pro_config_1 = __importDefault(require("../webpack/webpack.pro.config"));
class Mommand {
    async serve() {
        const compiler = webpack_1.default(webpack_dev_config_1.default);
        return new webpack_dev_server_1.default(compiler, {
            ...index_1.default.devServer,
            overlay: { errors: true, warnings: true },
        }).listen(index_1.default.devServer.port);
    }
    async build() {
        const compiler = webpack_1.default(webpack_pro_config_1.default);
        return compiler.run((err, stats) => {
            if (err) {
                console.error(err);
            }
            const statsInfo = stats.toString({
                colors: true,
                builtAt: true,
                timings: true,
                version: true,
                assets: true,
                errors: true,
                hash: true,
                all: false,
                chunks: false,
                modules: false,
                source: false,
            });
            console.info(statsInfo);
        });
    }
    async help() {
        const helpString = `
Usage: xea-react-service <command> [options]

Options:
  ${chalk_1.default.green("serve")}     xea-react-service serve
  ${chalk_1.default.green("build")}     xea-react-service build

Run xea-react-service for detailed usage of given command.
    `;
        console.info(helpString);
    }
}
exports.default = new Mommand();
