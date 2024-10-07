import TeamLayout from "@/components/layout/team-layout";
import TeamSettings from "@/components/layout/team-settings";
import SubMenu from "@/components/submenu";
import { TeamSettingsSubMenu } from "@/lib/config/submenus";
import useTeam from "@/lib/hooks/use-team";

export default function SettingsPage() {
	const { slug } = useTeam();

	return <TeamSettings>General</TeamSettings>;
}
