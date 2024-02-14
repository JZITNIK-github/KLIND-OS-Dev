import Console from "../scripts/cli/console.mjs";
import inquirer from "inquirer";
import timeout from "../scripts/timeout.mjs"
import run from "./run.mjs";
import reinstall from "./uninstall.mjs";
import changeBranch from "./changebranch.mjs";

export default async function runSelect() {
  Console.info("KLIND OS je nainstalován v této složce!");

  await timeout(400)

  Console.clear();

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: "Vyberte možnost:",
      choices: [
        "Spustit KLIND OS",
        "Odinstalovat",
        "Změnit sestavení KLIND OS",
        "Exit",
      ],
    },
  ]);

  if (answers.selectedOption == "Exit") {
    process.exit(0);
  }

  if (answers.selectedOption == "Spustit KLIND OS") {
    run();
  }

  if (answers.selectedOption == "Odinstalovat") {
    await reinstall();
  }

  if (answers.selectedOption == "Změnit sestavení KLIND OS") {
    await changeBranch();
  }
}
