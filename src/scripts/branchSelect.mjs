import inquirer from "inquirer";
import fetch from "node-fetch";
import chalk from "chalk";

export default function branchSelect(callback) {
  fetch("https://backend.jzitnik.dev/klindos/branches/getAll")
    .then((res) => res.json())
    .then((branches) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "selectedOption",
            message: "Vyberte sestavení které chcete použít:",
            choices: branches,
          },
        ])
        .then((answers) => {
          console.log(
            chalk.cyan("Info:") +
              " Byl vybráno sestavení '" +
              answers.selectedOption +
              "'",
          );
          callback(answers.selectedOption);
        })
        .catch((error) => {
          console.error(error);
        });
    });
}
