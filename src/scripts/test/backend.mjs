import fetch from "node-fetch";
import { urls } from "../../repos.mjs";

export default function testBackend(callback) {
  fetch(urls.backend + "/status")
    .then((res) => res.json())
    .then((res) => {
      callback(res["backend"] === "running");
    })
    .catch((err) => {
      callback(false, err);
    });
}
