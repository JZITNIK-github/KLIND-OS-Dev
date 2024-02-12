import { execSync } from "child_process";
import chalk from "chalk";

export default function install() {
  console.log("\n"+chalk.cyan("Info:") + " Začnínám instalovat KLIND OS.");
  try {
    execSync("npm install", { cwd: "Client" });
    console.log(
      chalk.green("Success:") + " KLIND OS Client byl úspěšně nainstalován!",
    );
  } catch (error) {
    console.log(
      chalk.red("Error:") + " KLIND OS Client se nepovedlo nainstalovat!",
    );
  }

  try {
    execSync("npm install", { cwd: "Server" });
    console.log(
      chalk.green("Success:") + " KLIND OS Server byl úspěšně nainstalován!",
    );
  } catch (error) {
    console.log(
      chalk.red("Error:") + " KLIND OS Server se nepovedlo nainstalovat!",
    );
  }
}
