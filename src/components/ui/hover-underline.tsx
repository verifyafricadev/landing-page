import { cn } from "@/lib/utils";

interface HoverUnderlineProps {
	active?: boolean;
	className?: string;
}

export function HoverUnderline({ active = false, className }: HoverUnderlineProps) {
	return (
		<span
			aria-hidden
			className={cn(
				"absolute -bottom-1 left-0 h-0.5 w-0 bg-teal-500 transition-all duration-300 group-hover:w-full",
				active && "w-full",
				className,
			)}
		/>
	);
}
