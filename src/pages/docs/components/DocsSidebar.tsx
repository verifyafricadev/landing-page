import { useState } from "react";

interface DocsSidebarProps {
	selectedVerification: string;
	setSelectedVerification: (value: string) => void;
	apiSection: "single" | "bulk";
	setApiSection: (value: "single" | "bulk") => void;
}

type Item = { id: string; name: string };
type FlatSection = { type: "flat"; label: string; items: Item[] };
type CountryGroup = { flag: string; country: string; items: Item[] };
type CountriesSection = {
	type: "countries";
	label: string;
	countries: CountryGroup[];
};
type Section = FlatSection | CountriesSection;

const sections: Section[] = [
	{
		type: "flat",
		label: "Identity Verification",
		items: [
			{ id: "id_document", name: "Document Verification" },
			{ id: "face_match", name: "Facial Screening" },
		],
	},
	{
		type: "flat",
		label: "Compliance & Screening",
		items: [
			{ id: "aml_screening", name: "AML Screening" },
			{ id: "business_aml_screening", name: "Business AML Screening" },
			{ id: "kyb_screening", name: "KYB - Know Your Business" },
		],
	},
	{
		type: "flat",
		label: "Address Verification",
		items: [{ id: "address_verification", name: "Address Verification" }],
	},
	{
		type: "flat",
		label: "Risk & Crypto",
		items: [
			{ id: "risk_assessment", name: "Risk Assessment" },
			{ id: "crypto_wallet_screening", name: "Crypto Wallet Screening" },
		],
	},
	{
		type: "countries",
		label: "Government Registry Checks",
		countries: [
			{
				flag: "🇿🇦",
				country: "South Africa",
				items: [
					{ id: "za_said_verification", name: "South Africa ID Verification" },
				],
			},
			{
				flag: "🇳🇬",
				country: "Nigeria",
				items: [
					{ id: "ng_bvn_verification", name: "Nigeria BVN Verification" },
					{ id: "ng_nin_verification", name: "Nigeria NIN Verification" },
					{ id: "ng_virtual_nin_verification", name: "Nigeria Virtual NIN" },
					{
						id: "ng_advanced_phone_number_verification",
						name: "Nigeria Phone Verification",
					},
					{ id: "ng_phone_number_lookup", name: "Nigeria Phone Lookup" },
					{ id: "ng_cac_lookup", name: "Nigeria CAC Lookup" },
					{
						id: "ng_passport_verification",
						name: "Nigeria Passport Verification",
					},
				],
			},
			{
				flag: "🇬🇭",
				country: "Ghana",
				items: [
					{ id: "gh_passport_lookup", name: "Ghana Passport Lookup" },
					{ id: "gh_voter_card_lookup", name: "Ghana Voter Card Lookup" },
					{ id: "gh_ssnit_lookup", name: "Ghana SSNIT Lookup" },
					{ id: "gh_drivers_license_lookup", name: "Ghana Driver's License" },
				],
			},
			{
				flag: "🇰🇪",
				country: "Kenya",
				items: [
					{ id: "ke_passport_lookup", name: "Kenya Passport Lookup" },
					{ id: "ke_national_id_lookup", name: "Kenya National ID Lookup" },
					{ id: "ke_phone_number_lookup", name: "Kenya Phone Lookup" },
					{ id: "ke_tax_pin_verification", name: "Kenya Tax PIN Verification" },
				],
			},
		],
	},
];

function getAllItems(): Item[] {
	const items: Item[] = [];
	sections.forEach((s) => {
		if (s.type === "flat") items.push(...s.items);
		else s.countries.forEach((c) => items.push(...c.items));
	});
	return items;
}

