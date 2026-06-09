import {
	BuildingsIcon,
	CameraIcon,
	CheckCircleIcon,
	CurrencyCircleDollarIcon,
	DatabaseIcon,
	FileMagnifyingGlassIcon,
	GaugeIcon,
	ShieldCheckIcon,
	UserFocusIcon,
	UsersIcon,
	type Icon,
} from "@phosphor-icons/react";

export interface CountryData {
	name: string;
	code: string;
	region: string;
	idTypes: string[];
}

export interface CountryDetail {
	population?: string;
	capital?: string;
	currency?: string;
	languages?: string[];
	verificationPartners?: string[];
}

export interface CountryStat {
	icon: Icon;
	value: string;
	label: string;
}

export interface CountryDetailContext {
	country: CountryData;
	details: CountryDetail;
	regionColor: string;
	displayStats: CountryStat[];
	hasCountryStats: boolean;
	flagUrl: string;
}

export const regionColors: Record<string, string> = {
	"West Africa": "#14b8a6",
	"East Africa": "#06b6d4",
	"Southern Africa": "#10b981",
	"North Africa": "#f59e0b",
	"Central Africa": "#8b5cf6",
};

export const countryDetails: Record<string, CountryDetail> = {
	NG: {
		population: "223M+",
		capital: "Abuja",
		currency: "Nigerian Naira (NGN)",
		languages: ["English", "Hausa", "Yoruba", "Igbo"],
		verificationPartners: ["NIMC", "NIBSS", "FRSC"],
	},
	GH: {
		population: "33M+",
		capital: "Accra",
		currency: "Ghanaian Cedi (GHS)",
		languages: ["English", "Akan", "Ewe"],
		verificationPartners: ["NIA", "DVLA", "EC"],
	},
	KE: {
		population: "54M+",
		capital: "Nairobi",
		currency: "Kenyan Shilling (KES)",
		languages: ["English", "Swahili"],
		verificationPartners: ["IPRS", "NTSA", "IEBC"],
	},
	ZA: {
		population: "60M+",
		capital: "Pretoria",
		currency: "South African Rand (ZAR)",
		languages: ["English", "Zulu", "Xhosa", "Afrikaans"],
		verificationPartners: ["DHA", "SARS"],
	},
	EG: {
		population: "104M+",
		capital: "Cairo",
		currency: "Egyptian Pound (EGP)",
		languages: ["Arabic"],
		verificationPartners: ["Civil Registry", "MOI"],
	},
	ET: {
		population: "120M+",
		capital: "Addis Ababa",
		currency: "Ethiopian Birr (ETB)",
		languages: ["Amharic", "Oromo", "Tigrinya"],
		verificationPartners: ["NIDP", "INSA"],
	},
	TZ: {
		population: "65M+",
		capital: "Dodoma",
		currency: "Tanzanian Shilling (TZS)",
		languages: ["Swahili", "English"],
		verificationPartners: ["NIDA", "TRA"],
	},
	MA: {
		population: "37M+",
		capital: "Rabat",
		currency: "Moroccan Dirham (MAD)",
		languages: ["Arabic", "Berber", "French"],
		verificationPartners: ["DGSN", "CNIE"],
	},
	SN: {
		population: "17M+",
		capital: "Dakar",
		currency: "West African CFA Franc (XOF)",
		languages: ["French", "Wolof"],
		verificationPartners: ["DAF", "DGID"],
	},
	CI: {
		population: "28M+",
		capital: "Yamoussoukro",
		currency: "West African CFA Franc (XOF)",
		languages: ["French"],
		verificationPartners: ["ONI", "DGTTC"],
	},
	CM: {
		population: "28M+",
		capital: "Yaoundé",
		currency: "Central African CFA Franc (XAF)",
		languages: ["French", "English"],
		verificationPartners: ["BUNEC", "DGSN"],
	},
	UG: {
		population: "47M+",
		capital: "Kampala",
		currency: "Ugandan Shilling (UGX)",
		languages: ["English", "Swahili"],
		verificationPartners: ["NIRA", "URA"],
	},
	RW: {
		population: "14M+",
		capital: "Kigali",
		currency: "Rwandan Franc (RWF)",
		languages: ["Kinyarwanda", "English", "French"],
		verificationPartners: ["NIDA", "RRA"],
	},
	ZM: {
		population: "20M+",
		capital: "Lusaka",
		currency: "Zambian Kwacha (ZMW)",
		languages: ["English", "Bemba", "Nyanja"],
		verificationPartners: ["DNRPC", "RTSA"],
	},
	ZW: {
		population: "16M+",
		capital: "Harare",
		currency: "Zimbabwe Dollar (ZWL)",
		languages: ["English", "Shona", "Ndebele"],
		verificationPartners: ["RG Office", "ZIMRA"],
	},
};

export const verificationFeatures = [
	{
		label: "Identity Verification",
		icon: UserFocusIcon,
		iconClass: "text-teal-600 bg-teal-100",
	},
	{
		label: "Liveness Detection",
		icon: CameraIcon,
		iconClass: "text-cyan-600 bg-cyan-100",
	},
	{
		label: "Document Verification",
		icon: FileMagnifyingGlassIcon,
		iconClass: "text-emerald-600 bg-emerald-100",
	},
	{
		label: "Database Check",
		icon: DatabaseIcon,
		iconClass: "text-amber-600 bg-amber-100",
	},
] as const;

export function buildCountryDetailContext(
	country: CountryData,
): CountryDetailContext {
	const details = countryDetails[country.code] || {};
	const regionColor = regionColors[country.region];

	const stats = [
		details.population && {
			icon: UsersIcon,
			value: details.population,
			label: "Population",
		},
		details.capital && {
			icon: BuildingsIcon,
			value: details.capital,
			label: "Capital",
		},
		details.currency && {
			icon: CurrencyCircleDollarIcon,
			value: details.currency.split(" ")[0],
			label: "Currency",
		},
	].filter(Boolean) as CountryStat[];

	const fallbackStats: CountryStat[] = [
		{ icon: CheckCircleIcon, value: "Active", label: "Status" },
		{ icon: ShieldCheckIcon, value: "Verified", label: "Coverage" },
		{ icon: GaugeIcon, value: "<3s", label: "Avg. Time" },
	];

	return {
		country,
		details,
		regionColor,
		displayStats: stats.length > 0 ? stats : fallbackStats,
		hasCountryStats: stats.length > 0,
		flagUrl: `https://flagcdn.com/w160/${country.code.toLowerCase()}.png`,
	};
}
