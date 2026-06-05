import type { FeatureDetail } from "@/mocks/featureDetails";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Icon } from "@phosphor-icons/react";
import {
	BankIcon,
	BuildingsIcon,
	ChartPieIcon,
	CreditCardIcon,
	CurrencyCircleDollarIcon,
	GameControllerIcon,
	HeartbeatIcon,
	PhoneIcon,
	ShieldIcon,
	ShoppingCartIcon,
	StorefrontIcon,
} from "@phosphor-icons/react";

const industryIcons: Record<string, Icon> = {
	Fintech: BankIcon,
	Neobanks: BankIcon,
	"Fintech & Neobanks": BankIcon,
	"Fintech & Banking": BankIcon,
	"Banks & Lenders": BuildingsIcon,
	iGaming: GameControllerIcon,
	"iGaming & Betting": GameControllerIcon,
	"FX & Remittance": CurrencyCircleDollarIcon,
	Marketplaces: StorefrontIcon,
	"B2B Marketplaces": StorefrontIcon,
	"Payment Processors": CreditCardIcon,
	Insurance: ShieldIcon,
	Lending: CurrencyCircleDollarIcon,
	"E-commerce": ShoppingCartIcon,
	Telecoms: PhoneIcon,
	Healthcare: HeartbeatIcon,
	"Asset Management": ChartPieIcon,
};

function getIndustryIcon(industry: string): Icon {
	for (const key of Object.keys(industryIcons)) {
		if (industry.includes(key)) return industryIcons[key];
	}
	return BuildingsIcon;
}

interface FeatureUseCaseCardProps {
	industry: string;
	description: string;
	index: number;
	isVisible: boolean;
}

function FeatureUseCaseCard({
	industry,
	description,
	index,
	isVisible,
}: FeatureUseCaseCardProps) {
	const IndustryIcon = getIndustryIcon(industry);

	return (
		<div
			className="flex gap-5 p-6 bg-gray-50 rounded-xl border hover:shadow-md transition-all duration-300"
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(20px)",
				transition: `all 0.5s ease-out ${index * 100}ms`,
			}}
		>
			<div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg shrink-0">
				<IndustryIcon className="text-xl text-teal-600" aria-hidden />
			</div>
			<div>
				<h3 className="text-base font-bold text-secondary mb-1.5">{industry}</h3>
				<p className="text-sm text-gray-600 leading-relaxed">{description}</p>
			</div>
		</div>
	);
}

interface FeatureUseCasesProps {
	feature: FeatureDetail;
}

export default function FeatureUseCases({ feature }: FeatureUseCasesProps) {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
		threshold: 0.1,
	});

	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={headerRef}
					className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-sm font-semibold rounded-full mb-4">
						Use Cases
					</span>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4">
						Built for your industry
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						See how teams across Africa use {feature.title} to meet compliance
						and reduce risk.
					</p>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
				>
					{feature.useCases.map((useCase, index) => (
						<FeatureUseCaseCard
							key={useCase.industry}
							industry={useCase.industry}
							description={useCase.description}
							index={index}
							isVisible={cardsVisible}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
