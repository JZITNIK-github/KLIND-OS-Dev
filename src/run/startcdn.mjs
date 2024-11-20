import express from "express";
import fs from "fs";
import morgan from "morgan";
import chalk from "chalk";

export default function startCDN(folderPath, name, port, color = chalk.yellow) {
  const app = express();

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  morgan.token("clientMessage", () => {
    return color(`[${name}]:`);
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

  app.listen(port, "127.0.0.1", () => {
    console.log(
      color(`[${name}]: `) + "FileManagement Server started!\n",
    );
  });
}
