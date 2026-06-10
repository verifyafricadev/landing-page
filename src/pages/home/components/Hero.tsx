import { useEffect, useMemo, useRef, useState } from "react";
import HeroContent from "./hero/shared/HeroContent";
import HeroOrbitalRings from "./hero/shared/HeroOrbitalRings";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

interface HeroProps {
	onRequestDemo: () => void;
	id?: string;
}

const HERO_IMAGES = {
	mobile:
		"https://readdy.ai/api/search-image?query=Stunning%203D%20rendered%20map%20of%20Africa%20continent%20floating%20in%20space%20with%20all%2054%20African%20country%20flags%20orbiting%20around%20it%2C%20dark%20navy%20blue%20and%20deep%20teal%20gradient%20background%2C%20glowing%20digital%20connections%20between%20countries%2C%20holographic%20futuristic%20style%2C%20cinematic%20lighting%20with%20soft%20ambient%20glow%2C%20professional%20corporate%20technology%20aesthetic%2C%20ultra%20detailed%20high%20quality%20render%2C%20vertical%20composition%20centered%20Africa%20map&width=800&height=1200&seq=hero-africa-3d-map-mobile-v2&orientation=portrait",
	tablet:
		"https://readdy.ai/api/search-image?query=Stunning%203D%20rendered%20map%20of%20Africa%20continent%20floating%20in%20space%20with%20all%2054%20African%20country%20flags%20orbiting%20and%20rotating%20around%20it%20in%20a%20circular%20motion%2C%20dark%20navy%20blue%20and%20deep%20teal%20gradient%20background%2C%20glowing%20digital%20connections%20between%20countries%2C%20holographic%20futuristic%20style%2C%20cinematic%20lighting%20with%20soft%20ambient%20glow%2C%20professional%20corporate%20technology%20aesthetic%2C%20ultra%20detailed%20high%20quality%20render&width=1024&height=768&seq=hero-africa-3d-map-t&orientation=landscape",
	desktop:
		"https://readdy.ai/api/search-image?query=Stunning%203D%20rendered%20map%20of%20Africa%20continent%20floating%20in%20space%20with%20all%2054%20African%20country%20flags%20orbiting%20and%20rotating%20around%20it%20in%20a%20circular%20motion%2C%20dark%20navy%20blue%20and%20deep%20teal%20gradient%20background%2C%20glowing%20digital%20connections%20between%20countries%2C%20holographic%20futuristic%20style%2C%20cinematic%20lighting%20with%20soft%20ambient%20glow%2C%20professional%20corporate%20technology%20aesthetic%2C%20ultra%20detailed%20high%20quality%20render&width=1920&height=1080&seq=hero-africa-3d-map&orientation=landscape",
};

function getHeroImageSrc(width: number) {
	if (width < 768) return HERO_IMAGES.mobile;
	if (width < 1024) return HERO_IMAGES.tablet;
	return HERO_IMAGES.desktop;
}

export default function Hero({ onRequestDemo, id = "hero" }: HeroProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [heroImageSrc, setHeroImageSrc] = useState(() =>
		typeof window === "undefined"
			? HERO_IMAGES.desktop
			: getHeroImageSrc(window.innerWidth),
	);
	const parallaxRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		setIsLoaded(true);

		const checkDesktop = () => {
			setIsDesktop(window.innerWidth > 1024);
			setHeroImageSrc(getHeroImageSrc(window.innerWidth));
		};
		checkDesktop();

		const handleMouseMove = (e: MouseEvent) => {
			if (window.innerWidth <= 1024) return;
			if (rafRef.current !== null) return;
			rafRef.current = requestAnimationFrame(() => {
				const x = (e.clientX / window.innerWidth - 0.5) * 15;
				const y = (e.clientY / window.innerHeight - 0.5) * 15;
				if (parallaxRef.current) {
					parallaxRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.06)`;
				}
				rafRef.current = null;
			});
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("resize", checkDesktop, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", checkDesktop);
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	const particles = useMemo(() => {
		const count = isDesktop ? 8 : 4;
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			left: `${(i / count) * 100}%`,
			top: `${(i % 4) * 25}%`,
			delay: `${(i * 0.5).toFixed(1)}s`,
			duration: `${8 + (i % 4) * 2}s`,
		}));
	}, [isDesktop]);

	return (
		<section
			id={id}
			className="relative flex min-h-svh flex-col overflow-hidden"
		>
			<div
				ref={parallaxRef}
				className="absolute inset-0 transition-transform duration-300 ease-out"
				style={{
					transform: isDesktop
						? "translate(0px, 0px) scale(1.06)"
						: "scale(1.02)",
					willChange: isDesktop ? "transform" : "auto",
				}}
			>
				<picture>
					<source
						media="(max-width: 767px)"
						srcSet={HERO_IMAGES.mobile}
						sizes="640px"
					/>
					<source
						media="(max-width: 1023px)"
						srcSet={HERO_IMAGES.tablet}
						sizes="1024px"
					/>
					<source
						media="(min-width: 1024px)"
						srcSet={HERO_IMAGES.desktop}
						sizes="1920px"
					/>
					<img
						src={heroImageSrc}
						alt="3D Africa map with rotating flags representing pan-African identity verification coverage"
						title="VerifyAfrica – KYC, AML & Biometric Identity Verification Across All 54 African Countries"
						width={1920}
						height={1080}
						className={`h-full w-full object-cover object-center transition-opacity duration-700 md:object-top ${imageLoaded ? "opacity-100" : "opacity-0"}`}
						fetchPriority="high"
						loading="eager"
						decoding="async"
						onLoad={() => setImageLoaded(true)}
					/>
				</picture>

				<div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />
				<div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 via-transparent to-cyan-900/20" />

				<HeroOrbitalRings />

				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					{particles.map((p) => (
						<div
							key={p.id}
							className="absolute h-1 w-1 animate-float-particle rounded-full bg-teal-400/40"
							style={{
								left: p.left,
								top: p.top,
								animationDelay: p.delay,
								animationDuration: p.duration,
							}}
						/>
					))}
				</div>
			</div>

			<HeroContent
				onRequestDemo={onRequestDemo}
				isLoaded={isLoaded}
			/>

			<div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 md:block">
				<ScrollIndicator className="pb-0 text-white/40" />
			</div>
		</section>
	);
}
