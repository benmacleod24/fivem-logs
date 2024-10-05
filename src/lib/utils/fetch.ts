export type FetchMethodOptions = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
export type CustomRequestInit = Omit<RequestInit, "method" | "body"> & {
	body?: any;
};

export async function doFetch<T = any>(
	endpoint: string,
	method: FetchMethodOptions = "GET",
	opts?: CustomRequestInit
) {
	const results = await fetch(endpoint, {
		...opts,
		method,
		body: JSON.stringify(opts?.body),
	});

	const data = (await results.json()) as T;

	return {
		data,
		status: results.status,
		ok: results.ok,
	};
}
