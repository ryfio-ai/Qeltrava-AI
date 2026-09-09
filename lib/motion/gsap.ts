import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";

// Register standard plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    MotionPathPlugin,
    Observer,
    Flip,
    TextPlugin
  );
}

/**
 * Safe GSAP setup helper for Next.js SSR / Client boundaries
 */
export const isClient = typeof window !== "undefined";

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (!isClient) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Safe optional plugin checker
 */
export const hasPlugin = (pluginName: string): boolean => {
  if (!isClient) return false;
  return gsap.plugins ? Boolean(gsap.plugins[pluginName as keyof typeof gsap.plugins]) : false;
};

export { gsap, ScrollTrigger, ScrollToPlugin, MotionPathPlugin, Observer, Flip, TextPlugin };
