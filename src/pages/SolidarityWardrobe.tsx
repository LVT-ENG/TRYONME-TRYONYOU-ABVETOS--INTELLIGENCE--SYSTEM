import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Gift, Share2, Heart, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SolidarityWardrobe() {
  const { user } = useAuth();
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false);

  // Fetch data
  const { data: wardrobeItems = [], isLoading: itemsLoading } = trpc.wardrobe.getItems.useQuery();
  const { data: donations = [], refetch: refetchDonations } = trpc.donations.getMyDonations.useQuery();
  const { data: exchanges = [], refetch: refetchExchanges } = trpc.exchanges.getMyExchanges.useQuery();

  // Mutations
  const createDonationMutation = trpc.donations.create.useMutation({
    onSuccess: () => {
      toast.success("Donation offer created! Pau will help find the right recipient.");
      setIsDonateDialogOpen(false);
      refetchDonations();
    },
    onError: (error) => {
      toast.error(`Failed to create donation: ${error.message}`);
    },
  });

  const createExchangeMutation = trpc.exchanges.create.useMutation({
    onSuccess: () => {
      toast.success("Exchange request sent!");
      setIsExchangeDialogOpen(false);
      refetchExchanges();
    },
    onError: (error) => {
      toast.error(`Failed to create exchange: ${error.message}`);
    },
  });

  const updateDonationStatusMutation = trpc.donations.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Donation status updated!");
      refetchDonations();
    },
    onError: (error) => {
      toast.error(`Failed to update donation: ${error.message}`);
    },
  });

  const updateExchangeStatusMutation = trpc.exchanges.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Exchange status updated!");
      refetchExchanges();
    },
    onError: (error) => {
      toast.error(`Failed to update exchange: ${error.message}`);
    },
  });

  // Get items available for donation
  const donationItems = wardrobeItems.filter((item) => item.isAvailableForDonation);

    const handleCreateDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemIdValue = formData.get("itemId");
    if (!itemIdValue || typeof itemIdValue !== 'string') {
      toast.error("Please select an item");
      return;
    }
    const itemId = parseInt(itemIdValue);

    createDonationMutation.mutate({
      itemId,
      notes: (formData.get("notes") as string) || undefined,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "offered":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
      case "offered":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Solidarity Wardrobe</h1>
          </div>
          <p className="text-lg text-slate-600">Share, exchange, and donate clothing within the TRYONYOU community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Items to Donate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{donationItems.length}</div>
              <p className="text-xs text-slate-500 mt-1">ready to share</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {donations.filter((d) => d.status === "offered" || d.status === "accepted").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Completed Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {exchanges.filter((e) => e.status === "completed").length}
              </div>
              <p className="text-xs text-slate-500 mt-1">successful trades</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="donations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <div className="space-y-6">
              {/* Create Donation Button */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">My Donations</h2>
                  <p className="text-slate-600">Items you're offering to the community</p>
                </div>

                <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Gift className="w-4 h-4" />
                      Offer Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Offer Item for Donation</DialogTitle>
                      <DialogDescription>Share a piece from your wardrobe with the TRYONYOU community</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateDonation} className="space-y-4">
                      <div>
                        <Label htmlFor="itemId">Select Item *</Label>
                        <select
                          id="itemId"
                          name="itemId"
                          required
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                        >
                          <option value="">Choose an item...</option>
                          {donationItems.map((item) => (
                            <option key={item.id} value={item.id.toString()}>
                              {item.name} ({item.color || 'N/A'}, {item.size || 'N/A'})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="notes">Message to Recipient</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Tell them why this item is special or any care tips..."
                          className="min-h-24"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={createDonationMutation.isPending}>
                        {createDonationMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Offer Item"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Donations List */}
              {donations.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">No donations yet</p>
                    <p className="text-sm text-slate-400 mb-4">Mark items as available for donation in your Smart Wardrobe</p>
                    <Button variant="outline">Go to Smart Wardrobe</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <Card key={donation.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">Donation #{donation.id}</h3>
                            <p className="text-sm text-slate-600">
                              {new Date(donation.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status || 'offered')}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(donation.status || 'offered')}
                              {(donation.status || 'offered').charAt(0).toUpperCase() + (donation.status || 'offered').slice(1)}
                            </div>
                          </span>
                        </div>

                        {donation.notes && (
                          <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded">
                            {donation.notes}
                          </p>
                        )}

                        {(donation.status === "offered" || !donation.status) && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateDonationStatusMutation.mutate({
                                  donationId: donation.id,
                                  status: "cancelled",
                                })
                              }
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Exchanges Tab */}
          <TabsContent value="exchanges">
            <div className="space-y-6">
              {/* Create Exchange Button */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">My Exchanges</h2>
                  <p className="text-slate-600">Items you're trading with other users</p>
                </div>

                <Button className="gap-2" disabled>
                  <Share2 className="w-4 h-4" />
                  Request Exchange (Coming Soon)
                </Button>
              </div>

              {/* Exchanges List */}
              {exchanges.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Share2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">No active exchanges</p>
                    <p className="text-sm text-slate-400">Browse other users' items and request exchanges coming soon</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {exchanges.map((exchange) => (
                    <Card key={exchange.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-slate-900">Exchange #{exchange.id}</h3>
                            <p className="text-sm text-slate-600">
                              {new Date(exchange.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exchange.status || 'pending')}`}>
                            {(exchange.status || 'pending').charAt(0).toUpperCase() + (exchange.status || 'pending').slice(1)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">About Solidarity Wardrobe</CardTitle>
          </CardHeader>
          <CardContent className="text-green-800">
            <p className="mb-4">
              The Solidarity Wardrobe is TRYONYOU's community-driven approach to sustainable fashion. Share items you no longer wear, exchange with other users, and help reduce textile waste while building a more inclusive fashion community.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Donate items to community members in need</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Exchange items with other TRYONYOU users</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Track the environmental impact of your sharing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Build connections with like-minded fashion enthusiasts</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
