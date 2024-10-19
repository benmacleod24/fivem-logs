import { cn } from "@/lib/utils";
import React from "react";
import NavigationMenu from "./navigation";

export default function MainLayout(props: React.PropsWithChildren<{}>) {
	return (
		<div className="">
			<NavigationMenu />
			<div className="mx-auto w-4/5">{props.children}</div>
		</div>
	);
}
