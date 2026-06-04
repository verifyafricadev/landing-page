import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutHero() {
	return (
		<section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
			<Fragment>
				<div
					className="absolute inset-0 opacity-[0.07]"
					style={{
						backgroundImage:
							"linear-gradient(rgba(15,23,42,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.8) 1px, transparent 1px)",
						backgroundSize: "64px 64px",
					}}
				/>
			</Fragment>

			<div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-32 max-w-5xl mx-auto">
				<Fragment>
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/15 bg-secondary/5 backdrop-blur-sm text-secondary text-sm font-medium mb-8">
						<i className="ri-shield-check-line" />
						<span>About VerifyAfrica</span>
					</div>

					<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tighter leading-none mb-8">
						Building trust for Africa&apos;s digital economy
					</h1>

					<p className="text-lg sm:text-xl text-secondary max-w-3xl leading-relaxed mb-12">
						We are creating the compliance infrastructure that helps ambitious
						companies verify identities, reduce fraud, and grow confidently
						across all 54 African countries.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							asChild
							className="h-auto px-7 py-3.5 bg-teal-500 text-white font-semibold hover:bg-teal-400 cursor-pointer"
						>
							<Link to="/contact">
								Request Demo
								<i className="ri-arrow-right-line" />
							</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							asChild
							className="h-auto px-7 py-3.5 border-secondary/30 bg-transparent text-secondary font-semibold hover:border-secondary/60 hover:bg-secondary/10 hover:text-secondary cursor-pointer"
						>
							<a href="#story">Explore Our Story</a>
						</Button>
					</div>
				</Fragment>
			</div>

			<div className="relative z-10 pb-10 flex flex-col items-center gap-2 text-secondary/40 text-xs uppercase tracking-widest">
				<span>Scroll</span>
				<i className="ri-arrow-down-line text-lg animate-bounce" />
			</div>

			<style>{`
				@keyframes slow-zoom {
					from { transform: scale(1.05); }
					to { transform: scale(1.12); }
				}
			`}</style>
		</section>
	);
}
