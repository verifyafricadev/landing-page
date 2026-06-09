import type { CSSProperties } from "react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
	label?: string;
	className?: string;
	style?: CSSProperties;
}

export function ScrollIndicator({
	label = "Scroll",
	className,
	style,
}: ScrollIndicatorProps) {
	return (
		<div
			className={cn(
				"relative z-10 flex flex-col items-center gap-2 pb-10 text-xs uppercase tracking-widest text-secondary/40",
				className,
			)}
			style={style}
		>
			<span>{label}</span>
			<ArrowDownIcon className="text-lg animate-bounce" />
		</div>
	);
}
