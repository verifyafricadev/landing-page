import { cn } from "@/lib/utils";

interface TagListProps {
	items: string[];
	className?: string;
	pillClassName?: string;
}

export function TagList({ items, className, pillClassName }: TagListProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{items.map((item) => (
				<span
					key={item}
					className={cn(
						"inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground",
						pillClassName,
					)}
				>
					{item}
				</span>
			))}
		</div>
	);
}
