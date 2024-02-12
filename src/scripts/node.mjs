import { exec } from "child_process";

export default function testNodeJS(callback) {
  exec("node -v", (error, stdout, stderr) => {
    if (error) {
      callback(false);
    } else {
      callback(true, stdout.trim());
    }
  });
}
