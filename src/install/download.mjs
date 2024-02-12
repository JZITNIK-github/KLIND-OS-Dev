import chalk from "chalk";
import repositories from "../repos.mjs";
import {exec} from "child_process"
import { promisify } from "util";

const execPromise = promisify(exec);
 

export default async function download(branch) {
  console.log("\n" + chalk.cyan("Info:") + " Začnínám stahovat KLIND OS.");

  await execPromise(`git clone ${repositories.client} --branch ${branch} Client`);
  console.log(chalk.green("Success:") + " KLIND OS Client byl úspěšně stažen!");

  await execPromise(`git clone ${repositories.server} --branch ${branch} Server`);
  console.log(chalk.green("Success:") + " KLIND OS Server byl úspěšně stažen!");
}
