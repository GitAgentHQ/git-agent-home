import type { I18nText } from "../data/types";
import { useLanguage } from "../contexts/language-context";

interface ComparisonRow {
	feature: I18nText;
	gitAgent: string;
	competitor: string;
}

interface ComparisonTableProps {
	rows: ComparisonRow[];
	competitorName: string;
	language: "en" | "zh";
}

function Cell({
	value,
	label,
	yesText,
	noText,
}: {
	value: string;
	label: string;
	yesText: string;
	noText: string;
}) {
	if (value === "yes") {
		return (
			<span className="comparison-cell comparison-cell--yes">
				<span className="comparison-metric-label">
					{label} — {yesText}
				</span>
				<span aria-hidden="true">&#10003;</span>
			</span>
		);
	}
	if (value === "no") {
		return (
			<span className="comparison-cell comparison-cell--no">
				<span className="comparison-metric-label">
					{label} — {noText}
				</span>
				<span aria-hidden="true">&#8212;</span>
			</span>
		);
	}
	return (
		<span className="comparison-cell">
			<span className="comparison-metric-label">{label}</span>
			{value}
		</span>
	);
}

export function ComparisonTable({ rows, competitorName, language }: ComparisonTableProps) {
	const { t } = useLanguage();

	return (
		<table className="comparison-table">
			<thead>
				<tr className="comparison-header">
					<th scope="col" className="comparison-header-cell">
						{t.pseoComparisonFeature}
					</th>
					<th scope="col" className="comparison-header-cell comparison-header-cell--right">
						git-agent
					</th>
					<th scope="col" className="comparison-header-cell comparison-header-cell--right">
						{competitorName}
					</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row, i) => (
					<tr key={i} className="comparison-row">
						<th scope="row" className="comparison-feature">
							{row.feature[language]}
						</th>
						<td className="comparison-metric">
							<Cell
								value={row.gitAgent}
								label="git-agent"
								yesText={t.pseoComparisonYes}
								noText={t.pseoComparisonNo}
							/>
						</td>
						<td className="comparison-metric">
							<Cell
								value={row.competitor}
								label={competitorName}
								yesText={t.pseoComparisonYes}
								noText={t.pseoComparisonNo}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
