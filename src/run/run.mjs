import chalk from "chalk";
import { exec } from "child_process";
import pressEnter from "../scripts/cli/pressEnter.mjs";
import Console from "../scripts/cli/console.mjs";
import timeout from "../scripts/timeout.mjs";
import express from "express";
import os from "os";
import fs from "fs";
import path from "path";
import morgan from "morgan";

export default async function run() {
  const serverProcess = exec("npm start", { cwd: "Server" });
  serverProcess.stdout.on("data", (data) => {
    process.stdout.write(chalk.blue("[Server]: ") + data);
  });
  serverProcess.stderr.on("data", (data) => {
    process.stderr.write(chalk.red("[Server Error]: ") + data);
  });

  await timeout(500);

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

  const app = express();
  const folderPath = path.join(os.homedir(), "usrfiles");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  morgan.token("clientMessage", () => {
    return chalk.yellow("[FileManagement Server]:");
  });

  const customFormat =
    ":clientMessage :method :url :statusColor :response-time ms - :res[content-length]";

  morgan.token("statusColor", (_, res, __) => {
    const status = res.statusCode;
    let color = "";
    if (status >= 500) {
      color = chalk.red;
    } else if (status >= 400) {
      color = chalk.yellow;
    } else if (status >= 300) {
      color = chalk.cyan;
    } else if (status >= 200) {
      color = chalk.green;
    } else {
      color = chalk.white;
    }
    return color(status);
  });

  app.use(morgan(customFormat));
  app.use(express.static(folderPath));

  app.listen(9999, "127.0.0.1", () => {
    console.log(
      chalk.yellow("[FileManagement Server]: ") +
        "FileManagement Server started!\n",
    );
  });
}
