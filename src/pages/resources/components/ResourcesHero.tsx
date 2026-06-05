import { LockOpen } from "@phosphor-icons/react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function ResourcesHero() {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
			<div
				className="absolute inset-0 opacity-[0.07]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(15,23,42,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.8) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
				}}
			/>
			<div
				ref={ref}
				className={`relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 py-32 text-center transition-all duration-700 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/15 bg-secondary/5 backdrop-blur-sm text-secondary text-sm font-medium mb-8">
					<LockOpen className="size-4" />
					<span>Free Resources for Compliance Teams</span>
				</div>
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tighter leading-none mb-8">
					Compliance Resources &amp; Guides
				</h1>
				<p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
					Actionable frameworks, checklists, and playbooks built for African
					compliance teams. Get 60-70% of the value upfront — unlock the full
					actionable content with your company email.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-secondary/60">
					<span className="flex items-center gap-2">
						<i className="ri-check-line text-teal-500" />
						No spam, ever
					</span>
					<span className="flex items-center gap-2">
						<i className="ri-check-line text-teal-500" />
						Company emails only
					</span>
					<span className="flex items-center gap-2">
						<i className="ri-check-line text-teal-500" />
						Instant access
					</span>
				</div>
			</div>
			<div className="relative z-10 pb-10 flex flex-col items-center gap-2 text-secondary/40 text-xs uppercase tracking-widest">
				<span>Scroll</span>
				<i className="ri-arrow-down-line text-lg animate-bounce" />
			</div>
		</section>
	);
}
