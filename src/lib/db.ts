import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  wardrobeItems,
  usageHistory,
  outfitSuggestions,
  donations,
  exchanges,
  pauInteractions,
  marketplaceListings,
  InsertWardrobeItem,
  InsertUsageHistory,
  InsertOutfitSuggestion,
  InsertDonation,
  InsertExchange,
  InsertPauInteraction,
  InsertMarketplaceListing,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Wardrobe Items
export async function getUserWardrobeItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(wardrobeItems).where(eq(wardrobeItems.userId, userId));
}

export async function getWardrobeItemById(itemId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(wardrobeItems).where(eq(wardrobeItems.id, itemId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createWardrobeItem(item: InsertWardrobeItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(wardrobeItems).values(item);
  return result;
}

export async function updateWardrobeItem(itemId: number, updates: Partial<InsertWardrobeItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(wardrobeItems).set(updates).where(eq(wardrobeItems.id, itemId));
}

export async function deleteWardrobeItem(itemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(wardrobeItems).where(eq(wardrobeItems.id, itemId));
}

// Usage History
export async function recordItemUsage(usage: InsertUsageHistory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(usageHistory).values(usage);
}

export async function getItemUsageHistory(itemId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(usageHistory).where(eq(usageHistory.itemId, itemId)).orderBy(desc(usageHistory.wornDate));
}

export async function getUserUsageStats(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(usageHistory).where(eq(usageHistory.userId, userId)).orderBy(desc(usageHistory.wornDate));
}

// Outfit Suggestions
export async function getUserOutfitSuggestions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(outfitSuggestions).where(eq(outfitSuggestions.userId, userId)).orderBy(desc(outfitSuggestions.createdAt));
}

export async function createOutfitSuggestion(outfit: InsertOutfitSuggestion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(outfitSuggestions).values(outfit);
}

// Donations
export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(donations).values(donation);
}

export async function getUserDonations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(donations).where(eq(donations.donorUserId, userId)).orderBy(desc(donations.createdAt));
}

export async function updateDonationStatus(donationId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(donations).set({ status: status as any }).where(eq(donations.id, donationId));
}

// Exchanges
export async function createExchange(exchange: InsertExchange) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(exchanges).values(exchange);
}

export async function getUserExchanges(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exchanges).where(eq(exchanges.requesterUserId, userId)).orderBy(desc(exchanges.createdAt));
}

export async function updateExchangeStatus(exchangeId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(exchanges).set({ status: status as any }).where(eq(exchanges.id, exchangeId));
}

// Pau Interactions
export async function recordPauInteraction(interaction: InsertPauInteraction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(pauInteractions).values(interaction);
}

export async function getUserPauHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pauInteractions).where(eq(pauInteractions.userId, userId)).orderBy(desc(pauInteractions.createdAt));
}

// Marketplace Listings
export async function createMarketplaceListing(listing: InsertMarketplaceListing) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(marketplaceListings).values(listing);
}

export async function getUserMarketplaceListings(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketplaceListings).where(eq(marketplaceListings.userId, userId)).orderBy(desc(marketplaceListings.createdAt));
}

export async function updateMarketplaceListingStatus(listingId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(marketplaceListings).set({ status: status as any }).where(eq(marketplaceListings.id, listingId));
}
