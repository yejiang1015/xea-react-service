import WebpackDevServer from "webpack-dev-server";
import chalk from "chalk";
import options from "./options/index";
import webpack from "webpack";
import webpackDevelopmentConfig from "../webpack/webpack.dev.config";
import webpackProductionConfig from "../webpack/webpack.pro.config";

class Mommand {
  async serve() {
    const compiler = webpack(webpackDevelopmentConfig);
    return new WebpackDevServer(compiler, {
      ...options.devServer,
      overlay: { errors: true, warnings: true },
    }).listen(options.devServer.port);
  }

  async build() {
    const compiler = webpack(webpackProductionConfig);
    return compiler.run((err: Error, stats: webpack.Stats) => {
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
  ${chalk.green("serve")}     xea-react-service serve
  ${chalk.green("build")}     xea-react-service build

Run xea-react-service for detailed usage of given command.
    `;
    console.info(helpString);
  }
}

export default new Mommand();
