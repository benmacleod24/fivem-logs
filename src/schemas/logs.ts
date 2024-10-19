import { z } from "zod";

export const newLogSchema = z.object({
	message: z.string().min(1, "Must include atleast one character."),
	resourceName: z.ostring(),
	playerId: z.ostring(),
	// Metadata can be a string or can be an anything.
	metadata: z.ostring().or(z.any()),
	imageUrl: z.ostring(),
	level: z.string(),
});
