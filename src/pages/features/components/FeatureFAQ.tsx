import { useState } from "react";
import type { FeatureDetail } from "@/mocks/featureDetails";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeatureFAQProps {
	feature: FeatureDetail;
}

export default function FeatureFAQ({ feature }: FeatureFAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: listRef, isVisible: listVisible } = useScrollAnimation({
		threshold: 0.1,
	});

	return (
		<section className="py-16 md:py-24 bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
				<div
					ref={headerRef}
					className={`text-center mb-12 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-sm font-semibold rounded-full mb-4">
						FAQ
					</span>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4">
						Common questions
					</h2>
					<p className="text-base sm:text-lg text-gray-600">
						Everything you need to know about {feature.title}.
					</p>
				</div>

				<div
					ref={listRef}
					className="space-y-3"
				>
					{feature.faqs.map((faq, i) => (
						<div
							key={i}
							className="bg-white rounded-xl border border-gray-100 overflow-hidden"
							style={{
								opacity: listVisible ? 1 : 0,
								transform: listVisible ? "translateY(0)" : "translateY(16px)",
								transition: `all 0.5s ease-out ${i * 80}ms`,
							}}
						>
							<button
								onClick={() => setOpenIndex(openIndex === i ? null : i)}
								className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200"
							>
								<span className="text-sm sm:text-base font-semibold text-secondary">
									{faq.question}
								</span>
								<div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
									<i
										className={`ri-add-line text-xl text-teal-500 transition-transform duration-300 ${
											openIndex === i ? "rotate-45" : ""
										}`}
									/>
								</div>
							</button>
							<div
								className={`overflow-hidden transition-all duration-300 ${
									openIndex === i ? "max-h-96" : "max-h-0"
								}`}
							>
								<p className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
									{faq.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
