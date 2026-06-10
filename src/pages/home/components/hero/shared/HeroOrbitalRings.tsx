import { useEffect, useState } from "react";

interface RingConfig {
	sizeClass: string;
	radius: number;
	xlRadius: number;
	dots: number[];
	borderClass: string;
	dotClass: string;
	spinClass: string;
}

const RINGS: RingConfig[] = [
	{
		sizeClass: "h-[600px] w-[600px] xl:h-[800px] xl:w-[800px]",
		radius: 300,
		xlRadius: 400,
		dots: [0, 60, 120, 180, 240, 300],
		borderClass: "border-teal-400/20",
		dotClass: "h-2.5 w-2.5 bg-teal-400/60 xl:h-3 xl:w-3",
		spinClass: "animate-spin-slow",
	},
	{
		sizeClass: "h-[420px] w-[420px] xl:h-[600px] xl:w-[600px]",
		radius: 210,
		xlRadius: 300,
		dots: [0, 90, 180, 270],
		borderClass: "border-cyan-400/20",
		dotClass: "h-2 w-2 bg-cyan-400/60 xl:h-2.5 xl:w-2.5",
		spinClass: "animate-spin-medium-reverse",
	},
	{
		sizeClass: "h-[260px] w-[260px] xl:h-[400px] xl:w-[400px]",
		radius: 130,
		xlRadius: 200,
		dots: [0, 180],
		borderClass: "border-teal-300/20",
		dotClass: "h-1.5 w-1.5 bg-teal-300/60 xl:h-2 xl:w-2",
		spinClass: "animate-spin-fast",
	},
];

function useXlBreakpoint() {
	const [isXl, setIsXl] = useState(false);

	useEffect(() => {
		const media = window.matchMedia("(min-width: 1280px)");
		const update = () => setIsXl(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	return isXl;
}

function OrbitalDot({
	angle,
	radius,
	className,
}: {
	angle: number;
	radius: number;
	className: string;
}) {
	return (
		<div
			className={`absolute left-1/2 top-1/2 rounded-full ${className}`}
			style={{
				transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
				opacity: 0.6,
			}}
		/>
	);
}

function OrbitalRing({ config, radius }: { config: RingConfig; radius: number }) {
	return (
		<div
			className={`absolute rounded-full border ${config.sizeClass} ${config.borderClass} ${config.spinClass}`}
			style={{ willChange: "transform" }}
		>
			{config.dots.map((angle) => (
				<OrbitalDot
					key={angle}
					angle={angle}
					radius={radius}
					className={config.dotClass}
				/>
			))}
		</div>
	);
}

export default function HeroOrbitalRings() {
	const isXl = useXlBreakpoint();

	return (
		<div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
			{RINGS.map((config) => (
				<OrbitalRing
					key={config.spinClass}
					config={config}
					radius={isXl ? config.xlRadius : config.radius}
				/>
			))}
		</div>
	);
}
