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
				.json({ message: StatusCodes.METHOD_NOT_ALLOWED });
	}
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const teamSlug = req.query.teamSlug;
		const { userId } = getAuth(req);

		// User is unauthorized
		if (!userId) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: ReasonPhrases.UNAUTHORIZED });
		}

		// Fetch team data where slug and is a team member.
		let teamData = await db.team.findUnique({
			where: {
				members: {
					every: {
						userId: userId,
					},
				},
				slug: teamSlug as string,
			},
			select: {
				createdByUserId: true,
				id: true,
				name: true,
				slug: true,
			},
		});

		// Means team doesn't exist or member is not apart of team.
		if (!teamData) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "Failed to find team information.",
			});
		}

		// Se the created by user id to none if the users don't match.
		if (userId !== teamData.createdByUserId) {
			teamData.createdByUserId = "";
		}

		return res
			.status(StatusCodes.OK)
			.json({ message: ReasonPhrases.OK, data: teamData });
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
