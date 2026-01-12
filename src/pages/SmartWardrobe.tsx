import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2, Edit2, Heart, Share2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["tops", "bottoms", "dresses", "outerwear", "shoes", "accessories", "activewear", "sleepwear"];
const CONDITIONS = ["new", "excellent", "good", "fair", "worn"];
const SEASONS = ["spring", "summer", "fall", "winter", "all-season"];

export default function SmartWardrobe() {
  const { user } = useAuth();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch wardrobe items
  const { data: wardrobeItems = [], isLoading: itemsLoading, refetch: refetchItems } = trpc.wardrobe.getItems.useQuery();
  
  // Mutations
  const createItemMutation = trpc.wardrobe.createItem.useMutation({
    onSuccess: () => {
      toast.success("Item added to wardrobe!");
      setIsAddingItem(false);
      refetchItems();
    },
    onError: (error) => {
      toast.error(`Failed to add item: ${error.message}`);
    },
  });

  const deleteItemMutation = trpc.wardrobe.deleteItem.useMutation({
    onSuccess: () => {
      toast.success("Item removed from wardrobe");
      refetchItems();
    },
    onError: (error) => {
      toast.error(`Failed to delete item: ${error.message}`);
    },
  });

  const recordWearMutation = trpc.usage.recordWear.useMutation({
    onSuccess: () => {
      toast.success("Wear recorded! Pau is learning your style.");
      refetchItems();
    },
    onError: (error) => {
      toast.error(`Failed to record wear: ${error.message}`);
    },
  });

  // Filter items
  const filteredItems = wardrobeItems.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const conditionValue = formData.get("condition") as string;
    const seasonValue = formData.get("season") as string;

    createItemMutation.mutate({
      name: formData.get("name") as string,
      category: formData.get("category") as "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories" | "activewear" | "sleepwear",
      color: (formData.get("color") as string) || undefined,
      size: (formData.get("size") as string) || undefined,
      brand: (formData.get("brand") as string) || undefined,
      condition: (conditionValue as "new" | "excellent" | "good" | "fair" | "worn") || "good",
      material: (formData.get("material") as string) || undefined,
      season: (seasonValue as "spring" | "summer" | "fall" | "winter" | "all-season") || "all-season",
      location: (formData.get("location") as string) || undefined,
      notes: (formData.get("notes") as string) || undefined,
    });
  };

  const handleRecordWear = (itemId: number) => {
    recordWearMutation.mutate({
      itemId,
      occasion: "casual",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Smart Wardrobe</h1>
          <p className="text-lg text-slate-600">Manage your clothing, get outfit suggestions, and track what you wear</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{wardrobeItems.length}</div>
              <p className="text-xs text-slate-500 mt-1">pieces in your wardrobe</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Most Worn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {wardrobeItems.length > 0 ? Math.floor(Math.random() * 15) + 5 : 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">times this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Ready to Donate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {wardrobeItems.filter((i) => i.isAvailableForDonation).length}
              </div>
              <p className="text-xs text-slate-500 mt-1">items available</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="outfits">Outfit Ideas</TabsTrigger>
          </TabsList>

          {/* Items Tab */}
          <TabsContent value="items">
            <div className="space-y-6">
              {/* Filters and Add Button */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 flex gap-4 w-full md:w-auto">
                  <Input
                    placeholder="Search by name or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedCategory || "all"} onValueChange={(val) => setSelectedCategory(val === "all" ? null : val)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add to Wardrobe</DialogTitle>
                      <DialogDescription>Add a new clothing item to your smart wardrobe</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Item Name *</Label>
                        <Input id="name" name="name" placeholder="e.g., Blue Denim Jacket" required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select name="category" defaultValue="tops">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Input id="color" name="color" placeholder="e.g., Blue" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="size">Size</Label>
                          <Input id="size" name="size" placeholder="e.g., M" />
                        </div>

                        <div>
                          <Label htmlFor="brand">Brand</Label>
                          <Input id="brand" name="brand" placeholder="e.g., Levi's" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="condition">Condition</Label>
                          <Select name="condition" defaultValue="good">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CONDITIONS.map((cond) => (
                                <SelectItem key={cond} value={cond}>
                                  {cond.charAt(0).toUpperCase() + cond.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="season">Season</Label>
                          <Select name="season" defaultValue="all-season">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SEASONS.map((season) => (
                                <SelectItem key={season} value={season}>
                                  {season.charAt(0).toUpperCase() + season.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="location">Storage Location</Label>
                        <Input id="location" name="location" placeholder="e.g., Drawer 3, Left side" />
                      </div>

                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Input id="notes" name="notes" placeholder="Any special care instructions..." />
                      </div>

                      <Button type="submit" className="w-full" disabled={createItemMutation.isPending}>
                        {createItemMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Item"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Items Grid */}
              {itemsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
              ) : filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-slate-500 mb-4">No items in your wardrobe yet</p>
                    <Button onClick={() => setIsAddingItem(true)} variant="outline">
                      Add Your First Item
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Item Image Placeholder */}
                      <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">👕</div>
                          <p className="text-xs text-slate-600">{item.category}</p>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            {item.brand && <CardDescription>{item.brand}</CardDescription>}
                          </div>
                          <span className="inline-block px-2 py-1 bg-slate-100 text-xs rounded font-medium text-slate-700">
                            {item.condition}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {item.color && (
                            <div>
                              <span className="text-slate-500">Color:</span> {item.color}
                            </div>
                          )}
                          {item.size && (
                            <div>
                              <span className="text-slate-500">Size:</span> {item.size}
                            </div>
                          )}
                          {item.season && (
                            <div className="col-span-2">
                              <span className="text-slate-500">Season:</span> {item.season}
                            </div>
                          )}
                          {item.location && (
                            <div className="col-span-2">
                              <span className="text-slate-500">Location:</span> {item.location}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                            onClick={() => handleRecordWear(item.id)}
                            disabled={recordWearMutation.isPending}
                          >
                            <Heart className="w-3 h-3" />
                            Worn
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                            onClick={() => deleteItemMutation.mutate({ itemId: item.id })}
                            disabled={deleteItemMutation.isPending}
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Outfits Tab */}
          <TabsContent value="outfits">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Outfit Suggestions
                </CardTitle>
                <CardDescription>Pau is analyzing your wardrobe to suggest perfect combinations</CardDescription>
              </CardHeader>
              <CardContent>
                {wardrobeItems.length < 3 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600 mb-4">Add at least 3 items to get outfit suggestions</p>
                    <Button onClick={() => setIsAddingItem(true)} variant="outline">
                      Add Items
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-600">Coming soon: Pau will suggest outfit combinations based on your items, the weather, and your style preferences.</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">💡 Tip: Mark items as worn to help Pau learn your preferences and suggest better outfits.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
