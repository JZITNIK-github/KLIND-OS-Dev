import { exec } from "child_process";

export default function testGit(callback) {
  exec("git --version", (error, stdout, stderr) => {
    if (error) {
      callback(false);
    } else {
      callback(true, stdout.trim());
    }
  });
}
