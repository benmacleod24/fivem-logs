import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function SubMenu(props: {
	base?: string;
	links: { title: string; link: string }[];
}) {
	const { asPath } = useRouter();
	return (
		<div className="grid">
			{props.links.map((l) => {
				const isActive =
					l.link === ""
						? asPath === `${props.base}${l.link}`
						: asPath.startsWith(`${props.base}${l.link}`);

				return (
					<Link href={`${props.base}${l.link}`} key={l.link}>
						<Button
							variant={"ghost"}
							className={cn(
								"text-muted-foreground p-0 w-full justify-start hover:text-white transition-colors",
								isActive && "text-white"
							)}
						>
							{l.title}
						</Button>
					</Link>
				);
			})}
		</div>
	);
}
