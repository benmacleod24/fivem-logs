import { useMemo, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Code from "@/components/ui/code";

export default function ApiKeyQuickCopy(props: {
	keys: {
		key: string;
		title: string | null;
		id: string;
		teamId: string;
		createdAt: number;
	}[];
}) {
	const [selectedValue, setSelectedValue] = useState<string>(
		props.keys[0] ? props.keys[0].id : ""
	);

	const selectedKeyData = useMemo(() => {
		const data = props.keys.find((k) => k.id === selectedValue);
		return data;
	}, [selectedValue]);

	return (
		<div className=" rounded-md my-5">
			<div className="p-4 flex items-end justify-between bg-zinc-900 rounded-t-md">
				<div>
					<p className="font-semibold">Quick Copy</p>
					<p className="text-sm text-muted-foreground">
						Copy your API variables to your clipboard.
					</p>
				</div>
				<Select
					value={selectedValue}
					onValueChange={(v) => setSelectedValue(v)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Key" />
					</SelectTrigger>
					<SelectContent>
						{props.keys.map((key) => (
							<SelectItem key={key.id} value={key.id}>
								{key.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Code
				copy
				className="rounded-t-none"
				filename="config.json"
				code={JSON.stringify(
					{
						LOGFORGE_APP_ID: selectedKeyData?.teamId,
						LOGFORGE_APP_KEY: selectedKeyData?.key,
					},
					null,
					2
				)}
				language="json"
			/>
		</div>
	);
}
