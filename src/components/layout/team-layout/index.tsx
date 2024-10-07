import { Button } from "@/components/ui/button";
import useTeam from "@/lib/hooks/use-team";
import React from "react";
import TeamNavigationMenu from "./navigation";
import TeamSwitcher from "./team-switcher";
import UserSection from "./user-section";
import Feedback from "./feedback";

export default function TeamLayout(props: React.PropsWithChildren) {
	const {} = useTeam();

	return (
		<div>
			<div className=" h-16 border-b">
				{/* Header */}
				<div className="w-5/6 mx-auto h-full flex items-center">
					<div className="flex items-center flex-1 gap-10">
						<TeamSwitcher />
						<TeamNavigationMenu />
					</div>
					<div className="flex items-center gap-16">
						{/* <Feedback /> */}
						<UserSection />
					</div>
				</div>
			</div>

			<div className="w-5/6 mx-auto">{props.children}</div>
		</div>
	);
}
