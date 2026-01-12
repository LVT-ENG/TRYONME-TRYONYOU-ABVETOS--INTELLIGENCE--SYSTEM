import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Database, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminSeed() {
  const runSeedMutation = trpc.seed.runSeed.useMutation({
    onSuccess: () => {
      toast.success("Database seeded successfully!", {
        description: "All demo data has been populated. Refresh the page to see the changes.",
      });
    },
    onError: (error) => {
      toast.error("Seed failed", {
        description: error.message,
      });
    },
  });

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Database Seed Tool</CardTitle>
              <CardDescription>
                Populate the database with realistic demo data for TRYONYOU
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">What will be created:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>22 wardrobe items (tops, bottoms, outerwear, shoes, accessories)</li>
              <li>5 outfit suggestions with compatibility scores</li>
              <li>5 usage history records</li>
              <li>2 donation records</li>
              <li>3 marketplace listings (Wallapop, Limón Cuá)</li>
              <li>3 Pau AI assistant interactions</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> This will clear existing seed data for your account before
              inserting new data. Your actual user data will not be affected.
            </p>
          </div>

          <Button
            onClick={() => runSeedMutation.mutate()}
            disabled={runSeedMutation.isPending}
            className="w-full"
            size="lg"
          >
            {runSeedMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Seeding Database...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Run Seed Script
              </>
            )}
          </Button>

          {runSeedMutation.isSuccess && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ Database seeded successfully! Refresh the page to see your new wardrobe items,
                outfits, and interactions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
