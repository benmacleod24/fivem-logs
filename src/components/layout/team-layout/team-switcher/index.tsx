import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ApiEndpoints } from "@/lib/config/api-endpoints";
import useTeam from "@/lib/hooks/use-team";
import { cn } from "@/lib/utils";
import { Team } from "@prisma/client";
import { toSvg } from "jdenticon";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import useSWR from "swr";

export default function TeamSwitcher() {
	const [open, setOpen] = React.useState(false);

	const { push } = useRouter();
	const { name, slug, image } = useTeam();

	const { data, isLoading } = useSWR<{
		data: Pick<Team, "name" | "slug" | "id">[];
	}>(ApiEndpoints.Teams.GetTeams);

	const bannerImage = useCallback(
		(name: string) => {
			const svg = toSvg(name, 50);
			const blob = new Blob([svg], { type: "image/svg+xml" });
			const url = URL.createObjectURL(blob);
			return url;
		},
		[data]
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{!slug && "Select Team"}
					{slug && (
						<div className="flex items-center gap-3">
							<img
								src={image}
								className="w-5 h-5 rounded-full overflow-hidden bg-zinc-900 border"
							/>
							<p>{name}</p>
						</div>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search Teams" />
					<CommandList>
						<CommandEmpty>No Teams Found</CommandEmpty>
						<CommandGroup>
							{data &&
								data.data &&
								data.data.map((team) => (
									<CommandItem
										key={team.id}
										value={team.slug}
										className="flex items-center gap-3"
										onSelect={(currentValue) => {
											push(`/team/${team.slug}`);
											setOpen(false);
										}}
									>
										<div className="flex items-center flex-1 gap-3">
											<img
												src={bannerImage(team.slug)}
												className="w-5 h-5 rounded-full overflow-hidden bg-zinc-900 border"
											/>
											<p>{team.name}</p>
										</div>
										{team.slug === slug && (
											<Check className="w-4 h-4 text-muted-foreground" />
										)}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
