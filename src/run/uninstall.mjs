import Console from "../scripts/cli/console.mjs";
import fs from 'fs-extra';

export default async function uninstall() {
  Console.clear();
  Console.info("Odinstalovávám KLIND OS!");

  const promises = [
    fs.remove("./Client"),
    fs.remove("./Server"),
    fs.remove("./installed.txt"),
  ];

  await Promise.all(promises);

  Console.clear();
  Console.info("KLIND OS byl odinstalován!");
}
