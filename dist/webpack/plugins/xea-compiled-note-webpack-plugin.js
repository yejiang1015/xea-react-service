"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const os_1 = __importDefault(require("os"));
const readline_1 = __importDefault(require("readline"));
class XeaCompiledNote {
    constructor(options) {
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
    doneFunc(stats) {
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
            readline_1.default.cursorTo(process.stdout, 0, 0);
            readline_1.default.clearScreenDown(process.stdout);
        }
    }
    outputNote(stats) {
        const Note = {
            title: chalk_1.default.bgGreen(chalk_1.default.black(` NOTE `)),
            note: chalk_1.default.green(`Compiled successfully in ${this.getCompileTime(stats)}ms`),
        };
        const Types = {
            title: chalk_1.default.bgGreen(chalk_1.default.black(` DONE `)) + chalk_1.default.green(` - Types:  `),
            note: chalk_1.default.green(`       Compiled ${chalk_1.default.red(this.options.name)}`),
        };
        const Local = {
            title: chalk_1.default.bgGreen(chalk_1.default.black(` DONE `)) + chalk_1.default.green(` - Local:  `),
            note: chalk_1.default.green(`       http://localhost:${this.options.port}/`),
        };
        const Network = {
            title: chalk_1.default.bgGreen(chalk_1.default.black(` DONE `)) + chalk_1.default.green(` - Network:`),
            note: chalk_1.default.green(`       http://${this.getAddress()}:${this.options.port}/`),
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
        const interfaces = os_1.default.networkInterfaces();
        let address = "127.0.0.1";
        for (let devName in interfaces) {
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === "IPv4" &&
                    alias.address !== "127.0.0.1" &&
                    !alias.internal) {
                    return (address = alias.address);
                }
            }
        }
        return address;
    }
    getCompileTime(stats) {
        if (this.isMultiStats(stats)) {
            return stats.stats.reduce((time, stats) => Math.max(time, this.getCompileTime(stats)), 0);
        }
        return stats.endTime - stats.startTime;
    }
    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.done.tap(this.plugin, (stats) => this.doneFunc(stats));
        }
        else {
            compiler.plugin("done", (stats) => this.doneFunc(stats));
        }
    }
}
exports.default = XeaCompiledNote;
