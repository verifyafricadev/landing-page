import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function ProblemSolution() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
					<div
						className={`lg:col-span-2 bg-gradient-to-br from-red-900 to-red-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-16"
						}`}
					>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
							The Problem
						</h2>
						<p className="text-red-100 leading-relaxed text-sm sm:text-base">
							Africa has 54 countries. Each one runs its own national ID system,
							its own data protection laws, and its own regulatory rules. A
							compliance tool that works in Europe won&apos;t automatically work
							in Nigeria, Kenya, or Ghana.
						</p>
						<p className="text-red-100 leading-relaxed text-sm sm:text-base mt-4">
							Nigeria uses the NIMC NIN database. South Africa relies on the
							Department of Home Affairs. Kenya has the IPRS. Ghana has the NIA.
							Each system has different data formats and different integration
							requirements.
						</p>
						<p className="text-red-100 leading-relaxed text-sm sm:text-base mt-4">
							Managing all of these separately is slow and risky. VerifyAfrica
							connects them all through one API. Your team focuses on risk
							decisions, not on maintaining integrations.
						</p>
					</div>

					<div
						className={`lg:col-span-3 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 border border-teal-100 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-16"
						}`}
					>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-secondary">
							The VerifyAfrica Solution
						</h2>
						<p className="text-gray-700 leading-relaxed text-sm sm:text-base">
							VerifyAfrica brings together everything your compliance team
							needs. Document verification, biometric liveness checks, business
							registry lookups, AML screening, PEP checks, and ongoing
							monitoring, all in one place.
						</p>
						<p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-4">
							Every check creates a timestamped audit trail. It meets the
							requirements of regulators across Africa, including Nigeria&apos;s
							CBN, South Africa&apos;s FIC, Kenya&apos;s CBK, and Ghana&apos;s
							BoG.
						</p>
						<p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-4">
							Most teams integrate via API in one to two weeks. Or go live in
							hours using our hosted Link Mode, no frontend work needed.
						</p>
						<div
							className={`mt-6 sm:mt-8 flex items-start space-x-3 transition-all duration-500 delay-500 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
								<i className="ri-checkbox-circle-fill text-xl sm:text-2xl text-teal-500"></i>
							</div>
							<p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1">
								A single platform built for Africa&apos;s unique compliance
								challenges, combining AI-driven verification with local registry
								integrations and audit-ready controls.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
