import {
	BuildingsIcon,
	CameraIcon,
	CheckCircleIcon,
	ClockIcon,
	CurrencyCircleDollarIcon,
	DatabaseIcon,
	FileMagnifyingGlassIcon,
	GaugeIcon,
	GraphIcon,
	IdentificationCardIcon,
	MapPinIcon,
	ShieldCheckIcon,
	ShieldStarIcon,
	TranslateIcon,
	UserFocusIcon,
	UsersIcon,
	XIcon,
} from "@phosphor-icons/react";
import { useEffect } from "react";

interface CountryData {
	name: string;
	code: string;
	region: string;
	idTypes: string[];
}

interface CountryDetailModalProps {
	country: CountryData;
	onClose: () => void;
}

const regionColors: Record<string, string> = {
	"West Africa": "#14b8a6",
	"East Africa": "#06b6d4",
	"Southern Africa": "#10b981",
	"North Africa": "#f59e0b",
	"Central Africa": "#8b5cf6",
};

const regionGradients: Record<string, string> = {
	"West Africa": "from-teal-500 to-emerald-500",
	"East Africa": "from-cyan-500 to-teal-500",
	"Southern Africa": "from-emerald-500 to-green-500",
	"North Africa": "from-amber-500 to-orange-500",
	"Central Africa": "from-violet-500 to-purple-500",
};

const countryDetails: Record<
	string,
	{
		population?: string;
		capital?: string;
		currency?: string;
		languages?: string[];
		verificationPartners?: string[];
	}
> = {
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

export default function CountryDetailModal({
	country,
	onClose,
}: CountryDetailModalProps) {
	const details = countryDetails[country.code] || {};
	const regionColor = regionColors[country.region];
	const regionGradient = regionGradients[country.region];

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

			{/* Modal */}
			<div
				className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-modal-in"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header with Flag */}
				<div
					className={`relative bg-gradient-to-r ${regionGradient} p-8 pb-20`}
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
					>
						<XIcon className="text-white text-xl" />
					</button>

					{/* Region Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-4">
						<MapPinIcon className="text-white text-sm" />
						<span className="text-white text-sm font-medium">
							{country.region}
						</span>
					</div>

					{/* Country Name */}
					<h2 className="text-3xl font-bold text-white">{country.name}</h2>
				</div>

				{/* Flag Overlay */}
				<div className="absolute left-8 top-32 transform">
					<div
						className="w-24 h-16 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
						style={{ boxShadow: `0 8px 32px ${regionColor}40` }}
					>
						<img
							src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
							alt={`${country.name} flag`}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="p-8 pt-12 overflow-y-auto max-h-[50vh]">
					{/* Quick Stats */}
					<div className="grid grid-cols-3 gap-4 mb-8">
						{details.population && (
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<UsersIcon className="text-2xl text-gray-400 mb-2" />
								<div className="text-lg font-bold text-secondary">
									{details.population}
								</div>
								<div className="text-xs text-gray-500">Population</div>
							</div>
						)}
						{details.capital && (
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<BuildingsIcon className="text-2xl text-gray-400 mb-2" />
								<div className="text-lg font-bold text-secondary">
									{details.capital}
								</div>
								<div className="text-xs text-gray-500">Capital</div>
							</div>
						)}
						{details.currency && (
							<div className="text-center p-4 bg-gray-50 rounded-xl">
								<CurrencyCircleDollarIcon className="text-2xl text-gray-400 mb-2" />
								<div className="text-sm font-bold text-secondary">
									{details.currency.split(" ")[0]}
								</div>
								<div className="text-xs text-gray-500">Currency</div>
							</div>
						)}
						{!details.population && !details.capital && !details.currency && (
							<>
								<div className="text-center p-4 bg-gray-50 rounded-xl">
									<CheckCircleIcon className="text-2xl text-teal-500 mb-2" />
									<div className="text-lg font-bold text-secondary">Active</div>
									<div className="text-xs text-gray-500">Status</div>
								</div>
								<div className="text-center p-4 bg-gray-50 rounded-xl">
									<ShieldCheckIcon className="text-2xl text-teal-500 mb-2" />
									<div className="text-lg font-bold text-secondary">
										Verified
									</div>
									<div className="text-xs text-gray-500">Coverage</div>
								</div>
								<div className="text-center p-4 bg-gray-50 rounded-xl">
									<GaugeIcon className="text-2xl text-teal-500 mb-2" />
									<div className="text-lg font-bold text-secondary">&lt;3s</div>
									<div className="text-xs text-gray-500">Avg. Time</div>
								</div>
							</>
						)}
					</div>

					{/* Supported ID Types */}
					<div className="mb-8">
						<h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
							<IdentificationCardIcon style={{ color: regionColor }} />
							Supported ID Types
						</h3>
						<div className="flex flex-wrap gap-2">
							{country.idTypes.map((idType, idx) => (
								<span
									key={idx}
									className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-200 transition-colors"
								>
									{idType}
								</span>
							))}
						</div>
					</div>

					{/* Languages */}
					{details.languages && details.languages.length > 0 && (
						<div className="mb-8">
							<h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
								<TranslateIcon style={{ color: regionColor }} />
								Languages Supported
							</h3>
							<div className="flex flex-wrap gap-2">
								{details.languages.map((lang, idx) => (
									<span
										key={idx}
										className="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded-full"
									>
										{lang}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Verification Partners */}
					{details.verificationPartners &&
						details.verificationPartners.length > 0 && (
							<div className="mb-8">
								<h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
									<GraphIcon style={{ color: regionColor }} />
									Verification Partners
								</h3>
								<div className="flex flex-wrap gap-2">
									{details.verificationPartners.map((partner, idx) => (
										<span
											key={idx}
											className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
										>
											{partner}
										</span>
									))}
								</div>
							</div>
						)}

					{/* Verification Features */}
					<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
						<h3 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
							<ShieldStarIcon style={{ color: regionColor }} />
							Verification Features
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<div className="flex items-center gap-3 p-3 bg-white rounded-xl">
								<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100">
									<UserFocusIcon className="text-teal-600" />
								</div>
								<span className="text-sm text-gray-700">
									Identity Verification
								</span>
							</div>
							<div className="flex items-center gap-3 p-3 bg-white rounded-xl">
								<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100">
									<CameraIcon className="text-cyan-600" />
								</div>
								<span className="text-sm text-gray-700">
									Liveness Detection
								</span>
							</div>
							<div className="flex items-center gap-3 p-3 bg-white rounded-xl">
								<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100">
									<FileMagnifyingGlassIcon className="text-emerald-600" />
								</div>
								<span className="text-sm text-gray-700">
									Document Verification
								</span>
							</div>
							<div className="flex items-center gap-3 p-3 bg-white rounded-xl">
								<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100">
									<DatabaseIcon className="text-amber-600" />
								</div>
								<span className="text-sm text-gray-700">Database Check</span>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-gray-100 bg-gray-50">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<ClockIcon></ClockIcon>
							<span>Real-time verification available</span>
						</div>
						<button
							onClick={onClose}
							className="px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
						>
							Close
						</button>
					</div>
				</div>
			</div>

			<style>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>
		</div>
	);
}
