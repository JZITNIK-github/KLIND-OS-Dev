import readlineSync from "readline-sync";

export default function pressEnter(msg = "Stiskněte Enter pro ukončení...") {
  readlineSync.question(msg);
}
