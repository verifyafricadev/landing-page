import {
	ArrowRight,
	BarChart3,
	Check,
	Monitor,
	ShieldCheck,
	Sparkles,
	TrendingUp,
	Zap,
	type LucideIcon,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface UseCaseCardData {
	category: string;
	icon: LucideIcon;
	color: string;
	description: string;
	useCases: string[];
	benefits: { metric: string; label: string }[];
	image: string;
	onClick: () => void;
}

function CardInteractive({
	className,
	onClick,
	children,
}: {
	className?: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Card
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			className={cn("group cursor-pointer", className)}
		>
			{children}
		</Card>
	);
}

/** V1 — Editorial cover: cinematic image, title overlay, stats ribbon */
export function UseCaseCardV1({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
		>
			<div className="relative h-52 overflow-hidden">
				<img
					src={image}
					alt={category}
					className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/30 to-transparent" />
				<div
					className={cn(
						"absolute top-5 left-5 flex size-12 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg",
						color,
					)}
				>
					<Icon className="size-5 text-white" />
				</div>
				<div className="absolute right-5 bottom-5 left-5">
					<p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-teal-300 uppercase">
						Industry
					</p>
					<CardTitle className="text-xl font-bold text-white leading-tight">
						{category}
					</CardTitle>
				</div>
			</div>

			<CardHeader className="px-6 pt-6 pb-0">
				<CardDescription className="text-sm leading-relaxed text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="px-6 pt-5 pb-0">
				<div className="flex flex-wrap gap-2">
					{useCases.slice(0, 3).map((item) => (
						<span
							key={item}
							className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
						>
							{item}
						</span>
					))}
				</div>
				<div className="mt-5 flex items-stretch divide-x divide-teal-100 rounded-xl bg-teal-50/80 px-2 py-4">
					{benefits.slice(0, 3).map((benefit) => (
						<div
							key={benefit.label}
							className="flex-1 px-2 text-center"
						>
							<div className="text-lg font-bold text-teal-600">
								{benefit.metric}
							</div>
							<div className="mt-0.5 text-[11px] text-gray-500">
								{benefit.label}
							</div>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="border-0 bg-transparent px-6 pt-5 pb-6">
				<Button
					variant="link"
					className="h-auto w-full justify-between p-0 font-semibold text-teal-600 hover:text-teal-700"
					tabIndex={-1}
				>
					Explore use cases
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V2 — Split panel: image + content side-by-side */
export function UseCaseCardV2({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:border-teal-100 hover:shadow-lg"
		>
			<div className="flex flex-col md:flex-row">
				<div className="relative h-48 shrink-0 overflow-hidden md:h-auto md:w-[42%]">
					<img
						src={image}
						alt={category}
						className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-secondary/20 md:bg-transparent" />
				</div>

				<div className="flex flex-1 flex-col p-6">
					<div className="mb-4 flex items-start gap-4">
						<div
							className={cn(
								"flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br",
								color,
							)}
						>
							<Icon className="size-5 text-white" />
						</div>
						<div>
							<CardTitle className="text-lg font-bold text-secondary leading-snug">
								{category}
							</CardTitle>
							<CardDescription className="mt-2 line-clamp-3 text-sm text-gray-600">
								{description}
							</CardDescription>
						</div>
					</div>

					<ul className="mb-5 space-y-2">
						{useCases.slice(0, 3).map((item) => (
							<li
								key={item}
								className="flex items-start gap-2 text-sm text-gray-600"
							>
								<Check className="mt-0.5 size-4 shrink-0 text-teal-500" />
								<span className="line-clamp-1">{item}</span>
							</li>
						))}
					</ul>

					<div className="mt-auto flex flex-wrap gap-4 border-t border-gray-100 pt-4">
						{benefits.slice(0, 3).map((benefit) => (
							<div key={benefit.label}>
								<div className="text-base font-bold text-teal-600">
									{benefit.metric}
								</div>
								<div className="text-xs text-gray-500">{benefit.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</CardInteractive>
	);
}

/** V3 — Glass overlay: full-bleed image with frosted content panel */
export function UseCaseCardV3({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="relative h-[420px] gap-0 overflow-hidden border-0 bg-secondary py-0 shadow-none ring-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
		>
			<img
				src={image}
				alt={category}
				className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-secondary/10" />

			<div className="relative flex h-full flex-col justify-end p-5">
				<div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15">
					<div className="mb-3 flex items-center gap-3">
						<div
							className={cn(
								"flex size-10 items-center justify-center rounded-xl bg-linear-to-br",
								color,
							)}
						>
							<Icon className="size-4 text-white" />
						</div>
						<CardTitle className="text-lg font-bold text-white">
							{category}
						</CardTitle>
					</div>
					<p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/80">
						{description}
					</p>
					<div className="mb-4 flex gap-3">
						{benefits.slice(0, 3).map((benefit) => (
							<div
								key={benefit.label}
								className="flex-1 rounded-lg bg-white/10 px-2 py-2 text-center"
							>
								<div className="text-sm font-bold text-teal-300">
									{benefit.metric}
								</div>
								<div className="text-[10px] text-white/60">{benefit.label}</div>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between">
						<span className="text-xs text-white/50">
							{useCases.length} use cases
						</span>
						<ArrowRight className="size-4 text-teal-300 transition-transform group-hover:translate-x-1" />
					</div>
				</div>
			</div>
		</CardInteractive>
	);
}

/** V4 — Metric-first: gradient band, dashboard-style stats */
export function UseCaseCardV4({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
		>
			<div className={cn("bg-linear-to-r px-6 py-5", color)}>
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
						<Icon className="size-5 text-white" />
					</div>
					<CardTitle className="text-lg font-bold text-white">
						{category}
					</CardTitle>
				</div>
			</div>

			<CardContent className="px-6 pt-5 pb-0">
				<div className="grid grid-cols-3 gap-3">
					{benefits.slice(0, 3).map((benefit) => (
						<div
							key={benefit.label}
							className="rounded-xl border border-gray-100 bg-gray-50 px-2 py-3 text-center"
						>
							<div className="text-xl font-bold text-secondary">
								{benefit.metric}
							</div>
							<div className="mt-1 text-[10px] font-medium text-gray-500 uppercase tracking-wide">
								{benefit.label}
							</div>
						</div>
					))}
				</div>

				<p className="mt-5 text-sm leading-relaxed text-gray-600">
					{description}
				</p>

				<div className="relative mt-5 h-28 overflow-hidden rounded-xl">
					<img
						src={image}
						alt={category}
						className="h-full w-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-secondary/60 to-transparent" />
				</div>

				<div className="mt-4 flex flex-wrap gap-1.5">
					{useCases.slice(0, 2).map((item) => (
						<span
							key={item}
							className="rounded-md bg-teal-50 px-2 py-1 text-[11px] font-medium text-teal-700"
						>
							{item}
						</span>
					))}
					{useCases.length > 2 && (
						<span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
							+{useCases.length - 2}
						</span>
					)}
				</div>
			</CardContent>

			<CardFooter className="mt-auto border-t border-gray-100 bg-gray-50/50 px-6 py-4">
				<Button
					variant="link"
					className="h-auto w-full justify-between p-0 text-sm font-semibold text-teal-600"
					tabIndex={-1}
				>
					View details
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V5 — Bento minimal: typographic, whitespace-forward */
export function UseCaseCardV5({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-[#f6f6f4] py-0 shadow-none ring-0 transition-all duration-300 hover:border-teal-200 hover:bg-white hover:shadow-lg"
		>
			<CardHeader className="gap-4 px-6 pt-6 pb-0">
				<div className="flex items-center gap-4">
					<div className="relative size-14 shrink-0">
						<div className="size-14 overflow-hidden rounded-2xl ring-2 ring-white">
							<img
								src={image}
								alt=""
								className="h-full w-full object-cover object-top"
							/>
						</div>
						<div
							className={cn(
								"absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-lg bg-linear-to-br shadow-md",
								color,
							)}
						>
							<Icon className="size-4 text-white" />
						</div>
					</div>
					<div className="min-w-0">
						<p className="text-[11px] font-semibold tracking-widest text-teal-600 uppercase">
							Use case
						</p>
						<CardTitle className="mt-1 text-base font-bold text-secondary leading-snug">
							{category}
						</CardTitle>
					</div>
				</div>
				<CardDescription className="text-sm leading-relaxed text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="px-6 pt-5 pb-0">
				<div className="space-y-2.5">
					{useCases.slice(0, 3).map((item) => (
						<div
							key={item}
							className="flex items-center gap-3 rounded-lg border border-gray-200/80 bg-white px-3 py-2.5"
						>
							<div className="size-1.5 shrink-0 rounded-full bg-teal-500" />
							<span className="line-clamp-1 text-sm text-gray-700">{item}</span>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="flex-col items-stretch gap-4 border-0 bg-transparent px-6 pt-5 pb-6">
				<div className="flex justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-gray-200/80">
					{benefits.slice(0, 3).map((benefit, i) => (
						<div
							key={benefit.label}
							className={cn(
								"text-center",
								i > 0 && "border-l border-gray-100 pl-4",
							)}
						>
							<div className="text-sm font-bold text-teal-600">
								{benefit.metric}
							</div>
							<div className="text-[10px] text-gray-500">{benefit.label}</div>
						</div>
					))}
				</div>
				<Button
					variant="outline"
					className="h-auto w-full justify-between border-gray-200 py-2.5 text-secondary hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
					tabIndex={-1}
				>
					View details
					<ArrowRight className="size-4" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V6 — Stripe clarity: one hero metric, minimal friction, trust through simplicity */
export function UseCaseCardV6({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	onClick,
}: UseCaseCardData) {
	const hero = benefits[0];

	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
		>
			<CardHeader className="gap-5 px-6 pt-7 pb-0">
				<div className="flex items-center gap-3">
					<div
						className={cn(
							"flex size-10 items-center justify-center rounded-lg bg-linear-to-br",
							color,
						)}
					>
						<Icon className="size-5 text-white" />
					</div>
					<span className="text-xs font-medium text-gray-400">{category}</span>
				</div>

				{hero && (
					<div>
						<div className="text-4xl font-bold tracking-tight text-secondary">
							{hero.metric}
						</div>
						<p className="mt-1 text-sm font-medium text-teal-600">
							{hero.label}
						</p>
					</div>
				)}

				<CardDescription className="line-clamp-3 text-sm leading-relaxed text-gray-500">
					{description}
				</CardDescription>
			</CardHeader>

			<CardFooter className="mt-auto border-0 bg-transparent px-6 pt-6 pb-7">
				<Button
					variant="link"
					className="h-auto gap-1.5 p-0 text-sm font-medium text-secondary hover:text-teal-600"
					tabIndex={-1}
				>
					Learn more
					<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V7 — Ramp ROI hero: outcome number dominates, solid CTA drives action */
export function UseCaseCardV7({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	const hero = benefits[0];

	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:shadow-lg"
		>
			<CardContent className="px-6 pt-7 pb-0">
				{hero && (
					<div className="mb-5">
						<p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
							Proven outcome
						</p>
						<div className="mt-2 flex items-end gap-2">
							<span className="text-5xl font-bold leading-none tracking-tight text-secondary">
								{hero.metric}
							</span>
							<span className="mb-1.5 text-sm font-medium text-gray-500">
								{hero.label}
							</span>
						</div>
						<div
							className={cn(
								"mt-4 h-1 w-full rounded-full bg-linear-to-r",
								color,
							)}
						/>
					</div>
				)}

				<div className="flex items-center gap-3">
					<div
						className={cn(
							"flex size-9 items-center justify-center rounded-lg bg-linear-to-br",
							color,
						)}
					>
						<Icon className="size-4 text-white" />
					</div>
					<CardTitle className="text-base font-bold text-secondary">
						{category}
					</CardTitle>
				</div>

				<p className="mt-3 line-clamp-2 text-sm text-gray-500">{description}</p>

				<div className="mt-5 flex gap-4">
					{benefits.slice(1, 3).map((benefit) => (
						<div key={benefit.label}>
							<div className="text-sm font-bold text-teal-600">
								{benefit.metric}
							</div>
							<div className="text-[10px] text-gray-400">{benefit.label}</div>
						</div>
					))}
				</div>

				<div className="relative mt-5 h-20 overflow-hidden rounded-lg">
					<img
						src={image}
						alt=""
						className="h-full w-full object-cover object-top opacity-60"
					/>
				</div>
			</CardContent>

			<CardFooter className="border-0 bg-transparent px-6 pt-4 pb-6">
				<Button
					className="h-auto w-full bg-teal-600 py-2.5 text-white hover:bg-teal-700"
					tabIndex={-1}
				>
					See results
					<ArrowRight className="size-4" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V8 — HubSpot proof: accent bar, outcome bullets, results badge */
export function UseCaseCardV8({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	onClick,
}: UseCaseCardData) {
	const hero = benefits[0];

	return (
		<CardInteractive
			onClick={onClick}
			className="relative h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 pl-1 shadow-none ring-0 transition-all duration-300 hover:shadow-md"
		>
			<div
				className={cn("absolute top-0 left-0 h-full w-1 bg-linear-to-b", color)}
			/>

			<CardHeader className="gap-4 px-6 pt-6 pb-0">
				<span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-700">
					<ShieldCheck className="size-3" />
					Customer story
				</span>

				<div className="flex items-start gap-3">
					<div
						className={cn(
							"flex size-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br",
							color,
						)}
					>
						<Icon className="size-5 text-white" />
					</div>
					<CardTitle className="text-lg font-bold text-secondary leading-snug">
						{category}
					</CardTitle>
				</div>

				<CardDescription className="text-sm leading-relaxed text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="px-6 pt-4 pb-0">
				<p className="mb-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
					Key outcomes
				</p>
				<ul className="space-y-2.5">
					{useCases.slice(0, 3).map((item) => (
						<li
							key={item}
							className="flex items-start gap-2.5 text-sm text-gray-700"
						>
							<div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
								<Check className="size-3 text-emerald-600" />
							</div>
							<span className="line-clamp-2">{item}</span>
						</li>
					))}
				</ul>
			</CardContent>

			<CardFooter className="mt-auto flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-6 py-4">
				{hero && (
					<div className="flex items-center gap-2">
						<TrendingUp className="size-4 text-teal-600" />
						<div>
							<span className="text-lg font-bold text-teal-600">
								{hero.metric}
							</span>
							<span className="ml-1.5 text-xs text-gray-500">
								{hero.label}
							</span>
						</div>
					</div>
				)}
				<ArrowRight className="size-4 text-teal-600 transition-transform group-hover:translate-x-1" />
			</CardFooter>
		</CardInteractive>
	);
}

/** V9 — Webflow reveal: image-first, hover exposes copy + CTA */
export function UseCaseCardV9({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="relative h-[400px] gap-0 overflow-hidden border-0 bg-secondary py-0 shadow-none ring-0"
		>
			<img
				src={image}
				alt={category}
				className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
			/>

			{/* Default state */}
			<div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-secondary/80 via-secondary/20 to-transparent p-6 transition-opacity duration-300 group-hover:opacity-0">
				<div
					className={cn(
						"flex size-12 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg",
						color,
					)}
				>
					<Icon className="size-5 text-white" />
				</div>
				<CardTitle className="text-xl font-bold text-white">{category}</CardTitle>
			</div>

			{/* Hover reveal */}
			<div className="absolute inset-0 flex translate-y-4 flex-col justify-end bg-secondary/90 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
				<CardTitle className="text-lg font-bold text-white">{category}</CardTitle>
				<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">
					{description}
				</p>
				<div className="mt-4 flex gap-3">
					{benefits.slice(0, 2).map((benefit) => (
						<div
							key={benefit.label}
							className="rounded-lg bg-white/10 px-3 py-2"
						>
							<div className="text-sm font-bold text-teal-300">
								{benefit.metric}
							</div>
							<div className="text-[10px] text-white/50">{benefit.label}</div>
						</div>
					))}
				</div>
				<Button
					className="mt-5 h-auto w-full bg-teal-500 py-2.5 text-white hover:bg-teal-400"
					tabIndex={-1}
				>
					Explore solution
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</CardInteractive>
	);
}

/** V10 — Intercom narrative: challenge → outcome framing with primary CTA */
export function UseCaseCardV10({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	const hero = benefits[0];

	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:border-teal-100 hover:shadow-lg"
		>
			<div className="bg-gray-50 px-6 py-5">
				<p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
					The challenge
				</p>
				<p className="mt-2 text-sm leading-relaxed text-gray-600">
					{description}
				</p>
			</div>

			<CardContent className="px-6 pt-5 pb-0">
				<p className="text-[11px] font-semibold tracking-widest text-teal-600 uppercase">
					The outcome
				</p>

				{hero && (
					<div className="mt-3 flex items-baseline gap-2">
						<span className="text-3xl font-bold text-secondary">
							{hero.metric}
						</span>
						<span className="text-sm text-gray-500">{hero.label}</span>
					</div>
				)}

				<div className="mt-4 flex items-center gap-3">
					<div
						className={cn(
							"flex size-9 items-center justify-center rounded-lg bg-linear-to-br",
							color,
						)}
					>
						<Icon className="size-4 text-white" />
					</div>
					<span className="text-sm font-semibold text-secondary">{category}</span>
				</div>

				<div className="relative mt-4 h-24 overflow-hidden rounded-xl">
					<img
						src={image}
						alt=""
						className="h-full w-full object-cover object-top"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-white/80 to-transparent" />
					<div className="absolute bottom-3 left-3 flex gap-3">
						{benefits.slice(1, 3).map((benefit) => (
							<div
								key={benefit.label}
								className="rounded-md bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm"
							>
								<span className="text-xs font-bold text-teal-600">
									{benefit.metric}
								</span>
								<span className="ml-1 text-[10px] text-gray-500">
									{benefit.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className="border-0 bg-transparent px-6 pt-4 pb-6">
				<Button
					className="h-auto w-full bg-secondary py-2.5 text-white hover:bg-secondary/90"
					tabIndex={-1}
				>
					See how it works
					<ArrowRight className="size-4" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V11 — Linear dark glow: dev-tool aesthetic, glowing border on hover */
export function UseCaseCardV11({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-secondary/80 bg-secondary py-0 shadow-none ring-1 ring-white/10 transition-all duration-300 hover:ring-teal-500/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]"
		>
			<CardHeader className="gap-4 px-6 pt-6 pb-0">
				<div className="flex items-center justify-between">
					<div
						className={cn(
							"flex size-10 items-center justify-center rounded-lg bg-linear-to-br shadow-[0_0_20px_rgba(20,184,166,0.3)]",
							color,
						)}
					>
						<Icon className="size-5 text-white" />
					</div>
					<Sparkles className="size-4 text-teal-400/60" />
				</div>
				<CardTitle className="text-lg font-bold text-white">{category}</CardTitle>
				<CardDescription className="line-clamp-2 text-sm leading-relaxed text-white/55">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="px-6 pt-5 pb-0">
				<div className="flex flex-wrap gap-2">
					{benefits.slice(0, 3).map((benefit) => (
						<span
							key={benefit.label}
							className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs"
						>
							<span className="font-bold text-teal-300">{benefit.metric}</span>
							<span className="ml-1 text-white/40">{benefit.label}</span>
						</span>
					))}
				</div>
			</CardContent>

			<CardFooter className="mt-auto border-t border-white/10 px-6 py-4">
				<Button
					variant="ghost"
					className="h-auto w-full justify-between p-0 text-sm font-medium text-white/70 hover:bg-transparent hover:text-teal-300"
					tabIndex={-1}
				>
					Open use case
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V12 — Atlassian marketplace: centered icon, scannable feature grid */
export function UseCaseCardV12({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 text-center shadow-none ring-0 transition-all duration-300 hover:border-teal-200 hover:shadow-md"
		>
			<CardHeader className="items-center gap-3 px-6 pt-8 pb-0">
				<div
					className={cn(
						"mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br shadow-md",
						color,
					)}
				>
					<Icon className="size-7 text-white" />
				</div>
				<CardTitle className="text-base font-bold text-secondary">
					{category}
				</CardTitle>
				<CardDescription className="line-clamp-2 text-sm text-gray-500">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="px-6 pt-5 pb-0">
				<div className="flex items-center justify-center divide-x divide-gray-200 rounded-xl border border-gray-100 bg-gray-50 py-3">
					{benefits.slice(0, 3).map((benefit) => (
						<div
							key={benefit.label}
							className="flex-1 px-2"
						>
							<div className="text-base font-bold text-teal-600">
								{benefit.metric}
							</div>
							<div className="text-[10px] text-gray-400">{benefit.label}</div>
						</div>
					))}
				</div>
				<p className="mt-4 text-[11px] font-medium text-gray-400">
					{useCases.length} compliance workflows included
				</p>
			</CardContent>

			<CardFooter className="border-0 bg-transparent px-6 pt-4 pb-7">
				<Button
					variant="outline"
					className="h-auto w-full border-gray-200 py-2.5 text-secondary hover:border-teal-300 hover:bg-teal-50"
					tabIndex={-1}
				>
					View integration
					<ArrowRight className="size-4" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V13 — Shopify merchant win: before/after transformation */
export function UseCaseCardV13({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	const hero = benefits[0];

	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:shadow-lg"
		>
			<CardContent className="px-6 pt-6 pb-0">
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-4">
						<p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
							Before
						</p>
						<p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-4">
							{description}
						</p>
					</div>
					<div
						className={cn(
							"rounded-xl bg-linear-to-br px-3 py-4 text-white",
							color,
						)}
					>
						<p className="text-[10px] font-semibold tracking-wider text-white/70 uppercase">
							After
						</p>
						{hero && (
							<>
								<p className="mt-2 text-2xl font-bold">{hero.metric}</p>
								<p className="text-[11px] text-white/80">{hero.label}</p>
							</>
						)}
					</div>
				</div>

				<div className="mt-4 flex items-center gap-3">
					<div
						className={cn(
							"flex size-8 items-center justify-center rounded-lg bg-linear-to-br",
							color,
						)}
					>
						<Icon className="size-4 text-white" />
					</div>
					<span className="text-sm font-bold text-secondary">{category}</span>
				</div>

				<div className="relative mt-4 h-24 overflow-hidden rounded-xl">
					<img
						src={image}
						alt=""
						className="h-full w-full object-cover object-top"
					/>
				</div>

				<div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
					<Zap className="size-3.5" />
					<span className="font-medium">Verified results from live deployments</span>
				</div>
			</CardContent>

			<CardFooter className="border-t border-gray-100 px-6 py-4">
				<Button
					variant="link"
					className="h-auto w-full justify-between p-0 font-semibold text-teal-600"
					tabIndex={-1}
				>
					Read merchant story
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</CardFooter>
		</CardInteractive>
	);
}

/** V14 — Figma product window: screenshot in browser chrome */
export function UseCaseCardV14({
	category,
	icon: Icon,
	color,
	description,
	useCases,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-gray-200 bg-[#f6f6f4] py-0 shadow-none ring-0 transition-all duration-300 hover:bg-white hover:shadow-lg"
		>
			<CardContent className="px-5 pt-5 pb-0">
				<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
					<div className="flex items-center gap-1.5 border-b border-gray-100 px-3 py-2">
						<div className="size-2.5 rounded-full bg-red-400/80" />
						<div className="size-2.5 rounded-full bg-amber-400/80" />
						<div className="size-2.5 rounded-full bg-emerald-400/80" />
						<div className="ml-2 flex-1 rounded-md bg-gray-100 px-2 py-0.5">
							<span className="text-[10px] text-gray-400">verifyafrica.io</span>
						</div>
					</div>
					<div className="relative h-36 overflow-hidden">
						<img
							src={image}
							alt={category}
							className="h-full w-full object-cover object-top"
						/>
						<div
							className={cn(
								"absolute bottom-3 left-3 flex size-8 items-center justify-center rounded-lg bg-linear-to-br shadow-md",
								color,
							)}
						>
							<Icon className="size-4 text-white" />
						</div>
					</div>
				</div>

				<CardTitle className="mt-4 text-base font-bold text-secondary">
					{category}
				</CardTitle>
				<p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{description}</p>

				<div className="mt-3 flex flex-wrap gap-1.5">
					{useCases.slice(0, 2).map((item) => (
						<span
							key={item}
							className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-gray-600 ring-1 ring-gray-200"
						>
							{item}
						</span>
					))}
				</div>
			</CardContent>

			<CardFooter className="mt-auto flex items-center justify-between border-0 bg-transparent px-5 pt-4 pb-5">
				<div className="flex items-center gap-3">
					{benefits.slice(0, 2).map((benefit) => (
						<div
							key={benefit.label}
							className="flex items-center gap-1"
						>
							<BarChart3 className="size-3 text-teal-500" />
							<span className="text-xs font-bold text-secondary">
								{benefit.metric}
							</span>
						</div>
					))}
				</div>
				<Monitor className="size-4 text-gray-400 transition-colors group-hover:text-teal-600" />
			</CardFooter>
		</CardInteractive>
	);
}

/** V15 — Airbnb listing: inset image, trust metrics row */
export function UseCaseCardV15({
	category,
	icon: Icon,
	color,
	description,
	benefits,
	image,
	onClick,
}: UseCaseCardData) {
	return (
		<CardInteractive
			onClick={onClick}
			className="h-full gap-0 overflow-hidden border-0 bg-white py-0 shadow-none ring-0 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
		>
			<CardContent className="p-4 pb-0">
				<div className="relative overflow-hidden rounded-2xl">
					<img
						src={image}
						alt={category}
						className="aspect-4/3 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
					/>
					<div
						className={cn(
							"absolute top-3 left-3 flex size-9 items-center justify-center rounded-full bg-linear-to-br shadow-lg",
							color,
						)}
					>
						<Icon className="size-4 text-white" />
					</div>
				</div>

				<div className="mt-3.5">
					<CardTitle className="text-base font-semibold text-secondary">
						{category}
					</CardTitle>
					<p className="mt-1 line-clamp-2 text-sm text-gray-500">{description}</p>
				</div>

				<div className="mt-3 flex items-center gap-1 text-sm">
					{benefits.slice(0, 3).map((benefit, i) => (
						<span
							key={benefit.label}
							className="flex items-center gap-1"
						>
							{i > 0 && <span className="mx-1 text-gray-300">·</span>}
							<span className="font-semibold text-secondary">
								{benefit.metric}
							</span>
							<span className="text-xs text-gray-400">{benefit.label}</span>
						</span>
					))}
				</div>
			</CardContent>

			<CardFooter className="border-0 bg-transparent px-4 pt-3 pb-4">
				<span className="text-sm font-semibold text-secondary underline-offset-4 group-hover:underline">
					Show details
				</span>
			</CardFooter>
		</CardInteractive>
	);
}

export const USE_CASE_CARD_VARIATIONS = [
	{
		id: 1,
		label: "Editorial Cover",
		description: "Cinematic hero image with stats ribbon — magazine-style storytelling.",
		Component: UseCaseCardV1,
	},
	{
		id: 2,
		label: "Split Panel",
		description: "Horizontal layout with checklist — scannable, product-page feel.",
		Component: UseCaseCardV2,
	},
	{
		id: 3,
		label: "Glass Overlay",
		description: "Full-bleed image with frosted panel — premium, Stripe-like depth.",
		Component: UseCaseCardV3,
	},
	{
		id: 4,
		label: "Metric First",
		description: "Stats-led with gradient header — dashboard confidence at a glance.",
		Component: UseCaseCardV4,
	},
	{
		id: 5,
		label: "Bento Minimal",
		description: "Typographic, whitespace-forward — calm Notion/Linear aesthetic.",
		Component: UseCaseCardV5,
	},
	{
		id: 6,
		label: "Stripe Clarity",
		description:
			"Single hero metric, ultra-minimal — reduces friction, builds trust (Stripe pattern).",
		Component: UseCaseCardV6,
	},
	{
		id: 7,
		label: "Ramp ROI Hero",
		description:
			"Outcome number dominates with solid CTA — ROI-first fintech conversion (Ramp/Brex).",
		Component: UseCaseCardV7,
	},
	{
		id: 8,
		label: "HubSpot Proof",
		description:
			"Accent bar + outcome checklist + results badge — social proof-led (HubSpot).",
		Component: UseCaseCardV8,
	},
	{
		id: 9,
		label: "Webflow Reveal",
		description:
			"Image-first with hover reveal + CTA — curiosity-driven engagement (Awwwards).",
		Component: UseCaseCardV9,
	},
	{
		id: 10,
		label: "Intercom Narrative",
		description:
			"Challenge → outcome framing with primary button — B2B story arc (Intercom).",
		Component: UseCaseCardV10,
	},
	{
		id: 11,
		label: "Linear Dark Glow",
		description:
			"Dark card with teal glow on hover — dev-tool trust and premium feel (Linear).",
		Component: UseCaseCardV11,
	},
	{
		id: 12,
		label: "Atlassian Marketplace",
		description:
			"Centered icon, stats band, outline CTA — app-store browse-and-install (Atlassian).",
		Component: UseCaseCardV12,
	},
	{
		id: 13,
		label: "Shopify Merchant Win",
		description:
			"Before/after split with hero outcome — transformation story (Shopify).",
		Component: UseCaseCardV13,
	},
	{
		id: 14,
		label: "Figma Product Window",
		description:
			"Screenshot in browser chrome — product-in-context showcase (Figma).",
		Component: UseCaseCardV14,
	},
	{
		id: 15,
		label: "Airbnb Listing",
		description:
			"Inset rounded image, inline trust metrics — familiar browse pattern (Airbnb).",
		Component: UseCaseCardV15,
	},
] as const;
