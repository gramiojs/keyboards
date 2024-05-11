import { execSync } from "node:child_process";
import fs from "node:fs";

const version = execSync("npm pkg get version")
	.toString()
	.replace(/"|\n/gi, "");

const jsrConfig = JSON.parse(String(fs.readFileSync("deno.json")));

jsrConfig.version = version;

fs.writeFileSync("deno.json", JSON.stringify(jsrConfig, null, 2));

execSync("bunx @teidesu/slow-types-compiler fix --entry jsr.json");

console.log("Prepared to release on JSR!");
