import { exec } from "child_process";

export default function testNodeJS() {
  return new Promise((resolve) => {
    exec("node -v", (error, stdout) => {
      if (error) {
        resolve([false]);
      } else {
        resolve([true, stdout.trim()]);
      }
    });
  });
}
