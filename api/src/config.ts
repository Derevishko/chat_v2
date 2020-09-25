import * as fs from "fs";

const config: App.IConfig = JSON.parse(
  fs.readFileSync(__dirname + "/../config.json", "utf8")
);

export default config;
