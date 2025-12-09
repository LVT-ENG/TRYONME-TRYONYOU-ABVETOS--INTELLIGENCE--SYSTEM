/**
 * TryOnYou Assets - Type Definitions and Path Constants
 * 
 * This file contains all image asset paths for the TryOnYou 70 Image Pack.
 * Auto-generated paths ensure type-safe access to all visual assets.
 * 
 * @version 1.0.0
 * @agent Agente 70 - Visual Integration & Orchestration
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type TryonImage = string;

export interface TryonLogoAssets {
  main: TryonImage;
  icon: TryonImage;
  horizontal?: TryonImage;
  vertical?: TryonImage;
}

export interface TryonPauAssets {
  fullBody: TryonImage;
  mini: TryonImage;
  halfBody?: TryonImage;
  face?: TryonImage;
}

export interface TryonUIAssets {
  wardrobe: TryonImage[];
  fitting: TryonImage[];
  recommendations: TryonImage[];
  onboarding: TryonImage[];
}

export interface TryonOutfitsAssets {
  female: TryonImage[];
  male: TryonImage[];
}

export interface TryonMarketingAssets {
  hero: TryonImage[];
  community: TryonImage[];
  testimonials: TryonImage[];
}

export interface TryonStorytellingAssets {
  problem: TryonImage[];
  beforeAfter: TryonImage[];
  lifestyle: TryonImage[];
}

export interface TryonConceptsAssets {
  editorial: TryonImage[];
}

export interface TryonImageMap {
  logo: TryonLogoAssets;
  pau: TryonPauAssets;
  ui: TryonUIAssets;
  outfits: TryonOutfitsAssets;
  marketing: TryonMarketingAssets;
  storytelling: TryonStorytellingAssets;
  retail: TryonImage[];
  concepts: TryonConceptsAssets;
  fashion: TryonImage[];
}

// ============================================================================
// ASSET PATHS - BASE PATH
// ============================================================================

const BASE_PATH = '/assets/images/tryonyou';

// ============================================================================
// ASSET CONSTANTS
// ============================================================================

/**
 * Complete asset map for TryOnYou 70 Image Pack
 * 
 * Usage:
 * ```typescript
 * import { TRYON_ASSETS } from '@/constants/TryonAssets';
 * 
 * const heroImage = TRYON_ASSETS.marketing.hero[0];
 * const logo = TRYON_ASSETS.logo.main;
 * ```
 */
