export interface BarConfig {
	width: number;
	height: number;
}

const BAR_COUNT = 12;
const HEIGHT_MIN = 22;
const HEIGHT_LEVELS = 9; // heights 22-30, matching the original silhouette

// FNV-1a 32-bit hash: deterministic numeric seed for any string.
function hash(input: string): number {
	let h = 0x811c9dc5;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 0x01000193);
	}
	return h >>> 0;
}

/**
 * Deterministic, title-derived barcode.
 *
 * Rule: bar i reads the title character at index (i + monthRotation), so each
 * bar encodes one character of the card title: its height level is the
 * character code modulo 9 plus a per-bar slice of the month hash, and roughly
 * every third bar is thin. Same title + same month => same barcode; a new
 * month re-scrambles every bar and a different title yields a different
 * pattern. The month is taken in UTC so server and client renders agree.
 */
export function barsForTitle(title: string[]): BarConfig[] {
	const text = title.join(" ").toLowerCase();
	const now = new Date();
	const monthHash = hash(`${now.getUTCFullYear()}-${now.getUTCMonth() + 1}`);
	const rotation = monthHash % BAR_COUNT;

	const bars: BarConfig[] = [];
	for (let i = 0; i < BAR_COUNT; i++) {
		const code =
			text.length === 0 ? 0 : text.charCodeAt((i + rotation) % text.length);
		const monthValue = (monthHash >>> ((i * 3) % 16)) & 7;
		bars.push({
			width: (code + i) % 3 === 0 ? 2 : 3,
			height: HEIGHT_MIN + ((code + monthValue) % HEIGHT_LEVELS),
		});
	}
	return bars;
}

interface BarcodeProps {
	bars: BarConfig[];
}

export function Barcode({ bars }: BarcodeProps) {
	return (
		<div className="barcode" aria-hidden="true">
			{bars.map((bar, i) => (
				<div
					key={i}
					className="barcode-bar"
					style={{ width: bar.width, height: bar.height }}
				/>
			))}
		</div>
	);
}
