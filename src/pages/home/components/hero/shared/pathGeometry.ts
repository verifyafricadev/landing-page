import { AFRICA_COUNTRY_PATHS } from "./africaMapPaths";

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 1001;

export interface MapPoint {
	x: number;
	y: number;
}

/** Parse SVG path `d` into polygon vertices (M/L/H/V/Z commands). */
export function parsePathPoints(d: string): [number, number][] {
	const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
	const points: [number, number][] = [];
	let i = 0;
	let cmd = "";
	let cx = 0;
	let cy = 0;
	let sx = 0;
	let sy = 0;

	while (i < tokens.length) {
		const token = tokens[i];
		if (/^[a-zA-Z]$/.test(token)) {
			cmd = token;
			i++;
			continue;
		}

		const n = parseFloat(token);
		if (cmd === "M" || cmd === "L") {
			cx = n;
			cy = parseFloat(tokens[++i]);
			points.push([cx, cy]);
			i++;
			if (cmd === "M") {
				sx = cx;
				sy = cy;
				cmd = "L";
			}
		} else if (cmd === "H") {
			cx = n;
			points.push([cx, cy]);
			i++;
		} else if (cmd === "V") {
			cy = n;
			points.push([cx, cy]);
			i++;
		} else if (cmd === "Z" || cmd === "z") {
			points.push([sx, sy]);
			i++;
		} else {
			i++;
		}
	}

	return points;
}

/** Shoelace centroid of a closed polygon in SVG coordinates. */
export function polygonCentroid(points: [number, number][]): MapPoint {
	if (points.length === 0) return { x: 0, y: 0 };

	let area = 0;
	let cx = 0;
	let cy = 0;

	for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
		const [x1, y1] = points[j];
		const [x2, y2] = points[i];
		const cross = x1 * y2 - x2 * y1;
		area += cross;
		cx += (x1 + x2) * cross;
		cy += (y1 + y2) * cross;
	}

	area *= 0.5;
	if (Math.abs(area) < 1e-6) {
		const sum = points.reduce(
			(acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }),
			{ x: 0, y: 0 },
		);
		return { x: sum.x / points.length, y: sum.y / points.length };
	}

	return { x: cx / (6 * area), y: cy / (6 * area) };
}

export function getPathCentroid(pathD: string): MapPoint {
	return polygonCentroid(parsePathPoints(pathD));
}

/** Centroid as percentage of the map viewBox (for absolute CSS positioning). */
export function getPathCentroidPercent(pathD: string): MapPoint {
	const { x, y } = getPathCentroid(pathD);
	return {
		x: +((x / MAP_WIDTH) * 100).toFixed(2),
		y: +((y / MAP_HEIGHT) * 100).toFixed(2),
	};
}

const pathCentroidsPercent = AFRICA_COUNTRY_PATHS.map((pathD) =>
	getPathCentroidPercent(pathD),
);

export function getPathCentroidPercentByIndex(pathIndex: number): MapPoint | null {
	if (pathIndex < 0 || pathIndex >= pathCentroidsPercent.length) return null;
	return pathCentroidsPercent[pathIndex];
}
