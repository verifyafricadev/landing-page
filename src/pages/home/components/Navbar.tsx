import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../../../hooks/useScrollAnimation";
import { HoverUnderline } from "@/components/ui/hover-underline";

interface NavbarProps {
	onRequestDemo: () => void;
}

const navItems = [
	{ href: "/features", label: "Features", isLink: true },
	{ href: "https://docs.verifyafrica.io", label: "API Docs" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "/about", label: "About", isLink: true },
];

export default function HomeNavbar({ onRequestDemo }: NavbarProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 100);
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const showSolidBg = isScrolled || isMobileMenuOpen;

	const handleHashClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		smoothScrollTo(href, {
			duration: 1200,
			easing: "easeInOutQuart",
			offset: -80,
		});
	};

	const handleMobileItemClick = (
		href: string,
		isLink?: boolean,
		isExternal?: boolean,
	) => {
		setIsMobileMenuOpen(false);
		if (isExternal) {
			window.open(href, "_blank", "noopener,noreferrer");
		} else if (isLink) {
			navigate(href);
		} else {
			setTimeout(() => {
				smoothScrollTo(href, {
					duration: 1200,
					easing: "easeInOutQuart",
					offset: -80,
				});
			}, 320);
		}
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
					showSolidBg
						? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
						: "bg-transparent"
				} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
					<div className="relative flex items-center justify-between h-16 sm:h-20 lg:h-28 overflow-hidden lg:overflow-visible">
						{/* Logo */}
						<Link
							to="/"
							className="flex items-center group flex-shrink-0"
						>
							<img
								src="/assets/brand/logo.svg"
								alt="VerifyAfrica"
								title="VerifyAfrica – KYC, AML &amp; Identity Verification Platform for Africa"
								className="h-12 sm:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
							/>
						</Link>

						{/* Desktop Nav Links — centered absolutely so they sit in the true middle */}
						<div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 pointer-events-none lg:pointer-events-auto">
							{navItems.map((item, index) =>
								item.href.startsWith("http") ? (
									<a
										key={item.href}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className={`relative text-sm font-medium transition-all duration-300 hover:text-teal-500 group cursor-pointer ${
											showSolidBg ? "text-gray-700" : "text-white/90"
										}`}
										style={{
											opacity: isVisible ? 1 : 0,
											transform: isVisible
												? "translateY(0)"
												: "translateY(-10px)",
											transition: `all 0.4s ease-out ${200 + index * 50}ms`,
										}}
									>
										{item.label}
										<HoverUnderline />
									</a>
								) : item.isLink ? (
									<Link
										key={item.href}
										to={item.href}
										className={`relative text-sm font-medium transition-all duration-300 hover:text-teal-500 group ${
											showSolidBg ? "text-gray-700" : "text-white/90"
										}`}
										style={{
											opacity: isVisible ? 1 : 0,
											transform: isVisible
												? "translateY(0)"
												: "translateY(-10px)",
											transition: `all 0.4s ease-out ${200 + index * 50}ms`,
										}}
									>
										{item.label}
										<HoverUnderline />
									</Link>
								) : (
									<a
										key={item.href}
										href={item.href}
										onClick={(e) => handleHashClick(e, item.href)}
										className={`relative text-sm font-medium transition-all duration-300 hover:text-teal-500 group cursor-pointer ${
											showSolidBg ? "text-gray-700" : "text-white/90"
										}`}
										style={{
											opacity: isVisible ? 1 : 0,
											transform: isVisible
												? "translateY(0)"
												: "translateY(-10px)",
											transition: `all 0.4s ease-out ${200 + index * 50}ms`,
										}}
									>
										{item.label}
										<HoverUnderline />
									</a>
								),
							)}
						</div>

						{/* Desktop CTA */}
						<div
							className="hidden lg:flex items-center space-x-4"
							style={{
								opacity: isVisible ? 1 : 0,
								transform: isVisible ? "translateY(0)" : "translateY(-10px)",
								transition: "all 0.4s ease-out 500ms",
							}}
						>
							<a
								href="https://dashboard.verifyafrica.io/login"
								target="_blank"
								rel="noopener noreferrer"
								className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer ${
									showSolidBg
										? "text-gray-700 border border-gray-300 hover:border-teal-400 hover:text-teal-600"
										: "text-white border border-white/30 hover:border-white/60 hover:bg-white/10"
								}`}
							>
								Explore Dashboard
							</a>
							<button
								onClick={onRequestDemo}
								className="group relative px-5 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg overflow-hidden transition-all whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-teal-500/30"
							>
								<span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<span className="relative z-10">Request Demo</span>
							</button>
						</div>

						{/* Mobile right-side controls */}
						<div className="flex lg:hidden items-center gap-2">
							<button
								onClick={onRequestDemo}
								className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-500 text-white text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer"
							>
								Demo
							</button>
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-label="Toggle menu"
								className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
									showSolidBg
										? "text-gray-800 bg-gray-100 hover:bg-gray-200"
										: "text-white bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm"
								}`}
							>
								<i
									className={`${isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"} text-xl sm:text-2xl`}
								/>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile overlay */}
			<div
				className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
					isMobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsMobileMenuOpen(false)}
			/>

			{/* Mobile drawer */}
			<div
				className={`fixed top-16 sm:top-20 left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto transition-transform duration-300 ease-out ${
					isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="px-6 py-8 space-y-2">
					{navItems.map((item) =>
						item.isExternal ? (
							<a
								key={item.href}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setIsMobileMenuOpen(false)}
								className="block px-4 py-4 text-lg font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-all cursor-pointer"
							>
								{item.label}
							</a>
						) : item.isLink ? (
							<Link
								key={item.href}
								to={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="block px-4 py-4 text-lg font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-all cursor-pointer"
							>
								{item.label}
							</Link>
						) : (
							<button
								key={item.href}
								onClick={() => handleMobileItemClick(item.href, false, false)}
								className="w-full text-left px-4 py-4 text-lg font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-all cursor-pointer"
							>
								{item.label}
							</button>
						),
					)}

					<div className="pt-6 mt-4 border-t border-gray-200 space-y-4">
						<a
							href="https://dashboard.verifyafrica.io/login"
							target="_blank"
							rel="noopener noreferrer"
							className="block w-full py-3 px-6 text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-teal-400 hover:text-teal-600 transition-all cursor-pointer text-center"
						>
							Explore Dashboard
						</a>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								onRequestDemo();
							}}
							className="w-full py-3 px-6 bg-teal-500 text-white text-base font-medium rounded-lg hover:bg-teal-600 transition-all cursor-pointer"
						>
							Request Demo
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
