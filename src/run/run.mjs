import chalk from "chalk";
import { exec } from "child_process";
import pressEnter from "../scripts/cli/pressEnter.mjs";
import Console from "../scripts/cli/console.mjs";

export default function run() {
  const serverProcess = exec("npm run dev", { cwd: "Server" });
  const clientProcess = exec("npm run dev", { cwd: "Client" });

  clientProcess.on("exit", () => {
    Console.info("Client byl ukončen! Vypínám server!");
    serverProcess.kill();
    Console.newline();
    Console.info("KLIND OS byl ukončen!");
    pressEnter();
    process.exit(0);
  });

  serverProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.blue("[Server]: ") + data);
  });

  clientProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.green("[Client]: ") + data);
  });

  serverProcess.stderr.on("data", (data) => {
    process.stderr.write(chalk.red("[Server Error]: ") + data);
  });

  clientProcess.stderr.on("data", (data) => {
    process.stderr.write(chalk.red("[Client Error]: ") + data);
  });
}
