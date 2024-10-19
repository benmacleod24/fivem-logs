import { LibraryBig } from "lucide-react";
import TeamSwitcher from "./team-switcher";

export default function TeamMenuBar(props: {}) {
	return (
		<div className="w-full h-16 border-b">
			<div className="max-w-7xl mx-auto h-full flex items-center">
				{/* Branding */}
				<div className="flex gap-2 items-center">
					<LibraryBig size={30} className="text-sky-500" />
					<p className="text-lg font-bold">
						Log<span className="text-sky-200 ml-0.5">Forge</span>
					</p>
				</div>
				<p className="text-2xl mx-5 font-extralight text-muted-foreground">
					/
				</p>
				<TeamSwitcher />
			</div>
		</div>
	);
}