export const TRYON_ASSETS: TryonImageMap = {
  // Logo assets
  logo: {
    main: `${BASE_PATH}/logo/tryonyou_logo_main.png`,
    icon: `${BASE_PATH}/logo/tryonyou_icon.png`,
    horizontal: `${BASE_PATH}/logo/tryonyou_logo_horizontal.png`,
    vertical: `${BASE_PATH}/logo/tryonyou_logo_vertical.png`,
  },

  // PAU avatar assets
  pau: {
    fullBody: `${BASE_PATH}/pau/pau_avatar_fullbody_01.png`,
    mini: `${BASE_PATH}/pau/mini/pau_mini_icon.png`,
    halfBody: `${BASE_PATH}/pau/pau_avatar_halfbody_01.png`,
    face: `${BASE_PATH}/pau/pau_avatar_face_01.png`,
  },

  // UI/UX assets
  ui: {
    wardrobe: [
      `${BASE_PATH}/ui/wardrobe/ui_wardrobe_grid_desktop.png`,
      `${BASE_PATH}/ui/wardrobe/ui_wardrobe_detail_mobile.png`,
      `${BASE_PATH}/ui/wardrobe/ui_wardrobe_categories_01.png`,
      `${BASE_PATH}/ui/wardrobe/ui_wardrobe_item_detail.png`,
    ],
    fitting: [
      `${BASE_PATH}/ui/fitting/ui_fitting_3d_view.png`,
      `${BASE_PATH}/ui/fitting/ui_fitting_avatar_rotation.png`,
      `${BASE_PATH}/ui/fitting/ui_fitting_comparison.png`,
    ],
    recommendations: [
      `${BASE_PATH}/ui/recommendations/ui_recommendations_pau_01.png`,
      `${BASE_PATH}/ui/recommendations/ui_recommendations_outfit_grid.png`,
      `${BASE_PATH}/ui/recommendations/ui_recommendations_detail.png`,
    ],
    onboarding: [
      `${BASE_PATH}/ui/onboarding/ui_onboarding_scan_01.png`,
      `${BASE_PATH}/ui/onboarding/ui_onboarding_scan_02.png`,
      `${BASE_PATH}/ui/onboarding/ui_onboarding_welcome.png`,
      `${BASE_PATH}/ui/onboarding/ui_onboarding_instructions.png`,
    ],
  },

  // Outfit assets
  outfits: {
    female: [
      `${BASE_PATH}/outfits/female/outfit_female_casual_summer_01.png`,
      `${BASE_PATH}/outfits/female/outfit_female_formal_office_01.png`,
      `${BASE_PATH}/outfits/female/outfit_female_evening_dress_01.png`,
      `${BASE_PATH}/outfits/female/outfit_female_sport_active_01.png`,
    ],
    male: [
      `${BASE_PATH}/outfits/male/outfit_male_casual_weekend_01.png`,
      `${BASE_PATH}/outfits/male/outfit_male_formal_suit_01.png`,
      `${BASE_PATH}/outfits/male/outfit_male_business_casual_01.png`,
      `${BASE_PATH}/outfits/male/outfit_male_sport_active_01.png`,
    ],
  },

  // Retail assets
  retail: [
    `${BASE_PATH}/retail/retail_store_integration_01.png`,
    `${BASE_PATH}/retail/retail_pos_system_01.png`,
    `${BASE_PATH}/retail/retail_kiosk_01.png`,
  ],

  // Marketing assets
  marketing: {
    hero: [
      `${BASE_PATH}/marketing/hero/marketing_hero_homepage_v1.jpg`,
      `${BASE_PATH}/marketing/hero/marketing_hero_homepage_v2.jpg`,
      `${BASE_PATH}/marketing/hero/marketing_hero_app_launch.jpg`,
    ],
    community: [
      `${BASE_PATH}/marketing/community/marketing_community_users_01.jpg`,
      `${BASE_PATH}/marketing/community/marketing_community_showcase_01.jpg`,
      `${BASE_PATH}/marketing/community/marketing_community_social_01.jpg`,
    ],
    testimonials: [
      `${BASE_PATH}/marketing/testimonials/marketing_testimonial_user_01.jpg`,
      `${BASE_PATH}/marketing/testimonials/marketing_testimonial_user_02.jpg`,
      `${BASE_PATH}/marketing/testimonials/marketing_testimonial_user_03.jpg`,
    ],
  },

  // Storytelling assets
  storytelling: {
    problem: [
      `${BASE_PATH}/storytelling/problem/storytelling_problem_sizing_01.jpg`,
      `${BASE_PATH}/storytelling/problem/storytelling_problem_fitting_01.jpg`,
      `${BASE_PATH}/storytelling/problem/storytelling_problem_returns_01.jpg`,
    ],
    beforeAfter: [
      `${BASE_PATH}/storytelling/before_after/storytelling_before_01.jpg`,
      `${BASE_PATH}/storytelling/before_after/storytelling_after_01.jpg`,
      `${BASE_PATH}/storytelling/before_after/storytelling_comparison_01.jpg`,
    ],
    lifestyle: [
      `${BASE_PATH}/storytelling/lifestyle/storytelling_lifestyle_daily_01.jpg`,
      `${BASE_PATH}/storytelling/lifestyle/storytelling_lifestyle_work_01.jpg`,
      `${BASE_PATH}/storytelling/lifestyle/storytelling_lifestyle_leisure_01.jpg`,
    ],
  },

  // Concept/Editorial assets
  concepts: {
    editorial: [
      `${BASE_PATH}/concepts/editorial/concepts_editorial_fashion_01.jpg`,
      `${BASE_PATH}/concepts/editorial/concepts_editorial_style_01.jpg`,
      `${BASE_PATH}/concepts/editorial/concepts_editorial_trend_01.jpg`,
    ],
  },

  // Fashion assets
  fashion: [
    `${BASE_PATH}/fashion/fashion_collection_spring_01.jpg`,
    `${BASE_PATH}/fashion/fashion_collection_summer_01.jpg`,
    `${BASE_PATH}/fashion/fashion_trend_forecast_01.jpg`,
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all assets from a specific category
 * @param category - The asset category to retrieve
 * @returns Array of asset paths or object with asset paths
 */
export function getAssetsByCategory(category: keyof TryonImageMap): TryonImageMap[typeof category] {
  return TRYON_ASSETS[category];
}

/**
 * Get asset path by full key path
 * @param path - Dot-notation path to asset (e.g., 'ui.wardrobe.0')
 * @returns Asset path or undefined if not found
 */
export function getAssetByPath(path: string): TryonImage | undefined {
  const keys = path.split('.');
  let current: any = TRYON_ASSETS;
  
  for (const key of keys) {
    if (current === undefined) return undefined;
    current = current[key];
  }
  
  return current;
}

/**
 * Get all asset paths as a flat array
 * @returns Array of all asset paths
 */
export function getAllAssetPaths(): TryonImage[] {
  const paths: TryonImage[] = [];
  
  function traverse(obj: any) {
    if (typeof obj === 'string') {
      paths.push(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (typeof obj === 'object' && obj !== null) {
      Object.values(obj).forEach(traverse);
    }
  }
  
  traverse(TRYON_ASSETS);
  return paths;
}

/**
 * Validate if an asset path exists in the asset map
 * @param path - Asset path to validate
 * @returns True if the path exists in the asset map
 */
export function isValidAssetPath(path: string): boolean {
  return getAllAssetPaths().includes(path);
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TRYON_ASSETS;
