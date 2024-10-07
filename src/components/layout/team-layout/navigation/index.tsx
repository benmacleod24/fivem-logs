import { Button } from "@/components/ui/button";
import useTeam from "@/lib/hooks/use-team";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuLinks = [
	{
		link: "",
		title: "Overview",
	},
	{
		link: "/logs",
		title: "Logs",
	},
	{
		link: "/settings",
		title: "Settings",
	},
];

export default function TeamNavigationMenu(props: {}) {
	return (
		<div className="flex items-center gap-2">
			{MenuLinks.map((l) => (
				<NavigationButton
					label={l.title}
					link={l.link}
					key={l.title}
				/>
			))}
		</div>
	);
}

function NavigationButton(props: { label: string; link: string }) {
	const { slug } = useTeam();
	const { asPath } = useRouter();

	function getTeamSlugPath(url: string) {
		const match = url.match(/\/team\/[^\/]+(\/.+)/);
		return match ? match[1] : null;
	}

	const isActive =
		props.link === ""
			? asPath === `/team/${slug}/`
			: asPath.startsWith(`/team/${slug}${props.link}`);

	return (
		<Link href={`/team/${slug}/${props.link}`}>
			<Button
				variant={"ghost"}
				className={cn(
					"text-muted-foreground hover:text-white transition-colors",
					isActive && "text-white"
				)}
			>
				{props.label}
			</Button>
		</Link>
	);
}
