import CreateTeamDialog from "@/components/create-team";
import MainLayout from "@/components/layout";
import { ApiEndpoints } from "@/lib/config/api-endpoints";
import { cn } from "@/lib/utils";
import { Team } from "@prisma/client";
import { Loader, Loader2, LoaderPinwheel } from "lucide-react";
import useSWR from "swr";
import { toPng, toSvg } from "jdenticon";
import { useCallback, useMemo } from "react";
import Link from "next/link";

export default function TeamsPage() {
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
		<MainLayout>
			<div className="mt-5 flex items-end justify-between">
				<div>
					<p className="text-xl font-bold text-zinc-200">
						Your Teams
					</p>
					<p className="text-muted-foreground text-sm">
						Here’s a list of teams you're part of. Select one to
						access the team panel.
					</p>
				</div>
				<div>
					<CreateTeamDialog />
				</div>
			</div>

			{/* Team Contain */}
			<div
				className={cn(
					isLoading &&
						"flex items-center justify-center w-full mt-20",
					!isLoading && "grid grid-cols-5 gap-5 mt-5",
					"group"
				)}
			>
				{isLoading && (
					<Loader2 className="w-7 h-7 text-muted-foreground animate-spin" />
				)}

				{data &&
					data.data &&
					data.data.map((team) => (
						<Link href={`/team/${team.slug}`}>
							<div className="border rounded-md cursor-pointer overflow-hidden">
								<div className="bg-zinc-900">
									<div
										className={cn("w-full h-20 bg-center")}
										style={{
											backgroundImage: `url(${bannerImage(
												team.name
											)})`,
										}}
									/>
								</div>
								<div className="p-4 bg-accent transition-colors">
									<p>{team.name}</p>
									<p className="text-sm text-muted-foreground">
										{team.slug}
									</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</MainLayout>
	);
}
