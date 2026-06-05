import { useState, useRef, useEffect } from "react";
import { countriesServed } from "../../../mocks/caseStudies";
import CountryDetailModal from "./CountryDetailModal";
import {
	ArrowsClockwiseIcon,
	CaretRightIcon,
	CircleIcon,
	CornersInIcon,
	CrosshairIcon,
	MagnifyingGlassIcon,
	MagnifyingGlassPlusIcon,
	MapPinIcon,
	XCircleIcon,
	XIcon,
} from "@phosphor-icons/react";

interface CountryData {
	name: string;
	code: string;
	region: string;
	idTypes: string[];
}

const regionColors: Record<string, string> = {
	"West Africa": "#14b8a6",
	"East Africa": "#06b6d4",
	"Southern Africa": "#10b981",
	"North Africa": "#f59e0b",
	"Central Africa": "#8b5cf6",
};

const regionBgColors: Record<string, string> = {
	"West Africa": "bg-teal-500",
	"East Africa": "bg-cyan-500",
	"Southern Africa": "bg-emerald-500",
	"North Africa": "bg-amber-500",
	"Central Africa": "bg-violet-500",
};

// Approximate positions for African countries on the map (percentage-based)
const countryPositions: Record<string, { x: number; y: number }> = {
	// North Africa
	MA: { x: 18, y: 12 },
	DZ: { x: 28, y: 14 },
	TN: { x: 36, y: 10 },
	LY: { x: 42, y: 14 },
	EG: { x: 55, y: 14 },
	SD: { x: 58, y: 28 },
	EH: { x: 12, y: 20 },

	// West Africa
	MR: { x: 14, y: 28 },
	ML: { x: 22, y: 30 },
	NE: { x: 34, y: 30 },
	SN: { x: 8, y: 36 },
	GM: { x: 8, y: 38 },
	GW: { x: 6, y: 42 },
	GN: { x: 10, y: 44 },
	SL: { x: 8, y: 48 },
	LR: { x: 10, y: 52 },
	CI: { x: 16, y: 50 },
	BF: { x: 22, y: 42 },
	GH: { x: 22, y: 50 },
	TG: { x: 26, y: 50 },
	BJ: { x: 28, y: 48 },
	NG: { x: 34, y: 48 },
	CV: { x: 2, y: 36 },

	// Central Africa
	CM: { x: 38, y: 52 },
	CF: { x: 46, y: 48 },
	TD: { x: 44, y: 36 },
	GQ: { x: 36, y: 58 },
	GA: { x: 38, y: 62 },
	CG: { x: 42, y: 64 },
	CD: { x: 52, y: 62 },
	ST: { x: 32, y: 58 },

	// East Africa
	ET: { x: 66, y: 40 },
	ER: { x: 66, y: 32 },
	DJ: { x: 72, y: 38 },
	SO: { x: 76, y: 46 },
	KE: { x: 68, y: 54 },
	UG: { x: 60, y: 54 },
	RW: { x: 58, y: 60 },
	BI: { x: 58, y: 64 },
	TZ: { x: 66, y: 64 },
	SS: { x: 58, y: 46 },
	MG: { x: 82, y: 76 },
	MU: { x: 92, y: 74 },
	SC: { x: 88, y: 58 },
	KM: { x: 76, y: 70 },

	// Southern Africa
	AO: { x: 42, y: 72 },
	ZM: { x: 56, y: 74 },
	MW: { x: 64, y: 74 },
	MZ: { x: 68, y: 80 },
	ZW: { x: 58, y: 80 },
	BW: { x: 52, y: 84 },
	NA: { x: 44, y: 84 },
	ZA: { x: 54, y: 92 },
	LS: { x: 58, y: 94 },
	SZ: { x: 62, y: 88 },
};

// Region center positions and zoom levels for the zoom feature
const regionZoomConfig: Record<
	string,
	{ x: number; y: number; scale: number }
> = {
	"North Africa": { x: 35, y: 15, scale: 2.2 },
	"West Africa": { x: 18, y: 42, scale: 2.0 },
	"Central Africa": { x: 42, y: 55, scale: 2.0 },
	"East Africa": { x: 68, y: 55, scale: 1.8 },
	"Southern Africa": { x: 55, y: 82, scale: 2.0 },
};

