import { Link } from "react-router-dom";

export interface Feature {
	slug: string;
	icon: string;
	title: string;
	description: string;
}

interface FeatureCardProps {
	feature: Feature;
	index: number;
	isVisible: boolean;
}

export default function FeatureCard({
	feature,
	index,
	isVisible,
}: FeatureCardProps) {
	return (
		<Link
			to={`/features/${feature.slug}`}
			className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100 cursor-pointer relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(17,24,39,0.1)] block"
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible
					? "translateY(0) scale(1)"
					: "translateY(30px) scale(0.95)",
				transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 60}ms`,
			}}
		>
			<div className="relative z-10">
				<div className=" relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-teal-50 rounded-lg mb-2 sm:mb-3 md:mb-4 group-hover:bg-teal-100 transition-colors duration-300">
					<i
						className={`icon-inner ${feature.icon} text-lg sm:text-xl md:text-2xl text-teal-600 relative z-10`}
					></i>
				</div>
				<h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-teal-700 transition-colors duration-300">
					{feature.title}
				</h3>
				<p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed">
					{feature.description}
				</p>
			</div>

			<div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-100/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="absolute bottom-3 right-3 w-7 h-7 flex items-center justify-center bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-20">
				<i className="ri-arrow-right-up-line text-white text-sm" />
			</div>
		</Link>
	);
}
