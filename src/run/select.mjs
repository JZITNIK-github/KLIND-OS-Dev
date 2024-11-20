import Console from "../scripts/cli/console.mjs";
import inquirer from "inquirer";
import timeout from "../scripts/timeout.mjs"
import run from "./run.mjs";
import uninstall from "./uninstall.mjs";
import changeBranch from "./changebranch.mjs";

export default async function runSelect() {
  Console.info("KLIND OS je is installed in this folder!");

  await timeout(400)

  Console.clear();

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: "Select option:",
      choices: [
        "Start KLIND OS",
        "Uninstall",
        "Edit branch",
        "Exit",
      ],
    },
  ]);

  if (answers.selectedOption == "Exit") {
    process.exit(0);
  }

  if (answers.selectedOption == "Start KLIND OS") {
    run();
  }

  if (answers.selectedOption == "Uninstall") {
    await uninstall();
  }

  if (answers.selectedOption == "Edit branch") {
    await changeBranch();
  }
}
