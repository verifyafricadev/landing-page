import { Link } from "react-router-dom";
import { featureDetails } from "@/mocks/featureDetails";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeatureOtherFeaturesProps {
	currentSlug: string;
}

export default function FeatureOtherFeatures({
	currentSlug,
}: FeatureOtherFeaturesProps) {
	const others = featureDetails
		.filter((f) => f.slug !== currentSlug)
		.slice(0, 3);
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
		threshold: 0.1,
	});

	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={headerRef}
					className={`text-center mb-12 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">
						Explore more features
					</h2>
					<p className="text-base text-gray-600">
						VerifyAfrica is a complete compliance platform — not just one
						feature.
					</p>
				</div>

				<div
					ref={gridRef}
					className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6"
				>
					{others.map((f, i) => (
						<Link
							key={f.slug}
							to={`/features/${f.slug}`}
							className="group flex flex-col p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-300 cursor-pointer"
							style={{
								opacity: gridVisible ? 1 : 0,
								transform: gridVisible ? "translateY(0)" : "translateY(20px)",
								transition: `all 0.5s ease-out ${i * 100}ms`,
							}}
						>
							<div className="w-11 h-11 flex items-center justify-center bg-teal-100 rounded-lg mb-4 group-hover:bg-teal-200 transition-colors duration-300">
								<i className={`${f.icon} text-xl text-teal-600`} />
							</div>
							<h3 className="text-base font-bold text-secondary mb-2 group-hover:text-teal-700 transition-colors duration-300">
								{f.title}
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed flex-1">
								{f.tagline}
							</p>
							<div className="mt-4 flex items-center gap-1 text-teal-600 text-sm font-medium">
								Learn more
								<i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
