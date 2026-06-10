import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, lazy, Suspense, memo } from "react";
import Navbar from "@/pages/home/components/Navbar";
import SEOHead from "../../../components/feature/SEOHead";
import ArticleHero from "../components/ArticleHero";
import { blogArticles } from "../../../mocks/blogArticles";
import { useDemoModal } from "../../../hooks/useDemoModal";
import { detectCountryFromText } from "@/utils/countryGeo";
import { track } from "@/lib/analytics";
import {
	CheckIcon,
	ClockIcon,
	LightbulbIcon,
	LinkedinLogoIcon,
	LinkIcon,
	XLogoIcon,
} from "@phosphor-icons/react";

// Below-fold — lazy loaded
const Footer = lazy(() => import("@/pages/home/components/Footer"));

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://verifyafrica.io";

// Stable skeleton row widths — defined outside component to avoid recreating on every render
const SKELETON_WIDTHS = [
	"92%",
	"100%",
	"88%",
	"95%",
	"83%",
	"97%",
	"90%",
	"86%",
];

/** Format an ISO date string into a human-readable "Last updated: Month D, YYYY" label */
function formatLastUpdated(isoDate: string): string {
	try {
		return new Date(isoDate).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	} catch {
		return "";
	}
}

// Lazy load the article bodies — only fetched when needed, not parsed on initial load
async function getArticleBody(
	category: string,
	id?: string,
): Promise<{ paragraphs: string[]; takeaways: string[] }> {
	const { articleBodyById, articleBodyByCategory, articleTakeawaysById } =
		await import("../../../mocks/articleBodies");
	const paragraphs =
		id && articleBodyById[id]
			? articleBodyById[id]
			: (articleBodyByCategory[category] ??
				articleBodyByCategory["Best Practices"]);
	const takeaways =
		id && articleTakeawaysById[id]
			? articleTakeawaysById[id]
			: [
					"Stay ahead of regulatory changes with automated monitoring tools.",
					"A risk-based approach maximises compliance efficiency without sacrificing coverage.",
					"Technology and human expertise must work together for optimal outcomes.",
					"Documentation and audit trails are as important as the decisions themselves.",
				];
	return { paragraphs, takeaways };
}

// Memoized share button bar — never needs to re-render
const ShareBar = memo(function ShareBar({
	articleId,
	title,
}: {
	articleId: string;
	title: string;
}) {
	return (
		<div className="mt-8 flex items-center gap-3">
			<span className="text-sm text-gray-400 font-medium">
				Share this article:
			</span>
			<a
				href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${articleId}`)}`}
				target="_blank"
				rel="nofollow noopener noreferrer"
				onClick={() =>
					track("article_shared", { article_id: articleId, channel: "twitter" })
				}
				className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-500 transition-colors cursor-pointer"
			>
				<XLogoIcon className="text-sm" />
			</a>
			<a
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/blog/${articleId}`)}`}
				target="_blank"
				rel="nofollow noopener noreferrer"
				onClick={() =>
					track("article_shared", {
						article_id: articleId,
						channel: "linkedin",
					})
				}
				className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-500 transition-colors cursor-pointer"
			>
				<LinkedinLogoIcon className="text-sm" />
			</a>
			<button
				onClick={() => {
					navigator.clipboard.writeText(`${SITE_URL}/blog/${articleId}`);
					track("article_shared", {
						article_id: articleId,
						channel: "copy_link",
					});
				}}
				className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-500 transition-colors cursor-pointer"
				title="Copy link"
			>
				<LinkIcon className="text-sm" />
			</button>
		</div>
	);
});

