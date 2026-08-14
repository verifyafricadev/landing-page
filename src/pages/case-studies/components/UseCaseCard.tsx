import { ArrowRightIcon, type Icon } from "@phosphor-icons/react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UseCaseBenefit {
	metric: string;
	label: string;
}

interface UseCaseCardProps {
	category: string;
	icon: Icon;
	color: string;
	description: string;
	useCases: string[];
	benefits: UseCaseBenefit[];
	image: string;
	onClick: () => void;
}

export default function UseCaseCard({
	category,
	description,
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
			className="group relative h-[400px] cursor-pointer gap-0 overflow-hidden border-0 bg-secondary py-0 shadow-none ring-0 transition-shadow duration-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
		>
			<img
				src={image}
				alt={category}
				className="absolute inset-0 h-full w-full object-cover object-top outline outline-1 outline-black/10 transition-transform duration-700 group-hover:scale-110"
			/>

			<div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

			{/* Default — title only */}
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent p-6 transition-opacity duration-200 group-hover:opacity-0">
				<CardTitle className="text-xl font-bold leading-snug text-white">
					{category}
				</CardTitle>
			</div>

			{/* Hover reveal */}
			<div className="absolute inset-0 flex translate-y-2 flex-col justify-end p-6 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100">
				<CardTitle className="text-lg font-bold text-white">
					{category}
				</CardTitle>

				<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white">
					{description}
				</p>

				<div className="mt-4 flex w-full gap-3">
					{benefits.slice(0, 2).map((benefit) => (
						<div
							key={benefit.label}
							className="flex-1 rounded-lg bg-white/10 px-3 py-2"
						>
							<div className="text-sm font-bold tabular-nums text-teal-300">
								{benefit.metric}
							</div>
							<div className="text-xs font-medium text-white">
								{benefit.label}
							</div>
						</div>
					))}
				</div>

				<Button
					className="mt-5 h-auto w-full bg-teal-500 py-2.5 text-white transition-transform hover:bg-teal-400 active:scale-[0.96]"
					tabIndex={-1}
				>
					Explore solution
					<ArrowRightIcon className="size-4" />
				</Button>
			</div>
		</Card>
	);
}
