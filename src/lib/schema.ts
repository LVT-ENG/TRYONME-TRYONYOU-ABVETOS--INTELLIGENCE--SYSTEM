import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // User profile for wardrobe
  sizeXS: boolean("sizeXS").default(false),
  sizeS: boolean("sizeS").default(false),
  sizeM: boolean("sizeM").default(false),
  sizeL: boolean("sizeL").default(false),
  sizeXL: boolean("sizeXL").default(false),
  styleProfile: text("styleProfile"), // JSON: {preferences: [], colors: [], occasions: []}
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Wardrobe Items
export const wardrobeItems = mysqlTable("wardrobeItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: mysqlEnum("category", [
    "tops",
    "bottoms",
    "dresses",
    "outerwear",
    "shoes",
    "accessories",
    "activewear",
    "sleepwear",
  ]).notNull(),
  color: varchar("color", { length: 100 }),
  size: varchar("size", { length: 20 }),
  brand: varchar("brand", { length: 255 }),
  condition: mysqlEnum("condition", ["new", "excellent", "good", "fair", "worn"]).default(
    "good"
  ),
  material: varchar("material", { length: 255 }),
  season: mysqlEnum("season", ["spring", "summer", "fall", "winter", "all-season"]).default(
    "all-season"
  ),
  imageUrl: text("imageUrl"),
  location: varchar("location", { length: 255 }), // Where in the wardrobe (e.g., "Drawer 3, Left side")
  purchaseDate: timestamp("purchaseDate"),
  purchasePrice: decimal("purchasePrice", { precision: 10, scale: 2 }),
  estimatedValue: decimal("estimatedValue", { precision: 10, scale: 2 }),
  notes: text("notes"),
  isAvailableForExchange: boolean("isAvailableForExchange").default(false),
  isAvailableForDonation: boolean("isAvailableForDonation").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WardrobeItem = typeof wardrobeItems.$inferSelect;
export type InsertWardrobeItem = typeof wardrobeItems.$inferInsert;

// Usage Tracking
export const usageHistory = mysqlTable("usageHistory", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  userId: int("userId").notNull(),
  wornDate: timestamp("wornDate").defaultNow().notNull(),
  occasion: varchar("occasion", { length: 255 }), // e.g., "work", "casual", "formal"
  outfitId: int("outfitId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UsageHistory = typeof usageHistory.$inferSelect;
export type InsertUsageHistory = typeof usageHistory.$inferInsert;

// Outfit Suggestions
export const outfitSuggestions = mysqlTable("outfitSuggestions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }),
  occasion: varchar("occasion", { length: 255 }), // e.g., "casual", "work", "date", "formal"
  season: varchar("season", { length: 50 }),
  itemIds: text("itemIds"), // JSON array of item IDs
  compatibilityScore: int("compatibilityScore"), // 0-100
  styleNotes: text("styleNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OutfitSuggestion = typeof outfitSuggestions.$inferSelect;
export type InsertOutfitSuggestion = typeof outfitSuggestions.$inferInsert;

// Donations
export const donations = mysqlTable("donations", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  donorUserId: int("donorUserId").notNull(),
  recipientUserId: int("recipientUserId"),
  status: mysqlEnum("status", ["offered", "accepted", "completed", "cancelled"]).default(
    "offered"
  ),
  donationDate: timestamp("donationDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = typeof donations.$inferInsert;

// Exchanges
export const exchanges = mysqlTable("exchanges", {
  id: int("id").autoincrement().primaryKey(),
  offeredItemId: int("offeredItemId").notNull(),
  requestedItemId: int("requestedItemId").notNull(),
  requesterUserId: int("requesterUserId").notNull(),
  providerUserId: int("providerUserId").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "completed", "cancelled"]).default(
    "pending"
  ),
  completedDate: timestamp("completedDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Exchange = typeof exchanges.$inferSelect;
export type InsertExchange = typeof exchanges.$inferInsert;

// Pau Assistant Interactions
export const pauInteractions = mysqlTable("pauInteractions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", [
    "outfit_suggestion",
    "donation_advice",
    "exchange_guidance",
    "care_tips",
    "style_consultation",
    "general_chat",
  ]).notNull(),
  userMessage: text("userMessage"),
  pauResponse: text("pauResponse"),
  context: text("context"), // JSON: {itemIds, occasion, season, etc.}
  helpful: boolean("helpful"), // User feedback on response quality
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PauInteraction = typeof pauInteractions.$inferSelect;
export type InsertPauInteraction = typeof pauInteractions.$inferInsert;

// Marketplace Listings (for external platform integration)
export const marketplaceListings = mysqlTable("marketplaceListings", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  userId: int("userId").notNull(),
  platform: mysqlEnum("platform", ["wallapop", "limon_cua", "internal"]).notNull(),
  externalId: varchar("externalId", { length: 255 }),
  listingUrl: text("listingUrl"),
  price: decimal("price", { precision: 10, scale: 2 }),
  status: mysqlEnum("status", ["draft", "listed", "sold", "delisted"]).default("draft"),
  listedDate: timestamp("listedDate"),
  soldDate: timestamp("soldDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type InsertMarketplaceListing = typeof marketplaceListings.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  wardrobeItems: many(wardrobeItems),
  usageHistory: many(usageHistory),
  outfitSuggestions: many(outfitSuggestions),
  donations: many(donations),
  pauInteractions: many(pauInteractions),
  marketplaceListings: many(marketplaceListings),
}));

export const wardrobeItemsRelations = relations(wardrobeItems, ({ one, many }) => ({
  user: one(users, {
    fields: [wardrobeItems.userId],
    references: [users.id],
  }),
  usageHistory: many(usageHistory),
  donations: many(donations),
  marketplaceListings: many(marketplaceListings),
}));

export const usageHistoryRelations = relations(usageHistory, ({ one }) => ({
  item: one(wardrobeItems, {
    fields: [usageHistory.itemId],
    references: [wardrobeItems.id],
  }),
  user: one(users, {
    fields: [usageHistory.userId],
    references: [users.id],
  }),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  item: one(wardrobeItems, {
    fields: [donations.itemId],
    references: [wardrobeItems.id],
  }),
  donor: one(users, {
    fields: [donations.donorUserId],
    references: [users.id],
  }),
}));

export const exchangesRelations = relations(exchanges, ({ one }) => ({
  offeredItem: one(wardrobeItems, {
    fields: [exchanges.offeredItemId],
    references: [wardrobeItems.id],
  }),
}));

export const marketplaceListingsRelations = relations(marketplaceListings, ({ one }) => ({
  item: one(wardrobeItems, {
    fields: [marketplaceListings.itemId],
    references: [wardrobeItems.id],
  }),
  user: one(users, {
    fields: [marketplaceListings.userId],
    references: [users.id],
  }),
}));