import chalk from "chalk";

export default class Console {
  static stdin = console.log;

  static success(msg) {
    this.stdin(chalk.green("Success: ") + msg);
  }
  static error(msg) {
    this.stdin(chalk.red("Error: ") + msg);
  }
  static info(msg) {
    this.stdin(chalk.cyan("Info: ") + msg);
  }
  static newline() {
    this.stdin()
  }
}
