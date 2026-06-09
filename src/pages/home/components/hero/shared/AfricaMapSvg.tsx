import { AFRICA_COUNTRY_PATHS, AFRICA_MAP_VIEWBOX } from "./africaMapPaths";

interface AfricaMapSvgProps {
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	className?: string;
	pathClassName?: string;
	animateDraw?: boolean;
	animateDrawLoop?: boolean;
	showWireframe?: boolean;
	animatePulse?: boolean;
}

export const STROKE_LOOP_DURATION_S = 9;
export const STROKE_LOOP_STAGGER_S = 0.055;

export default function AfricaMapSvg({
	fill = "rgba(255,255,255,0.05)",
	stroke = "rgba(255,255,255,0.25)",
	strokeWidth = 1,
	className = "w-full h-full",
	pathClassName = "",
	animateDraw = false,
	animateDrawLoop = false,
	showWireframe = false,
	animatePulse = true,
}: AfricaMapSvgProps) {
	return (
		<svg
			viewBox={AFRICA_MAP_VIEWBOX}
			className={`${className}${animatePulse ? " animate-scale-pulse origin-center" : ""}`.trim()}
			style={{
				filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))",
				transformOrigin: "center center",
			}}
			aria-hidden
		>
			{showWireframe && (
				<>
					{[100, 250, 400, 550, 700, 850].map((y) => (
						<line
							key={`lat-${y}`}
							x1="80"
							y1={y}
							x2="920"
							y2={y}
							stroke="rgba(45,212,191,0.08)"
							strokeWidth="0.8"
						/>
					))}
					{[150, 300, 450, 600, 750].map((x) => (
						<line
							key={`lon-${x}`}
							x1={x}
							y1="20"
							x2={x}
							y2="980"
							stroke="rgba(45,212,191,0.08)"
							strokeWidth="0.8"
						/>
					))}
				</>
			)}
			{AFRICA_COUNTRY_PATHS.map((d, i) => {
				const drawClass = animateDrawLoop
					? "hero-draw-stroke-loop"
					: animateDraw
						? "hero-draw-stroke"
						: "";
				const drawStyle =
					animateDrawLoop || animateDraw
						? animateDrawLoop
							? {
									animationDelay: `${-i * STROKE_LOOP_STAGGER_S}s`,
									["--path-index" as string]: i,
								}
							: { animationDelay: `${i * 0.04}s` }
						: undefined;

				return (
					<path
						key={i}
						d={d}
						fill={fill}
						stroke={stroke}
						strokeWidth={strokeWidth}
						strokeLinejoin="round"
						fillRule="evenodd"
						clipRule="evenodd"
						className={`${drawClass} ${pathClassName}`.trim()}
						style={drawStyle}
					/>
				);
			})}
		</svg>
	);
}
