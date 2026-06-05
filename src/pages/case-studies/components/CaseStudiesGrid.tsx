import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { caseStudies, industries } from "../../../mocks/caseStudies";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";
import { track } from "@/lib/analytics";
import {
	FileMagnifyingGlassIcon,
} from "@phosphor-icons/react";

export default function CaseStudiesGrid() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
	const [selectedCaseStudy, setSelectedCaseStudy] = useState<
		(typeof caseStudies)[0] | null
	>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Auto-open modal when ?open=<id> is present in the URL
	useEffect(() => {
		const openId = searchParams.get("open");
		if (openId) {
			const match = caseStudies.find((s) => s.id === Number(openId));
			if (match) {
				setSelectedCaseStudy(match);
				setIsModalOpen(true);
			}
		}
	}, [searchParams]);

	const handleClose = () => {
		setIsModalOpen(false);
		// Remove the ?open param from the URL without a page reload
		if (searchParams.has("open")) {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					next.delete("open");
					return next;
				},
				{ replace: true },
			);
		}
	};

	const filteredStudies =
		selectedIndustry === "All Industries"
			? caseStudies
			: caseStudies.filter((study) => study.industry === selectedIndustry);

	const handleCardClick = (study: (typeof caseStudies)[0]) => {
		track("case_study_clicked", {
			client: study.client,
			industry: study.industry,
			featured: Boolean(study.featured),
		});
		setSelectedCaseStudy(study);
		setIsModalOpen(true);
	};

	return (
		<section className="py-16 lg:py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
				{/* Filter Bar */}
				<div className="flex flex-wrap items-center justify-center gap-3 mb-12">
					{industries.map((industry) => (
						<button
							key={industry}
							onClick={() => setSelectedIndustry(industry)}
							className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
								selectedIndustry === industry
									? "bg-secondary text-white"
									: "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
							}`}
						>
							{industry}
						</button>
					))}
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{filteredStudies.map((study) => (
						<CaseStudyCard
							key={study.id}
							title={study.title}
							client={study.client}
							industry={study.industry}
							challenge={study.challenge}
							results={study.results}
							image={study.image}
							featured={study.featured}
							onClick={() => handleCardClick(study)}
						/>
					))}
				</div>

				{/* Empty State */}
				{filteredStudies.length === 0 && (
					<div className="text-center py-16">
						<FileMagnifyingGlassIcon className="text-5xl text-gray-300 mb-4 block" />
						<h3 className="text-xl font-semibold text-gray-700 mb-2">
							No case studies found
						</h3>
						<p className="text-gray-500">
							Try selecting a different industry filter.
						</p>
					</div>
				)}
			</div>

			{/* Modal */}
			<CaseStudyModal
				caseStudy={selectedCaseStudy}
				isOpen={isModalOpen}
				onClose={handleClose}
			/>
		</section>
	);
}
