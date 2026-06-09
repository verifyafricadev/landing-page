export { AFRICA_MAP_VIEWBOX, AFRICA_COUNTRY_PATHS } from "./africaMapPaths";

/** Percentage positions calibrated to the Figma Africa SVG (viewBox 0 0 1000 1001) */
export const countryPositions: Record<string, { x: number; y: number }> = {
	MA: { x: 18, y: 9 },
	DZ: { x: 29, y: 14 },
	TN: { x: 40, y: 6 },
	LY: { x: 51, y: 16 },
	EG: { x: 70, y: 15 },
	SD: { x: 69, y: 34 },
	EH: { x: 12, y: 18 },
	MR: { x: 11, y: 23 },
	ML: { x: 21, y: 28 },
	NE: { x: 38, y: 28 },
	SN: { x: 6, y: 32 },
	GM: { x: 5, y: 34 },
	GW: { x: 5, y: 38 },
	GN: { x: 11, y: 38 },
	SL: { x: 10, y: 42 },
	LR: { x: 13, y: 44 },
	CI: { x: 19, y: 42 },
	BF: { x: 24, y: 35 },
	GH: { x: 25, y: 41 },
	TG: { x: 28, y: 42 },
	BJ: { x: 30, y: 40 },
	NG: { x: 39, y: 40 },
	CV: { x: 3, y: 30 },
	CM: { x: 43, y: 47 },
	CF: { x: 56, y: 43 },
	TD: { x: 53, y: 31 },
	GQ: { x: 41, y: 50 },
	GA: { x: 43, y: 53 },
	CG: { x: 49, y: 52 },
	CD: { x: 57, y: 58 },
	ST: { x: 36, y: 52 },
	ET: { x: 84, y: 39 },
	ER: { x: 83, y: 31 },
	DJ: { x: 87, y: 36 },
	SO: { x: 92, y: 45 },
	KE: { x: 80, y: 52 },
	UG: { x: 72, y: 50 },
	RW: { x: 69, y: 55 },
	BI: { x: 69, y: 57 },
	TZ: { x: 76, y: 61 },
	SS: { x: 71, y: 43 },
	MG: { x: 86, y: 77 },
	MU: { x: 93, y: 74 },
	SC: { x: 90, y: 58 },
	KM: { x: 82, y: 68 },
	AO: { x: 52, y: 67 },
	ZM: { x: 66, y: 70 },
	MW: { x: 75, y: 70 },
	MZ: { x: 77, y: 78 },
	ZW: { x: 68, y: 78 },
	BW: { x: 61, y: 83 },
	NA: { x: 53, y: 84 },
	ZA: { x: 59, y: 94 },
	LS: { x: 66, y: 92 },
	SZ: { x: 71, y: 88 },
};

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
