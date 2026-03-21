import type { ReactNode } from "react";

/**
 * Renders prose with `backtick` spans as monospace inline code.
 */
export function renderInlineDocText(text: string): ReactNode {
	if (!text.includes("`")) {
		return text;
	}

	const nodes: ReactNode[] = [];
	const re = /`([^`]+)`/g;
	let last = 0;
	let m: RegExpExecArray | null;
	let key = 0;
	while ((m = re.exec(text)) !== null) {
		if (m.index > last) {
			nodes.push(text.slice(last, m.index));
		}
		nodes.push(
			<code className="inline-code" key={key++}>
				{m[1]}
			</code>,
		);
		last = re.lastIndex;
	}
	if (last < text.length) {
		nodes.push(text.slice(last));
	}

	return nodes.length === 1 ? nodes[0] : <>{nodes}</>;
}
