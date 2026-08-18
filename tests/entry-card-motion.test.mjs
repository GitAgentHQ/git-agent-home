import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homeView = readFileSync(
	new URL("../app/components/home-view.tsx", import.meta.url),
	"utf8",
);
const patterns = readFileSync(
	new URL("../app/components/pattern.tsx", import.meta.url),
	"utf8",
);
const styles = readFileSync(new URL("../app/app.css", import.meta.url), "utf8");

const commandMotions = {
	init: "entry-init-bloom",
	commit: "entry-commit-rows",
	related: "entry-related-wave",
	status: "entry-status-pulse",
	skills: "entry-skills-columns",
	config: "entry-config-snap",
};

const commandShapes = {
	init: "seed",
	commit: "ledger",
	related: "diamond",
	status: "capsule",
	skills: "hexagon",
	config: "chamfer",
};

test("narrow entry card titles leave room for descending glyphs", () => {
	assert.match(styles, /\.entry-card-title\s*\{[\s\S]*?line-height:\s*1\.15;/);
});

test("each command card owns a distinct finite dot-only silhouette and motion", () => {
	assert.equal(new Set(Object.values(commandMotions)).size, 6);
	assert.equal(new Set(Object.values(commandShapes)).size, 6);

	for (const [motion, animation] of Object.entries(commandMotions)) {
		const shape = commandShapes[motion];
		assert.match(homeView, new RegExp(`<DotsPattern motion=\"${motion}\" shape=\"${shape}\"`));
		assert.match(patterns, new RegExp(`\"${motion}\"`));
		assert.match(
			styles,
			new RegExp(`data-entry-motion=\"${motion}\"[\\s\\S]{0,700}animation:\\s*${animation}`),
		);
		assert.match(styles, new RegExp(`pattern-dots--${shape}[\\s\\S]{0,260}clip-path:`));
	}

	assert.match(patterns, /data-pattern-motion/);
	assert.match(patterns, /EntryPatternShape/);
	assert.match(patterns, /className="pattern-dot-group/);
	assert.match(homeView, /whileFocus=\{reducedMotion \? undefined : "hover"\}/);
	assert.match(styles, /prefers-reduced-motion:\s*no-preference/);
	assert.doesNotMatch(patterns, /PatternEffect|pattern-effect|<path|<line|<rect/);
	assert.doesNotMatch(
		styles,
		/pattern-(?:init-ring|commit-feed|related-route|status-scan|skills-row|config-guides)/,
	);
	assert.doesNotMatch(patterns, /feTurbulence/);
	assert.doesNotMatch(patterns, /repeat:\s*Infinity/);
});