export default function DocsSidebar({
	selectedVerification,
	setSelectedVerification,
	apiSection,
	setApiSection,
}: DocsSidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [collapsedSections, setCollapsedSections] = useState<
		Record<string, boolean>
	>({});
	const [collapsedCountries, setCollapsedCountries] = useState<
		Record<string, boolean>
	>({
		"South Africa": true,
		Nigeria: true,
		Ghana: true,
		Kenya: true,
	});

	const toggleSection = (label: string) =>
		setCollapsedSections((prev) => ({ ...prev, [label]: !prev[label] }));
	const toggleCountry = (country: string) =>
		setCollapsedCountries((prev) => ({ ...prev, [country]: !prev[country] }));

	const query = searchQuery.toLowerCase();
	const allItems = getAllItems();
	const filteredIds = query
		? new Set(
				allItems
					.filter((i) => i.name.toLowerCase().includes(query))
					.map((i) => i.id),
			)
		: null;

	const itemBtn = (item: Item) => (
		<button
			key={item.id}
			onClick={() => setSelectedVerification(item.id)}
			className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all cursor-pointer ${
				selectedVerification === item.id
					? "bg-teal-50 text-teal-700 font-medium"
					: "text-gray-600 hover:bg-gray-50 hover:text-secondary"
			}`}
		>
			{item.name}
		</button>
	);

	return (
		<div className="w-full lg:w-64 flex-shrink-0">
			<div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
				{/* API Sections */}
				<div className="mb-5">
					<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
						API Sections
					</h3>
					<div className="flex bg-gray-100 rounded-lg p-1">
						<button
							onClick={() => setApiSection("single")}
							className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
								apiSection === "single"
									? "bg-teal-500 text-white shadow-sm"
									: "text-gray-600 hover:text-secondary"
							}`}
						>
							Single
						</button>
						<button
							onClick={() => setApiSection("bulk")}
							className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
								apiSection === "bulk"
									? "bg-teal-500 text-white shadow-sm"
									: "text-gray-600 hover:text-secondary"
							}`}
						>
							Bulk
						</button>
					</div>
				</div>

				{/* Search */}
				<div className="mb-4">
					<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
						API Reference
					</h3>
					<div className="relative">
						<i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
						<input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Sections */}
				<div className="space-y-1 max-h-[520px] overflow-y-auto pr-1">
					{sections.map((section) => {
						const isCollapsed = collapsedSections[section.label];

						if (section.type === "flat") {
							const visibleItems = filteredIds
								? section.items.filter((i) => filteredIds.has(i.id))
								: section.items;
							if (visibleItems.length === 0) return null;
							return (
								<div key={section.label}>
									<button
										onClick={() => toggleSection(section.label)}
										className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-50"
									>
										<span>{section.label}</span>
										<i
											className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${
												isCollapsed ? "-rotate-90" : ""
											}`}
										></i>
									</button>
									{!isCollapsed && (
										<div className="ml-2 mt-1 space-y-0.5">
											{visibleItems.map(itemBtn)}
										</div>
									)}
								</div>
							);
						}

						// countries section
						const isSecCollapsed = collapsedSections[section.label];
						const hasVisible = section.countries.some((c) =>
							filteredIds ? c.items.some((i) => filteredIds.has(i.id)) : true,
						);
						if (!hasVisible) return null;

						return (
							<div key={section.label}>
								<button
									onClick={() => toggleSection(section.label)}
									className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-50"
								>
									<span>{section.label}</span>
									<i
										className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${
											isSecCollapsed ? "-rotate-90" : ""
										}`}
									></i>
								</button>
								{!isSecCollapsed && (
									<div className="ml-2 mt-1 space-y-0.5">
										{section.countries.map((cg) => {
											const visibleItems = filteredIds
												? cg.items.filter((i) => filteredIds.has(i.id))
												: cg.items;
											if (visibleItems.length === 0) return null;
											const isCountryCollapsed = filteredIds
												? false
												: collapsedCountries[cg.country];
											return (
												<div key={cg.country}>
													<button
														onClick={() => toggleCountry(cg.country)}
														className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
													>
														<span>
															{cg.flag} {cg.country}
															<span className="ml-1 text-xs text-gray-400">
																({cg.items.length})
															</span>
														</span>
														<i
															className={`ri-arrow-down-s-line text-gray-400 text-xs transition-transform duration-200 ${
																isCountryCollapsed ? "-rotate-90" : ""
															}`}
														></i>
													</button>
													{!isCountryCollapsed && (
														<div className="ml-3 space-y-0.5">
															{visibleItems.map(itemBtn)}
														</div>
													)}
												</div>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
