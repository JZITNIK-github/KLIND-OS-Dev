import testNodeJS from "../scripts/test/node.mjs";
import testGit from "../scripts/test/git.mjs";
import branchSelect from "../scripts/branchSelect.mjs";
import download from "./download.mjs";
import install from "./install.mjs";
import pressEnter from "../scripts/pressEnter.mjs";
import chalk from "chalk";
import Console from "../scripts/cli/console.mjs";
import testBackend from "../scripts/test/backend.mjs";
import fs from "fs";

export default function installMain() {
  testNodeJS((response, version) => {
    if (response) {
      Console.success(`NodeJS verze ${version} je nalezen!`);
      testGit((response, version) => {
        if (response) {
          Console.success(`Git verze ${version} je nalezen!`);
          testBackend((backend) => {
            if (backend) {
              Console.success("Připojení k Backend funguje!");
              Console.newline();
              branchSelect((branch) => {
                download(branch).then(() => {
                  install();
                  fs.writeFileSync("installed.txt", "true");
                  Console.newline();
                  Console.newline();
                  Console.success(
                    "KLIND OS byl nainstalován! Spusťte tento script znovu pro spuštění KLIND OS.",
                  );
                  pressEnter();
                });
              });
            } else {
              Console.error("Připojení k backend nefunguje!")
              pressEnter();
            }
          });
        } else {
          Console.error(
            "Git nebyl nalezen! Prosím nainstalujte si Git na: " +
              chalk.cyan("https://git-scm.com"),
          );
          pressEnter();
        }
      });
    } else {
      Console.error(
        "NodeJS nebyl nalezen! Prosím nainstalujte si NodeJS na: " +
          chalk.cyan("https://nodejs.org"),
      );
      pressEnter();
    }
  });
}
