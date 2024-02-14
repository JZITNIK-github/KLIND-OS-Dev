import { exec } from "child_process";

export default function testGit() {
  return new Promise((resolve) => {
    exec("git --version", (error, stdout) => {
      if (error) {
        resolve([false]);
      } else {
        resolve([true, stdout.trim()]);
      }
    });
  });
}
