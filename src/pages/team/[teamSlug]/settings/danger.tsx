import TeamLayout from "@/components/layout/team-layout";
import TeamSettings from "@/components/layout/team-settings";
import SubMenu from "@/components/submenu";
import { TeamSettingsSubMenu } from "@/lib/config/submenus";
import useTeam from "@/lib/hooks/use-team";

export default function SettingsDanger() {
	const { slug } = useTeam();

	return <TeamSettings>Danzer Zone</TeamSettings>;
}
