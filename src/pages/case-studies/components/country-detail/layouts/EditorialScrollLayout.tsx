import {
	GraphIcon,
	IdentificationCardIcon,
	ShieldStarIcon,
	TranslateIcon,
} from "@phosphor-icons/react";
import {
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TagList } from "../components";
import {
	type CountryDetailContext,
	verificationFeatures,
} from "../shared";

function EditorialBand({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<section className={cn("px-8 py-10", className)}>{children}</section>
	);
}

export function EditorialScrollLayout({ ctx }: { ctx: CountryDetailContext }) {
	const { country, details, regionColor, displayStats, flagUrl } = ctx;

	return (
		<div className="max-h-[85vh] overflow-y-auto">
			{/* Lead — newsroom headline */}
			<EditorialBand className="bg-background pb-6 pt-8">
				<div className="flex items-end gap-5">
					<img
						src={flagUrl}
						alt={`${country.name} flag`}
						className="h-12 w-[4.5rem] shrink-0 rounded object-cover shadow-sm"
					/>
					<DialogHeader className="gap-1 text-left">
						<p
							className="text-xs font-semibold uppercase tracking-widest"
							style={{ color: regionColor }}
						>
							{country.region}
						</p>
						<DialogTitle className="text-3xl font-bold leading-none tracking-tight">
							{country.name}
						</DialogTitle>
						<DialogDescription className="text-sm">
							Identity verification coverage
						</DialogDescription>
					</DialogHeader>
				</div>
			</EditorialBand>

			{/* Giant stat callout */}
			<EditorialBand className="bg-muted/40">
				<div className="grid grid-cols-3 divide-x divide-border">
					{displayStats.map(({ value, label }) => (
						<div key={label} className="px-4 first:pl-0 last:pr-0">
							<div
								className="text-3xl font-bold tracking-tight sm:text-4xl"
								style={{ color: regionColor }}
							>
								{value}
							</div>
							<div className="mt-1 text-sm text-muted-foreground">{label}</div>
						</div>
					))}
				</div>
			</EditorialBand>

			<EditorialBand className="border-t border-border bg-background">
				<div className="mb-5 flex items-center gap-2">
					<IdentificationCardIcon
						className="size-5"
						style={{ color: regionColor }}
					/>
					<h3 className="text-lg font-semibold">Supported ID Types</h3>
				</div>
				<TagList items={country.idTypes} />
			</EditorialBand>

			{details.languages && details.languages.length > 0 && (
				<EditorialBand className="bg-muted/40">
					<div className="mb-5 flex items-center gap-2">
						<TranslateIcon className="size-5" style={{ color: regionColor }} />
						<h3 className="text-lg font-semibold">Languages Supported</h3>
					</div>
					<TagList items={details.languages} />
				</EditorialBand>
			)}

			{details.verificationPartners &&
				details.verificationPartners.length > 0 && (
					<EditorialBand className="border-t border-border bg-background">
						<div className="mb-5 flex items-center gap-2">
							<GraphIcon className="size-5" style={{ color: regionColor }} />
							<h3 className="text-lg font-semibold">Verification Partners</h3>
						</div>
						<p className="mb-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
							Connected government and institutional data sources powering
							real-time checks in {country.name}.
						</p>
						<TagList items={details.verificationPartners} />
					</EditorialBand>
				)}

			<EditorialBand className="bg-muted/40">
				<div className="mb-6 flex items-center gap-2">
					<ShieldStarIcon className="size-5" style={{ color: regionColor }} />
					<h3 className="text-lg font-semibold">Verification Features</h3>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{verificationFeatures.map(({ label, icon: Icon }) => (
						<div
							key={label}
							className="flex items-start gap-4 border-l-2 pl-4"
							style={{ borderColor: regionColor }}
						>
							<Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
							<div>
								<p className="font-medium text-foreground">{label}</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									Available in {country.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</EditorialBand>
		</div>
	);
}
