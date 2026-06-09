import { countryPathIndex } from "./countryPathIndex";
import { getPathCentroidPercentByIndex } from "./pathGeometry";

/** Country node positions derived from SVG path centroids (viewBox 0 0 1000 1001). */
export const countryPositions: Record<string, { x: number; y: number }> =
	Object.fromEntries(
		Object.entries(countryPathIndex)
			.map(([code, pathIndex]) => {
				const centroid = getPathCentroidPercentByIndex(pathIndex);
				return centroid ? [code, centroid] : null;
			})
			.filter((entry): entry is [string, { x: number; y: number }] =>
				entry !== null,
			),
	);

export function getCountryPosition(
	code: string,
): { x: number; y: number } | null {
	const pathIndex = countryPathIndex[code];
	if (pathIndex === undefined) return null;
	return getPathCentroidPercentByIndex(pathIndex);
}
