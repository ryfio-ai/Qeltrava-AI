/**
 * design-system/utilities/motion.ts
 * Motion constants and helper configurations.
 */

export const DURATIONS = {
  instant: 0,
  fast:    0.15,
  base:    0.25,
  slow:    0.4,
};

export const EASINGS = {
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  entrance: [0.0, 0, 0.2, 1] as [number, number, number, number],
  exit:     [0.4, 0, 1, 1]   as [number, number, number, number],
};

/**
 * Standard transition helper that returns an configuration object for Framer Motion.
 */
export function getTransition(
  speed: 'instant' | 'fast' | 'base' | 'slow' = 'base',
  ease:  'standard' | 'entrance' | 'exit' = 'standard'
) {
  return {
    duration: DURATIONS[speed],
    ease:     EASINGS[ease],
  };
}
