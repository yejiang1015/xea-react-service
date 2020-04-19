#!/usr/bin/env node
"use strict";
const path = require("path");
require("ts-node").register({
  preferTsExts: true,
  compilerHost: true,
  project: path.join(__dirname, "../tsconfig.json"),
});
require("../lib");
