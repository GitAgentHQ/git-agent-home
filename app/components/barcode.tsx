export interface BarConfig {
	width: number;
	height: number;
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
