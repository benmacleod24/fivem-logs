import { db } from "@/prisma";
import { newLogSchema } from "@/schemas/logs";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		default:
			return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
				message: ReasonPhrases.METHOD_NOT_ALLOWED,
			});
	}
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
	try {
		const body = newLogSchema.parse(JSON.parse(req.body));

		// The log level was not specified.
		if (!body.level) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: ReasonPhrases.BAD_REQUEST,
				error: "Could not find a level for the log.",
			});
		}

		// The message of the log was not specified.
		if (!body.message) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: ReasonPhrases.BAD_REQUEST,
				error: "Could not find the message of the log.",
			});
		}

		const newLog = await db.log.create({
			data: {
				level: body.level,
				type: "custom",
				message: body.message,
				imageUrl: body.imageUrl,
				resourceName: body.resourceName,
				playerId: body.playerId,
				teamId: "",
				metadata:
					typeof body.metadata === "string"
						? body.metadata
						: JSON.stringify(body.metadata),
			},
		});
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
