import { useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, LogOut } from "lucide-react";

export default function UserSection() {
	const { signOut } = useAuth();
	let { isLoaded, isSignedIn, user } = useUser();

	// Change isSignedIn to verify with isLoaded.
	isSignedIn = isLoaded && isSignedIn;

	// Return nothing if not signed in.
	if (!isSignedIn) return <React.Fragment></React.Fragment>;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="group">
				<div className="cursor-pointer flex items-center gap-3">
					<div className="flex items-center gap-2">
						<p className="text-muted-foreground text-sm font-medium">
							{user?.firstName} {user?.lastName}
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

				<DropdownMenuItem
					onClick={() => {
						signOut({ redirectUrl: "/" });
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
