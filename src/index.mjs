import fs from "fs";
import installMain from "./install/main.mjs";
import printLogo from "./scripts/cli/logo.mjs";
import Console from "./scripts/cli/console.mjs";
import runSelect from "./run/select.mjs";

Console.clear();
printLogo();

try {
  var installed = fs.readFileSync("installed.txt", "utf8");
} catch (err) {
  if (err.code == "ENOENT") var installed = "";
}

if (installed.trim() != "true") {
  installMain();
} else {
  runSelect();
}
