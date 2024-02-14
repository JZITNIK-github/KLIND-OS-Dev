import inquirer from "inquirer";
import fetch from "node-fetch";
import Console from "./console.mjs";

export default function branchSelect(callback) {
  return new Promise((resolve, reject) => {
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
            resolve(answers.selectedOption);
          })
          .catch((error) => {
            reject(error);
          });
      });
  });
}
