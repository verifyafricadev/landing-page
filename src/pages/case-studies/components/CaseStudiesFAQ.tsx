import FAQ, { type FAQItem } from "@/components/feature/FAQ";

const faqs: FAQItem[] = [
	{
		question: "What industries does VerifyAfrica serve?",
		answer:
			"VerifyAfrica serves a wide range of regulated industries including Fintech, FX Brokers, iGaming & sports betting operators, Payment Service Providers, Banks & Microfinance Institutions, Telecoms, E-commerce marketplaces, Insurance, and Crypto & Web3 platforms. Our compliance infrastructure is purpose-built for the nuances of each vertical.",
	},
	{
		question: "How quickly can we integrate the VerifyAfrica API?",
		answer:
			"Most teams complete their core API integration within 1–2 weeks. We provide full REST API documentation, code samples in six languages (cURL, Node.js, Python, Java, Fetch, and Axios), sandbox credentials, and a dedicated onboarding engineer for enterprise accounts. Lighter integrations using our hosted verification link (Link Mode) can go live within hours.",
	},
	{
		question: "Can VerifyAfrica handle high-volume KYC onboarding at scale?",
		answer:
			"Yes. The platform is built on horizontally scalable cloud infrastructure and supports real-time verification at any volume. Clients processing hundreds of thousands of verifications per month use VerifyAfrica without degradation in response time or accuracy. Bulk Verification endpoints allow batch processing of up to 100 records per request for back-book remediation or mass onboarding programmes.",
	},
	{
		question:
			"What compliance results have clients achieved with VerifyAfrica?",
		answer:
			"Across our client base, outcomes include a 68% reduction in average KYC onboarding time, a 73% drop in fraud losses through AI-powered synthetic identity detection, a 54% decrease in false positive rates on AML screening, and compliance teams redeploying up to 40% of manual review capacity to higher-value risk analysis. Individual results vary by integration depth and use-case configuration.",
	},
	{
		question: "Which African gambling regulators does VerifyAfrica support?",
		answer:
			"VerifyAfrica supports compliance workflows for operators licensed across all major African gambling jurisdictions. This includes Kenya's Betting Control and Licensing Board (BCLB), Nigeria's National Lottery Regulatory Commission (NLRC) and state-level bodies such as the Lagos State Lotteries Board, South Africa's Western Cape Gambling and Racing Board, the Eastern Cape Gambling and Betting Board, and the Gauteng Gambling Board. We also support operators in Tanzania (Gaming Board of Tanzania), Uganda (National Lotteries and Gaming Regulatory Board), and Ghana (Gaming Commission of Ghana). Our KYC and AML workflows are pre-mapped to each regulator's specific identity verification, age verification, and responsible gambling requirements — so operators can demonstrate compliance out of the box.",
	},
];

export default function CaseStudiesFAQ() {
	return (
		<FAQ
			faqs={faqs}
			title="Questions About Our Platform"
		/>
	);
}
