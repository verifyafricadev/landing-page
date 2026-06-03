import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { popularResources } from "../../../mocks/blogArticles";

// Map each resource title to its best matching internal route
const resourceLinkMap: Record<string, string> = {
	"African KYC Compliance Checklist 2025": "/resources",
	"AML Risk Assessment Template": "/resources",
	"Regulatory Map: Africa 54 Countries": "/case-studies",
	"Identity Verification API Documentation": "/docs",
	"Compliance Officer's Handbook for Africa": "/resources",
};

export default function BlogSidebar() {
	const { ref: nlRef, isVisible: nlVisible } = useScrollAnimation();
	const { ref: resRef, isVisible: resVisible } = useScrollAnimation();

	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		// Basic email validation
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		setIsSubmitting(true);
		try {
			const formData = new URLSearchParams();
			formData.append("email", email);

			const res = await fetch(
				"https://readdy.ai/api/form/d7phe8vhqnrhtnv4fii0",
				{
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: formData.toString(),
				},
			);

			if (res.ok) {
				setIsSuccess(true);
				setEmail("");
			} else {
				// Try to extract error details from the response, fallback to generic message
				const data = await res.json().catch(() => null);
				setError(data?.message ?? "Something went wrong. Please try again.");
			}
		} catch (err) {
			console.error("Subscription error:", err);
			setError("Network error. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<aside className="space-y-8">
			{/* Newsletter */}
			<div
				ref={nlRef}
				className={`bg-teal-50 rounded-xl p-6 transition-all duration-700 ${
					nlVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
					<i className="ri-mail-send-line text-teal-600 text-lg"></i>
				</div>
				<h3 className="text-base font-bold text-secondary mb-2">
					Stay Updated
				</h3>
				<p className="text-sm text-gray-500 mb-4 leading-relaxed">
					Get the latest compliance insights and regulatory updates delivered to
					your inbox weekly.
				</p>

				{isSuccess ? (
					<div className="flex items-center gap-2 text-teal-700 bg-teal-100 rounded-lg p-3">
						<i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
						<span className="text-sm font-medium">
							Subscribed successfully!
						</span>
					</div>
				) : (
					<form
						id="blog-newsletter-form"
						data-readdy-form
						onSubmit={handleSubscribe}
						className="space-y-3"
					>
						<input
							type="email"
							name="email"
							placeholder="Your work email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
						/>
						{error && <p className="text-xs text-red-500">{error}</p>}
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all whitespace-nowrap cursor-pointer disabled:opacity-60"
						>
							{isSubmitting ? "Subscribing..." : "Subscribe"}
						</button>
						<p className="text-xs text-gray-400 text-center">
							No spam. Unsubscribe anytime.
						</p>
					</form>
				)}
			</div>

			{/* Popular Resources */}
			<div
				ref={resRef}
				className={`bg-white border border-gray-100 rounded-xl p-6 transition-all duration-700 delay-100 ${
					resVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				<h3 className="text-base font-bold text-secondary mb-4">
					Popular Resources
				</h3>
				<ul className="space-y-1">
					{popularResources.map((resource, index) => (
						<li key={resource.id ?? index}>
							<Link
								to={resourceLinkMap[resource.title] ?? "/blog"}
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
							>
								<div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-100 transition-colors">
									<i className="ri-file-text-line text-teal-600"></i>
								</div>
								<div className="min-w-0">
									<p className="text-sm font-medium text-gray-800 group-hover:text-teal-700 transition-colors leading-snug">
										{resource.title}
									</p>
									<p className="text-xs text-gray-400 mt-1">
										{resource.type} • {resource.downloads.toLocaleString()}{" "}
										downloads
									</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}
