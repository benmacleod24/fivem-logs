export const ApiEndpoints = {
	Team: {
		CreateTeam: "/api/v1/team",
		GetTeam: (v: string) => `/api/v1/team/${v}`,
		Settings: {
			CreateApiKey: (v: string) => `/api/v1/team/${v}/api-key`,
			DeleteApiKey: (v: string, i: string) =>
				`/api/v1/team/${v}/api-key/${i}`,
		},
	},
	Teams: {
		GetTeams: "/api/v1/teams",
	},
};
