import { Fragment } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

const milestones = [
	{
		year: "2024",
		title: "The Beginning",
		description:
			"VerifyAfrica was founded by a team of compliance experts and engineers who saw the fragmented identity verification landscape across Africa as a problem worth solving.",
	},
	{
		year: "2025",
		title: "First 4 Countries",
		description:
			"We expanded our coverage to 4 African nations, partnering with Government data providers and regulatory bodies to build reliable verification pipelines.",
	},
	{
		year: "2026",
		title: "Pan-African Coverage",
		description:
			"Achieved full coverage across all 54 African countries, becoming the first compliance platform to offer truly continent‑wide identity verification.",
	},
	{
		year: "2026",
		title: "AI-Powered Compliance",
		description:
			"Introduced AI-driven risk scoring, automated document verification, and real‑time compliance monitoring — processing over 50 million verifications.",
	},
];

const storyIntro = {
	eyebrow: "Our Journey",
	title: "From Lagos to the Continent",
	description:
		"What started as a mission to simplify KYC in Nigeria has grown into Africa's most comprehensive compliance infrastructure.",
};

function SectionIntro({
	isVisible,
	align = "center",
	invert = false,
}: {
	isVisible: boolean;
	align?: "center" | "left";
	invert?: boolean;
}) {
	return (
		<div
			className={`mb-14 ${align === "center" ? "text-center" : "text-left"}`}
		>
			<span
				className={`inline-block text-xs font-semibold tracking-widest uppercase mb-3 transition-all duration-600 ${
					invert ? "text-teal-300" : "text-teal-600"
				} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
			>
				{storyIntro.eyebrow}
			</span>
			<h2
				className={`text-3xl lg:text-4xl font-bold mb-4 transition-all duration-700 delay-100 ${
					invert ? "text-white" : "text-secondary"
				} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
			>
				{storyIntro.title}
			</h2>
			<p
				className={`text-base max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
					align === "center" ? "mx-auto" : ""
				} ${invert ? "text-white/70" : "text-gray-500"} ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
				}`}
			>
				{storyIntro.description}
			</p>
		</div>
	);
}

export default function OurStory() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<Fragment>
			<section
				className="py-24 bg-secondary text-white overflow-visible"
				id="story"
				ref={ref}
			>
				<div className="max-w-6xl mx-auto px-6 lg:px-12">
					<div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start relative">
						<div className="lg:sticky lg:top-28 lg:self-start">
							<SectionIntro
								isVisible={isVisible}
								align="left"
								invert
							/>
						</div>

						<div className="relative pl-8">
							<div className="absolute left-0 top-2 bottom-2 w-px bg-white/15" />
							{milestones.map((milestone, index) => (
								<article
									key={`magazine-spine-${milestone.title}`}
									className={`relative pb-10 last:pb-0 transition-all duration-700 ${
										isVisible
											? "opacity-100 translate-x-0"
											: "opacity-0 translate-x-8"
									}`}
									style={{ transitionDelay: `${260 + index * 130}ms` }}
								>
									<span className="absolute left-[-2.45rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-teal-300 bg-secondary">
										<span className="h-2 w-2 rounded-full bg-teal-300" />
									</span>
									<div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-7 hover:bg-white/10 transition-colors">
										<div className="mb-5 flex items-center justify-between gap-4">
											<span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-300">
												{milestone.year}
											</span>
											<span className="text-5xl font-bold tracking-tighter text-white/10">
												0{index + 1}
											</span>
										</div>
										<h3 className="text-2xl font-bold">{milestone.title}</h3>
										<p className="mt-4 text-sm leading-relaxed text-white/65">
											{milestone.description}
										</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
