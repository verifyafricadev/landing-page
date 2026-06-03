import { useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: listRef, isVisible: listVisible } = useScrollAnimation({
		threshold: 0.1,
	});

	const faqs = [
		{
			question: "What countries does VerifyAfrica cover?",
			answer:
				"VerifyAfrica supports identity verification and compliance workflows across all 54 African countries, using a mix of AI-driven checks and official registry integrations where available.",
		},
		{
			question: "Do you integrate with government registries?",
			answer:
				"Where available, VerifyAfrica connects to official registries and authoritative data sources to strengthen verification accuracy, combined with AI-based validation and multi-source checks.",
		},
		{
			question: "Is VerifyAfrica suitable for regulated industries?",
			answer:
				"Yes. The platform is built as a Compliance Operating System with audit logs, evidence retention, decision transparency, and governance controls to support regulated environments.",
		},
		{
			question: "Can we use your API instead of the dashboard?",
			answer:
				"Yes. Businesses can integrate via API directly into their onboarding flows or use the VerifyAfrica dashboard for case management and monitoring.",
		},
		{
			question: "Do you offer ongoing monitoring?",
			answer:
				"Yes. VerifyAfrica provides continuous monitoring, risk signals, and configurable alerts beyond initial onboarding.",
		},
		{
			question: "What is VerifyAfrica's pricing model?",
			answer:
				"Pricing includes a monthly platform fee plus usage-based verification pricing, with volume tiers and enterprise configurations available.",
		},
		{
			question: "How long does integration take?",
			answer:
				"Most API integrations take 1–2 weeks, depending on workflow complexity.",
		},
	];

	return (
		<section
			id="faq"
			className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={headerRef}
					className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-2 sm:mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-sm sm:text-base lg:text-xl text-gray-600 px-2">
						Everything you need to know about VerifyAfrica
					</p>
				</div>

				<div
					ref={listRef}
					className="space-y-2.5 sm:space-y-4"
				>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={`group bg-white rounded-xl border overflow-hidden transition-all duration-300 ${
								openIndex === index
									? "border-teal-300 shadow-lg shadow-teal-100"
									: "border-gray-200 hover:border-teal-200 hover:shadow-md"
							}`}
							style={{
								opacity: listVisible ? 1 : 0,
								transform: listVisible ? "translateX(0)" : "translateX(-30px)",
								transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 60}ms`,
							}}
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors cursor-pointer"
							>
								<span
									className={`text-xs sm:text-sm md:text-base lg:text-lg font-semibold pr-3 sm:pr-6 lg:pr-8 transition-colors duration-300 ${
										openIndex === index ? "text-teal-700" : "text-secondary"
									}`}
								>
									{faq.question}
								</span>
								<div
									className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
										openIndex === index
											? "bg-teal-100 rotate-180"
											: "bg-gray-100 group-hover:bg-teal-50"
									}`}
								>
									<i
										className={`ri-arrow-down-s-line text-base sm:text-xl transition-colors duration-300 ${
											openIndex === index ? "text-teal-600" : "text-gray-600"
										}`}
									></i>
								</div>
							</button>
							<div
								className={`grid transition-all duration-500 ease-in-out ${
									openIndex === index
										? "grid-rows-[1fr] opacity-100"
										: "grid-rows-[0fr] opacity-0"
								}`}
							>
								<div className="overflow-hidden">
									<div
										className={`px-4 sm:px-6 lg:px-8 pb-3.5 sm:pb-5 lg:pb-6 transition-all duration-300 ${
											openIndex === index ? "translate-y-0" : "-translate-y-2"
										}`}
									>
										<div className="w-8 sm:w-12 h-0.5 bg-teal-400 mb-2.5 sm:mb-4 rounded-full"></div>
										<p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
