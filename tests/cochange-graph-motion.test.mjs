import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync(
	new URL("../app/components/cochange-graph.tsx", import.meta.url),
	"utf8",
);

test("the co-change graph has one active relationship signal", () => {
	assert.match(component, /key="cochange-signal"/);
	assert.match(component, /className="cochange-relation-data"/);
	assert.equal((component.match(/key=\{`pulse-/g) ?? []).length, 0);
	assert.doesNotMatch(component, /hub-ripple|leaf-wake/);
	assert.doesNotMatch(component, /repeat:\s*Infinity/);
});
