import { Button } from "@/components/ui/button";
import useTeam from "@/lib/hooks/use-team";
import React from "react";
import TeamSwitcher from "./menu-bar/team-switcher";
import UserSection from "./menu-bar/user-section";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Home, KeyRound, Settings } from "lucide-react";
import TeamMenuBar from "./menu-bar";

export default function TeamLayout(props: React.PropsWithChildren) {
	const { slug } = useTeam();
	const { asPath } = useRouter();

	return (
		<div>
			<TeamMenuBar />
			<div className="flex flex-grow max-w-7xl mx-auto gap-12 py-10">
				<div className="w-60 grid gap-1.5 h-fit">
					<Link href={`/team/${slug}`}>
						<Button
							variant={"ghost"}
							className={cn(
								"w-full justify-start",
								"hover:bg-muted hover:text-white group gap-1.5",
								asPath === `/team/${slug}` && "bg-muted"
							)}
						>
							<Home size={18} />
							<p className="mt-0.5 ml-1">Overview</p>
						</Button>
					</Link>
					<Link href={`/team/${slug}/api-keys`}>
						<Button
							variant={"ghost"}
							className={cn(
								"w-full justify-start",
								"hover:bg-muted hover:text-white group gap-1.5",
								asPath === `/team/${slug}/api-keys` &&
									"bg-muted"
							)}
						>
							<KeyRound size={18} />
							<p className="mt-0.5 ml-1">API Keys</p>
						</Button>
					</Link>
					<Link href={`/team/${slug}/settings`}>
						<Button
							variant={"ghost"}
							className={cn(
								"w-full justify-start",
								"hover:bg-muted hover:text-white group gap-1.5",
								asPath === `/team/${slug}/settings` &&
									"bg-muted"
							)}
						>
							<Settings size={18} />
							<p className="mt-0.5 ml-1">Settings</p>
						</Button>
					</Link>
				</div>
				<div className="w-full">{props.children}</div>
			</div>
		</div>
	);
}
