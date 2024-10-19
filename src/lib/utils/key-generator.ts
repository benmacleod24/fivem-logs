import { randomBytes } from "crypto";

// Generate new api key.
export const generateKey = (keyLength?: number) => {
	const bytes = randomBytes(keyLength || 32);
	return bytes.toString("hex");
};
