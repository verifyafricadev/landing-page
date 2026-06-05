import { ArrowRight, type LucideIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UseCaseBenefit {
	metric: string;
	label: string;
}

interface UseCaseCardProps {
	category: string;
	icon: LucideIcon;
	color: string;
	description: string;
	useCases: string[];
	benefits: UseCaseBenefit[];
	image: string;
	onClick: () => void;
}

export default function UseCaseCard({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardProps) {
	return (
		<Card
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			className="group h-full cursor-pointer gap-0 overflow-hidden border bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:shadow-lg"
		>
			<div className="relative h-44 overflow-hidden">
				<img
					src={image}
					alt={category}
					className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

				<div
					className={cn(
						"absolute top-4 left-4 flex size-11 items-center justify-center rounded-xl bg-linear-to-br shadow-lg",
						color,
					)}
				>
					<Icon className="size-5 text-white" />
				</div>

				<div className="absolute right-4 bottom-4 left-4">
					<CardTitle className="text-lg font-bold text-white leading-snug">
						{category}
					</CardTitle>
				</div>
			</div>

			<CardHeader className="px-5 pt-5 pb-0">
				<CardDescription className="line-clamp-2 text-sm leading-relaxed text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex-1 px-5 pt-4 pb-0">
				<div className="flex flex-wrap gap-2">
					{useCases.slice(0, 3).map((useCase) => (
						<span
							key={useCase}
							className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
						>
							{useCase}
						</span>
					))}
					{useCases.length > 3 && (
						<span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-600">
							+{useCases.length - 3} more
						</span>
					)}
				</div>

				<div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
					{benefits.slice(0, 3).map((benefit) => (
						<div
							key={benefit.label}
							className="text-center"
						>
							<div className="text-base font-bold text-teal-600 sm:text-lg">
								{benefit.metric}
							</div>
							<div className="truncate text-[11px] text-gray-500 sm:text-xs">
								{benefit.label}
							</div>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="mt-auto border-0 bg-transparent px-5 pt-4 pb-5">
				<Button
					variant="link"
					className="h-auto w-full justify-between p-0 text-sm font-medium text-teal-600 hover:text-teal-700"
					tabIndex={-1}
				>
					View Details
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</CardFooter>
		</Card>
	);
}
