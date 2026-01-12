import { eq } from "drizzle-orm";
import { getDb } from "./db";
import {
  wardrobeItems,
  usageHistory,
  outfitSuggestions,
  donations,
  exchanges,
  marketplaceListings,
  pauInteractions,
} from "../drizzle/schema";

/**
 * Comprehensive seed data for TRYONYOU demo
 * Creates realistic wardrobe items, outfits, donations, exchanges, and marketplace listings
 */

const DEMO_USER_ID = 1; // Assuming the first user is the demo user

async function seedDatabase() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data
    console.log("Clearing existing seed data...");
    await db.delete(usageHistory).where(eq(usageHistory.userId, DEMO_USER_ID));
    await db.delete(outfitSuggestions).where(eq(outfitSuggestions.userId, DEMO_USER_ID));
    await db.delete(marketplaceListings).where(eq(marketplaceListings.userId, DEMO_USER_ID));
    await db.delete(pauInteractions).where(eq(pauInteractions.userId, DEMO_USER_ID));
    await db.delete(exchanges).where(eq(exchanges.requesterUserId, DEMO_USER_ID));
    await db.delete(donations).where(eq(donations.donorUserId, DEMO_USER_ID));
    await db.delete(wardrobeItems).where(eq(wardrobeItems.userId, DEMO_USER_ID));

    // Seed wardrobe items
    console.log("Seeding wardrobe items...");
    const itemsData = [
      // Tops
      {
        name: "Classic White Oxford Shirt",
        category: "tops" as const,
        color: "White",
        size: "M",
        brand: "Brooks Brothers",
        purchasePrice: "89.00",
        condition: "excellent" as const,
        location: "Closet - Shirts Section",
        season: "all-season" as const,
        notes: "Perfect for business meetings",
      },
      {
        name: "Navy Blue Polo Shirt",
        category: "tops" as const,
        color: "Navy",
        size: "L",
        brand: "Lacoste",
        purchasePrice: "95.00",
        condition: "good" as const,
        location: "Drawer 2",
        season: "summer" as const,
        notes: "Comfortable casual wear",
      },
      {
        name: "Black Turtleneck Sweater",
        category: "tops" as const,
        color: "Black",
        size: "M",
        brand: "Uniqlo",
        purchasePrice: "49.00",
        condition: "excellent" as const,
        location: "Closet - Sweaters",
        season: "winter" as const,
        notes: "Minimalist style",
      },
      {
        name: "Gray Hoodie",
        category: "tops" as const,
        color: "Gray",
        size: "L",
        brand: "Nike",
        purchasePrice: "65.00",
        condition: "good" as const,
        location: "Drawer 3",
        season: "fall" as const,
        notes: "Weekend comfort",
      },
      {
        name: "Striped Linen Shirt",
        category: "tops" as const,
        color: "Blue",
        size: "M",
        brand: "Zara",
        purchasePrice: "39.00",
        condition: "good" as const,
        location: "Closet - Shirts Section",
        season: "summer" as const,
        notes: "Beach vacation ready",
      },
      // Bottoms
      {
        name: "Dark Wash Denim Jeans",
        category: "bottoms" as const,
        color: "Blue",
        size: "32x32",
        brand: "Levi's",
        purchasePrice: "79.00",
        condition: "excellent" as const,
        location: "Closet - Pants Rack",
        season: "all-season" as const,
        notes: "Classic 511 fit",
      },
      {
        name: "Charcoal Dress Trousers",
        category: "bottoms" as const,
        color: "Gray",
        size: "32",
        brand: "Hugo Boss",
        purchasePrice: "149.00",
        condition: "excellent" as const,
        location: "Closet - Dress Pants",
        season: "all-season" as const,
        notes: "Office essential",
      },
      {
        name: "Khaki Chinos",
        category: "bottoms" as const,
        color: "Beige",
        size: "32",
        brand: "Dockers",
        purchasePrice: "59.00",
        condition: "good" as const,
        location: "Closet - Casual Pants",
        season: "spring" as const,
        notes: "Versatile casual",
      },
      {
        name: "Black Joggers",
        category: "bottoms" as const,
        color: "Black",
        size: "M",
        brand: "Adidas",
        purchasePrice: "55.00",
        condition: "good" as const,
        location: "Drawer 4",
        season: "all-season" as const,
        notes: "Gym and lounge",
      },
      {
        name: "Navy Shorts",
        category: "bottoms" as const,
        color: "Navy",
        size: "32",
        brand: "J.Crew",
        purchasePrice: "45.00",
        condition: "excellent" as const,
        location: "Drawer 1",
        season: "summer" as const,
        notes: "Summer essential",
      },
      // Outerwear
      {
        name: "Navy Blazer",
        category: "outerwear" as const,
        color: "Navy",
        size: "40R",
        brand: "J.Crew",
        purchasePrice: "298.00",
        condition: "excellent" as const,
        location: "Closet - Jackets",
        season: "fall" as const,
        notes: "Professional meetings",
      },
      {
        name: "Leather Jacket",
        category: "outerwear" as const,
        color: "Black",
        size: "M",
        brand: "AllSaints",
        purchasePrice: "450.00",
        condition: "excellent" as const,
        location: "Closet - Jackets",
        season: "fall" as const,
        notes: "Statement piece",
      },
      {
        name: "Puffer Jacket",
        category: "outerwear" as const,
        color: "Green",
        size: "L",
        brand: "The North Face",
        purchasePrice: "199.00",
        condition: "good" as const,
        location: "Coat Rack",
        season: "winter" as const,
        notes: "Cold weather protection",
      },
      {
        name: "Denim Jacket",
        category: "outerwear" as const,
        color: "Blue",
        size: "M",
        brand: "Levi's",
        purchasePrice: "89.00",
        condition: "good" as const,
        location: "Closet - Jackets",
        season: "spring" as const,
        notes: "Casual layer",
      },
      // Shoes
      {
        name: "Brown Leather Oxfords",
        category: "shoes" as const,
        color: "Brown",
        size: "10",
        brand: "Allen Edmonds",
        purchasePrice: "395.00",
        condition: "excellent" as const,
        location: "Shoe Rack - Dress",
        season: "all-season" as const,
        notes: "Formal occasions",
      },
      {
        name: "White Sneakers",
        category: "shoes" as const,
        color: "White",
        size: "10",
        brand: "Common Projects",
        purchasePrice: "425.00",
        condition: "good" as const,
        location: "Shoe Rack - Casual",
        season: "all-season" as const,
        notes: "Minimalist style",
      },
      {
        name: "Black Chelsea Boots",
        category: "shoes" as const,
        color: "Black",
        size: "10",
        brand: "Thursday Boot Co",
        purchasePrice: "199.00",
        condition: "excellent" as const,
        location: "Shoe Rack - Boots",
        season: "fall" as const,
        notes: "Versatile boots",
      },
      {
        name: "Running Shoes",
        category: "shoes" as const,
        color: "Gray",
        size: "10",
        brand: "Nike",
        purchasePrice: "130.00",
        condition: "good" as const,
        location: "Shoe Rack - Athletic",
        season: "all-season" as const,
        notes: "Daily exercise",
      },
      // Accessories
      {
        name: "Leather Belt - Brown",
        category: "accessories" as const,
        color: "Brown",
        size: "34",
        brand: "Coach",
        purchasePrice: "75.00",
        condition: "excellent" as const,
        location: "Accessory Drawer",
        season: "all-season" as const,
        notes: "Matches brown shoes",
      },
      {
        name: "Leather Belt - Black",
        category: "accessories" as const,
        color: "Black",
        size: "34",
        brand: "Coach",
        purchasePrice: "75.00",
        condition: "excellent" as const,
        location: "Accessory Drawer",
        season: "all-season" as const,
        notes: "Formal wear",
      },
      {
        name: "Wool Scarf",
        category: "accessories" as const,
        color: "Gray",
        size: "One Size",
        brand: "Burberry",
        purchasePrice: "350.00",
        condition: "excellent" as const,
        location: "Accessory Drawer",
        season: "winter" as const,
        notes: "Luxury warmth",
      },
      {
        name: "Sunglasses",
        category: "accessories" as const,
        color: "Black",
        size: "One Size",
        brand: "Ray-Ban",
        purchasePrice: "150.00",
        condition: "good" as const,
        location: "Bedside Table",
        season: "summer" as const,
        notes: "Wayfarer classic",
      },
    ];

    const insertedItemIds: number[] = [];
    for (let i = 0; i < itemsData.length; i++) {
      const item = itemsData[i];
      await db.insert(wardrobeItems).values({
        userId: DEMO_USER_ID,
        ...item,
        imageUrl: null,
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      });
      // Assume sequential IDs starting from 1 for demo purposes
      insertedItemIds.push(i + 1);
    }
    console.log(`✅ Inserted ${insertedItemIds.length} wardrobe items`);

    // Seed outfit suggestions
    console.log("Seeding outfit suggestions...");
    const outfitsData = [
      {
        name: "Business Casual Friday",
        occasion: "work",
        season: "spring",
        itemIds: JSON.stringify([insertedItemIds[1], insertedItemIds[7], insertedItemIds[14]]),
        compatibilityScore: 95,
        styleNotes: "Perfect for a relaxed office day",
      },
      {
        name: "Client Meeting Professional",
        occasion: "formal",
        season: "fall",
        itemIds: JSON.stringify([insertedItemIds[0], insertedItemIds[6], insertedItemIds[10]]),
        compatibilityScore: 98,
        styleNotes: "Confident and polished",
      },
      {
        name: "Weekend Casual",
        occasion: "casual",
        season: "all",
        itemIds: JSON.stringify([insertedItemIds[3], insertedItemIds[5], insertedItemIds[15]]),
        compatibilityScore: 92,
        styleNotes: "Comfortable and stylish",
      },
      {
        name: "Summer Evening Out",
        occasion: "casual",
        season: "summer",
        itemIds: JSON.stringify([insertedItemIds[4], insertedItemIds[9], insertedItemIds[15]]),
        compatibilityScore: 90,
        styleNotes: "Relaxed summer vibe",
      },
      {
        name: "Date Night",
        occasion: "date",
        season: "fall",
        itemIds: JSON.stringify([insertedItemIds[2], insertedItemIds[5], insertedItemIds[11]]),
        compatibilityScore: 96,
        styleNotes: "Sophisticated and stylish",
      },
    ];

    for (const outfit of outfitsData) {
      await db.insert(outfitSuggestions).values({
        userId: DEMO_USER_ID,
        ...outfit,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
    }
    console.log(`✅ Inserted ${outfitsData.length} outfit suggestions`);

    // Seed usage history
    console.log("Seeding usage history...");
    const usageData = [
      {
        itemId: insertedItemIds[5],
        wornDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        occasion: "casual",
      },
      {
        itemId: insertedItemIds[15],
        wornDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        occasion: "casual",
      },
      {
        itemId: insertedItemIds[0],
        wornDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        occasion: "work",
      },
      {
        itemId: insertedItemIds[6],
        wornDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        occasion: "work",
      },
      {
        itemId: insertedItemIds[1],
        wornDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        occasion: "casual",
      },
    ];

    for (const usage of usageData) {
      await db.insert(usageHistory).values({
        userId: DEMO_USER_ID,
        ...usage,
        createdAt: usage.wornDate,
      });
    }
    console.log(`✅ Inserted ${usageData.length} usage history records`);

    // Seed donations
    console.log("Seeding donations...");
    const donationsData = [
      {
        itemId: insertedItemIds[3],
        donorUserId: DEMO_USER_ID,
        recipientUserId: null,
        status: "offered" as const,
        notes: "Upgrading wardrobe",
      },
      {
        itemId: insertedItemIds[8],
        donorUserId: DEMO_USER_ID,
        recipientUserId: 2,
        status: "completed" as const,
        donationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        notes: "Donated to community member",
      },
    ];

    for (const donation of donationsData) {
      await db.insert(donations).values({
        ...donation,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      });
    }
    console.log(`✅ Inserted ${donationsData.length} donations`);

    // Seed marketplace listings
    console.log("Seeding marketplace listings...");
    const listingsData = [
      {
        itemId: insertedItemIds[11],
        userId: DEMO_USER_ID,
        platform: "wallapop" as const,
        listingUrl: "https://es.wallapop.com/item/leather-jacket-allsaints",
        price: "250.00",
        status: "listed" as const,
        listedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        itemId: insertedItemIds[10],
        userId: DEMO_USER_ID,
        platform: "limon_cua" as const,
        listingUrl: "https://limoncua.com/item/navy-blazer-jcrew",
        price: "150.00",
        status: "listed" as const,
        listedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        itemId: insertedItemIds[14],
        userId: DEMO_USER_ID,
        platform: "wallapop" as const,
        listingUrl: "https://es.wallapop.com/item/allen-edmonds-oxfords",
        price: "200.00",
        status: "sold" as const,
        listedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        soldDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
      },
    ];

    for (const listing of listingsData) {
      await db.insert(marketplaceListings).values({
        ...listing,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      });
    }
    console.log(`✅ Inserted ${listingsData.length} marketplace listings`);

    // Seed Pau interactions
    console.log("Seeding Pau interactions...");
    const pauData = [
      {
        userId: DEMO_USER_ID,
        type: "outfit_suggestion" as const,
        userMessage: "What should I wear for a client meeting tomorrow?",
        pauResponse:
          "I recommend your Business Professional outfit: White Oxford Shirt, Charcoal Dress Trousers, Navy Blazer, and Brown Leather Oxfords. This combination projects confidence and professionalism.",
        helpful: true,
      },
      {
        userId: DEMO_USER_ID,
        type: "style_consultation" as const,
        userMessage: "Where did I put my wool scarf?",
        pauResponse:
          "Your Wool Scarf is stored in the Accessory Drawer. It's a Burberry piece in gray, perfect for the upcoming winter season!",
        helpful: true,
      },
      {
        userId: DEMO_USER_ID,
        type: "donation_advice" as const,
        userMessage: "Should I donate my old hoodie?",
        pauResponse:
          "Yes, I recommend donating your Gray Hoodie. It's in good condition and would be appreciated by local charities. It also frees up closet space for items you wear more frequently.",
        helpful: true,
      },
    ];

    for (const interaction of pauData) {
      await db.insert(pauInteractions).values({
        ...interaction,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
    }
    console.log(`✅ Inserted ${pauData.length} Pau interactions`);

    console.log("🎉 Database seed completed successfully!");
    console.log(`
📊 Summary:
- ${insertedItemIds.length} wardrobe items
- ${outfitsData.length} outfit suggestions
- ${usageData.length} usage history records
- ${donationsData.length} donations
- ${listingsData.length} marketplace listings
- ${pauData.length} Pau interactions
    `);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

export { seedDatabase };
