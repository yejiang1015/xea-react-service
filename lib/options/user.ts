import { Options } from "../../typings";
import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "xea.config.ts");
require("ts-node").register({
  project: path.join(__dirname, "../../../tsconfig.json"),
});

let UserOptions: Options = {};

if (fs.existsSync(configPath)) {
  const UserOptionsFunc = require(path.join(process.cwd(), "xea.config.ts"));
  UserOptions = UserOptionsFunc.default
    ? UserOptionsFunc.default()
    : UserOptionsFunc();
}

export default UserOptions;
