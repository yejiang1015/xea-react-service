// import { Plugin } from "webpack";
import { Compiler, Stats } from "webpack";

import chalk from "chalk";
import os from "os";
import readline from "readline";

interface Options {
  /** 是否清空控制台 */
  clearConsole?: boolean;
  /** 显示的名称 */
  name?: string;
  /** 显示的端口 */
  port?: number;
  /** 屏蔽警告 有警告就不显示结果 */
  shieldWarnings?: boolean;
  /** 屏蔽错误 有错误就不显示结果 */
  shieldErrors?: boolean;
}

export default class XeaCompiledNote {
  plugin: string;
  options: Options;
  constructor(options?: Options) {
    const _defaultOptions = {
      clearConsole: true,
      name: "React Service",
      port: 3000,
      shieldWarnings: true,
      shieldErrors: false,
    };
    this.options = Object.assign(_defaultOptions, options);
    this.plugin = "XeaCompiledNote";
  }

  doneFunc(stats: Stats) {
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();
    /** 有错误并且不屏蔽，则显示错误不显示当前插件内容 */
    if (!this.options.shieldErrors && hasErrors) {
      return;
    }
    /** 有警告并且不屏蔽，则显示警告不显示当前插件内容 */
    if (this.options.shieldWarnings && hasWarnings) {
      return;
    }
    this.outputNote(stats);
  }
  clearConsole() {
    if (process.stdout.isTTY) {
      const blank = "\n".repeat(process.stdout.rows);
      console.log(blank);
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
    }
  }
  outputNote(stats: Stats) {
    const Note = {
      title: chalk.bgGreen(chalk.black(` NOTE `)),
      note: chalk.green(
        `Compiled successfully in ${this.getCompileTime(stats)}ms`
      ),
    };
    const Types = {
      title: chalk.bgGreen(chalk.black(` DONE `)) + chalk.green(` - Types:  `),
      note: chalk.green(`       Compiled ${chalk.red(this.options.name)}`),
    };
    const Local = {
      title: chalk.bgGreen(chalk.black(` DONE `)) + chalk.green(` - Local:  `),
      note: chalk.green(`       http://localhost:${this.options.port}/`),
    };
    const Network = {
      title: chalk.bgGreen(chalk.black(` DONE `)) + chalk.green(` - Network:`),
      note: chalk.green(
        `       http://${this.getAddress()}:${this.options.port}/`
      ),
    };
    if (this.options.clearConsole) {
      this.clearConsole();
    }
    console.log(Note.title, Note.note);
    console.log("\r\n");
    console.log(Types.title, Types.note);
    console.log(Local.title, Local.note);
    console.log(Network.title, Network.note);
    console.log("\r\n");
  }
  isMultiStats(stats) {
    return stats.stats;
  }
  getAddress() {
    const interfaces = os.networkInterfaces();
    let address = "127.0.0.1";
    for (let devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          return (address = alias.address);
        }
      }
    }
    return address;
  }
  getCompileTime(stats) {
    if (this.isMultiStats(stats)) {
      return stats.stats.reduce(
        (time: number, stats: Stats) =>
          Math.max(time, this.getCompileTime(stats)),
        0
      );
    }
    return stats.endTime - stats.startTime;
  }

  apply(compiler: Compiler) {
    if (compiler.hooks) {
      compiler.hooks.done.tap(this.plugin, (stats: Stats) =>
        this.doneFunc(stats)
      );
    } else {
      compiler.plugin("done", (stats: Stats) => this.doneFunc(stats));
    }
  }
}
