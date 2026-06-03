import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import FeatureCard, { FEATURE_CARD_STYLES, type Feature } from "./FeatureCard";

export default function Features() {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
		threshold: 0.1,
	});

	const features: Feature[] = [
		{
			slug: "identity-verification",
			icon: "ri-shield-check-line",
			title: "Identity Verification",
			description:
				"Verify user identities across all African countries with AI-driven checks and document validation.",
		},
		{
			slug: "business-verification-kyb",
			icon: "ri-building-line",
			title: "Business Verification (KYB)",
			description:
				"Comprehensive business verification with registry integrations and corporate structure analysis.",
		},
		{
			slug: "aml-sanctions-screening",
			icon: "ri-alert-line",
			title: "AML & Sanctions Screening",
			description:
				"Real-time screening against global sanctions lists, PEP databases, and adverse media.",
		},
		{
			slug: "fraud-detection",
			icon: "ri-bug-line",
			title: "Fraud Detection",
			description:
				"AI-powered fraud detection with behavioral analysis and pattern recognition.",
		},
		{
			slug: "biometrics-liveness",
			icon: "ri-fingerprint-line",
			title: "Biometrics & Liveness",
			description:
				"Advanced biometric verification with liveness detection to prevent spoofing attacks.",
		},
		{
			slug: "address-verification-geolocation",
			icon: "ri-map-pin-line",
			title: "Address Verification & Geolocation Signals",
			description:
				"Location-based risk assessment and verification using geolocation intelligence.",
		},
		{
			slug: "transaction-risk-scoring",
			icon: "ri-bar-chart-line",
			title: "Transaction Risk Scoring & Decisioning",
			description:
				"Configurable risk scoring engine with automated decisioning workflows.",
		},
		{
			slug: "ongoing-monitoring",
			icon: "ri-refresh-line",
			title: "Ongoing Monitoring",
			description:
				"Continuous monitoring of user risk profiles with real-time alerts and updates.",
		},
	];

	return (
		<section
			id="features"
			className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={headerRef}
					className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
						What VerifyAfrica Does
					</h2>
					<p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
						A single platform for comprehensive compliance and identity
						verification
					</p>
				</div>

				<div
					ref={gridRef}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
				>
					{features.map((feature, index) => (
						<FeatureCard
							key={feature.slug}
							feature={feature}
							index={index}
							isVisible={gridVisible}
						/>
					))}
				</div>

				<div
					className={`mt-8 sm:mt-10 lg:mt-12 text-center transition-all duration-700 delay-700 ${
						gridVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<p className="text-xs sm:text-sm text-gray-600 italic px-4">
						All supported by AI-driven verification and registry integrations
						where available.
					</p>
				</div>
			</div>
		</section>
	);
}
