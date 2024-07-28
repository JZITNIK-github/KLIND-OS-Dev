import inquirer from "inquirer";
import fetch from "node-fetch";
import Console from "./console.mjs";

export default function branchSelect() {
  return new Promise((resolve, reject) => {
    fetch("https://klindos.jzitnik.dev/api/branches")
      .then((res) => res.json())
      .then((branches) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "selectedOption",
              message: "Select branch that you want to use:",
              choices: branches,
            },
          ])
          .then((answers) => {
            Console.info(`'${answers.selectedOption}' was selected.`);
            resolve(answers.selectedOption);
          })
          .catch((error) => {
            reject(error);
          });
      });
  });
}
