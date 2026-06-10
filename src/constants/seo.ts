export const SITE_URL =
	import.meta.env.VITE_SITE_URL || "https://verifyafrica.io";

export const SITE_NAME = "VerifyAfrica";

export const TWITTER_SITE = "@VerifyAfrica";

export const BRAND_LOGO_PATH = "/assets/brand/logo.svg";

export const BRAND_LOGO_URL = `${SITE_URL}${BRAND_LOGO_PATH}`;

export const BRAND_LOGO_WIDTH = 439;

export const BRAND_LOGO_HEIGHT = 257;

export const DEFAULT_OG_IMAGE_WIDTH = 1200;

export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const OG_LOCALE = "en_US";

export const OG_LOCALE_ALTERNATES = ["fr_FR", "ar_AR", "pt_PT"] as const;

export function resolveCanonicalUrl(path?: string): string {
	if (!path || path === "/") {
		return `${SITE_URL}/`;
	}
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function resolveImageUrl(image?: string): string | undefined {
	if (!image) return undefined;
	return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}
