import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { seedRouter } from "./seedProcedure";
import { z } from "zod";
import {
  getUserWardrobeItems,
  getWardrobeItemById,
  createWardrobeItem,
  updateWardrobeItem,
  deleteWardrobeItem,
  recordItemUsage,
  getItemUsageHistory,
  getUserUsageStats,
  getUserOutfitSuggestions,
  createOutfitSuggestion,
  createDonation,
  getUserDonations,
  updateDonationStatus,
  createExchange,
  getUserExchanges,
  updateExchangeStatus,
  recordPauInteraction,
  getUserPauHistory,
  createMarketplaceListing,
  getUserMarketplaceListings,
  updateMarketplaceListingStatus,
} from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  seed: seedRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Wardrobe Items
  wardrobe: router({
    getItems: protectedProcedure.query(({ ctx }) =>
      getUserWardrobeItems(ctx.user.id)
    ),
    
    getItem: protectedProcedure
      .input(z.object({ itemId: z.number() }))
      .query(({ input }) => getWardrobeItemById(input.itemId)),
    
    createItem: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          category: z.enum([
            "tops",
            "bottoms",
            "dresses",
            "outerwear",
            "shoes",
            "accessories",
            "activewear",
            "sleepwear",
          ]),
          color: z.string().optional(),
          size: z.string().optional(),
          brand: z.string().optional(),
          condition: z.enum(["new", "excellent", "good", "fair", "worn"]).default("good"),
          material: z.string().optional(),
          season: z.enum(["spring", "summer", "fall", "winter", "all-season"]).default("all-season"),
          imageUrl: z.string().optional(),
          location: z.string().optional(),
          purchaseDate: z.date().optional(),
          purchasePrice: z.number().optional(),
          estimatedValue: z.number().optional(),
          notes: z.string().optional(),
          isAvailableForExchange: z.boolean().default(false),
          isAvailableForDonation: z.boolean().default(false),
        })
      )
      .mutation(({ ctx, input }) =>
        createWardrobeItem({
          userId: ctx.user.id,
          name: input.name,
          category: input.category,
          color: input.color,
          size: input.size,
          brand: input.brand,
          condition: input.condition,
          material: input.material,
          season: input.season,
          imageUrl: input.imageUrl,
          location: input.location,
          purchaseDate: input.purchaseDate,
          purchasePrice: input.purchasePrice ? input.purchasePrice.toString() : undefined,
          estimatedValue: input.estimatedValue ? input.estimatedValue.toString() : undefined,
          notes: input.notes,
          isAvailableForExchange: input.isAvailableForExchange,
          isAvailableForDonation: input.isAvailableForDonation,
        })
      ),
    
    updateItem: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          updates: z.object({
            name: z.string().optional(),
            color: z.string().optional(),
            size: z.string().optional(),
            location: z.string().optional(),
            condition: z.enum(["new", "excellent", "good", "fair", "worn"]).optional(),
            isAvailableForExchange: z.boolean().optional(),
            isAvailableForDonation: z.boolean().optional(),
            notes: z.string().optional(),
          }),
        })
      )
      .mutation(({ input }) => {
        const updates: Record<string, any> = {};
        if (input.updates.name !== undefined) updates.name = input.updates.name;
        if (input.updates.color !== undefined) updates.color = input.updates.color;
        if (input.updates.size !== undefined) updates.size = input.updates.size;
        if (input.updates.location !== undefined) updates.location = input.updates.location;
        if (input.updates.condition !== undefined) updates.condition = input.updates.condition;
        if (input.updates.isAvailableForExchange !== undefined) updates.isAvailableForExchange = input.updates.isAvailableForExchange;
        if (input.updates.isAvailableForDonation !== undefined) updates.isAvailableForDonation = input.updates.isAvailableForDonation;
        if (input.updates.notes !== undefined) updates.notes = input.updates.notes;
        return updateWardrobeItem(input.itemId, updates);
      }),
    
    deleteItem: protectedProcedure
      .input(z.object({ itemId: z.number() }))
      .mutation(({ input }) => deleteWardrobeItem(input.itemId)),
  }),

  // Usage Tracking
  usage: router({
    recordWear: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          occasion: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        recordItemUsage({
          itemId: input.itemId,
          userId: ctx.user.id,
          wornDate: new Date(),
          occasion: input.occasion,
        })
      ),
    
    getItemHistory: protectedProcedure
      .input(z.object({ itemId: z.number() }))
      .query(({ input }) => getItemUsageHistory(input.itemId)),
    
    getUserStats: protectedProcedure.query(({ ctx }) =>
      getUserUsageStats(ctx.user.id)
    ),
  }),

  // Outfit Suggestions
  outfits: router({
    getSuggestions: protectedProcedure.query(({ ctx }) =>
      getUserOutfitSuggestions(ctx.user.id)
    ),
    
    createSuggestion: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          occasion: z.string(),
          season: z.string().optional(),
          itemIds: z.array(z.number()),
          compatibilityScore: z.number().min(0).max(100),
          styleNotes: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createOutfitSuggestion({
          userId: ctx.user.id,
          name: input.name,
          occasion: input.occasion,
          season: input.season,
          compatibilityScore: input.compatibilityScore,
          styleNotes: input.styleNotes,
          itemIds: JSON.stringify(input.itemIds),
        })
      ),
  }),

  // Donations
  donations: router({
    create: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          recipientUserId: z.number().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createDonation({
          itemId: input.itemId,
          donorUserId: ctx.user.id,
          recipientUserId: input.recipientUserId,
          status: "offered",
          notes: input.notes,
        })
      ),
    
    getMyDonations: protectedProcedure.query(({ ctx }) =>
      getUserDonations(ctx.user.id)
    ),
    
    updateStatus: protectedProcedure
      .input(
        z.object({
          donationId: z.number(),
          status: z.enum(["offered", "accepted", "completed", "cancelled"]),
        })
      )
      .mutation(({ input }) =>
        updateDonationStatus(input.donationId, input.status)
      ),
  }),

  // Exchanges
  exchanges: router({
    create: protectedProcedure
      .input(
        z.object({
          offeredItemId: z.number(),
          requestedItemId: z.number(),
          providerUserId: z.number(),
          notes: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createExchange({
          offeredItemId: input.offeredItemId,
          requestedItemId: input.requestedItemId,
          requesterUserId: ctx.user.id,
          providerUserId: input.providerUserId,
          status: "pending",
          notes: input.notes,
        })
      ),
    
    getMyExchanges: protectedProcedure.query(({ ctx }) =>
      getUserExchanges(ctx.user.id)
    ),
    
    updateStatus: protectedProcedure
      .input(
        z.object({
          exchangeId: z.number(),
          status: z.enum(["pending", "accepted", "completed", "cancelled"]),
        })
      )
      .mutation(({ input }) =>
        updateExchangeStatus(input.exchangeId, input.status)
      ),
  }),

  // Pau AI Assistant
  pau: router({
    chat: protectedProcedure
      .input(
        z.object({
          message: z.string(),
          type: z.enum([
            "outfit_suggestion",
            "donation_advice",
            "exchange_guidance",
            "care_tips",
            "style_consultation",
            "general_chat",
          ]),
          context: z.any().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Build system prompt for Pau
        const systemPrompt = `You are Pau, the TRYONYOU Intelligent Wardrobe Assistant. You are friendly, helpful, and knowledgeable about fashion, sustainability, and wardrobe management. 
        
Your role is to:
- Suggest outfits based on the user's wardrobe and occasion
- Provide donation and exchange guidance
- Offer care tips for clothing items
- Help users optimize their wardrobe
- Encourage sustainable fashion practices
- Remember and learn from user preferences over time

Always be warm, encouraging, and practical. Keep responses concise but helpful.`;

        const userPrompt = input.message;

        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          });

          const pauResponse =
            typeof response.choices[0]?.message?.content === 'string'
              ? response.choices[0].message.content
              : "I'm having trouble responding right now. Please try again.";

          // Record the interaction
          await recordPauInteraction({
            userId: ctx.user.id,
            type: input.type,
            userMessage: input.message,
            pauResponse: pauResponse,
            context: input.context ? JSON.stringify(input.context) : undefined,
          });

          return {
            response: pauResponse,
            success: true,
          };
        } catch (error) {
          console.error("Pau chat error:", error);
          return {
            response: "I encountered an error. Please try again.",
            success: false,
          };
        }
      }),
    
    getHistory: protectedProcedure.query(({ ctx }) =>
      getUserPauHistory(ctx.user.id)
    ),
  }),

  // Marketplace Integration
  marketplace: router({
    createListing: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          platform: z.enum(["wallapop", "limon_cua", "internal"]),
          price: z.number().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createMarketplaceListing({
          itemId: input.itemId,
          userId: ctx.user.id,
          platform: input.platform,
          price: input.price ? input.price.toString() : undefined,
          status: "draft",
        })
      ),
    
    getListings: protectedProcedure.query(({ ctx }) =>
      getUserMarketplaceListings(ctx.user.id)
    ),
    
    updateListingStatus: protectedProcedure
      .input(
        z.object({
          listingId: z.number(),
          status: z.enum(["draft", "listed", "sold", "delisted"]),
        })
      )
      .mutation(({ input }) =>
        updateMarketplaceListingStatus(input.listingId, input.status)
      ),
    
    generateWallapopLink: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          price: z.number(),
        })
      )
      .query(async ({ input }) => {
        // Simulate Wallapop link generation
        const item = await getWardrobeItemById(input.itemId);
        if (!item) return null;

        const params = new URLSearchParams({
          title: item.name,
          description: `${item.brand || ""} ${item.color || ""} ${item.category}. Condition: ${item.condition}`,
          price: input.price.toString(),
          category: item.category,
        });

        return {
          platform: "wallapop",
          url: `https://wallapop.com/sell?${params.toString()}`,
          itemId: input.itemId,
          price: input.price,
        };
      }),
    
    generateLimonLink: protectedProcedure
      .input(
        z.object({
          itemId: z.number(),
          price: z.number(),
        })
      )
      .query(async ({ input }) => {
        // Simulate Limón Cuá link generation
        const item = await getWardrobeItemById(input.itemId);
        if (!item) return null;

        const params = new URLSearchParams({
          title: item.name,
          description: `${item.brand || ""} ${item.color || ""} ${item.category}. Condition: ${item.condition}`,
          price: input.price.toString(),
        });

        return {
          platform: "limon_cua",
          url: `https://limoncua.com/sell?${params.toString()}`,
          itemId: input.itemId,
          price: input.price,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
