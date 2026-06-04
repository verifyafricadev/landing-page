import type { FeatureDetail } from "@/mocks/featureDetails";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
				<div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
				{/* Icon */}

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
					<Button
						size="lg"
						asChild
						className="h-auto px-7 py-3.5 bg-teal-500 text-white font-semibold hover:bg-teal-400 cursor-pointer"
					>
						<Link to="/contact">
							Request Demo
							<i className="ri-arrow-right-line" />
						</Link>
					</Button>
					<Button
						variant="outline"
						size="lg"
						asChild
						className="h-auto px-7 py-3.5 border-white/30 bg-transparent text-white font-semibold hover:border-white/60 hover:bg-white/10 hover:text-white cursor-pointer"
					>
						<a
							href="https://dashboard.verifyafrica.io/login"
							target="_blank"
							rel="noopener noreferrer"
						>
							Explore Dashboard
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
