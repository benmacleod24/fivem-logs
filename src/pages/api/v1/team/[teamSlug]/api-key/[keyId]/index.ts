import { encryptText } from "@/lib/utils/encryption";
import { generateKey } from "@/lib/utils/key-generator";
import { db } from "@/prisma";
import { newApiKeySchema } from "@/schemas/apiKeys";
import { getAuth } from "@clerk/nextjs/server";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return DELETE(req, res);
		default:
			return res
				.status(StatusCodes.METHOD_NOT_ALLOWED)
				.json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
	}
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { userId } = getAuth(req);

		// User is unauthorized
		if (!userId) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: ReasonPhrases.UNAUTHORIZED });
		}

		const keyId = req.query.keyId;

		// Failed to generate a new api key.
		if (!keyId) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: ReasonPhrases.INTERNAL_SERVER_ERROR,
				error: "Failed to find key id.",
			});
		}

		// Create new api key, the key is encrypted.
		await db.team_Api_key.delete({
			where: {
				id: keyId as string,
			},
		});

		return res.status(StatusCodes.OK).json({
			message: ReasonPhrases.OK,
		});
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
