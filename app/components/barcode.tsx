export interface BarConfig {
	width: number;
	height: number;
	tall?: boolean;
}

interface BarcodeProps {
	bars: BarConfig[];
}

interface TicketFooterProps {
	serial: string;
	bars: BarConfig[];
}

export function Barcode({ bars }: BarcodeProps) {
	return (
		<div className="barcode">
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

export function TicketBarcode({ bars }: BarcodeProps) {
	return (
		<div className="ticket-barcode-wrap">
			<div className="ticket-barcode-top-line" />
			<div className="barcode">
				{bars.map((bar, i) => (
					<div
						key={i}
						className={
							bar.tall ? "barcode-bar barcode-bar--tall" : "barcode-bar"
						}
						style={{ width: bar.width, height: bar.height }}
					/>
				))}
			</div>
		</div>
	);
}

export function TicketFooter({ serial, bars }: TicketFooterProps) {
	return (
		<footer className="ticket-footer">
			<span className="ticket-serial">{serial}</span>
			<Barcode bars={bars} />
		</footer>
	);
}
