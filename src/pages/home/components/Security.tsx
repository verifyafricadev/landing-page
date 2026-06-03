import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function Security() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	const compliance = [
		{ name: "NDPR", description: "Nigeria Data Protection Regulation" },
		{ name: "POPIA", description: "Protection of Personal Information Act" },
		{ name: "GDPR", description: "General Data Protection Regulation" },
	];

	const features = [
		"Encryption in transit and at rest",
		"Access governance and logging",
		"Regular security audits",
		"SOC 2 Type II compliant",
	];

	return (
		<section
			ref={ref}
			className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-secondary to-gray-800 text-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">
					<div
						className={`transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-12"
						}`}
					>
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-6">
							Security & Compliance
						</h2>
						<p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-8">
							Built with data protection and regulatory alignment in mind
						</p>
						<div className="flex flex-wrap gap-1.5 sm:gap-3">
							{features.map((feature, index) => (
								<span
									key={index}
									className="text-xs sm:text-sm text-gray-300 flex items-center"
									style={{
										opacity: isVisible ? 1 : 0,
										transform: isVisible ? "translateY(0)" : "translateY(10px)",
										transition: `all 0.4s ease-out ${300 + index * 100}ms`,
									}}
								>
									{feature}
									{index < features.length - 1 && (
										<span className="ml-2 sm:ml-3 text-gray-600">•</span>
									)}
								</span>
							))}
						</div>
					</div>

					<div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
						{compliance.map((item, index) => (
							<div
								key={index}
								className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 lg:p-6 border border-white/20 text-center hover:bg-white/15 transition-all hover:scale-105 duration-300"
								style={{
									opacity: isVisible ? 1 : 0,
									transform: isVisible
										? "translateY(0) scale(1)"
										: "translateY(30px) scale(0.9)",
									transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${400 + index * 150}ms`,
								}}
							>
								<div className="w-7 h-7 sm:w-10 lg:w-12 sm:h-10 lg:h-12 flex items-center justify-center bg-teal-500 rounded-md sm:rounded-lg mx-auto mb-1.5 sm:mb-3 transition-transform duration-300 hover:rotate-6">
									<i className="ri-shield-check-line text-base sm:text-xl lg:text-2xl text-white"></i>
								</div>
								<h3 className="text-xs sm:text-base lg:text-lg font-bold mb-0 sm:mb-1">
									{item.name}
								</h3>
								<p className="text-xs text-gray-400 hidden sm:block">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
