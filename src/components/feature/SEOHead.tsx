import { useEffect } from "react";
import {
	OG_LOCALE,
	OG_LOCALE_ALTERNATES,
	SITE_NAME,
	TWITTER_SITE,
	resolveCanonicalUrl,
	resolveImageUrl,
} from "@/constants/seo";

interface SEOHeadProps {
	title?: string;
	description?: string;
	ogDescription?: string;
	twitterDescription?: string;
	keywords?: string | string[];
	canonical?: string;
	ogType?: string;
	noIndex?: boolean;
	schema?: object | object[];
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	twitterCard?: "summary" | "summary_large_image";
	author?: string;
	geoRegion?: string;
	geoPosition?: string;
	geoPlacename?: string;
}

/**
 * Per-page head manager.
 *
 * IMPORTANT — runtime vs. static conflict resolution:
 * index.html already ships a full set of static <title>, description,
 * canonical, Open Graph and Twitter tags so that crawlers which do NOT
 * execute JavaScript (X/Twitter, Facebook, WhatsApp, Telegram) always
 * have a valid homepage social card to read.
 *
 * This component runs on the client and *mutates the SAME tags in place*
 * (looked up via their `property` / `name` / `rel` selector) instead of
 * appending duplicates. Crawlers that DO run JS (LinkedIn, Slack, Google,
 * Discord) therefore see the correct per-page title/description/image,
 * while non-JS crawlers gracefully fall back to the static index.html
 * homepage card. No duplicate tags are ever created.
 */

/** Find (or lazily create) a <meta> tag matched by attribute+value. */
function upsertMeta(
	attr: "property" | "name",
	key: string,
	content: string | undefined,
): void {
	if (content === undefined || content === null || content === "") return;
	let el = document.head.querySelector<HTMLMetaElement>(
		`meta[${attr}="${key}"]`,
	);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

/** Find (or lazily create) the canonical <link>. */
function upsertCanonical(href: string): void {
	let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", "canonical");
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
}

export default function SEOHead({
	title,
	description,
	ogDescription,
	twitterDescription,
	keywords,
	canonical,
	ogType = "website",
	noIndex,
	schema,
	image,
	imageAlt,
	imageWidth,
	imageHeight,
	twitterCard = "summary_large_image",
	author,
	geoRegion,
	geoPosition,
	geoPlacename,
}: SEOHeadProps) {
	// --- Title + core meta + OG + Twitter tags -------------------------------
	useEffect(() => {
		if (title) document.title = title;

		if (description) {
			upsertMeta("name", "description", description);
		}

		if (keywords) {
			const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
			upsertMeta("name", "keywords", kw);
		}

		if (author) upsertMeta("name", "author", author);

		// robots
		upsertMeta(
			"name",
			"robots",
			noIndex ? "noindex, nofollow" : "index, follow",
		);

		// canonical
		const canonicalUrl = resolveCanonicalUrl(canonical);
		upsertCanonical(canonicalUrl);

		// --- Open Graph -----------------------------------------------------
		upsertMeta("property", "og:site_name", SITE_NAME);
		upsertMeta("property", "og:type", ogType);
		if (title) upsertMeta("property", "og:title", title);
		upsertMeta(
			"property",
			"og:description",
			ogDescription || description,
		);
		upsertMeta("property", "og:url", canonicalUrl);
		upsertMeta("property", "og:locale", OG_LOCALE);

		const resolvedImage = resolveImageUrl(image);
		if (resolvedImage) {
			upsertMeta("property", "og:image", resolvedImage);
			upsertMeta("property", "og:image:secure_url", resolvedImage);
			if (imageWidth) {
				upsertMeta("property", "og:image:width", String(imageWidth));
			}
			if (imageHeight) {
				upsertMeta("property", "og:image:height", String(imageHeight));
			}
			if (imageAlt) upsertMeta("property", "og:image:alt", imageAlt);
		}

		// --- Twitter Card ---------------------------------------------------
		upsertMeta("name", "twitter:card", twitterCard);
		upsertMeta("name", "twitter:site", TWITTER_SITE);
		if (title) upsertMeta("name", "twitter:title", title);
		upsertMeta(
			"name",
			"twitter:description",
			twitterDescription || ogDescription || description,
		);
		if (resolvedImage) {
			upsertMeta("name", "twitter:image", resolvedImage);
			if (imageAlt) upsertMeta("name", "twitter:image:alt", imageAlt);
		}

		// --- Geo tags -------------------------------------------------------
		if (geoRegion) upsertMeta("name", "geo.region", geoRegion);
		if (geoPosition) upsertMeta("name", "geo.position", geoPosition);
		if (geoPlacename) upsertMeta("name", "geo.placename", geoPlacename);
	}, [
		title,
		description,
		ogDescription,
		twitterDescription,
		keywords,
		canonical,
		ogType,
		noIndex,
		image,
		imageAlt,
		imageWidth,
		imageHeight,
		twitterCard,
		author,
		geoRegion,
		geoPosition,
		geoPlacename,
	]);

	// --- Schema.org JSON-LD --------------------------------------------------
	useEffect(() => {
		const existingScript = document.getElementById("schema-jsonld");
		if (existingScript) existingScript.remove();

		if (schema) {
			const script = document.createElement("script");
			script.id = "schema-jsonld";
			script.type = "application/ld+json";
			const schemas = Array.isArray(schema) ? schema : [schema];
			script.textContent = JSON.stringify(
				schemas.length === 1 ? schemas[0] : schemas,
			);
			document.head.appendChild(script);
		}

		return () => {
			const s = document.getElementById("schema-jsonld");
			if (s) s.remove();
		};
	}, [schema]);

	return null;
}

export { SITE_NAME, OG_LOCALE, OG_LOCALE_ALTERNATES };