// Region bounding boxes for mini map highlight (approximate percentages)
const regionBounds: Record<
	string,
	{ x: number; y: number; width: number; height: number }
> = {
	"North Africa": { x: 10, y: 0, width: 70, height: 35 },
	"West Africa": { x: 0, y: 25, width: 45, height: 35 },
	"Central Africa": { x: 30, y: 35, width: 35, height: 35 },
	"East Africa": { x: 55, y: 30, width: 45, height: 50 },
	"Southern Africa": { x: 35, y: 65, width: 40, height: 35 },
};

export default function AfricaMapVisualization() {
	const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(
		null,
	);
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
	const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
		null,
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [highlightedCountry, setHighlightedCountry] = useState<string | null>(
		null,
	);
	const [isZooming, setIsZooming] = useState(false);
	const [viewportPosition, setViewportPosition] = useState({ x: 50, y: 50 });
	const searchRef = useRef<HTMLDivElement>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const zoomableMapRef = useRef<HTMLDivElement>(null);

	// Close suggestions when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Handle zoom animation timing
	useEffect(() => {
		if (selectedRegion) {
			setIsZooming(true);
			const timer = setTimeout(() => setIsZooming(false), 600);
			return () => clearTimeout(timer);
		}
	}, [selectedRegion]);

	// Track mouse position on the zoomed map to update viewport indicator
	useEffect(() => {
		if (!selectedRegion || !mapContainerRef.current) return;

		const handleMouseMove = (e: MouseEvent) => {
			const container = mapContainerRef.current;
			if (!container) return;

			const rect = container.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;

			// Calculate the actual position on the full map based on zoom
			const config = regionZoomConfig[selectedRegion];
			if (config) {
				const scale = config.scale;
				const originX = config.x;
				const originY = config.y;

				// Convert viewport position to full map coordinates
				const fullMapX = originX + (x - 50) / scale;
				const fullMapY = originY + (y - 50) / scale;

				setViewportPosition({
					x: Math.max(0, Math.min(100, fullMapX)),
					y: Math.max(0, Math.min(100, fullMapY)),
				});
			}
		};

		const container = mapContainerRef.current;
		container.addEventListener("mousemove", handleMouseMove);

		// Set initial viewport position to region center
		if (selectedRegion && regionZoomConfig[selectedRegion]) {
			setViewportPosition({
				x: regionZoomConfig[selectedRegion].x,
				y: regionZoomConfig[selectedRegion].y,
			});
		}

		return () => {
			container.removeEventListener("mousemove", handleMouseMove);
		};
	}, [selectedRegion]);

	// Filter countries based on search query
	const searchResults = searchQuery.trim()
		? countriesServed.filter(
				(country) =>
					country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
					country.region.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		: [];

	const handleSearchSelect = (country: CountryData) => {
		setSearchQuery(country.name);
		setShowSuggestions(false);
		setHighlightedCountry(country.code);
		setSelectedRegion(null);

		// Auto-clear highlight after 3 seconds
		setTimeout(() => {
			setHighlightedCountry(null);
		}, 3000);
	};

	const handleRegionSelect = (region: string) => {
		const newRegion = selectedRegion === region ? null : region;
		setSelectedRegion(newRegion);
		setHighlightedCountry(null);
		setSearchQuery("");
	};

	const clearSearch = () => {
		setSearchQuery("");
		setHighlightedCountry(null);
		setShowSuggestions(false);
	};

	const resetZoom = () => {
		setSelectedRegion(null);
		setHighlightedCountry(null);
		setSearchQuery("");
	};

	const getCountryData = (code: string): CountryData | undefined => {
		return countriesServed.find((c) => c.code === code);
	};

	const filteredCountries = selectedRegion
		? countriesServed.filter((c) => c.region === selectedRegion)
		: countriesServed;

	const regionCounts = {
		"West Africa": countriesServed.filter((c) => c.region === "West Africa")
			.length,
		"East Africa": countriesServed.filter((c) => c.region === "East Africa")
			.length,
		"Southern Africa": countriesServed.filter(
			(c) => c.region === "Southern Africa",
		).length,
		"North Africa": countriesServed.filter((c) => c.region === "North Africa")
			.length,
		"Central Africa": countriesServed.filter(
			(c) => c.region === "Central Africa",
		).length,
	};

	// Calculate zoom transform
	const getZoomTransform = () => {
		if (!selectedRegion)
			return {
				transform: "scale(1) translate(0, 0)",
				transformOrigin: "center center",
			};

		const config = regionZoomConfig[selectedRegion];
		if (!config)
			return {
				transform: "scale(1) translate(0, 0)",
				transformOrigin: "center center",
			};

		return {
			transform: `scale(${config.scale})`,
			transformOrigin: `${config.x}% ${config.y}%`,
		};
	};

	const zoomStyle = getZoomTransform();

	return (
		<section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full mb-4">
						<MapPinIcon className="text-teal-600" />
						<span className="text-teal-700 text-sm font-medium">
							Pan-African Coverage
						</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
						Coverage Across Africa
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
						Interactive map showing our identity verification coverage across
						all 54 African countries
					</p>

					{/* Search Bar */}
					<div
						ref={searchRef}
						className="relative max-w-md mx-auto"
					>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<MagnifyingGlassIcon className="text-gray-400 text-lg" />
							</div>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setShowSuggestions(true);
								}}
								onFocus={() => setShowSuggestions(true)}
								placeholder="Search countries by name, code, or region..."
								className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm transition-all"
							/>
							{searchQuery && (
								<button
									onClick={clearSearch}
									className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:text-gray-600 transition-colors"
								>
									<XCircleIcon className="text-gray-400 text-lg" />
								</button>
							)}
						</div>

						{/* Search Suggestions Dropdown */}
						{showSuggestions && searchQuery.trim() && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
								{searchResults.length > 0 ? (
									<div className="py-2">
										{searchResults.map((country) => (
											<button
												key={country.code}
												onClick={() => handleSearchSelect(country)}
												className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-50 transition-colors cursor-pointer text-left"
											>
												<img
													src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
													alt={country.name}
													className="w-8 h-5 object-cover rounded shadow-sm"
												/>
												<div className="flex-1 min-w-0">
													<div className="text-sm font-medium text-secondary truncate">
														{country.name}
													</div>
													<div className="text-xs text-gray-500">
														{country.region}
													</div>
												</div>
												<div className="text-xs text-gray-400 font-mono">
													{country.code}
												</div>
											</button>
										))}
									</div>
								) : (
									<div className="px-4 py-6 text-center">
										<MapPinIcon className="text-gray-300 text-3xl mb-2" />
										<p className="text-sm text-gray-500">
											No countries found for "{searchQuery}"
										</p>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Highlighted Country Badge */}
					{highlightedCountry && (
						<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full animate-pulse">
							<CrosshairIcon />
							<span className="text-sm font-medium">
								Showing:{" "}
								{
									countriesServed.find((c) => c.code === highlightedCountry)
										?.name
								}
							</span>
							<button
								onClick={clearSearch}
								className="ml-1 hover:bg-teal-600 rounded-full p-0.5 cursor-pointer"
							>
								<XIcon></XIcon>
							</button>
						</div>
					)}

					{/* Zoomed Region Badge */}
					{selectedRegion && (
						<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full">
							<MagnifyingGlassPlusIcon />
							<span className="text-sm font-medium">
								Zoomed: {selectedRegion}
							</span>
							<button
								onClick={resetZoom}
								className="ml-1 hover:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors"
								title="Reset zoom"
							>
								<CornersInIcon />
							</button>
						</div>
					)}
				</div>

				<div className="grid lg:grid-cols-3 gap-8 items-start">
					{/* Region Legend */}
					<div className="lg:col-span-1 order-2 lg:order-1">
						<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold text-secondary">
									Regions
								</h3>
								{selectedRegion && (
									<button
										onClick={resetZoom}
										className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 cursor-pointer"
									>
										<ArrowsClockwiseIcon />
										Reset
									</button>
								)}
							</div>
							<div className="space-y-3">
								{Object.entries(regionColors).map(([region, color]) => (
									<button
										key={region}
										onClick={() => handleRegionSelect(region)}
										className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
											selectedRegion === region
												? "bg-secondary text-white ring-2 ring-teal-500 ring-offset-2"
												: "bg-gray-50 hover:bg-gray-100 text-gray-700"
										}`}
									>
										<div className="flex items-center gap-3">
											<div
												className="w-4 h-4 rounded-full"
												style={{ backgroundColor: color }}
											></div>
											<span className="font-medium text-sm">{region}</span>
										</div>
										<div className="flex items-center gap-2">
											<span
												className={`text-sm font-semibold ${
													selectedRegion === region
														? "text-white"
														: "text-gray-500"
												}`}
											>
												{regionCounts[region as keyof typeof regionCounts]}
											</span>
											{selectedRegion === region ? (
												<MagnifyingGlassPlusIcon className="text-teal-400" />
											) : (
												<CaretRightIcon className="text-gray-400" />
											)}
										</div>
									</button>
								))}
							</div>

							{/* Total Stats */}
							<div className="mt-6 pt-6 border-t border-gray-100">
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl">
										<div className="text-2xl font-bold text-teal-600">54</div>
										<div className="text-xs text-gray-600">Countries</div>
									</div>
									<div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl">
										<div className="text-2xl font-bold text-cyan-600">50+</div>
										<div className="text-xs text-gray-600">ID Types</div>
									</div>
								</div>
							</div>
						</div>

						{/* Hovered Country Info */}
						{hoveredCountry && (
							<div className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in">
								<div className="flex items-center gap-4 mb-4">
									<img
										src={`https://flagcdn.com/w80/${hoveredCountry.code.toLowerCase()}.png`}
										alt={`${hoveredCountry.name} flag`}
										className="w-12 h-8 object-cover rounded shadow-sm"
									/>
									<div>
										<h4 className="font-semibold text-secondary">
											{hoveredCountry.name}
										</h4>
										<p className="text-xs text-gray-500">
											{hoveredCountry.region}
										</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-2">
									{hoveredCountry.idTypes.slice(0, 4).map((id, idx) => (
										<span
											key={idx}
											className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
										>
											{id}
										</span>
									))}
									{hoveredCountry.idTypes.length > 4 && (
										<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
											+{hoveredCountry.idTypes.length - 4} more
										</span>
									)}
								</div>
							</div>
						)}
					</div>

					{/* Map Visualization */}
					<div className="lg:col-span-2 order-1 lg:order-2">
						<div
							ref={mapContainerRef}
							className="relative bg-gradient-to-br from-secondary via-gray-800 to-secondary rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden"
						>
							{/* Background decorations */}
							<div className="absolute inset-0 opacity-20">
								<div className="absolute top-10 left-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl"></div>
								<div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500 rounded-full blur-3xl"></div>
							</div>

							{/* Zoom indicator */}
							{selectedRegion && (
								<div className="absolute top-4 right-4 z-20 flex items-center gap-2">
									<div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-2">
										<MagnifyingGlassPlusIcon className="text-teal-400" />
										<span>{regionZoomConfig[selectedRegion]?.scale}x zoom</span>
									</div>
									<button
										onClick={resetZoom}
										className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
										title="Reset zoom"
									>
										<CornersInIcon />
									</button>
								</div>
							)}

							{/* Mini Map - Shows when zoomed into a region */}
							{selectedRegion && (
								<div
									className="absolute bottom-4 left-4 z-20 bg-gray-800/90 backdrop-blur-sm rounded-xl p-2 border border-white/10 shadow-xl animate-fade-in cursor-pointer hover:bg-gray-800 transition-colors"
									onClick={resetZoom}
									title="Click to reset zoom"
								>
									<div className="relative w-24 h-24">
										{/* Mini Africa Outline */}
										<svg
											viewBox="0 0 100 100"
											className="w-full h-full opacity-60"
										>
											<path
												d="M35 5 L45 3 L55 5 L65 8 L72 15 L75 25 L78 35 L80 45 L78 55 L75 65 L70 75 L65 82 L58 88 L50 95 L42 92 L35 85 L30 78 L28 70 L25 60 L22 50 L20 40 L18 30 L22 20 L28 12 L35 5 Z"
												fill="rgba(255,255,255,0.1)"
												stroke="rgba(255,255,255,0.3)"
												strokeWidth="1"
											/>
										</svg>

										{/* Region Highlight Box */}
										{regionBounds[selectedRegion] && (
											<div
												className="absolute border-2 border-teal-400 rounded-sm"
												style={{
													left: `${regionBounds[selectedRegion].x}%`,
													top: `${regionBounds[selectedRegion].y}%`,
													width: `${regionBounds[selectedRegion].width}%`,
													height: `${regionBounds[selectedRegion].height}%`,
													backgroundColor: "rgba(20, 184, 166, 0.15)",
													boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)",
												}}
											/>
										)}

										{/* Mini country dots */}
										{countriesServed.map((country) => {
											const position = countryPositions[country.code];
											if (!position) return null;
											const isInRegion = country.region === selectedRegion;
											return (
												<div
													key={`mini-${country.code}`}
													className={`absolute w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
														isInRegion ? "bg-teal-400" : "bg-white/30"
													}`}
													style={{
														left: `${position.x}%`,
														top: `${position.y}%`,
													}}
												/>
											);
										})}

										{/* You Are Here Indicator */}
										<div
											className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
											style={{
												left: `${viewportPosition.x}%`,
												top: `${viewportPosition.y}%`,
												transition: "left 0.1s ease-out, top 0.1s ease-out",
											}}
										>
											{/* Outer pulse ring */}
											<div className="absolute w-6 h-6 -left-3 -top-3 rounded-full bg-rose-500/30 animate-ping"></div>
											{/* Inner glow */}
											<div className="absolute w-4 h-4 -left-2 -top-2 rounded-full bg-rose-500/50 animate-pulse"></div>
											{/* Center dot */}
											<div className="relative w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white shadow-lg">
												<div className="absolute inset-0 rounded-full bg-rose-400 animate-pulse"></div>
											</div>
										</div>
									</div>

									{/* Mini Map Label */}
									<div className="text-center mt-1 flex items-center justify-center gap-1">
										<div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
										<span className="text-[10px] text-white/80 font-medium">
											You are here
										</span>
									</div>
								</div>
							)}

							{/* Map Container with Zoom */}
							<div
								ref={zoomableMapRef}
								className="relative aspect-square max-w-lg mx-auto transition-all duration-700 ease-out"
								style={zoomStyle}
							>
								{/* Africa Outline SVG */}
								<svg
									viewBox="0 0 100 100"
									className="w-full h-full"
									style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}
								>
									{/* Simplified Africa continent shape */}
									<path
										d="M35 5 L45 3 L55 5 L65 8 L72 15 L75 25 L78 35 L80 45 L78 55 L75 65 L70 75 L65 82 L58 88 L50 95 L42 92 L35 85 L30 78 L28 70 L25 60 L22 50 L20 40 L18 30 L22 20 L28 12 L35 5 Z"
										fill="rgba(255,255,255,0.05)"
										stroke="rgba(255,255,255,0.1)"
										strokeWidth="0.5"
									/>
								</svg>

								{/* Country Markers with Flags */}
								{(selectedRegion ? filteredCountries : countriesServed).map(
									(country) => {
										const position = countryPositions[country.code];
										if (!position) return null;

										const isHovered = hoveredCountry?.code === country.code;
										const isHighlighted = highlightedCountry === country.code;
										const isInSelectedRegion =
											selectedRegion === country.region;
										const color = regionColors[country.region];

										// Dim countries not in selected region
										const isDimmed = selectedRegion && !isInSelectedRegion;

										return (
											<div
												key={country.code}
												className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
													isHighlighted ? "z-50" : isHovered ? "z-40" : "z-10"
												} ${isDimmed ? "opacity-20 pointer-events-none" : "opacity-100"}`}
												style={{
													left: `${position.x}%`,
													top: `${position.y}%`,
												}}
												onMouseEnter={() => setHoveredCountry(country)}
												onMouseLeave={() => setHoveredCountry(null)}
												onClick={() => setSelectedCountry(country)}
											>
												{/* Pulse animation for hovered or highlighted */}
												{(isHovered || isHighlighted) && (
													<div
														className={`absolute rounded-full ${isHighlighted ? "animate-ping" : "animate-ping"}`}
														style={{
															backgroundColor: isHighlighted
																? "#14b8a6"
																: color,
															width: isHighlighted ? "48px" : "32px",
															height: isHighlighted ? "48px" : "32px",
															left: isHighlighted ? "-12px" : "-4px",
															top: isHighlighted ? "-12px" : "-4px",
															opacity: 0.4,
														}}
													></div>
												)}

												{/* Extra ring for highlighted country */}
												{isHighlighted && (
													<div
														className="absolute rounded-full border-4 border-teal-400 animate-pulse"
														style={{
															width: "40px",
															height: "40px",
															left: "-8px",
															top: "-8px",
														}}
													></div>
												)}

												{/* Flag marker - always visible */}
												<div
													className={`rounded-full overflow-hidden transition-all duration-300 border-2 ${
														isHighlighted
															? "w-10 h-10 border-teal-400 shadow-xl scale-125"
															: isHovered
																? "w-8 h-8 border-white shadow-xl scale-125"
																: selectedRegion && isInSelectedRegion
																	? "w-7 h-7 border-white shadow-lg"
																	: "w-6 h-6 border-white/70 shadow-lg"
													}`}
													style={{
														boxShadow: isHighlighted
															? "0 0 30px #14b8a6, 0 4px 12px rgba(0,0,0,0.4)"
															: isHovered
																? `0 0 20px ${color}, 0 4px 12px rgba(0,0,0,0.4)`
																: `0 0 8px ${color}, 0 2px 6px rgba(0,0,0,0.3)`,
													}}
												>
													<img
														src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
														alt={country.name}
														className="w-full h-full object-cover"
														loading="lazy"
													/>
												</div>

												{/* Country label on hover or highlight */}
												{(isHovered || isHighlighted) && (
													<div className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap">
														<div
															className={`px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 ${
																isHighlighted
																	? "bg-teal-500 text-white"
																	: "bg-white text-secondary"
															}`}
														>
															<span>{country.name}</span>
															{!isHighlighted && (
																<span
																	className="w-2 h-2 rounded-full"
																	style={{ backgroundColor: color }}
																></span>
															)}
														</div>
													</div>
												)}
											</div>
										);
									},
								)}
							</div>

							{/* Map Title */}
							<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
								<div
									className={`text-white/60 text-xs ${selectedRegion ? "ml-32" : ""}`}
								>
									{selectedRegion
										? `Viewing ${filteredCountries.length} countries in ${selectedRegion}`
										: "Click a region to zoom in"}
								</div>
								<div className="flex items-center gap-2 text-white/60 text-xs">
									<CircleIcon className="text-teal-400 text-[8px]" />
									<span>Active Coverage</span>
								</div>
							</div>
						</div>

						{/* Quick Stats Below Map */}
						<div className="grid grid-cols-5 gap-3 mt-6">
							{Object.entries(regionColors).map(([region, color]) => (
								<div
									key={region}
									className={`text-center p-3 rounded-xl transition-all cursor-pointer ${
										selectedRegion === region
											? "bg-secondary text-white ring-2 ring-teal-500 ring-offset-2"
											: "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
									}`}
									onClick={() => handleRegionSelect(region)}
								>
									<div className="flex items-center justify-center gap-1 mb-2">
										<div
											className="w-3 h-3 rounded-full"
											style={{ backgroundColor: color }}
										></div>
										{selectedRegion === region && (
											<MagnifyingGlassPlusIcon className="text-teal-400 text-xs" />
										)}
									</div>
									<div
										className={`text-xs font-medium ${
											selectedRegion === region ? "text-white" : "text-gray-600"
										}`}
									>
										{region.replace(" Africa", "")}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Country Detail Modal */}
			{selectedCountry && (
				<CountryDetailModal
					country={selectedCountry}
					onClose={() => setSelectedCountry(null)}
				/>
			)}

			<style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
		</section>
	);
}
