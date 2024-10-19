import TeamLayout from "@/components/layout/team-layout";
import { decryptText } from "@/lib/utils/encryption";
import { db } from "@/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMemo, useState } from "react";
import ApiKeyQuickCopy from "@/components/pages/api-keys/quick-copy";
import ApiKeysTable from "@/components/pages/api-keys/keys-table";

type ApiKeysProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ApiKeys(props: ApiKeysProps) {
	return (
		<TeamLayout>
			<div>
				<p className="font-semibold">API Keys</p>
				<p className="text-sm text-muted-foreground">
					View and manage your LogForge API keys.
				</p>
			</div>

			{props.keys.length >= 1 && <ApiKeyQuickCopy keys={props.keys} />}
			<ApiKeysTable keys={props.keys} />
		</TeamLayout>
	);
}

export const getServerSideProps = (async ({ query }) => {
	const teamSlug = query.teamSlug as string;

	const apiKeys = await db.team_Api_key.findMany({
		select: {
			id: true,
			createdAt: true,
			teamId: true,
			title: true,
			key: true,
		},
		orderBy: {
			createdAt: "asc",
		},
		where: {
			team: {
				slug: teamSlug,
			},
		},
	});

	console.log(apiKeys, "keys", teamSlug);

	return {
		props: {
			keys: apiKeys.map((k) => ({
				key: decryptText(k.key),
				title: k.title,
				id: k.id,
				teamId: k.teamId,
				createdAt: k.createdAt.valueOf(),
			})),
		},
	};
}) satisfies GetServerSideProps<{ keys: unknown[] }>;
