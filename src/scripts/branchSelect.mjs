import inquirer from "inquirer";
import fetch from "node-fetch";
import Console from "./cli/console.mjs";

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
          Console.info(`Bylo vybárno sestavení '${answers.selectedOption}'`);
          callback(answers.selectedOption);
        })
        .catch((error) => {
          console.error(error);
        });
    });
}
