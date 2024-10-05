import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { newTeamSchema } from "@/schemas/team";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { doFetch } from "@/lib/utils/fetch";
import { ApiEndpoints } from "@/lib/config/api-endpoints";
import { useRouter } from "next/router";

export default function CreateTeamDialog(props: { buttonLabel?: string }) {
	const { push } = useRouter();

	const form = useForm<z.infer<typeof newTeamSchema>>({
		resolver: zodResolver(newTeamSchema),
	});

	async function onSubmit(values: z.infer<typeof newTeamSchema>) {
		const { data, ok } = await doFetch<{
			teamSlug?: string;
			error?: string;
		}>(ApiEndpoints.Team.CreateTeam, "POST", {
			body: {
				name: values.name,
			},
		});

		// An error occured from the server.
		if (!ok && data.error) {
			form.setError("name", { message: data.error });
		}

		// Request was success, redirect to page.
		if (ok && data.teamSlug) {
			push(`/team/${data.teamSlug}/settings`);
			return;
		}
	}

	return (
		<Dialog onOpenChange={() => form.reset()}>
			<DialogTrigger asChild>
				<Button>{props.buttonLabel || "Create Team"}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Create a New Team!</DialogTitle>
							<DialogDescription>
								Start by entering a name for your team. After
								that you can configure your new team!
							</DialogDescription>
						</DialogHeader>

						<div className="mt-4 mb-5">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team Name</FormLabel>
										<FormControl>
											<Input
												placeholder="NYX - USA"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is not permanent, you can
											change this at a later point.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
