import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "./fetch";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toSlug(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphen
		.replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}
