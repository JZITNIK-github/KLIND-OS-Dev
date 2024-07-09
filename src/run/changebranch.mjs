import branchSelect from "../scripts/cli/branchSelect.mjs";
import Console from "../scripts/cli/console.mjs";
import pressEnter from "../scripts/cli/pressEnter.mjs";
import testGit from "../scripts/test/git.mjs";
import testNodeJS from "../scripts/test/node.mjs";
import download from "../install/download.mjs";
import install from "../install/install.mjs";
import timeout from "../scripts/timeout.mjs";
import fs from "fs-extra";

export default async function changeBranch() {
  Console.clear();

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

  const promises = [
    fs.remove("./Client"),
    fs.remove("./Server"),
  ];
  await Promise.all(promises);

  await download(branch);

  await timeout(400);
  Console.clear();
  install();

  await timeout(500);

  Console.clear();
  Console.success("Branch byl upraven!");
}
