export { AFRICA_MAP_VIEWBOX, AFRICA_COUNTRY_PATHS } from "./africaMapPaths";
export { countryPositions, getCountryPosition } from "./countryPositions";

export const regionColors: Record<string, string> = {
	"West Africa": "#14b8a6",
	"East Africa": "#06b6d4",
	"Southern Africa": "#10b981",
	"North Africa": "#f59e0b",
	"Central Africa": "#8b5cf6",
};

export const regionBgColors: Record<string, string> = {
	"West Africa": "bg-teal-500",
	"East Africa": "bg-cyan-500",
	"Southern Africa": "bg-emerald-500",
	"North Africa": "bg-amber-500",
	"Central Africa": "bg-violet-500",
};

export const regionZoomConfig: Record<
	string,
	{ x: number; y: number; scale: number }
> = {
	"North Africa": { x: 35, y: 12, scale: 2.2 },
	"West Africa": { x: 18, y: 38, scale: 2.0 },
	"Central Africa": { x: 48, y: 50, scale: 2.0 },
	"East Africa": { x: 78, y: 52, scale: 1.8 },
	"Southern Africa": { x: 62, y: 82, scale: 2.0 },
};

export const regionBounds: Record<
	string,
	{ x: number; y: number; width: number; height: number }
> = {
	"North Africa": { x: 8, y: 2, width: 62, height: 20 },
	"West Africa": { x: 2, y: 26, width: 38, height: 24 },
	"Central Africa": { x: 36, y: 40, width: 26, height: 24 },
	"East Africa": { x: 58, y: 36, width: 38, height: 38 },
	"Southern Africa": { x: 44, y: 64, width: 38, height: 32 },
};

export const HUB_CITIES = ["NG", "KE", "ZA", "EG", "GH"] as const;

export type HubCityCode = (typeof HUB_CITIES)[number];
