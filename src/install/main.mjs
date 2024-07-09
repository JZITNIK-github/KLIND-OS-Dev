import testNodeJS from "../scripts/test/node.mjs";
import testGit from "../scripts/test/git.mjs";
import branchSelect from "../scripts/cli/branchSelect.mjs";
import download from "./download.mjs";
import install from "./install.mjs";
import pressEnter from "../scripts/cli/pressEnter.mjs";
import chalk from "chalk";
import Console from "../scripts/cli/console.mjs";
import fs from "fs";
import timeout from "../scripts/timeout.mjs";

export default async function installMain() {
  const [nodejsInstalled, nodejsVersion] = await testNodeJS();
  if (!nodejsInstalled) {
    Console.error(
      "NodeJS nebyl nalezen! Prosím nainstalujte si NodeJS na: " +
        chalk.cyan("https://nodejs.org"),
    );
    pressEnter();
    return;
  }
  Console.success(`NodeJS verze ${nodejsVersion} je nalezen!`);

  const [gitInstalled, gitVersion] = await testGit();
  if (!gitInstalled) {
    Console.error(
      "Git nebyl nalezen! Prosím nainstalujte si Git na: " +
        chalk.cyan("https://git-scm.com"),
    );
    pressEnter();
    return;
  }
  Console.success(`Git verze ${gitVersion} je nalezen!`);

  await timeout(1000);
  Console.clear();

  const branch = await branchSelect();

  await timeout(400);

  Console.clear();

  await download(branch);

  await timeout(400);
  Console.clear();
  install();

  fs.writeFileSync("installed.txt", "true");

  await timeout(500);

  Console.clear();
  Console.success(
    "KLIND OS byl nainstalován! Spusťte tento script znovu pro spuštění KLIND OS.",
  );
}
