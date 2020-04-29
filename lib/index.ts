"use strict";

import command from "./command";
import minimist from "minimist";

const argv: string = minimist(process.argv.slice(2))["_"].join("_");

!(async () => {
  try {
    if (typeof command[argv] === "function") {
      return await command[argv]();
    }
    await command.help();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
