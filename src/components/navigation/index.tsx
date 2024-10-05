import {
	NavigationMenu as NavMenuWrapper,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import React from "react";
import { BookCopy, Logs, ScrollText } from "lucide-react";
import NavigationUserSection from "./user-section";

export default function NavigationMenu(props: {}) {
	return (
		<div className="w-full h-16">
			<div className="w-4/5 h-full flex items-center mx-auto">
				<div className="flex items-center gap-4 mr-20">
					<BookCopy className="w-7 h-7 text-green-500" />
					<p className="font-semibold">FiveM Logs</p>
				</div>
				<div className="flex-1"></div>

				<NavigationUserSection />
			</div>
		</div>
	);
}

function NavigationButton(props: React.PropsWithChildren<{}>) {
	return (
		<NavigationMenuItem className="cursor-pointer text-muted-foreground transition-all font-semibold hover:text-white">
			{props.children}
		</NavigationMenuItem>
	);
}
