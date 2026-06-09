import { useMemo } from "react";
import { countriesServed } from "@/mocks/caseStudies";
import { countryPositions, regionColors, HUB_CITIES } from "./africaMapData";

export type NodeVariant =
	| "default"
	| "pulse"
	| "settle"
	| "scan"
	| "constellation"
	| "minimal"
	| "sequential-pulse";

/** Fade-in / fade-out duration for each country pulse (ms) */
export const COUNTRY_PULSE_RISE_MS = 500;
export const COUNTRY_PULSE_FALL_MS = 500;
/** Delay between each country pulse start — creates ~2 overlapping pulses */
export const COUNTRY_PULSE_STAGGER_MS = 750;

interface CountryNodesProps {
	variant?: NodeVariant;
	animate?: boolean;
	size?: "sm" | "md" | "lg";
	showHubs?: boolean;
	className?: string;
	mobileReduced?: boolean;
	delayOffset?: number;
}

const regionOrder: Record<string, number> = {
	"North Africa": 0,
	"West Africa": 1,
	"Central Africa": 2,
	"East Africa": 3,
	"Southern Africa": 4,
};

export default function CountryNodes({
	variant = "default",
	animate = true,
	size = "md",
	showHubs = false,
	className = "",
	mobileReduced = false,
	delayOffset = 0,
}: CountryNodesProps) {
	const sizeClass =
		size === "sm"
			? "w-1 h-1"
			: size === "lg"
				? "w-2 h-2 lg:w-2.5 lg:h-2.5"
				: "w-1.5 h-1.5 lg:w-2 lg:h-2";

	const countries = mobileReduced
		? countriesServed.filter((_, i) => i % 2 === 0)
		: countriesServed;

	const pulseDurationS =
		(COUNTRY_PULSE_RISE_MS + COUNTRY_PULSE_FALL_MS) / 1000;
	const staggerS = COUNTRY_PULSE_STAGGER_MS / 1000;
	const cycleS = countries.length * staggerS;
	const pulseSlot = countries.length > 0 ? staggerS : 0.15;

	const pulseKeyframes = useMemo(() => {
		if (countries.length === 0) return "";
		const risePct = (COUNTRY_PULSE_RISE_MS / 1000 / cycleS) * 100;
		const fallPct = (pulseDurationS / cycleS) * 100;
		return `
			@keyframes country-sequential-pulse {
				0%, 100% {
					opacity: 0.12;
					transform: translate(-50%, -50%) scale(1);
					box-shadow: none;
				}
				${risePct}% {
					opacity: 1;
					transform: translate(-50%, -50%) scale(2.2);
					box-shadow: 0 0 12px var(--node-color, #14b8a6);
				}
				${fallPct}% {
					opacity: 0.12;
					transform: translate(-50%, -50%) scale(1);
					box-shadow: none;
				}
			}
		`;
	}, [countries.length, cycleS, pulseDurationS]);

	return (
		<>
			{variant === "sequential-pulse" && animate && pulseKeyframes ? (
				<style>{pulseKeyframes}</style>
			) : null}
			{countries.map((country, index) => {
				const position = countryPositions[country.code];
				if (!position) return null;

				const isHub = HUB_CITIES.includes(
					country.code as (typeof HUB_CITIES)[number],
				);
				const color = regionColors[country.region] ?? "#14b8a6";
				const regionDelay = (regionOrder[country.region] ?? 0) * 0.4;
				const staggerDelay = regionDelay + (index % 12) * 0.05;
				const scanDelay = position.y / 100;

				let animationClass = "";
				if (animate) {
					if (variant === "pulse") {
						animationClass = "animate-hub-pulse";
					} else if (variant === "sequential-pulse") {
						animationClass = "animate-country-sequential-pulse";
					} else if (variant === "settle" || variant === "constellation") {
						animationClass = "animate-node-settle";
					} else if (variant === "scan") {
						animationClass = "animate-scan-flash";
					}
				}

				const hubClass = isHub && showHubs ? "ring-2 ring-white/40 scale-150" : "";

				return (
					<div
						key={country.code}
						data-country={country.code}
						data-y={position.y}
						className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full ${sizeClass} ${animationClass} ${hubClass} ${className}`}
						style={{
							left: `${position.x}%`,
							top: `${position.y}%`,
							backgroundColor: color,
							["--node-color" as string]: color,
							opacity:
								variant === "minimal"
									? 0.7
									: variant === "sequential-pulse"
										? 0.12
										: 0.85,
							...(variant === "sequential-pulse" && animate
								? { ["--pulse-cycle" as string]: `${cycleS}s` }
								: {}),
							animationDelay:
								variant === "sequential-pulse"
									? `${-index * pulseSlot}s`
									: variant === "scan"
										? `${scanDelay * 3}s`
										: variant === "settle" || variant === "constellation"
											? `${delayOffset + staggerDelay}s`
											: `${(index % 8) * 0.3}s`,
							...(animate &&
							(variant === "settle" || variant === "constellation")
								? {
										["--settle-x" as string]: `${((index * 7) % 20) - 10}%`,
										["--settle-y" as string]: `${((index * 11) % 20) - 10}%`,
									}
								: {}),
						}}
					/>
				);
			})}
		</>
	);
}
