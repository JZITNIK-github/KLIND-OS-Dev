import fs from "fs";
import download from "./install/download.mjs";
import install from "./install/install.mjs";
import testNodeJS from "./scripts/node.mjs";
import testGit from "./scripts/git.mjs";
import chalk from "chalk";
import run from "./scripts/run.mjs";
import branchSelect from "./scripts/branchSelect.mjs";
import pressAnyKey from "press-any-key";

console.log("-----------------------------");
console.log(chalk.cyan("KLIND OS Developers installer"));
console.log("-----------------------------\n");

try {
  var installed = fs.readFileSync("installed.txt", "utf8");
} catch (err) {
  if (err.code == "ENOENT") var installed = "";
}

if (installed.trim() != "true") {
  testNodeJS((response, version) => {
    if (response) {
      console.log(
        chalk.green("Success:") + ` NodeJS verze ${version} je nalezen!`,
      );
      testGit((response, version) => {
        if (response) {
          console.log(
            chalk.green("Success:") + ` Git verze ${version} je nalezen!`,
          );
          branchSelect((branch) => {
            download(branch).then(() => {
              install();
              fs.writeFileSync("installed.txt", "true");
              console.log(
                "\n\n" +
                  chalk.green("Success:") +
                  " KLIND OS byl nainstalován! Spusťte tento script znovu pro spuštění KLIND OS.",
              );
              pressAnyKey("Stiskněte libovolnou klávesu pro ukončení...");
            });
          });
        } else {
          console.log(
            chalk.red("Error:") +
              " Git nebyl nalezen! Prosím nainstalujte si NodeJS na: " +
              chalk.cyan("https://git-scm.com"),
          );
          pressAnyKey("Stiskněte libovolnou klávesu pro ukončení...");
        }
      });
    } else {
      console.log(
        chalk.red("Error:") +
          " NodeJS nebyl nalezen! Prosím nainstalujte si NodeJS na: " +
          chalk.cyan("https://nodejs.org"),
      );
      pressAnyKey("Stiskněte libovolnou klávesu pro ukončení...");
    }
  });
} else {
  run();
}
