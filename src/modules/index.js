/**
 * TRYONYOU - ABVETOS Intelligence System
 * Unified Module Manager
 * Patent: PCT/EP2025/067317
 * 
 * NOW USING UNIFIED SYSTEM - All 8 core modules consolidated into
 * a single comprehensive file for simplified management.
 * 
 * @module modules/index
 * @copyright 2025 TRYONYOU - ABVETOS Intelligence System
 * @version 3.0.0
 */

import tryonyouUnifiedSystem from '../TRYONYOUUnifiedSystem.js';

// Export the unified system as default
export default tryonyouUnifiedSystem;

// Export individual module references for backward compatibility
// All now point to the unified system
export const PAUModule = tryonyouUnifiedSystem;
export const ABVETModule = tryonyouUnifiedSystem;
export const CAPModule = tryonyouUnifiedSystem;
export const SmartWardrobeModule = tryonyouUnifiedSystem;
export const FTTModule = tryonyouUnifiedSystem;
export const LiveItFactoryModule = tryonyouUnifiedSystem;
export const PersonalShopperAIModule = tryonyouUnifiedSystem;

// Also export with simplified names
export {
  tryonyouUnifiedSystem as TRYONYOUSystem,
  tryonyouUnifiedSystem as PAU,
  tryonyouUnifiedSystem as ABVET,
  tryonyouUnifiedSystem as CAP,
  tryonyouUnifiedSystem as Wardrobe,
  tryonyouUnifiedSystem as FTT,
  tryonyouUnifiedSystem as LiveItFactory,
  tryonyouUnifiedSystem as PersonalShopperAI,
};
