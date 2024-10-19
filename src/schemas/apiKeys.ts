import { z } from "zod";

export const newApiKeySchema = z.object({
	title: z.string(),
});
