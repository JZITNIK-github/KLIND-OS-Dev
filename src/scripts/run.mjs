import chalk from "chalk";
import { exec } from "child_process";
import pressAnyKey from "press-any-key";

export default function run() {
  const serverProcess = exec("npm run dev", { cwd: "Server" });
  const clientProcess = exec("npm run dev", { cwd: "Client" });

  clientProcess.on("exit", () => {
    console.log(chalk.cyan("Info:"), "Client byl ukončen! Vypínám server!");
    serverProcess.kill();
    console.log("\n\n" + chalk.green("Konec:") + " KLIND OS byl ukončen!");
    pressAnyKey("Stiskněte libovolnou klávesu pro ukončení...")
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
