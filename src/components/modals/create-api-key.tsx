import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newApiKeySchema } from "@/schemas/apiKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { doFetch } from "@/lib/utils";
import { ApiEndpoints } from "@/lib/config/api-endpoints";
import { useRouter } from "next/router";
import { Plus } from "lucide-react";

export default function CreateApiKey() {
	const { query, reload } = useRouter();

	const form = useForm<z.infer<typeof newApiKeySchema>>({
		resolver: zodResolver(newApiKeySchema),
	});

	async function onSubmit(values: z.infer<typeof newApiKeySchema>) {
		const resp = await doFetch(
			ApiEndpoints.Team.Settings.CreateApiKey(query.teamSlug as string),
			"POST",
			{
				body: {
					title: values.title,
				},
			}
		);

		// Reload page when ok.
		if (resp.ok) {
			reload();
		}
	}

	return (
		<Dialog onOpenChange={() => form.reset()}>
			<DialogTrigger asChild>
				<Button size={"sm"}>
					<Plus size={20} className="mr-1.5" /> Create Key
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Create API Key</DialogTitle>
							<DialogDescription>
								You are going to create a new api key here, you
								do have the option to title the key.
							</DialogDescription>
						</DialogHeader>

						<div className="mt-4 mb-5">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Developer Key"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit">Create Key</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
