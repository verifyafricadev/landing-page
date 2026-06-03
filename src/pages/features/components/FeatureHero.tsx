import type { FeatureDetail } from "@/mocks/featureDetails";

interface FeatureHeroProps {
	feature: FeatureDetail;
}

export default function FeatureHero({ feature }: FeatureHeroProps) {
	return (
		<section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
			{/* Background image */}
			<div className="absolute inset-0">
				<img
					src={feature.heroImage}
					alt={feature.title}
					className="w-full h-full object-cover object-top"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
				{/* Icon */}
				<div className="w-14 h-14 flex items-center justify-center bg-teal-500/20 border border-teal-400/30 rounded-xl mb-6 backdrop-blur-sm">
					<i className={`${feature.icon} text-2xl text-teal-400`} />
				</div>

				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight">
					{feature.title}
				</h1>
				<p className="text-lg sm:text-xl md:text-2xl text-teal-300 font-medium mb-6 max-w-2xl">
					{feature.tagline}
				</p>
				<p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed mb-10">
					{feature.description}
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<Link
						to="/contact"
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
					>
						Request a Demo
						<i className="ri-arrow-right-line" />
					</Link>
					<a
						href="https://dashboard.verifyafrica.io/login"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-white/10"
					>
						Explore Dashboard
					</a>
				</div>
			</div>
		</section>
	);
}
