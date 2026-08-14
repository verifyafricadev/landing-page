import { useDemoModal } from "../../hooks/useDemoModal";
import Navbar from "@/pages/home/components/Navbar";
import ContactHero from "./components/ContactHero";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import Footer from "@/pages/home/components/Footer";
import SEOHead from "../../components/feature/SEOHead";
import { CONTACT_SEO } from "@/constants/seo";
import {
	createBreadcrumbList,
	createWebPageSchema,
} from "@/lib/schema";

const contactSchema = [
	createWebPageSchema({
		path: CONTACT_SEO.canonical,
		type: "ContactPage",
		name: CONTACT_SEO.title,
		description: CONTACT_SEO.description,
	}),
	createBreadcrumbList(CONTACT_SEO.canonical, [
		{ name: "Home", path: "/" },
		{ name: "Contact", path: CONTACT_SEO.canonical },
	]),
];

export default function ContactPage() {
	const { openDemo } = useDemoModal();

	return (
		<div className="min-h-screen bg-white">
			<SEOHead
				title={CONTACT_SEO.title}
				description={CONTACT_SEO.description}
				ogDescription={CONTACT_SEO.ogDescription}
				twitterDescription={CONTACT_SEO.twitterDescription}
				keywords={CONTACT_SEO.keywords}
				canonical={CONTACT_SEO.canonical}
				image={CONTACT_SEO.image}
				imageWidth={CONTACT_SEO.imageWidth}
				imageHeight={CONTACT_SEO.imageHeight}
				imageAlt={CONTACT_SEO.imageAlt}
				schema={contactSchema}
			/>
			<Navbar
				onRequestDemo={openDemo}
				variant="solid"
			/>
			<ContactHero />
			<ContactForm />
			<ContactInfo />
			<Footer />
		</div>
	);
}
