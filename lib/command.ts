import * as WebpackDevServer from "webpack-dev-server";
import * as chalk from "chalk";
import * as webpack from "webpack";

import config from "./config";
import webpackDevelopmentConfig from "../webpack/webpack.dev.config";
import webpackProductionConfig from "../webpack/webpack.pro.config";

class Mommand {
  async serve() {
    const compiler = webpack(webpackDevelopmentConfig);
    return new WebpackDevServer(compiler, {
      ...config.devServer,
      overlay: { errors: true, warnings: true },
    }).listen(config.devServer.port);
  }

  async build() {
    const compiler = webpack(webpackProductionConfig);
    return compiler.run((err: Error, stats: webpack.Stats) => {
      if (err) {
        console.error(err);
      }
      const statsInfo = stats.toString({
        colors: true,
        all: false,
        assets: true,
        chunks: false,
        errors: true,
        hash: true,
        modules: false,
        chunkModules: false,
        chunkGroups: false,
        source: false,
        timings: true,
        version: true,
      });
      console.info(statsInfo);
    });
  }

  async init() {}

  async help() {
    const helpString = `
Usage: xea-react-service <command> [options]

Options:
  ${chalk.green("serve")}     xea-react-service serve
  ${chalk.green("build")}     xea-react-service build
  ${chalk.green("init")}      xea-react-service init

Run xea-react-service for detailed usage of given command.
    `;
    console.info(helpString);
  }
}

export default new Mommand();
