import { encryptText } from "@/lib/utils/encryption";
import { generateKey } from "@/lib/utils/key-generator";
import { db } from "@/prisma";
import { newApiKeySchema } from "@/schemas/apiKeys";
import { getAuth } from "@clerk/nextjs/server";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return POST(req, res);
		default:
			return res
				.status(StatusCodes.METHOD_NOT_ALLOWED)
				.json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
	}
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	try {
		const teamSlug = req.query.teamSlug as string;
		const { userId } = getAuth(req);

		// User is unauthorized
		if (!userId) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: ReasonPhrases.UNAUTHORIZED });
		}

		const data = newApiKeySchema.parse(JSON.parse(req.body));
		const apiKey = generateKey(16);

		// Failed to generate a new api key.
		if (!apiKey) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: ReasonPhrases.INTERNAL_SERVER_ERROR,
				error: "Failed to create api key.",
			});
		}

		// Create new api key, the key is encrypted.
		await db.team_Api_key.create({
			data: {
				createdByUserId: userId,
				key: encryptText(apiKey),
				title: data.title,
				team: {
					connect: {
						slug: teamSlug,
					},
				},
			},
		});

		return res.status(StatusCodes.CREATED).json({
			message: ReasonPhrases.CREATED,
		});
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
