interface CodeBlockProps {
	code: string;
	label?: string;
}

export function CodeBlock({ code, label }: CodeBlockProps) {
	return (
		<div className="code-block">
			{label && <span className="code-block-label">{label}</span>}
			<div className="command-usage" style={{ margin: 0 }}>
				<code>{code}</code>
			</div>
		</div>
	);
}
