import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ExternalLink, Copy, Check, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Marketplace() {
  const { user } = useAuth();
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"wallapop" | "limon_cua">("wallapop");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Fetch data
  const { data: wardrobeItems = [], isLoading: itemsLoading } = trpc.wardrobe.getItems.useQuery();
  const { data: listings = [], refetch: refetchListings } = trpc.marketplace.getListings.useQuery();

  // Mutations
  const createListingMutation = trpc.marketplace.createListing.useMutation({
    onSuccess: () => {
      toast.success("Listing created! Generating marketplace link...");
      setIsSellDialogOpen(false);
      refetchListings();
    },
    onError: (error) => {
      toast.error(`Failed to create listing: ${error.message}`);
    },
  });

  const generateWallapopLinkMutation = trpc.marketplace.generateWallapopLink.useQuery(
    { itemId: 0, price: 0 },
    { enabled: false }
  );

  const generateLimonLinkMutation = trpc.marketplace.generateLimonLink.useQuery(
    { itemId: 0, price: 0 },
    { enabled: false }
  );

  const handleCreateListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemIdValue = formData.get("itemId");
    const priceValue = formData.get("price");

    if (!itemIdValue || typeof itemIdValue !== "string") {
      toast.error("Please select an item");
      return;
    }

    if (!priceValue || typeof priceValue !== "string") {
      toast.error("Please enter a price");
      return;
    }

    const itemId = parseInt(itemIdValue);
    const price = parseFloat(priceValue);

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    createListingMutation.mutate({
      itemId,
      platform: selectedPlatform,
      price,
    });
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const platformInfo = {
    wallapop: {
      name: "Wallapop",
      color: "from-blue-500 to-blue-600",
      description: "Sell secondhand items locally and nationwide",
      icon: "🛍️",
    },
    limon_cua: {
      name: "Limón Cuá",
      color: "from-yellow-500 to-orange-500",
      description: "Sustainable fashion marketplace for conscious consumers",
      icon: "🌿",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Marketplace</h1>
          </div>
          <p className="text-lg text-slate-600">Sell your items on Wallapop and Limón Cuá directly from TRYONYOU</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Items for Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{wardrobeItems.length}</div>
              <p className="text-xs text-slate-500 mt-1">available to list</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {listings.filter((l) => l.status === "listed").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">currently selling</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Sold Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {listings.filter((l) => l.status === "sold").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">successfully sold</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="platforms">Sell on Platforms</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>

          {/* Platforms Tab */}
          <TabsContent value="platforms">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Connected Platforms</h2>
                  <p className="text-slate-600">Generate pre-filled listings for your items</p>
                </div>

                <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Create Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Marketplace Listing</DialogTitle>
                      <DialogDescription>Sell your item on Wallapop or Limón Cuá</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateListing} className="space-y-4">
                      <div>
                        <Label htmlFor="itemId">Select Item *</Label>
                        <select
                          id="itemId"
                          name="itemId"
                          required
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                        >
                          <option value="">Choose an item...</option>
                          {wardrobeItems.map((item) => (
                            <option key={item.id} value={item.id.toString()}>
                              {item.name} ({item.color || "N/A"}, {item.size || "N/A"})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="price">Price (€) *</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="19.99"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <Label>Platform *</Label>
                        <div className="space-y-2 mt-2">
                          {(["wallapop", "limon_cua"] as const).map((platform) => (
                            <label key={platform} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="platform"
                                value={platform}
                                checked={selectedPlatform === platform}
                                onChange={(e) => setSelectedPlatform(e.target.value as "wallapop" | "limon_cua")}
                                className="w-4 h-4"
                              />
                              <div>
                                <span className="font-medium text-slate-900">{platformInfo[platform].name}</span>
                                <p className="text-xs text-slate-500">{platformInfo[platform].description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={createListingMutation.isPending}>
                        {createListingMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Listing"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Platform Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(["wallapop", "limon_cua"] as const).map((platform) => (
                  <Card key={platform} className="overflow-hidden">
                    <div className={`h-24 bg-gradient-to-r ${platformInfo[platform].color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{platformInfo[platform].icon}</span>
                        <div>
                          <CardTitle>{platformInfo[platform].name}</CardTitle>
                          <CardDescription>{platformInfo[platform].description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-slate-600 mb-4">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>Pre-filled item details</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>Automatic price suggestions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>One-click listing creation</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Visit {platformInfo[platform].name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Info Section */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-800 space-y-2 text-sm">
                  <p>
                    <strong>1. Select an item</strong> from your Smart Wardrobe that you want to sell
                  </p>
                  <p>
                    <strong>2. Set your price</strong> and choose your preferred marketplace
                  </p>
                  <p>
                    <strong>3. Get a pre-filled link</strong> with all your item details automatically populated
                  </p>
                  <p>
                    <strong>4. Complete the listing</strong> on the marketplace and start selling
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">My Listings</h2>
                <p className="text-slate-600">Track your active and sold listings</p>
              </div>

              {listings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">No listings yet</p>
                    <Button onClick={() => setIsSellDialogOpen(true)}>Create Your First Listing</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">Listing #{listing.id}</h3>
                            <p className="text-sm text-slate-600">
                              {new Date(listing.createdAt).toLocaleDateString()} • {platformInfo[listing.platform as keyof typeof platformInfo]?.name || listing.platform}
                            </p>
                          </div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              listing.status === "sold"
                                ? "bg-green-100 text-green-800"
                                : listing.status === "listed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {listing.status?.charAt(0).toUpperCase() + (listing.status?.slice(1) || "")}
                          </span>
                        </div>

                        {listing.price && (
                          <div className="mb-4">
                            <p className="text-2xl font-bold text-slate-900">€{listing.price}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View on {platformInfo[listing.platform as keyof typeof platformInfo]?.name || "Platform"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
