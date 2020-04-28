import { Plugin } from "webpack";
declare namespace XeaCompiledNote {
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
}

declare class XeaCompiledNote extends Plugin {
  constructor(options?: XeaCompiledNote.Options);
}

export = XeaCompiledNote;
