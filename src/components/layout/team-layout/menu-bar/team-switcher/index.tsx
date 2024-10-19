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
					variant="ghost"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] hover:bg-muted group justify-between px-0.5 pr-2 h-8 overflow-hidden"
				>
					{slug && (
						<div className="flex items-center gap-2">
							<div className="bg-sky-500 w-7 h-7 rounded-md flex justify-center items-center">
								<p className="text-lg group-hover:text-white text-white">
									{name ? name[0].toUpperCase() : ""}
								</p>
							</div>
							<p className="group-hover:text-white">{name}</p>
						</div>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:text-white" />
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
										<div className="flex items-center gap-2">
											<div className="bg-sky-500 w-6 h-6 rounded-md flex justify-center items-center">
												<p className="text-md group-hover:text-white text-white">
													{team.name
														? team.name[0].toUpperCase()
														: ""}
												</p>
											</div>
											<p className="group-hover:text-white">
												{team.name}
											</p>
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
