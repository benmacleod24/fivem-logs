import { db } from "@/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res
				.status(StatusCodes.METHOD_NOT_ALLOWED)
				.json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
	}
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { userId } = getAuth(req);

		// Couldn't find the user id.
		if (!userId) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: ReasonPhrases.BAD_REQUEST,
			});
		}

		// Collect all teams where this user is a member.
		const teams = await db.team.findMany({
			where: {
				members: {
					every: {
						userId: userId,
					},
				},
			},
			select: {
				id: true,
				name: true,
				slug: true,
			},
		});

		return res
			.status(StatusCodes.OK)
			.json({ message: ReasonPhrases.OK, data: teams });
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
