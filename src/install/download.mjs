import { repositories } from "../repos.mjs";
import { exec } from "child_process";
import { promisify } from "util";
import Console from "../scripts/cli/console.mjs";

const execPromise = promisify(exec);

export default async function download(branch) {
  Console.info("Starting to install KLIND OS.");

  await execPromise(
    `git clone ${repositories.client} --branch ${branch} Client`,
  );
  Console.success("KLIND OS Client was downloaded!");

  await execPromise(
    `git clone ${repositories.server} --branch ${branch} Server`,
  );
  Console.success("KLIND OS Server was downloaded!");
}
