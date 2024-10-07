export const ApiEndpoints = {
	Team: {
		CreateTeam: "/api/v1/team",
		GetTeam: (v: string) => `/api/v1/team/${v}`,
	},
	Teams: {
		GetTeams: "/api/v1/teams",
	},
};
