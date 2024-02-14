import fetch from "node-fetch";
import { urls } from "../../repos.mjs";

export default function testBackend() {
  return new Promise((resolve) => {
    fetch(urls.backend + "/status")
      .then((res) => res.json())
      .then((res) => {
        resolve(res["backend"] === "running");
      })
      .catch((err) => {
        resolve(false);
      });
  });
}
