import { useRouter } from "next/router";
import useSWR from "swr";
import { ApiEndpoints } from "../config/api-endpoints";
import { Team } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";
import { toSvg } from "jdenticon";

export default function useTeam() {
	const { query } = useRouter();
	const teamSlug = query.teamSlug;
	const { user, isLoaded, isSignedIn } = useUser();

	const { data, isLoading, error, mutate } = useSWR<{
		data: Pick<Team, "id" | "createdByUserId" | "name" | "slug">;
	}>(teamSlug && ApiEndpoints.Team.GetTeam(teamSlug as string));

	const bannerImage = useMemo(() => {
		if (!data || !data.data || !data.data.name) return;

		const svg = toSvg(data?.data.name, 100);
		const blob = new Blob([svg], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);
		return url;
	}, [data]);

	return {
		isTeamLoading: isLoading,
		error,
		isOwner:
			isSignedIn &&
			user &&
			user.id &&
			data &&
			data.data &&
			data.data.createdByUserId === user.id,
		name: data?.data.name,
		slug: teamSlug,
		id: data?.data.id,
		image: bannerImage,
	};
}
