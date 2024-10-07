import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	feedback: z.string().min(1, "Must provide some text."),
});

export default function Feedback() {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant={"outline"} size={"sm"}>
					<Lightbulb className="w-4 h-4 mr-2" />
					Got an Idea?
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px]">
				<Form {...form}>
					<form
						onSubmit={() => {}}
						className="flex flex-col items-end w-full"
					>
						<FormField
							control={form.control}
							name="feedback"
							render={({ field }) => (
								<FormItem className="w-full mb-2">
									<FormControl>
										<Textarea
											placeholder="Give us some ideas we could add or fix!"
											className="resize-none w-full"
											rows={5}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										We appreicated all sorts of suggestions
										and feedback!
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-1/2">Submit</Button>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
