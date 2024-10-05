import CreateTeamDialog from "@/components/create-team";
import MainLayout from "@/components/layout";

export default function TeamsPage() {
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
		</MainLayout>
	);
}
