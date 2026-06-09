import { ClockIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
} from "@/components/ui/dialog";
import { EditorialScrollLayout } from "./country-detail/layouts/EditorialScrollLayout";
import { buildCountryDetailContext, type CountryData } from "./country-detail/shared";

interface CountryDetailModalProps {
	country: CountryData;
	onClose: () => void;
}

export default function CountryDetailModal({
	country,
	onClose,
}: CountryDetailModalProps) {
	const ctx = buildCountryDetailContext(country);

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className="max-h-[90vh] gap-0 overflow-hidden p-0 sm:max-w-2xl"
				showCloseButton
			>
				<EditorialScrollLayout ctx={ctx} />

				<DialogFooter className="mx-0 mb-0 flex-row items-center justify-between gap-4 border-t bg-muted/20 px-5 py-4">
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<ClockIcon className="size-3.5 shrink-0" />
						<span className="hidden sm:inline">
							Real-time verification available
						</span>
					</div>
					<DialogClose asChild>
						<Button variant="secondary" size="sm">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export type { CountryData };
