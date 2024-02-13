import fs from "fs";
import run from "./scripts/run.mjs";
import installMain from "./install/main.mjs";
import chalk from "chalk";
import printLogo from "./scripts/cli/logo.mjs";

printLogo();

try {
  var installed = fs.readFileSync("installed.txt", "utf8");
} catch (err) {
  if (err.code == "ENOENT") var installed = "";
}

if (installed.trim() != "true") {
  installMain();
} else {
  run();
}
