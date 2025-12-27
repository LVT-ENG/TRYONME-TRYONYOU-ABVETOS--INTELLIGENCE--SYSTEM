/**
 * TRYONYOU Utility Functions
 * Patent: PCT/EP2025/067317
 * 
 * Core utility functions for className merging and component styling.
 * 
 * @module lib/utils
 * @copyright 2025 TRYONYOU - ABVETOS Intelligence System
 */

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
