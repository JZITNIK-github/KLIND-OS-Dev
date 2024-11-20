import chalk from "chalk";
import { exec } from "child_process";
import pressEnter from "../scripts/cli/pressEnter.mjs";
import Console from "../scripts/cli/console.mjs";
import timeout from "../scripts/timeout.mjs";
import os from "os";
import path from "path";
import startCDN from "./startcdn.mjs";

export default async function run() {
  // Server
  const serverProcess = exec("npm start", { cwd: "Server" });
  serverProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.blue("[Server]: ") + data);
  });
  serverProcess.stderr.on("data", (data) => {
    process.stderr.write(chalk.red("[Server Error]: ") + data);
  });

  await timeout(500);

  // Client
  const clientProcess = exec("npm run dev", { cwd: "Client" });
  clientProcess.on("exit", () => {
    Console.info("Client ended! Turning off server!");
    serverProcess.kill();
    Console.newline();
    Console.info("KLIND OS was ended!");
    pressEnter();
    process.exit(0);
  });

  clientProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.green("[Client]: ") + data);
  });

  clientProcess.stderr.on("data", (data) => {
    process.stderr.write(chalk.red("[Client Error]: ") + data);
  });

  // Usrfiles server
  startCDN(
    path.join(os.homedir(), "usrfiles"),
    "FileManager Server",
    9999,
    chalk.yellow,
  );

  // Appdata server
  startCDN(
    path.join(os.homedir(), "appdata"),
    "AppData Server",
    9998,
    chalk.cyan,
  );
}
