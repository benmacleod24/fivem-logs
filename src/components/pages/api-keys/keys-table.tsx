import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, doFetch } from "@/lib/utils";
import dayjs from "dayjs";
import { Copy, Ellipsis, Eye, EyeOff, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useClipboard from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import CreateApiKey from "@/components/modals/create-api-key";
import { ApiEndpoints } from "@/lib/config/api-endpoints";
import useTeam from "@/lib/hooks/use-team";
import { useRouter } from "next/router";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function ApiKeysTable(props: {
	keys: {
		key: string;
		title: string | null;
		id: string;
		teamId: string;
		createdAt: number;
	}[];
}) {
	const [_, copy] = useClipboard();
	const { toast } = useToast();
	const { slug } = useTeam();
	const { reload } = useRouter();

	async function handleTokenDelete(tokenId: string) {
		const resp = await doFetch(
			ApiEndpoints.Team.Settings.DeleteApiKey(slug, tokenId),
			"DELETE"
		);

		// Response was good, reload page.
		if (resp.ok) {
			reload();
		}
	}

	return (
		<div className="mt-14">
			<div className="p-4 flex items-center justify-between bg-zinc-900 rounded-t-md">
				<div>
					<p className="font-semibold">API Keys</p>
					<p className="text-sm text-muted-foreground">
						These keys will allow you to authenticate API requests.
					</p>
				</div>
				{props.keys.length >= 1 && <CreateApiKey />}
			</div>

			{props.keys.length < 1 && (
				<div className="py-8 rounded-b-md border-dashed flex flex-col items-center justify-center border-x border-b">
					<p className="mb-2">Generate Your First API Key!</p>
					<CreateApiKey />
				</div>
			)}

			{props.keys.length >= 1 && (
				<div className="border-b border-x border-dashed rounded-b-md overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[200px]">
									Name
								</TableHead>
								<TableHead>Key</TableHead>
								<TableHead>Created</TableHead>
								<TableHead className="text-right"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{props.keys.map((key) => (
								<TableRow key={key.id} className="h-[50px]">
									<TableCell className="font-medium">
										{key.title}
									</TableCell>
									<TableCell className={cn()}>
										<KeyContainer _key={key.key} />
									</TableCell>
									<TableCell>
										{dayjs(key.createdAt).format(
											"MMM D, YYYY h:mm A"
										)}
									</TableCell>
									<TableCell
										className={cn("flex justify-end")}
									>
										<Dialog>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														size={"icon"}
														variant={"ghost"}
													>
														<Ellipsis />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuLabel>
														Actions
													</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() => {
															copy(key.key);
															toast({
																title: "Copied Key!",
																description: `Copied ${
																	key.title
																} ${
																	key.title
																		?.toLowerCase()
																		.includes(
																			"key"
																		)
																		? ""
																		: "Key"
																} to the clipboard.`,
																duration: 2500,
															});
														}}
													>
														<Copy
															size={15}
															className="mr-2"
														/>
														Copy Key
													</DropdownMenuItem>

													<DialogTrigger asChild>
														<DropdownMenuItem
															className="group"
															onSelect={(e) =>
																e.preventDefault()
															}
														>
															<Trash2
																size={15}
																className="mr-2 text-red-400 mb-0.5"
															/>
															<span className="text-red-200">
																Delete Key
															</span>
														</DropdownMenuItem>
													</DialogTrigger>
													<DialogContent className="max-w-[450px]">
														<DialogHeader>
															<DialogTitle>
																Are you sure
																you want to
																delete this API
																key?
															</DialogTitle>
														</DialogHeader>
														<div>
															<p className="text-sm text-muted-foreground">
																This action
																cannot be
																undone. This
																will
																permanently
																delete the API
																key and any
																future requests
																using this key
																will fail.
															</p>
														</div>
														<DialogFooter className="mt-5">
															<DialogClose
																asChild
															>
																<Button
																	variant={
																		"ghost"
																	}
																>
																	Cancel
																</Button>
															</DialogClose>

															<Button
																variant={
																	"destructive"
																}
																onClick={() =>
																	handleTokenDelete(
																		key.id
																	)
																}
															>
																Confirm &
																Delete
															</Button>
														</DialogFooter>
													</DialogContent>
												</DropdownMenuContent>
											</DropdownMenu>
										</Dialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}

function KeyContainer(props: { _key: string }) {
	const [visible, setVisible] = useState(false);

	const getHiddenKey = useCallback((v: string) => {
		let string = "";

		for (let i = 0; i < v.length; i++) {
			string = string + "•";
		}

		return string;
	}, []);

	return (
		<div className="flex items-center w-[299px] justify-between">
			<div>
				<p>{visible ? props._key : getHiddenKey(props._key)}</p>
			</div>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => setVisible((v) => !v)}
						>
							{visible && <EyeOff size={18} />}
							{!visible && <Eye size={18} />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{visible ? "Hide Key" : "Show Key"}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
