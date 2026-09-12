import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with proper precedence. */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/** Adds an optional element ref binding prop to a component's props. */
export type WithElementRef<
	T,
	U extends HTMLElement = HTMLElement
> = T & {
	ref?: U | null;
};