import readlineSync from "readline-sync";

export default function pressEnter(msg = "Press enter to continue...") {
  readlineSync.question(msg);
}
