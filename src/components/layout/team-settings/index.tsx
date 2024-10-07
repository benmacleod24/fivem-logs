import useTeam from "@/lib/hooks/use-team";
import TeamLayout from "../team-layout";
import SubMenu from "@/components/submenu";
import { TeamSettingsSubMenu } from "@/lib/config/submenus";
import React from "react";

export default function TeamSettings(props: React.PropsWithChildren) {
	const { slug } = useTeam();

	return (
		<TeamLayout>
			<div className="flex mt-10">
				<div className="w-60">
					<SubMenu
						base={`/team/${slug}/settings`}
						links={TeamSettingsSubMenu}
					/>
				</div>
				<div className="flex-grow ">{props.children}</div>
			</div>
		</TeamLayout>
	);
}
