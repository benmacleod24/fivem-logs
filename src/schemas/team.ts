import { z } from "zod";

export const newTeamSchema = z.object({
	name: z
		.string({ required_error: "You must provide a team name." })
		.min(1, "You must provide a team name."),
});
