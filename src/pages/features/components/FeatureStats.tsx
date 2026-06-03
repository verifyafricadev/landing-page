import type { FeatureDetail } from "@/mocks/featureDetails";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeatureStatsProps {
	feature: FeatureDetail;
}

export default function FeatureStats({ feature }: FeatureStatsProps) {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<section className="py-12 md:py-16 bg-secondary">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={ref}
					className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
				>
					{feature.stats.map((stat, i) => (
						<div
							key={i}
							className="text-center"
							style={{
								opacity: isVisible ? 1 : 0,
								transform: isVisible ? "translateY(0)" : "translateY(20px)",
								transition: `all 0.5s ease-out ${i * 100}ms`,
							}}
						>
							<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400 mb-2">
								{stat.value}
							</div>
							<div className="text-sm sm:text-base text-white/60 font-medium">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
