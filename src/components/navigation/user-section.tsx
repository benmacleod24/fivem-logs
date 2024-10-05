import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ChevronDownIcon,
	Component,
	LogOut,
	User,
	UserRound,
	UsersRound,
} from "lucide-react";
import React from "react";

export default function NavigationUserSection(props: {}) {
	const { user, isLoaded, isSignedIn } = useUser();

	// Auth is loading.
	if (!isLoaded) {
		return <React.Fragment></React.Fragment>;
	}

	if (isLoaded && !isSignedIn) {
		<Link href={"/login"}>
			<Button>Login</Button>
		</Link>;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="group">
				<div className="cursor-pointer flex items-center gap-3">
					<div className="flex items-center gap-2">
						<p className="text-muted-foreground text-sm font-medium">
							Welcome, {user?.firstName}!
						</p>
						<ChevronDownIcon
							className="h-3 w-3 transition duration-300 group-hover:text-white group-data-[state=open]:text-green-500 group-data-[state=open]:rotate-180"
							aria-hidden="true"
						/>
					</div>
					<img
						src={user?.imageUrl}
						className="w-8 h-8 border rounded-full"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" side="bottom" align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<UserRound className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Component className="mr-2 h-4 w-4" />
					<span>Your Teams</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
