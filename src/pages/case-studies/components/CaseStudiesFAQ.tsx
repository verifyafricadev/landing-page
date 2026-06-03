import { useState } from "react";

interface FAQItem {
	question: string;
	answer: string;
}

const faqs: FAQItem[] = [
	{
		question: "What industries does VerifyAfrica serve?",
		answer:
			"VerifyAfrica serves a wide range of regulated industries including Fintech, FX Brokers, iGaming & sports betting operators, Payment Service Providers, Banks & Microfinance Institutions, Telecoms, E-commerce marketplaces, Insurance, and Crypto & Web3 platforms. Our compliance infrastructure is purpose-built for the nuances of each vertical.",
	},
	{
		question: "How quickly can we integrate the VerifyAfrica API?",
		answer:
			"Most teams complete their core API integration within 1–2 weeks. We provide full REST API documentation, code samples in six languages (cURL, Node.js, Python, Java, Fetch, and Axios), sandbox credentials, and a dedicated onboarding engineer for enterprise accounts. Lighter integrations using our hosted verification link (Link Mode) can go live within hours.",
	},
	{
		question: "Can VerifyAfrica handle high-volume KYC onboarding at scale?",
		answer:
			"Yes. The platform is built on horizontally scalable cloud infrastructure and supports real-time verification at any volume. Clients processing hundreds of thousands of verifications per month use VerifyAfrica without degradation in response time or accuracy. Bulk Verification endpoints allow batch processing of up to 100 records per request for back-book remediation or mass onboarding programmes.",
	},
	{
		question:
			"What compliance results have clients achieved with VerifyAfrica?",
		answer:
			"Across our client base, outcomes include a 68% reduction in average KYC onboarding time, a 73% drop in fraud losses through AI-powered synthetic identity detection, a 54% decrease in false positive rates on AML screening, and compliance teams redeploying up to 40% of manual review capacity to higher-value risk analysis. Individual results vary by integration depth and use-case configuration.",
	},
	{
		question: "Which African gambling regulators does VerifyAfrica support?",
		answer:
			"VerifyAfrica supports compliance workflows for operators licensed across all major African gambling jurisdictions. This includes Kenya's Betting Control and Licensing Board (BCLB), Nigeria's National Lottery Regulatory Commission (NLRC) and state-level bodies such as the Lagos State Lotteries Board, South Africa's Western Cape Gambling and Racing Board, the Eastern Cape Gambling and Betting Board, and the Gauteng Gambling Board. We also support operators in Tanzania (Gaming Board of Tanzania), Uganda (National Lotteries and Gaming Regulatory Board), and Ghana (Gaming Commission of Ghana). Our KYC and AML workflows are pre-mapped to each regulator's specific identity verification, age verification, and responsible gambling requirements — so operators can demonstrate compliance out of the box.",
	},
];

export default function CaseStudiesFAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-16 lg:py-24 bg-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-4">
						<i className="ri-question-line text-teal-600 text-sm"></i>
						<span className="text-teal-600 text-sm font-medium">
							Frequently Asked Questions
						</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
						Questions About Our Platform
					</h2>
					<p className="text-gray-500 text-base max-w-xl mx-auto">
						Everything you need to know before getting started with
						VerifyAfrica's identity verification and compliance infrastructure.
					</p>
				</div>

				{/* Accordion */}
				<div className="space-y-3">
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								key={index}
								className={`rounded-xl border transition-all duration-200 ${
									isOpen
										? "border-teal-200 bg-teal-50/40"
										: "border-gray-100 bg-white hover:border-gray-200"
								}`}
							>
								<button
									onClick={() => toggle(index)}
									className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer"
									aria-expanded={isOpen}
								>
									<span
										className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
											isOpen ? "text-teal-700" : "text-secondary"
										}`}
									>
										{faq.question}
									</span>
									<span
										className={`w-6 h-6 flex items-center justify-center shrink-0 rounded-full transition-all duration-200 mt-0.5 ${
											isOpen
												? "bg-teal-600 text-white"
												: "bg-gray-100 text-gray-500"
										}`}
									>
										<i
											className={`text-xs transition-transform duration-200 ${
												isOpen ? "ri-subtract-line" : "ri-add-line"
											}`}
										></i>
									</span>
								</button>

								<div
									className={`overflow-hidden transition-all duration-300 ${
										isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="px-6 pb-5">
										<div className="w-8 h-px bg-teal-200 mb-4"></div>
										<p className="text-gray-600 text-sm leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div className="mt-12 text-center">
					<p className="text-gray-500 text-sm mb-4">
						Still have questions? Our compliance experts are ready to help.
					</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
					>
						<i className="ri-chat-1-line w-4 h-4 flex items-center justify-center"></i>
						Talk to an Expert
					</a>
				</div>
			</div>
		</section>
	);
}
