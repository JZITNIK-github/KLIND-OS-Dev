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
      "Node.js wasn't found! Please install Node.js here: " +
        chalk.cyan("https://nodejs.org"),
    );
    pressEnter();
    return;
  }
  Console.success(`Node.js version ${nodejsVersion} was found!`);

  const [gitInstalled, gitVersion] = await testGit();
  if (!gitInstalled) {
    Console.error(
      "Git wasn't found! Please install Git here: " +
        chalk.cyan("https://git-scm.com"),
    );
    pressEnter();
    return;
  }
  Console.success(`Git version ${gitVersion} was found!`);

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
    "KLIND OS has been installed! Run this script again to start KLIND OS.",
  );
}
