import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";
import useClipboard from "@/hooks/use-clipboard";
import { useEffect } from "react";

export default function Code(props: {
	code: string;
	language: string;
	filename?: string;
	className?: string;
	copy?: boolean;
}) {
	const [state, copy, reset] = useClipboard();

	useEffect(() => {
		reset();
	}, [props.code]);

	return (
		<CodeBlock code={props.code} language={props.language}>
			<div
				className={cn(
					"bg-black  p-6 py-3 rounded-md shadow-lg",
					props.className
				)}
			>
				<div className="mb-1.5 flex items-center justify-between">
					{props.filename && (
						<p className="text-sm text-muted-foreground">
							{props.filename}
						</p>
					)}
					{props.copy && (
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => {
								copy(props.code);
							}}
						>
							{state.value ? (
								<Check size={18} className="text-green-500" />
							) : (
								<Copy size={18} />
							)}
						</Button>
					)}
				</div>
				<CodeBlock.Code className="">
					<div className="table-row">
						<CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
						<CodeBlock.LineContent className="table-cell">
							<CodeBlock.Token />
						</CodeBlock.LineContent>
					</div>
				</CodeBlock.Code>
			</div>
		</CodeBlock>
	);
}