export default function ArticlePage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { openDemo } = useDemoModal();
	const [bodyParagraphs, setBodyParagraphs] = useState<string[]>([]);
	const [takeaways, setTakeaways] = useState<string[]>([]);
	const [bodyLoading, setBodyLoading] = useState(true);

	const article = useMemo(() => blogArticles.find((a) => a.id === id), [id]);

	const relatedArticles = useMemo(
		() =>
			article
				? blogArticles
						.filter(
							(a) => a.id !== article.id && a.category === article.category,
						)
						.slice(0, 3)
				: [],
		[article],
	);

	const displayRelated = useMemo(() => {
		if (!article) return [];
		const fallback = blogArticles
			.filter((a) => a.id !== article.id)
			.slice(0, 3 - relatedArticles.length);
		return [...relatedArticles, ...fallback].slice(0, 3);
	}, [article, relatedArticles]);

	// Load article body content lazily
	useEffect(() => {
		if (!article) return;
		let cancelled = false;
		setBodyLoading(true);
		getArticleBody(article.category, article.id).then(
			({ paragraphs, takeaways: t }) => {
				if (!cancelled) {
					setBodyParagraphs(paragraphs);
					setTakeaways(t);
					setBodyLoading(false);
				}
			},
		);
		return () => {
			cancelled = true;
		};
	}, [article]);

	// Fire article_viewed once when article is known
	useEffect(() => {
		if (article) {
			track("article_viewed", {
				article_id: article.id,
				category: article.category,
				author: article.author,
			});
		}
	}, [article?.id]);

	const seoData = useMemo(() => {
		if (!article)
			return {
				isoDate: "",
				articleSchema: [] as object[],
				geoData: null as null | {
					region: string;
					position: string;
					placename: string;
				},
			};

		const iso = (() => {
			try {
				return new Date(article.date).toISOString();
			} catch {
				return new Date().toISOString();
			}
		})();

		const detectedCountry =
			detectCountryFromText(article.title) ??
			detectCountryFromText(article.excerpt);
		const geoData = detectedCountry
			? {
					region: detectedCountry.code,
					position: detectedCountry.position,
					placename: detectedCountry.name,
				}
			: null;

		const schema: object[] = [
			{
				"@context": "https://schema.org",
				"@type": "Article",
				headline: article.title,
				description: article.excerpt,
				image: article.heroImage || article.image,
				datePublished: iso,
				dateModified: iso,
				author: {
					"@type": "Person",
					name: article.author,
					jobTitle: article.authorRole,
				},
				publisher: {
					"@type": "Organization",
					name: "VerifyAfrica",
					url: SITE_URL,
					logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
				},
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": `${SITE_URL}/blog/${article.id}`,
				},
				articleSection: article.category,
				keywords: `${article.category}, KYC Africa, AML compliance, identity verification Africa`,
				wordCount:
					bodyParagraphs.length > 0
						? bodyParagraphs.join(" ").split(" ").length
						: 800,
				url: `${SITE_URL}/blog/${article.id}`,
				isPartOf: { "@id": `${SITE_URL}/blog#webpage` },
				about: { "@id": `${SITE_URL}/#organization` },
				inLanguage: "en",
			},
			{
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [
					{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
					{
						"@type": "ListItem",
						position: 2,
						name: "Blog",
						item: `${SITE_URL}/blog`,
					},
					{
						"@type": "ListItem",
						position: 3,
						name: article.title,
						item: `${SITE_URL}/blog/${article.id}`,
					},
				],
			},
		];

		return { isoDate: iso, articleSchema: schema, geoData };
	}, [article, bodyParagraphs]);

	useEffect(() => {
		if (!article) navigate("/blog", { replace: true });
	}, [article, navigate]);

	if (!article) return null;

	const { isoDate, articleSchema, geoData } = seoData;

	return (
		<div className="min-h-screen bg-white">
			<SEOHead
				title={`${article.title} – VerifyAfrica`}
				description={article.excerpt}
				keywords={`${article.category}, KYC Africa, AML compliance, identity verification, ${article.author}`}
				canonical={`/blog/${article.id}`}
				ogType="article"
				image={article.heroImage || article.image}
				imageAlt={article.title}
				twitterCard="summary_large_image"
				schema={articleSchema}
				geoRegion={geoData?.region}
				geoPosition={geoData?.position}
				geoPlacename={geoData?.placename}
			/>
			<Navbar
				onRequestDemo={openDemo}
				variant="solid"
			/>

			<ArticleHero
				category={article.category}
				title={article.title}
				excerpt={article.excerpt}
				author={article.author}
				authorRole={article.authorRole}
				date={article.date}
				readTime={article.readTime}
				image={article.image}
				heroImage={article.heroImage}
			/>

			{/* Article body */}
			<article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
				{/* Last updated timestamp */}
				{isoDate && (
					<div className="flex items-center gap-2 mb-8 pb-6 border-b border-gray-100">
						<ClockIcon className="w-4 h-4 flex items-center justify-center text-gray-400 text-sm" />
						<time
							dateTime={isoDate}
							className="text-xs text-gray-400 font-medium tracking-wide uppercase"
						>
							Last updated: {formatLastUpdated(isoDate)}
						</time>
					</div>
				)}

				<div className="prose prose-lg max-w-none">
					{bodyLoading ? (
						// Stable skeleton — widths are pre-computed constants, not Math.random()
						// This prevents React from re-rendering the skeleton on every state change
						<div
							className="space-y-4 animate-pulse"
							aria-busy="true"
							aria-label="Loading article content"
						>
							{SKELETON_WIDTHS.map((w, i) => (
								<div
									key={i}
									className="h-4 bg-gray-200 rounded"
									style={{ width: w }}
								/>
							))}
						</div>
					) : (
						bodyParagraphs.map((para, i) => (
							<p
								key={i}
								className="text-gray-700 leading-relaxed text-base mb-6"
							>
								{para}
							</p>
						))
					)}
				</div>

				{/* Key takeaways */}
				<div className="mt-10 p-6 bg-teal-50 rounded-xl border border-teal-100">
					<h2 className="text-base font-bold text-teal-800 mb-3 flex items-center gap-2">
						<LightbulbIcon className="w-5 h-5 flex items-center justify-center text-teal-600" />
						Key Takeaways
					</h2>
					<ul className="space-y-2">
						{takeaways.map((point, i) => (
							<li
								key={i}
								className="flex items-start gap-2 text-sm text-teal-700"
							>
								<CheckIcon className="w-4 h-4 flex items-center justify-center text-teal-500 mt-0.5 shrink-0" />
								{point}
							</li>
						))}
					</ul>
				</div>

				{/* Author card */}
				<div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
					<div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
						<span className="text-base font-bold text-teal-700">
							{article.author
								.trim()
								.split(" ")
								.filter(Boolean)
								.map((n) => n[0])
								.join("")}
						</span>
					</div>
					<div>
						<p className="text-sm font-bold text-secondary">{article.author}</p>
						<p className="text-xs text-teal-600 mb-2">
							{article.authorRole} · VerifyAfrica
						</p>
						<p className="text-sm text-gray-500 leading-relaxed">
							A compliance and regulatory expert at VerifyAfrica with deep
							experience across African financial markets, helping organisations
							build scalable KYC and AML programmes.
						</p>
					</div>
				</div>

				<ShareBar
					articleId={article.id}
					title={article.title}
				/>
			</article>

			{/* Related articles — deferred until near viewport */}
			{displayRelated.length > 0 && (
				<section
					className="bg-gray-50 py-16"
					style={{ contentVisibility: "auto", containIntrinsicSize: "0 400px" }}
				>
					<div className="max-w-4xl mx-auto px-6 lg:px-8">
						<h2 className="text-xl font-bold text-secondary mb-8">
							Related Articles
						</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{displayRelated.map((rel) => (
								<Link
									key={rel.id}
									to={`/blog/${rel.id}`}
									className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
								>
									<div className="w-full h-36 overflow-hidden bg-gray-100">
										<img
											src={rel.image}
											alt={rel.title}
											title={rel.title}
											width={400}
											height={225}
											loading="lazy"
											fetchPriority="low"
											decoding="async"
											className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="p-4">
										<span className="text-xs font-semibold text-teal-600">
											{rel.category}
										</span>
										<h3 className="text-sm font-bold text-secondary mt-1 line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug">
											{rel.title}
										</h3>
										<p className="text-xs text-gray-400 mt-2">
											{rel.date} · {rel.readTime}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA — deferred until near viewport */}
			<section
				className="py-16 bg-white"
				style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
			>
				<div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
					<h2 className="text-2xl font-bold text-secondary mb-3">
						Ready to streamline your compliance?
					</h2>
					<p className="text-gray-500 text-sm mb-6 max-w-xl mx-auto">
						See how VerifyAfrica&apos;s AI-powered platform can automate your
						KYC, AML, and identity verification workflows across all 54 African
						markets.
					</p>
					<div className="flex items-center justify-center gap-3 flex-wrap">
						<button
							onClick={() => {
								track("article_demo_cta_clicked", { article_id: id ?? "" });
								openDemo();
							}}
							className="px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
						>
							Request a Demo
						</button>
					</div>
				</div>
			</section>

			<Suspense fallback={null}>
				<Footer />
			</Suspense>
		</div>
	);
}
