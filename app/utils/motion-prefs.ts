import { useReducedMotion } from "motion/react";

/** Ease-out quint — matches `--ease-out-quint` in app.css */
export const motionEase = [0.22, 1, 0.36, 1] as const;

/**
 * Multiplier for page transitions and coordinated content sequences (home grid, command
 * sections, pricing bars). Micro-interactions (hover 0.28s) stay outside this scale.
 */
export const MOTION_TIME_SCALE = 1.5;

/** Scales baseline animation durations used across home / command / PSEO views. */
export function motionDuration(baseSeconds: number): number {
	return baseSeconds * MOTION_TIME_SCALE;
}

/**
 * `true` when the user prefers reduced motion. Treats `null` (SSR) as motion allowed
 * so first paint matches non-reduced until hydrated.
 */
export function useAccessibleMotion(): boolean {
	return useReducedMotion() === true;
}
