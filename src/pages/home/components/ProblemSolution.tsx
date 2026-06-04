import type { ReactNode } from "react";
import {
	AlertTriangle,
	ArrowRight,
	CheckCircle2,
	Check,
	Globe2,
	Layers,
	Minus,
	MoveRight,
	Plus,
	Quote,
	ShieldCheck,
	Sparkles,
	Terminal,
	Workflow,
	Zap,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

const problemParagraphs = [
	"Africa has 54 countries. Each one runs its own national ID system, its own data protection laws, and its own regulatory rules. A compliance tool that works in Europe won't automatically work in Nigeria, Kenya, or Ghana.",
	"Nigeria uses the NIMC NIN database. South Africa relies on the Department of Home Affairs. Kenya has the IPRS. Ghana has the NIA. Each system has different data formats and different integration requirements.",
	"Managing all of these separately is slow and risky. VerifyAfrica connects them all through one API. Your team focuses on risk decisions, not on maintaining integrations.",
];

const solutionParagraphs = [
	"VerifyAfrica brings together everything your compliance team needs. Document verification, biometric liveness checks, business registry lookups, AML screening, PEP checks, and ongoing monitoring, all in one place.",
	"Every check creates a timestamped audit trail. It meets the requirements of regulators across Africa, including Nigeria's CBN, South Africa's FIC, Kenya's CBK, and Ghana's BoG.",
	"Most teams integrate via API in one to two weeks. Or go live in hours using our hosted Link Mode, no frontend work needed.",
];

const solutionHighlight =
	"A single platform built for Africa's unique compliance challenges, combining AI-driven verification with local registry integrations and audit-ready controls.";

const regulatorChips = [
	"Nigeria · NIN",
	"South Africa · DHA",
	"Kenya · IPRS",
	"Ghana · NIA",
	"CBN",
	"FIC",
	"CBK",
	"BoG",
	"54 jurisdictions",
	"AML / PEP",
	"Link Mode",
	"Single API",
];

function MarqueeStrip({ className = "" }: { className?: string }) {
	const items = [...regulatorChips, ...regulatorChips];

	return (
		<div className={`overflow-hidden ${className}`}>
			<style>{`
				@keyframes ps-marquee {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
				.ps-marquee-track {
					animation: ps-marquee 32s linear infinite;
				}
			`}</style>
			<div className="ps-marquee-track flex w-max gap-3">
				{items.map((item, i) => (
					<span
						key={`${item}-${i}`}
						className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-zinc-300 whitespace-nowrap"
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

function DesignLabel({ children }: { children: ReactNode }) {
	return (
		<p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8">
			{children}
		</p>
	);
}

function ProblemSolutionCards() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 1 — Side-by-side cards</DesignLabel>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
					<Card
						className={`gap-0 border-0 bg-zinc-950 py-0 text-white ring-1 ring-red-500/25 shadow-lg transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<CardHeader className="border-b border-white/10 px-6 py-6 sm:px-8 sm:py-8">
							<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30">
								<AlertTriangle className="h-5 w-5 text-red-400" />
							</div>
							<CardTitle className="text-2xl sm:text-3xl font-bold text-white">
								The Problem
							</CardTitle>
							<CardDescription className="text-red-100/90 text-sm sm:text-base">
								Fragmented identity systems across the continent
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 px-6 py-6 sm:px-8 sm:py-8 text-red-100/90 text-sm sm:text-base leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="border-t border-white/10 bg-red-950/40 px-6 py-4 sm:px-8 text-xs sm:text-sm text-red-200/80">
							54 countries · 54 regulatory frameworks
						</CardFooter>
					</Card>

					<Card
						className={`gap-0 border-0 bg-gradient-to-br from-teal-50 to-cyan-50 py-0 ring-1 ring-teal-200/80 shadow-lg transition-all duration-700 ease-out delay-150 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<CardHeader className="border-b border-teal-100 px-6 py-6 sm:px-8 sm:py-8">
							<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/15 ring-1 ring-teal-500/30">
								<ShieldCheck className="h-5 w-5 text-teal-600" />
							</div>
							<CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
								The VerifyAfrica Solution
							</CardTitle>
							<CardDescription className="text-gray-600 text-sm sm:text-base">
								One API, audit-ready compliance across Africa
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 px-6 py-6 sm:px-8 sm:py-8 text-gray-700 text-sm sm:text-base leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="gap-3 border-t border-teal-100 bg-white/60 px-6 py-4 sm:px-8">
							<CheckCircle2 className="h-5 w-5 shrink-0 text-teal-500" />
							<p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
								{solutionHighlight}
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionStacked() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden"
		>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 2 — Stacked narrative</DesignLabel>

				<div
					className={`text-center mb-10 sm:mb-12 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary tracking-tight">
						From fragmented checks to unified compliance
					</h2>
					<p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
						See how VerifyAfrica turns a multi-country integration headache
						into a single, audit-ready workflow.
					</p>
				</div>

				<div className="relative space-y-4 sm:space-y-0 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-stretch sm:gap-4">
					<Card
						className={`gap-0 border-l-4 border-l-red-600 bg-white py-0 shadow-sm transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-8"
						}`}
					>
						<CardHeader className="px-5 py-5 sm:px-6 sm:py-6">
							<span className="mb-2 inline-flex w-fit items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-800">
								Problem
							</span>
							<CardTitle className="text-xl sm:text-2xl font-bold text-secondary">
								The Problem
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 px-5 pb-6 sm:px-6 text-sm sm:text-base text-gray-600 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
					</Card>

					<div
						className={`hidden sm:flex flex-col items-center justify-center px-2 transition-all duration-700 ease-out delay-200 ${
							isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
						}`}
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-md">
							<ArrowRight className="h-5 w-5" />
						</div>
					</div>

					<div
						className={`sm:hidden flex justify-center py-1 transition-all duration-500 delay-200 ${
							isVisible ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex h-8 w-8 rotate-90 items-center justify-center rounded-full bg-teal-500 text-white">
							<ArrowRight className="h-4 w-4" />
						</div>
					</div>

					<Card
						className={`gap-0 border-l-4 border-l-teal-500 bg-white py-0 shadow-sm transition-all duration-700 ease-out delay-300 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-8"
						}`}
					>
						<CardHeader className="px-5 py-5 sm:px-6 sm:py-6">
							<span className="mb-2 inline-flex w-fit items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-teal-800">
								Solution
							</span>
							<CardTitle className="text-xl sm:text-2xl font-bold text-secondary">
								The VerifyAfrica Solution
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 px-5 pb-4 sm:px-6 text-sm sm:text-base text-gray-600 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="mx-5 mb-5 sm:mx-6 sm:mb-6 gap-2.5 rounded-lg border border-teal-100 bg-teal-50/80 p-4">
							<CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
							<p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
								{solutionHighlight}
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionAccordion() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-100"
		>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 3 — Accordion reveal</DesignLabel>

				<Card
					className={`gap-0 overflow-hidden py-0 shadow-md ring-1 ring-foreground/10 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<CardHeader className="border-b bg-muted/30 px-5 py-6 sm:px-8 sm:py-8 text-center">
						<CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
							Problem &amp; Solution
						</CardTitle>
						<CardDescription className="mx-auto max-w-lg text-sm sm:text-base">
							Expand each section to explore the challenge VerifyAfrica solves
							for compliance teams operating across Africa.
						</CardDescription>
					</CardHeader>

					<CardContent className="p-0">
						<Accordion
							type="single"
							collapsible
							defaultValue="solution"
							className="px-5 sm:px-8"
						>
							<AccordionItem value="problem" className="border-b border-red-100">
								<AccordionTrigger className="py-5 text-base sm:text-lg font-semibold text-red-900 hover:no-underline hover:text-red-800">
									<span className="flex items-center gap-3">
										<span className="flex h-8 w-8 items-center justify-center rounded-md bg-red-100">
											<AlertTriangle className="h-4 w-4 text-red-600" />
										</span>
										The Problem
									</span>
								</AccordionTrigger>
								<AccordionContent className="pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
									{problemParagraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="solution" className="border-b-0">
								<AccordionTrigger className="py-5 text-base sm:text-lg font-semibold text-teal-900 hover:no-underline hover:text-teal-800">
									<span className="flex items-center gap-3">
										<span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-100">
											<ShieldCheck className="h-4 w-4 text-teal-600" />
										</span>
										The VerifyAfrica Solution
									</span>
								</AccordionTrigger>
								<AccordionContent className="pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
									{solutionParagraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
									<div className="mt-5 flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/60 p-4">
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
										<p className="text-xs sm:text-sm">{solutionHighlight}</p>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function ProblemSolutionSwissGrid() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 4 — Swiss editorial grid · Linear / Vercel</DesignLabel>

				<div
					className={`mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-8 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<div>
						<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
							Compliance infrastructure
						</p>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-xl leading-[1.1]">
							Built for Africa&apos;s complexity
						</h2>
					</div>
					<p className="text-sm text-zinc-400 max-w-xs leading-relaxed sm:text-right">
						Precision layout inspired by award-winning dev-tool marketing sites.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10 rounded-2xl overflow-hidden">
					<div
						className={`lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 p-6 sm:p-8 lg:p-10 transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<div className="flex items-start justify-between gap-4 mb-8">
							<span className="font-mono text-xs text-red-400/80 tabular-nums">
								01
							</span>
							<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
								The problem
							</span>
						</div>
						<h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">
							Fragmented by design
						</h3>
						<div className="space-y-4 text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
							<div>
								<p className="font-mono text-2xl sm:text-3xl font-bold text-red-400 tabular-nums">
									54
								</p>
								<p className="text-[11px] uppercase tracking-wider text-zinc-500 mt-1">
									Countries
								</p>
							</div>
							<div>
								<p className="font-mono text-2xl sm:text-3xl font-bold text-red-400/70 tabular-nums">
									∞
								</p>
								<p className="text-[11px] uppercase tracking-wider text-zinc-500 mt-1">
									Integrations
								</p>
							</div>
						</div>
					</div>

					<div
						className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-zinc-900/50 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<div className="flex items-start justify-between gap-4 mb-8">
							<span className="font-mono text-xs text-teal-400 tabular-nums">
								02
							</span>
							<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
								The solution
							</span>
						</div>
						<h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">
							The VerifyAfrica Solution
						</h3>
						<div className="space-y-4 text-sm sm:text-[15px] text-zinc-300 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<div className="mt-8 flex items-start gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 sm:p-5">
							<Sparkles className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
							<p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
								{solutionHighlight}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionBento() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-28 bg-[#f5f5f7] overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 5 — Bento mosaic · Apple / Raycast</DesignLabel>

				<div
					className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-secondary tracking-tight">
						One platform. Every market.
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-auto">
					<Card
						className={`md:col-span-6 lg:col-span-7 md:row-span-2 gap-0 border-0 bg-white py-0 shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<CardHeader className="px-6 pt-6 sm:px-8 sm:pt-8 pb-0">
							<div className="flex items-center gap-2 text-red-600 mb-2">
								<Layers className="h-4 w-4" />
								<span className="text-xs font-semibold uppercase tracking-wide">
									The Problem
								</span>
							</div>
							<CardTitle className="text-2xl sm:text-3xl font-bold text-secondary leading-tight">
								54 countries. 54 different compliance stacks.
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
					</Card>

					<Card
						className={`md:col-span-3 lg:col-span-2 gap-0 border-0 bg-red-600 py-0 text-white shadow-sm transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 scale-100"
								: "opacity-0 scale-95"
						}`}
					>
						<CardContent className="flex flex-col justify-between h-full min-h-[140px] p-6">
							<Globe2 className="h-8 w-8 opacity-80" />
							<div>
								<p className="text-4xl font-bold tabular-nums">54</p>
								<p className="text-xs text-red-100 mt-1 uppercase tracking-wide">
									Regulatory frameworks
								</p>
							</div>
						</CardContent>
					</Card>

					<Card
						className={`md:col-span-3 lg:col-span-3 gap-0 border-0 bg-secondary py-0 text-white shadow-sm transition-all duration-700 ease-out delay-150 ${
							isVisible
								? "opacity-100 scale-100"
								: "opacity-0 scale-95"
						}`}
					>
						<CardContent className="flex flex-col justify-center h-full min-h-[140px] p-6">
							<AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
							<p className="text-sm leading-snug text-zinc-300">
								European tools don&apos;t map to NIN, IPRS, or NIA out of the
								box.
							</p>
						</CardContent>
					</Card>

					<Card
						className={`md:col-span-6 lg:col-span-5 gap-0 border-0 bg-gradient-to-br from-teal-500 to-teal-600 py-0 text-white shadow-sm transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}
					>
						<CardHeader className="px-6 pt-6 pb-0">
							<div className="flex items-center gap-2 text-teal-100 mb-2">
								<ShieldCheck className="h-4 w-4" />
								<span className="text-xs font-semibold uppercase tracking-wide">
									The Solution
								</span>
							</div>
							<CardTitle className="text-xl sm:text-2xl font-bold text-white">
								VerifyAfrica unifies it all
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 pt-3">
							<p className="text-sm text-teal-50/90 leading-relaxed">
								{solutionParagraphs[0]}
							</p>
						</CardContent>
					</Card>

					<Card
						className={`md:col-span-6 lg:col-span-7 gap-0 border-0 bg-white py-0 shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out delay-300 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}
					>
						<CardContent className="p-6 sm:p-8 space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
							{solutionParagraphs.slice(1).map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="border-t border-teal-100 bg-teal-50/50 gap-3 px-6 py-4 sm:px-8">
							<CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
							<p className="text-xs sm:text-sm text-gray-600">{solutionHighlight}</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionGlassAurora() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-slate-950"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-teal-500/20 blur-[120px]" />
				<div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-red-500/15 blur-[100px]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[80px]" />
			</div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 6 — Glass aurora · Stripe / Framer</DesignLabel>

				<div
					className={`text-center mb-12 sm:mb-16 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur-sm mb-5">
						<Sparkles className="h-3 w-3 text-teal-400" />
						Problem → Solution
					</p>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
						Compliance without the chaos
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
					<Card
						className={`gap-0 border-white/10 bg-white/5 py-0 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10 transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-10"
						}`}
					>
						<CardHeader className="border-b border-white/10 px-6 py-6 sm:px-8">
							<div className="flex items-center gap-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 ring-1 ring-red-400/30">
									<AlertTriangle className="h-4 w-4 text-red-300" />
								</div>
								<div>
									<CardTitle className="text-lg sm:text-xl font-semibold text-white">
										The Problem
									</CardTitle>
									<CardDescription className="text-zinc-400">
										Disconnected identity rails
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 px-6 py-6 sm:px-8 text-sm sm:text-[15px] text-zinc-300 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
					</Card>

					<Card
						className={`gap-0 border-teal-400/20 bg-white/10 py-0 text-white shadow-2xl backdrop-blur-xl ring-1 ring-teal-400/20 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-10"
						}`}
					>
						<CardHeader className="border-b border-white/10 px-6 py-6 sm:px-8">
							<div className="flex items-center gap-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/25 ring-1 ring-teal-400/40">
									<Zap className="h-4 w-4 text-teal-300" />
								</div>
								<div>
									<CardTitle className="text-lg sm:text-xl font-semibold text-white">
										The VerifyAfrica Solution
									</CardTitle>
									<CardDescription className="text-zinc-400">
										One API, audit-ready everywhere
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 px-6 py-6 sm:px-8 text-sm sm:text-[15px] text-zinc-200 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="border-t border-teal-400/15 bg-teal-500/10 gap-3 px-6 py-4 sm:px-8 backdrop-blur-sm">
							<CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" />
							<p className="text-xs sm:text-sm text-zinc-300">{solutionHighlight}</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionCinematicSplit() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

	return (
		<section ref={ref} className="overflow-hidden">
			<DesignLabel>Option 7 — Cinematic split · Awwwards agency</DesignLabel>

			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[640px]">
				<div
					className={`relative flex flex-col justify-center bg-red-950 px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 transition-all duration-1000 ease-out ${
						isVisible
							? "opacity-100 translate-x-0"
							: "opacity-0 -translate-x-12"
					}`}
				>
					<span
						aria-hidden
						className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-bold text-[8rem] sm:text-[10rem] lg:text-[14rem] leading-none text-red-900/40"
					>
						01
					</span>
					<p className="relative font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-red-300/70 mb-4">
						Challenge
					</p>
					<h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-8 max-w-md">
						The Problem
					</h2>
					<div className="relative space-y-4 text-sm sm:text-base text-red-100/85 leading-relaxed max-w-lg">
						{problemParagraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 32)}>{paragraph}</p>
						))}
					</div>
				</div>

				<div
					className={`relative flex flex-col justify-center bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 border-t lg:border-t-0 lg:border-l border-slate-200 transition-all duration-1000 ease-out delay-200 ${
						isVisible
							? "opacity-100 translate-x-0"
							: "opacity-0 translate-x-12"
					}`}
				>
					<span
						aria-hidden
						className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-bold text-[8rem] sm:text-[10rem] lg:text-[14rem] leading-none text-teal-100"
					>
						02
					</span>
					<p className="relative font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-teal-600/70 mb-4">
						Resolution
					</p>
					<h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary tracking-tight leading-[1.05] mb-8 max-w-md">
						The VerifyAfrica Solution
					</h2>
					<div className="relative space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
						{solutionParagraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 32)}>{paragraph}</p>
						))}
					</div>
					<div
						className={`relative mt-8 flex items-start gap-3 border-l-2 border-teal-500 pl-4 transition-all duration-700 delay-500 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						}`}
					>
						<p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
							{solutionHighlight}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionTimeline() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	const problemSteps = problemParagraphs.map((text, i) => ({
		text,
		label: `0${i + 1}`,
	}));

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 8 — Scroll timeline · Obys / Locomotive</DesignLabel>

				<div
					className={`mb-12 sm:mb-16 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight">
						The journey to unified compliance
					</h2>
					<p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
						From fragmented national systems to a single audit-ready API.
					</p>
				</div>

				<div className="relative">
					<div
						aria-hidden
						className="absolute left-[15px] sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-red-300 via-slate-200 to-teal-400"
					/>

					<div className="space-y-10 sm:space-y-14">
						{problemSteps.map((step, index) => (
							<div
								key={step.label}
								className={`relative pl-10 sm:pl-14 transition-all duration-700 ease-out ${
									isVisible
										? "opacity-100 translate-x-0"
										: "opacity-0 -translate-x-6"
								}`}
								style={{ transitionDelay: `${index * 120}ms` }}
							>
								<div className="absolute left-0 top-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-red-200 bg-red-50 text-xs font-mono font-bold text-red-700">
									{step.label}
								</div>
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500 mb-2">
									Problem
								</p>
								<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
									{step.text}
								</p>
							</div>
						))}

						<div
							className={`relative pl-10 sm:pl-14 transition-all duration-700 ease-out delay-500 ${
								isVisible
									? "opacity-100 scale-100"
									: "opacity-0 scale-95"
							}`}
						>
							<div className="absolute left-0 top-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30">
								<MoveRight className="h-4 w-4" />
							</div>
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-600 mb-2">
								Inflection point
							</p>
							<Card className="gap-0 border-teal-200 bg-teal-50/50 py-0 ring-0">
								<CardHeader className="px-5 py-5 sm:px-6">
									<CardTitle className="text-xl sm:text-2xl font-bold text-secondary">
										The VerifyAfrica Solution
									</CardTitle>
								</CardHeader>
								<CardContent className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
									{solutionParagraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
								</CardContent>
								<CardFooter className="mx-5 mb-5 sm:mx-6 sm:mb-6 gap-2 rounded-lg border border-teal-200 bg-white p-4">
									<CheckCircle2 className="h-4 w-4 shrink-0 text-teal-500" />
									<p className="text-xs sm:text-sm text-gray-600">
										{solutionHighlight}
									</p>
								</CardFooter>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionBrutalist() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-20 lg:py-28 bg-[#e8e8e8] overflow-hidden border-y-4 border-black"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 9 — Brutalist raw · Berlin studio / Awwwards</DesignLabel>

				<div className="grid grid-cols-1 lg:grid-cols-2 border-4 border-black bg-white">
					<div
						className={`border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 sm:p-10 lg:p-12 transition-all duration-500 ease-out ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black">
							<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none">
								Problem
							</h2>
							<Minus className="h-10 w-10 sm:h-12 sm:w-12 stroke-[3]" />
						</div>
						<div className="space-y-5 text-sm sm:text-base font-medium text-black leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<p className="mt-8 font-mono text-xs uppercase tracking-widest text-black/50">
							54 countries · fragmented rails
						</p>
					</div>

					<div
						className={`p-6 sm:p-10 lg:p-12 bg-black text-white transition-all duration-500 ease-out delay-150 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-white">
							<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-teal-400 leading-none">
								Solution
							</h2>
							<Plus className="h-10 w-10 sm:h-12 sm:w-12 stroke-[3] text-teal-400" />
						</div>
						<div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<p className="mt-8 border-l-4 border-teal-400 pl-4 text-xs sm:text-sm text-zinc-400 italic">
							{solutionHighlight}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionOverlap() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
		>
			<div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
				<div className="bg-gradient-to-br from-red-50 to-red-100/80" />
				<div className="bg-gradient-to-bl from-teal-50 to-cyan-50" />
			</div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 10 — Overlap card · Stripe / modern SaaS</DesignLabel>

				<div
					className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight">
						Where complexity meets clarity
					</h2>
				</div>

				<Card
					className={`relative z-10 mx-auto max-w-4xl gap-0 overflow-hidden border-0 py-0 shadow-2xl ring-1 ring-black/5 transition-all duration-700 ease-out delay-100 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-12"
					}`}
				>
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div className="border-b md:border-b-0 md:border-r border-slate-100 p-6 sm:p-8 lg:p-10">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
								<AlertTriangle className="h-3.5 w-3.5" />
								The Problem
							</div>
							<div className="space-y-3 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>

						<div className="bg-gradient-to-br from-teal-500/5 to-cyan-500/10 p-6 sm:p-8 lg:p-10">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
								<ShieldCheck className="h-3.5 w-3.5" />
								The VerifyAfrica Solution
							</div>
							<div className="space-y-3 text-sm sm:text-[15px] text-gray-700 leading-relaxed">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>

					<CardFooter className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t bg-slate-50 px-6 py-5 sm:px-8">
						<p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
							{solutionHighlight}
						</p>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-md">
							<ArrowRight className="h-4 w-4" />
						</div>
					</CardFooter>
				</Card>

				<div
					className={`mt-8 flex justify-center gap-8 sm:gap-16 transition-all duration-700 delay-300 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="text-center">
						<p className="text-2xl sm:text-3xl font-bold text-red-600/80 tabular-nums">
							54
						</p>
						<p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
							Markets
						</p>
					</div>
					<div className="w-px bg-slate-300" />
					<div className="text-center">
						<p className="text-2xl sm:text-3xl font-bold text-teal-600 tabular-nums">
							1
						</p>
						<p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
							API
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionEditorial() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-[#faf9f7] overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 11 — Editorial magazine · Pentagram / luxury editorial</DesignLabel>

				<div
					className={`flex items-center gap-4 mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<div className="h-px flex-1 bg-secondary/20" />
					<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary/60 shrink-0">
						Case study
					</p>
					<div className="h-px flex-1 bg-secondary/20" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					<div
						className={`lg:col-span-4 transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-700 mb-3">
							01 — The Problem
						</p>
						<h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-secondary leading-[1.15] tracking-tight mb-6">
							When every country is a different product
						</h2>
						<p className="text-sm sm:text-base text-gray-500 leading-relaxed">
							{problemParagraphs[0]}
						</p>
					</div>

					<div
						className={`lg:col-span-8 space-y-6 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-secondary first-letter:float-left first-letter:mr-2 first-letter:mt-0.5">
							{problemParagraphs[1]}
						</p>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							{problemParagraphs[2]}
						</p>

						<blockquote className="relative my-8 sm:my-10 border-y border-secondary/10 py-8 sm:py-10">
							<Quote className="absolute top-6 left-0 h-8 w-8 text-teal-500/30" />
							<p className="pl-10 sm:pl-12 text-lg sm:text-xl lg:text-2xl font-medium text-secondary leading-snug tracking-tight">
								{solutionHighlight}
							</p>
						</blockquote>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4">
							<div>
								<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 mb-3">
									02 — The Solution
								</p>
								<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
									{solutionParagraphs[0]}
								</p>
								<p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
									{solutionParagraphs[1]}
								</p>
							</div>
							<div className="rounded-2xl bg-secondary p-6 sm:p-8 text-white">
								<ShieldCheck className="h-8 w-8 text-teal-400 mb-4" />
								<h3 className="text-lg font-bold mb-3">
									The VerifyAfrica Solution
								</h3>
								<p className="text-sm text-zinc-300 leading-relaxed">
									{solutionParagraphs[2]}
								</p>
								<div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400">
									<CheckCircle2 className="h-3.5 w-3.5" />
									Audit-ready by default
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionCompareSlider() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-slate-100 overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 12 — Compare slider · product before/after</DesignLabel>

				<div
					className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight">
						Before &amp; after VerifyAfrica
					</h2>
					<p className="mt-3 text-sm text-muted-foreground">
						Drag the divider — static preview of a comparison interaction
					</p>
				</div>

				<div
					className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl transition-all duration-700 ease-out delay-100 ${
						isVisible
							? "opacity-100 scale-100"
							: "opacity-0 scale-[0.98]"
					}`}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px] sm:min-h-[480px]">
						<div className="relative bg-gradient-to-br from-red-950 to-red-900 p-6 sm:p-8 lg:p-10 text-white md:pr-12">
							<span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-200 mb-4">
								Before
							</span>
							<h3 className="text-xl sm:text-2xl font-bold mb-5">The Problem</h3>
							<div className="space-y-3 text-sm sm:text-[15px] text-red-100/90 leading-relaxed">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>

						<div className="relative bg-gradient-to-bl from-teal-50 to-white p-6 sm:p-8 lg:p-10 md:pl-12 border-t md:border-t-0 md:border-l border-slate-200">
							<span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-800 mb-4">
								After
							</span>
							<h3 className="text-xl sm:text-2xl font-bold text-secondary mb-5">
								The VerifyAfrica Solution
							</h3>
							<div className="space-y-3 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
							<p className="mt-5 flex items-start gap-2 text-xs sm:text-sm text-gray-500">
								<CheckCircle2 className="h-4 w-4 shrink-0 text-teal-500 mt-0.5" />
								{solutionHighlight}
							</p>
						</div>
					</div>

					<div
						aria-hidden
						className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden md:flex -translate-x-1/2 flex-col items-center"
					>
						<div className="w-0.5 flex-1 bg-white/80 shadow-sm" />
						<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-900 shadow-lg">
							<div className="flex gap-0.5">
								<span className="h-3 w-0.5 rounded-full bg-white/60" />
								<span className="h-3 w-0.5 rounded-full bg-white/60" />
							</div>
						</div>
						<div className="w-0.5 flex-1 bg-white/80 shadow-sm" />
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionStickySidebar() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 13 — Sticky sidebar · case study scroll</DesignLabel>

				<div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
					<div
						className={`lg:sticky lg:top-28 lg:self-start transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-6"
						}`}
					>
						<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
							Overview
						</p>
						<nav className="flex lg:flex-col gap-4 sm:gap-6">
							<a
								href="#problem-block"
								className="group flex items-center gap-3 text-sm font-medium text-red-700"
							>
								<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 ring-1 ring-red-100 text-xs font-mono">
									01
								</span>
								<span className="group-hover:underline underline-offset-4">
									Problem
								</span>
							</a>
							<a
								href="#solution-block"
								className="group flex items-center gap-3 text-sm font-medium text-teal-700"
							>
								<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 ring-1 ring-teal-100 text-xs font-mono">
									02
								</span>
								<span className="group-hover:underline underline-offset-4">
									Solution
								</span>
							</a>
						</nav>
						<div className="hidden lg:block mt-10 h-px w-full bg-slate-200" />
						<p className="hidden lg:block mt-6 text-xs text-muted-foreground leading-relaxed">
							Award-site case study pattern — anchor nav with scrolling narrative.
						</p>
					</div>

					<div className="space-y-6 sm:space-y-8">
						<article
							id="problem-block"
							className={`scroll-mt-28 transition-all duration-700 ease-out delay-100 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<Card className="gap-0 border-red-100 bg-red-50/30 py-0 ring-0">
								<CardHeader className="px-6 py-6 sm:px-8 border-b border-red-100">
									<CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
										The Problem
									</CardTitle>
									<CardDescription>
										Fragmented compliance across 54 markets
									</CardDescription>
								</CardHeader>
								<CardContent className="px-6 py-6 sm:px-8 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
									{problemParagraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
								</CardContent>
							</Card>
						</article>

						<article
							id="solution-block"
							className={`scroll-mt-28 transition-all duration-700 ease-out delay-200 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<Card className="gap-0 border-teal-200 py-0 shadow-md ring-0">
								<CardHeader className="px-6 py-6 sm:px-8 border-b border-teal-100 bg-teal-50/40">
									<CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
										The VerifyAfrica Solution
									</CardTitle>
									<CardDescription>
										One API, regulators covered, teams unblocked
									</CardDescription>
								</CardHeader>
								<CardContent className="px-6 py-6 sm:px-8 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
									{solutionParagraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
								</CardContent>
								<CardFooter className="mx-6 mb-6 sm:mx-8 sm:mb-8 gap-3 rounded-xl border border-teal-100 bg-teal-50/60 p-4">
									<ShieldCheck className="h-5 w-5 shrink-0 text-teal-600" />
									<p className="text-xs sm:text-sm text-gray-600">
										{solutionHighlight}
									</p>
								</CardFooter>
							</Card>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionProcessRail() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	const steps = [
		{
			type: "problem" as const,
			title: "54 jurisdictions",
			body: problemParagraphs[0],
		},
		{
			type: "problem" as const,
			title: "Local ID systems",
			body: problemParagraphs[1],
		},
		{
			type: "problem" as const,
			title: "Integration burden",
			body: problemParagraphs[2],
		},
		{
			type: "solution" as const,
			title: "Unified platform",
			body: solutionParagraphs[0],
		},
		{
			type: "solution" as const,
			title: "Audit trail",
			body: solutionParagraphs[1],
		},
		{
			type: "solution" as const,
			title: "Fast deployment",
			body: solutionParagraphs[2],
		},
	];

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-28 bg-secondary text-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 14 — Process rail · horizontal workflow</DesignLabel>

				<div
					className={`flex items-center gap-3 mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<Workflow className="h-5 w-5 text-teal-400" />
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
						From chaos to compliance
					</h2>
				</div>

				<div className="relative overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
					<div
						aria-hidden
						className="absolute top-[52px] left-8 right-8 hidden lg:block h-px bg-white/15"
					/>
					<div className="flex gap-4 sm:gap-5 min-w-max lg:min-w-0 lg:grid lg:grid-cols-6 lg:gap-4">
						{steps.map((step, index) => (
							<div
								key={step.title}
								className={`relative w-[260px] sm:w-[280px] lg:w-auto shrink-0 transition-all duration-700 ease-out ${
									isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
								style={{ transitionDelay: `${index * 80}ms` }}
							>
								<div className="flex flex-col items-center mb-4">
									<div
										className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-mono font-bold ${
											step.type === "problem"
												? "bg-red-500/20 text-red-300 ring-2 ring-red-400/40"
												: "bg-teal-500/25 text-teal-300 ring-2 ring-teal-400/50"
										}`}
									>
										{String(index + 1).padStart(2, "0")}
									</div>
								</div>
								<Card
									className={`gap-0 h-full border-0 py-0 ${
										step.type === "problem"
											? "bg-white/5 ring-1 ring-white/10"
											: "bg-teal-500/15 ring-1 ring-teal-400/25"
									}`}
								>
									<CardHeader className="px-4 pt-4 pb-0">
										<CardTitle className="text-sm font-semibold text-white">
											{step.title}
										</CardTitle>
									</CardHeader>
									<CardContent className="px-4 pb-4 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
										{step.body}
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</div>

				<p
					className={`mt-8 sm:mt-10 text-center text-xs sm:text-sm text-zinc-500 max-w-2xl mx-auto transition-all duration-700 delay-500 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					{solutionHighlight}
				</p>
			</div>
		</section>
	);
}

function ProblemSolutionBlueprint() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="relative py-16 sm:py-24 lg:py-32 bg-[#0a1628] text-white overflow-hidden"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[0.35]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(20,184,166,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.15) 1px, transparent 1px)",
					backgroundSize: "32px 32px",
				}}
			/>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 15 — Blueprint grid · technical schematic</DesignLabel>

				<div
					className={`mb-10 sm:mb-14 flex flex-wrap items-end justify-between gap-4 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<div>
						<p className="font-mono text-[10px] text-teal-400/80 mb-2">
							SCHEMATIC / VA-PS-001
						</p>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
							Compliance architecture
						</h2>
					</div>
					<p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
						Rev 1.0 · VerifyAfrica
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
					<div
						className={`relative transition-all duration-700 ease-out delay-100 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<span className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-red-400/60" />
						<span className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-red-400/60" />
						<span className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-red-400/60" />
						<span className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-red-400/60" />
						<Card className="gap-0 border border-red-500/30 bg-red-950/20 py-0 ring-0 backdrop-blur-sm">
							<CardHeader className="border-b border-red-500/20 px-5 py-5 sm:px-6">
								<p className="font-mono text-[10px] text-red-400 mb-1">
									MODULE A — INPUT
								</p>
								<CardTitle className="text-lg sm:text-xl font-semibold text-white">
									The Problem
								</CardTitle>
							</CardHeader>
							<CardContent className="px-5 py-5 sm:px-6 space-y-3 text-sm text-zinc-400 leading-relaxed font-mono">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)} className="font-sans">
										{paragraph}
									</p>
								))}
							</CardContent>
						</Card>
					</div>

					<div
						className={`relative transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<span className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-teal-400/60" />
						<span className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-teal-400/60" />
						<span className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-teal-400/60" />
						<span className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-teal-400/60" />
						<Card className="gap-0 border border-teal-500/30 bg-teal-950/20 py-0 ring-0 backdrop-blur-sm">
							<CardHeader className="border-b border-teal-500/20 px-5 py-5 sm:px-6">
								<p className="font-mono text-[10px] text-teal-400 mb-1">
									MODULE B — OUTPUT
								</p>
								<CardTitle className="text-lg sm:text-xl font-semibold text-white">
									The VerifyAfrica Solution
								</CardTitle>
							</CardHeader>
							<CardContent className="px-5 py-5 sm:px-6 space-y-3 text-sm text-zinc-300 leading-relaxed">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</CardContent>
							<CardFooter className="border-t border-teal-500/20 px-5 py-4 sm:px-6 font-mono text-[11px] text-teal-400/90">
								→ {solutionHighlight}
							</CardFooter>
						</Card>
					</div>
				</div>

				<div
					className={`mt-8 flex justify-center transition-all duration-700 delay-300 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500">
						<span className="h-2 w-2 rounded-full bg-red-400/80" />
						<span>LEGACY STACK</span>
						<span className="text-teal-400">──────▶</span>
						<span className="h-2 w-2 rounded-full bg-teal-400/80" />
						<span>UNIFIED API</span>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionNeon() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 16 — Neon glow · cyberpunk fintech</DesignLabel>

				<div
					className={`text-center mb-12 sm:mb-16 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-teal-400">
							Problem → Solution
						</span>
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
					<div
						className={`relative rounded-2xl p-[1px] bg-gradient-to-br from-red-500/80 via-red-500/20 to-transparent shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)] transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-10"
						}`}
					>
						<Card className="gap-0 h-full border-0 bg-zinc-950 py-0 ring-0 rounded-[15px]">
							<CardHeader className="px-6 py-6 sm:px-8 border-b border-red-500/20">
								<CardTitle className="text-xl sm:text-2xl font-bold text-red-400">
									The Problem
								</CardTitle>
								<CardDescription className="text-zinc-500">
									Signal lost across borders
								</CardDescription>
							</CardHeader>
							<CardContent className="px-6 py-6 sm:px-8 space-y-3 text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</CardContent>
						</Card>
					</div>

					<div
						className={`relative rounded-2xl p-[1px] bg-gradient-to-br from-teal-400/80 via-teal-500/20 to-transparent shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] transition-all duration-700 ease-out delay-150 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-10"
						}`}
					>
						<Card className="gap-0 h-full border-0 bg-zinc-950 py-0 ring-0 rounded-[15px]">
							<CardHeader className="px-6 py-6 sm:px-8 border-b border-teal-500/20">
								<CardTitle className="text-xl sm:text-2xl font-bold text-teal-400">
									The VerifyAfrica Solution
								</CardTitle>
								<CardDescription className="text-zinc-500">
									One signal. Every regulator.
								</CardDescription>
							</CardHeader>
							<CardContent className="px-6 py-6 sm:px-8 space-y-3 text-sm sm:text-[15px] text-zinc-300 leading-relaxed">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</CardContent>
							<CardFooter className="border-t border-teal-500/15 px-6 py-4 sm:px-8 text-xs sm:text-sm text-teal-400/80">
								{solutionHighlight}
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionDeck() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
		>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 17 — Card deck · playful agency overlap</DesignLabel>

				<div
					className={`text-center mb-14 sm:mb-20 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight">
						Two cards. One story.
					</h2>
				</div>

				<div className="relative mx-auto max-w-3xl min-h-[520px] sm:min-h-[480px]">
					<Card
						className={`absolute left-0 top-0 w-[92%] sm:w-[85%] gap-0 border-red-100 bg-white py-0 shadow-xl ring-1 ring-red-100/80 -rotate-2 origin-top-left transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 -translate-y-8 rotate-0"
						}`}
					>
						<CardHeader className="px-6 py-5 sm:px-8 bg-red-50/50 border-b border-red-100">
							<CardTitle className="text-lg sm:text-xl font-bold text-red-900">
								The Problem
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 py-5 sm:px-8 space-y-3 text-sm text-gray-600 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
					</Card>

					<Card
						className={`absolute right-0 bottom-0 w-[92%] sm:w-[85%] gap-0 border-teal-200 bg-white py-0 shadow-2xl ring-1 ring-teal-200 rotate-2 origin-bottom-right transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8 rotate-0"
						}`}
					>
						<CardHeader className="px-6 py-5 sm:px-8 bg-teal-50/80 border-b border-teal-100">
							<CardTitle className="text-lg sm:text-xl font-bold text-teal-900">
								The VerifyAfrica Solution
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 py-5 sm:px-8 space-y-3 text-sm text-gray-600 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</CardContent>
						<CardFooter className="mx-6 mb-5 sm:mx-8 sm:mb-6 gap-2 rounded-lg bg-teal-500/10 p-3">
							<Sparkles className="h-4 w-4 shrink-0 text-teal-600" />
							<p className="text-xs text-gray-600">{solutionHighlight}</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionTerminal() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-28 bg-zinc-950 overflow-hidden"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 18 — Terminal · Raycast / dev-tool CLI</DesignLabel>

				<div
					className={`flex items-center gap-2 mb-6 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4"
					}`}
				>
					<Terminal className="h-4 w-4 text-teal-400" />
					<p className="font-mono text-xs text-zinc-500">
						verifyafrica — compliance shell
					</p>
				</div>

				<Card
					className={`gap-0 overflow-hidden border-zinc-800 bg-zinc-900 py-0 font-mono text-sm shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 ease-out delay-100 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3 bg-zinc-900/80">
						<span className="h-3 w-3 rounded-full bg-red-500/80" />
						<span className="h-3 w-3 rounded-full bg-yellow-500/80" />
						<span className="h-3 w-3 rounded-full bg-green-500/80" />
						<span className="ml-2 text-[11px] text-zinc-500">
							problem-solution.sh
						</span>
					</div>

					<CardContent className="p-4 sm:p-6 space-y-5 text-[13px] sm:text-sm leading-relaxed">
						<div>
							<p className="text-zinc-500">
								<span className="text-teal-400">➜</span>{" "}
								<span className="text-zinc-300">cat problem.md</span>
							</p>
							<div className="mt-3 pl-4 border-l-2 border-red-500/40 space-y-2 text-zinc-400">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>

						<div>
							<p className="text-zinc-500">
								<span className="text-teal-400">➜</span>{" "}
								<span className="text-zinc-300">
									verifyafrica deploy --region=africa --mode=unified
								</span>
							</p>
							<div className="mt-3 pl-4 border-l-2 border-teal-500/40 space-y-2 text-zinc-300">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>

						<p className="text-teal-400/90">
							<span className="text-zinc-600"># </span>
							{solutionHighlight}
						</p>
						<p className="text-zinc-600">
							<span className="text-teal-400">➜</span>{" "}
							<span className="animate-pulse">_</span>
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function ProblemSolutionDiagonal() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

	return (
		<section ref={ref} className="relative overflow-hidden">
			<DesignLabel>Option 19 — Diagonal cut · dynamic split layout</DesignLabel>

			<div className="relative min-h-[640px] sm:min-h-[720px]">
				<div
					className={`absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-red-950 transition-all duration-1000 ease-out ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
					style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 100%)" }}
				>
					<div
						className={`max-w-xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-28 transition-all duration-700 delay-100 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-300/70 mb-4">
							The Problem
						</p>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
							Every market speaks a different compliance language
						</h2>
						<div className="space-y-3 text-sm sm:text-base text-red-100/85 leading-relaxed">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
					</div>
				</div>

				<div
					className={`absolute inset-0 bg-gradient-to-tl from-teal-50 via-white to-cyan-50 transition-all duration-1000 ease-out delay-150 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
					style={{ clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 100%)" }}
				>
					<div
						className={`ml-auto max-w-xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-28 lg:pt-32 transition-all duration-700 delay-300 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-600/70 mb-4">
							The VerifyAfrica Solution
						</p>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-6 leading-tight">
							One API. Audit-ready everywhere.
						</h2>
						<div className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<p className="mt-6 text-xs sm:text-sm text-teal-800/80 border-l-2 border-teal-500 pl-4">
							{solutionHighlight}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionMarquee() {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="py-16 sm:py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 20 — Marquee bridge · motion typography strip</DesignLabel>

				<div
					className={`mb-10 sm:mb-14 transition-all duration-700 ease-out ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
						Bridging every registry
					</h2>
					<p className="mt-3 text-center text-sm text-zinc-500 max-w-lg mx-auto">
						Problem and solution connected by a live stream of African
						compliance contexts.
					</p>
				</div>

				<Card
					className={`gap-0 border-zinc-800 bg-zinc-900/50 py-0 ring-0 transition-all duration-700 ease-out delay-100 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<CardHeader className="border-b border-zinc-800 px-6 py-6 sm:px-8">
						<div className="flex items-center gap-2 text-red-400 mb-1">
							<AlertTriangle className="h-4 w-4" />
							<span className="text-xs font-semibold uppercase tracking-wider">
								The Problem
							</span>
						</div>
						<CardTitle className="text-xl sm:text-2xl font-bold text-white">
							Fragmented identity rails
						</CardTitle>
					</CardHeader>
					<CardContent className="px-6 py-6 sm:px-8 space-y-3 text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
						{problemParagraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 32)}>{paragraph}</p>
						))}
					</CardContent>
				</Card>

				<MarqueeStrip className="my-6 sm:my-8 py-4 border-y border-zinc-800 bg-zinc-900/80" />

				<Card
					className={`gap-0 border-teal-500/30 bg-teal-950/20 py-0 ring-1 ring-teal-500/20 transition-all duration-700 ease-out delay-200 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<CardHeader className="border-b border-teal-500/20 px-6 py-6 sm:px-8">
						<div className="flex items-center gap-2 text-teal-400 mb-1">
							<ShieldCheck className="h-4 w-4" />
							<span className="text-xs font-semibold uppercase tracking-wider">
								The VerifyAfrica Solution
							</span>
						</div>
						<CardTitle className="text-xl sm:text-2xl font-bold text-white">
							Unified compliance layer
						</CardTitle>
					</CardHeader>
					<CardContent className="px-6 py-6 sm:px-8 space-y-3 text-sm sm:text-[15px] text-zinc-300 leading-relaxed">
						{solutionParagraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 32)}>{paragraph}</p>
						))}
					</CardContent>
					<CardFooter className="border-t border-teal-500/20 px-6 py-4 sm:px-8 text-xs sm:text-sm text-teal-400/90">
						{solutionHighlight}
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}

function ProblemSolutionSecurityPanel() {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
		threshold: 0.2,
	});
	const { ref: panelRef, isVisible: panelVisible } = useScrollAnimation({
		threshold: 0.15,
	});

	return (
		<section
			ref={headerRef}
			className="py-12 sm:py-16 lg:py-24 bg-black text-white overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 21 — Security panel · matches Security section</DesignLabel>

				<div
					className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ease-out ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-4 sm:mb-5">
						Built for Africa&apos;s compliance reality
					</h2>
					<p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
						From fragmented national systems to a single audit-ready platform.
					</p>
				</div>

				<div
					ref={panelRef}
					className={`rounded-2xl sm:rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden transition-all duration-700 ease-out delay-150 ${
						panelVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div
							className="flex flex-col p-6 sm:p-8 lg:p-10 min-h-[320px] border-b md:border-b-0 md:border-r border-white/10"
							style={{
								opacity: panelVisible ? 1 : 0,
								transform: panelVisible ? "translateY(0)" : "translateY(20px)",
								transition: "all 0.5s ease-out 250ms",
							}}
						>
							<h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
								The Problem
							</h3>
							<div className="space-y-4 text-sm sm:text-[0.9375rem] text-zinc-400 leading-relaxed flex-1">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
							<div className="mt-8 sm:mt-10 pt-4">
								<AlertTriangle
									className="w-10 h-10 sm:w-12 sm:h-12 text-red-400/90 stroke-[1.25]"
									aria-hidden
								/>
							</div>
						</div>

						<div
							className="flex flex-col p-6 sm:p-8 lg:p-10 min-h-[320px]"
							style={{
								opacity: panelVisible ? 1 : 0,
								transform: panelVisible ? "translateY(0)" : "translateY(20px)",
								transition: "all 0.5s ease-out 370ms",
							}}
						>
							<h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
								The VerifyAfrica Solution
							</h3>
							<div className="space-y-4 text-sm sm:text-[0.9375rem] text-zinc-400 leading-relaxed flex-1">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
							<div className="mt-8 sm:mt-10 pt-4 border-t border-white/10">
								<div className="flex items-start gap-3">
									<ShieldCheck
										className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400 stroke-[1.25] shrink-0"
										aria-hidden
									/>
									<p className="text-xs sm:text-sm text-zinc-500 leading-relaxed pt-1">
										{solutionHighlight}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionClassicGrid() {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
		threshold: 0.2,
	});
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 22 — Classic grid · original brand layout</DesignLabel>

				<div
					ref={headerRef}
					className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-2 sm:mb-4">
						The challenge — and our answer
					</h2>
					<p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
						Why generic compliance tools fall short across African markets
					</p>
				</div>

				<div
					ref={ref}
					className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
				>
					<div
						className={`lg:col-span-2 bg-linear-to-br from-red-900 to-red-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white transition-all duration-700 ease-out ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-16"
						}`}
					>
						<h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
							The Problem
						</h3>
						<div className="space-y-4 text-red-100 leading-relaxed text-sm sm:text-base">
							{problemParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
					</div>

					<div
						className={`lg:col-span-3 bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 border border-teal-100 transition-all duration-700 ease-out delay-200 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-16"
						}`}
					>
						<h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-secondary">
							The VerifyAfrica Solution
						</h3>
						<div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
							{solutionParagraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
						<div
							className={`mt-6 sm:mt-8 flex items-start gap-3 transition-all duration-500 delay-500 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500 shrink-0" />
							<p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
								{solutionHighlight}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionHowItWorks() {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
		threshold: 0.2,
	});
	const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
		threshold: 0.2,
	});

	return (
		<section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 23 — How It Works pairing · light + dark cards</DesignLabel>

				<div
					ref={headerRef}
					className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-2 sm:mb-4">
						From complexity to clarity
					</h2>
					<p className="text-sm sm:text-base lg:text-xl text-gray-600 px-2">
						What teams face today — and how VerifyAfrica resolves it
					</p>
				</div>

				<div
					ref={cardsRef}
					className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8"
				>
					<div
						className={`group relative flex-1 flex flex-col rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-10 overflow-hidden bg-linear-to-br from-teal-50 to-cyan-50 border border-teal-100 ${
							cardsVisible
								? "opacity-100 translate-y-0 rotate-0"
								: "opacity-0 translate-y-12 -rotate-1"
						}`}
						style={{
							transition:
								"all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
						}}
					>
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
							<div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-teal-200/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
						</div>
						<div className="relative">
							<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/80 border border-teal-100 mb-4 sm:mb-6">
								<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold text-secondary mb-3 sm:mb-4">
								The Problem
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>

					<div
						className={`group relative flex-1 flex flex-col rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-10 overflow-hidden bg-linear-to-br from-secondary to-gray-800 text-white ${
							cardsVisible
								? "opacity-100 translate-y-0 rotate-0"
								: "opacity-0 translate-y-12 rotate-1"
						}`}
						style={{
							transition:
								"all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 150ms",
						}}
					>
						<div className="relative">
							<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/10 mb-4 sm:mb-6">
								<ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
								The VerifyAfrica Solution
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
								{solutionParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
							<div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-3">
								<Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
								<p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
									{solutionHighlight}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProblemSolutionPricingCards() {
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
		threshold: 0.2,
	});
	const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
		threshold: 0.2,
	});

	const solutionBullets = [
		"Document verification & biometric liveness",
		"AML screening, PEP checks & ongoing monitoring",
		"Timestamped audit trail for African regulators",
		"API integration or hosted Link Mode",
	];

	return (
		<section className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				<DesignLabel>Option 24 — Pricing cards · shadcn tier layout</DesignLabel>

				<div
					ref={headerRef}
					className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
						headerVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-2 sm:mb-4">
						Why teams switch to VerifyAfrica
					</h2>
					<p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
						Compare the status quo against a platform built for the continent
					</p>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto"
				>
					<Card
						className="flex flex-col border-2 border-gray-200 ring-0 hover:border-secondary/30 transition-colors"
						style={{
							opacity: cardsVisible ? 1 : 0,
							transform: cardsVisible
								? "translateY(0) scale(1)"
								: "translateY(50px) scale(0.95)",
							transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
						}}
					>
						<CardHeader className="p-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
									<AlertTriangle className="w-4 h-4 text-secondary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									The Problem
								</CardTitle>
							</div>
							<CardDescription>
								Fragmented identity and compliance across 54 countries
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 p-6 pt-0">
							<div className="space-y-4 text-sm text-gray-700 leading-relaxed">
								{problemParagraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						</CardContent>
					</Card>

					<Card
						className="flex flex-col border-2 border-teal-500 bg-linear-to-br from-teal-50 via-white to-secondary/5 shadow-lg shadow-teal-500/10 ring-0 overflow-visible relative"
						style={{
							opacity: cardsVisible ? 1 : 0,
							transform: cardsVisible
								? "translateY(0) scale(1)"
								: "translateY(50px) scale(0.95)",
							transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 150ms",
						}}
					>
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
								Our approach
							</span>
						</div>
						<CardHeader className="p-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/15">
									<ShieldCheck className="w-4 h-4 text-teal-600" />
								</div>
								<CardTitle className="text-xl text-secondary">
									The VerifyAfrica Solution
								</CardTitle>
							</div>
							<CardDescription>
								One platform for verification, screening, and audit-ready
								compliance
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 p-6 pt-0">
							<p className="text-sm text-gray-700 leading-relaxed mb-4">
								{solutionParagraphs[0]}
							</p>
							<ul className="space-y-3">
								{solutionBullets.map((item) => (
									<li
										key={item}
										className="flex items-center gap-3 text-sm text-gray-700"
									>
										<Check className="h-4 w-4 text-teal-500 shrink-0" />
										{item}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter className="p-6 pt-0">
							<p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-teal-100 pt-4 w-full">
								{solutionParagraphs[1]} {solutionParagraphs[2]}
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}

export default function ProblemSolution() {
	return (
		<>
			<ProblemSolutionCards />
			<ProblemSolutionStacked />
			<ProblemSolutionAccordion />
			<ProblemSolutionSwissGrid />
			<ProblemSolutionBento />
			<ProblemSolutionGlassAurora />
			<ProblemSolutionCinematicSplit />
			<ProblemSolutionTimeline />
			<ProblemSolutionBrutalist />
			<ProblemSolutionOverlap />
			<ProblemSolutionEditorial />
			<ProblemSolutionCompareSlider />
			<ProblemSolutionStickySidebar />
			<ProblemSolutionProcessRail />
			<ProblemSolutionBlueprint />
			<ProblemSolutionNeon />
			<ProblemSolutionDeck />
			<ProblemSolutionTerminal />
			<ProblemSolutionDiagonal />
			<ProblemSolutionMarquee />
			<ProblemSolutionSecurityPanel />
			<ProblemSolutionClassicGrid />
			<ProblemSolutionHowItWorks />
			<ProblemSolutionPricingCards />
		</>
	);
}
