import { toSlug } from "@/lib/utils";
import { db } from "@/prisma";
import { newTeamSchema } from "@/schemas/team";
import { getAuth } from "@clerk/nextjs/server";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
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
		const body = newTeamSchema.parse(JSON.parse(req.body));
		const auth = getAuth(req);

		// User is unauthorized
		if (!auth.userId) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: ReasonPhrases.UNAUTHORIZED });
		}

		const teamName = body.name;
		const teamSlug = toSlug(teamName);

		// Search database for any teams with said slug.
		const teamWithSlug = await db.team.findUnique({
			where: { slug: teamSlug },
		});

		// A team with said slug/name already exist.
		if (teamWithSlug) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: ReasonPhrases.BAD_REQUEST,
				error: "A team with that name already exists.",
			});
		}

		// Create new team in the database, plus add to members table.
		const teamData = await db.team.create({
			data: {
				createdByUserId: auth.userId,
				name: teamName,
				slug: teamSlug,
				members: {
					create: {
						userId: auth.userId,
					},
				},
			},
		});

		return res
			.status(StatusCodes.CREATED)
			.json({ message: ReasonPhrases.CREATED, teamSlug: teamData.slug });
	} catch (e) {
		console.log(e);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
	}
}
