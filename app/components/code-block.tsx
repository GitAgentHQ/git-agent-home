import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/language-context";

interface CodeBlockProps {
	code: string;
	label?: string;
	copyable?: boolean;
	copyText?: string;
}

export function CodeBlock({ code, label, copyable = false, copyText }: CodeBlockProps) {
	const { t } = useLanguage();
	const [copied, setCopied] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(copyText ?? code);
			setCopied(true);
			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard may be unavailable */
		}
	};

	return (
		<div className="code-block">
			{label && <span className="code-block-label">{label}</span>}
			<div className="code-block-body">
				<code className="code-block-code">{code}</code>
				{copyable && (
					<button
						type="button"
						className="code-block-copy"
						onClick={handleCopy}
						aria-live="polite"
					>
						{copied ? t.copied : t.copy}
					</button>
				)}
			</div>
		</div>
	);
}
