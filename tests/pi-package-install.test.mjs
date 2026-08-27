import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const installGuide = readFileSync(
	new URL("../public/install.md", import.meta.url),
	"utf8",
);
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const readmeZh = readFileSync(new URL("../README.zh-CN.md", import.meta.url), "utf8");

test("installation guide documents the current native Pi package", () => {
	assert.match(installGuide, /pi install npm:pi-git-agent/);
	assert.match(installGuide, /pi-git-agent@0\.7\.3/);
	assert.match(installGuide, /native `\/git-agent` menu/);
	assert.match(installGuide, /package-root `index\.ts` entrypoint/);
	assert.match(installGuide, /git-agent binary/);
});

test("project readmes link the native Pi package", () => {
	assert.match(readme, /\[pi-git-agent\]\(https:\/\/github\.com\/GitAgentHQ\/pi-git-agent\)/);
	assert.match(readme, /Native Pi package/);
	assert.match(readmeZh, /\[pi-git-agent\]\(https:\/\/github\.com\/GitAgentHQ\/pi-git-agent\)/);
	assert.match(readmeZh, /Pi 原生包/);
});
