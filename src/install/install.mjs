import { execSync } from "child_process";
import Console from "../scripts/cli/console.mjs";

export default function install() {
  Console.newline();
  Console.info("Začínám instalovat KLIND OS.")
  try {
    execSync("npm install", { cwd: "Client" });
    Console.success("KLIND OS Client byl úspěšně nainstalován!")
  } catch (error) {
    Console.error("KLIND OS Client se nepovedlo nainstalovat!")
  }

  try {
    execSync("npm install", { cwd: "Server" });
    Console.success("KLIND OS Server byl úspěšně nainstalován!")
  } catch (error) {
    Console.error("KLIND OS Server se nepovedlo nainstalovat!")
  }
}
