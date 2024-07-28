import { execSync } from "child_process";
import Console from "../scripts/cli/console.mjs";

export default function install() {
  Console.info("Starting to install KLIND OS.")
  try {
    execSync("npm install", { cwd: "Client" });
    Console.success("KLIND OS Client was installed!")
  } catch (error) {
    Console.error("Error while installing KLIND OS Client!")
  }

  try {
    execSync("npm install", { cwd: "Server" });
    Console.success("KLIND OS Server was installed!")
  } catch (error) {
    Console.error("Error while installing KLIND OS Server!")
  }
}
