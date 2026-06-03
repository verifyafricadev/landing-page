import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  noIndex?: boolean;
  schema?: object | object[];
  /** Absolute URL or path to the page's representative image — used for og:image & twitter:image */
  image?: string;
  /** Twitter card type — defaults to 'summary_large_image' */
  twitterCard?: 'summary' | 'summary_large_image';
  /**
   * ISO 3166-1 alpha-2 country code for per-country geo targeting.
   * e.g. 'NG' for Nigeria, 'KE' for Kenya, 'ZA' for South Africa.
   * Falls back to 'AF' (pan-African) when not provided.
   */
  geoRegion?: string;
  /**
   * Latitude;Longitude for the geo.position meta tag.
   * e.g. '9.0820;8.6753' for Nigeria.
   * Falls back to the African continent centroid when not provided.
   */
  geoPosition?: string;
  /**
   * Human-readable place name for the geo.placename meta tag.
   * e.g. 'Nigeria', 'Kenya', 'South Africa'.
   * Falls back to 'Africa' when not provided.
   */
  geoPlacename?: string;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://verifyafrica.io';

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  noIndex = false,
  schema,
  image,
  twitterCard = 'summary_large_image',
  geoRegion,
  geoPosition,
  geoPlacename,
}: SEOHeadProps) {
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  // Resolve image to an absolute URL
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  useEffect(() => {
    // ── Title ────────────────────────────────────────────────────
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        // Parse the attribute name + value from the selector string
        // e.g. 'meta[name="description"]' → name="description"
        const inner = selector.slice('meta['.length, -1); // name="description"
        const eqIdx = inner.indexOf('=');
        const attrName = inner.slice(0, eqIdx);
        const attrValue = inner.slice(eqIdx + 1).replace(/^"|"$/g, '');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    const removeMeta = (selector: string) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    // ── Core meta ────────────────────────────────────────────────
    setMeta('meta[name="description"]', 'content', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'content', keywords);
    }
    setMeta(
      'meta[name="robots"]',
      'content',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );
    setMeta(
      'meta[name="last-modified"]',
      'content',
      new Date().toISOString().split('T')[0]
    );

    // ── Canonical ────────────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Open Graph ───────────────────────────────────────────────
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:site_name"]', 'content', 'VerifyAfrica');

    if (imageUrl) {
      setMeta('meta[property="og:image"]', 'content', imageUrl);
      setMeta('meta[property="og:image:width"]', 'content', '1200');
      setMeta('meta[property="og:image:height"]', 'content', '630');
    } else {
      removeMeta('meta[property="og:image"]');
      removeMeta('meta[property="og:image:width"]');
      removeMeta('meta[property="og:image:height"]');
    }

    // ── Twitter Card ─────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'content', twitterCard);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:site"]', 'content', '@VerifyAfrica');

    if (imageUrl) {
      setMeta('meta[name="twitter:image"]', 'content', imageUrl);
    } else {
      removeMeta('meta[name="twitter:image"]');
    }

    // ── Schema.org JSON-LD ───────────────────────────────────────
    const existingScript = document.getElementById('schema-jsonld');
    if (existingScript) existingScript.remove();

    if (schema) {
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      const schemas = Array.isArray(schema) ? schema : [schema];
      script.textContent = JSON.stringify(
        schemas.length === 1 ? schemas[0] : schemas
      );
      document.head.appendChild(script);
    }

    // ── LCP image preload for article pages ─────────────────────────────
    // Inject a high-priority <link rel="preload"> for the article hero image
    // so the browser starts fetching it as early as possible (improves LCP).
    // Only done for article pages where imageUrl is the LCP element.
    if (ogType === 'article' && imageUrl) {
      const preloadId = 'article-hero-preload';
      let preloadEl = document.getElementById(preloadId) as HTMLLinkElement | null;
      if (!preloadEl) {
        preloadEl = document.createElement('link') as HTMLLinkElement;
        preloadEl.id = preloadId;
        preloadEl.rel = 'preload';
        preloadEl.setAttribute('as', 'image');
        (preloadEl as HTMLLinkElement & { fetchpriority?: string }).fetchpriority = 'high';
        document.head.insertBefore(preloadEl, document.head.firstChild);
      }
      preloadEl.href = imageUrl;
    }

    // ── Geo / Localized SEO ──────────────────────────────────────────────
    const resolvedGeoRegion = geoRegion ?? 'AF';
    const resolvedGeoPosition = geoPosition ?? '8.7832;34.5085';
    const resolvedGeoPlacename = geoPlacename ?? 'Africa';
    const resolvedICBM = resolvedGeoPosition.replace(';', ', ');

    setMeta('meta[name="geo.region"]', 'content', resolvedGeoRegion);
    setMeta('meta[name="geo.position"]', 'content', resolvedGeoPosition);
    setMeta('meta[name="geo.placename"]', 'content', resolvedGeoPlacename);
    setMeta('meta[name="ICBM"]', 'content', resolvedICBM);

    return () => {
      const s = document.getElementById('schema-jsonld');
      if (s) s.remove();
      // Remove article hero preload when navigating away from article pages
      if (ogType === 'article') {
        const p = document.getElementById('article-hero-preload');
        if (p) p.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, noIndex, schema, imageUrl, twitterCard, geoRegion, geoPosition, geoPlacename]);

  return null;
}
