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

function Cell({ value }: { value: string }) {
	if (value === "yes") {
		return <span className="comparison-cell comparison-cell--yes">&#10003;</span>;
	}
	if (value === "no") {
		return <span className="comparison-cell comparison-cell--no">&#8212;</span>;
	}
	return <span className="comparison-cell">{value}</span>;
}

export function ComparisonTable({ rows, competitorName, language }: ComparisonTableProps) {
	const { t } = useLanguage();

	return (
		<div className="comparison-table">
			<div className="comparison-header">
				<span className="comparison-header-cell">{t.pseoComparisonFeature}</span>
				<span className="comparison-header-cell comparison-header-cell--right">git-agent</span>
				<span className="comparison-header-cell comparison-header-cell--right">{competitorName}</span>
			</div>
			{rows.map((row, i) => (
				<div key={i} className="comparison-row">
					<span className="comparison-feature">{row.feature[language]}</span>
					<div className="comparison-metric">
						<span className="comparison-metric-label">git-agent</span>
						<Cell value={row.gitAgent} />
					</div>
					<div className="comparison-metric">
						<span className="comparison-metric-label">{competitorName}</span>
						<Cell value={row.competitor} />
					</div>
				</div>
			))}
		</div>
	);
}
