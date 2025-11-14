import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProfileModal } from "@/components/ProfileModal";
import { Badge } from "@/components/Badge";
import { useLeaderboard, LeaderboardEntry } from "@/hooks/useLeaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getTier = (points: number) => {
  if (points >= 2000) return "core" as const;
  if (points >= 1000) return "builder" as const;
  if (points >= 500) return "contributor" as const;
  return "active" as const;
};

export default function LeaderboardPage() {
  const { data: contributors, isLoading } = useLeaderboard(100);
  const [selectedProfile, setSelectedProfile] = useState<LeaderboardEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNameClick = (profile: LeaderboardEntry) => {
    setSelectedProfile(profile);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>🏆 DevProof Leaderboard - Top Student Developers</title>
        <meta name="description" content="Top student developers shipping real features. Verified contributors are eligible for recommendations." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 px-6 py-16 md:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                🏆 DevProof Leaderboard
              </h1>
              <p className="text-xl text-muted-foreground mb-3">
                Top student developers shipping real features.
              </p>
              <p className="text-sm text-primary font-medium">
                Verified contributors are eligible for recommendations.
              </p>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-20 text-center font-semibold">Rank</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Tier</TableHead>
                    <TableHead className="text-center font-semibold">PRs</TableHead>
                    <TableHead className="text-right font-semibold">University</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-8 mx-auto" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-12 mx-auto" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : contributors && contributors.length > 0 ? (
                    contributors.map((contributor, index) => (
                      <TableRow key={contributor.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-center font-semibold text-lg">
                          {index < 3 ? (
                            <span className="text-2xl">
                              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">{index + 1}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/u/${contributor.username}`}
                            className="font-medium hover:text-primary transition-colors cursor-pointer"
                          >
                            {contributor.name}
                            {contributor.is_founding_member && (
                              <span className="ml-2 text-sm">🌟</span>
                            )}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge tier={getTier(contributor.points)} />
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {contributor.features_shipped}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {contributor.university || "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <p className="text-xl text-muted-foreground">
                          No contributors yet. Be the first!
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20 py-12">
              <p className="text-xl text-muted-foreground mb-6">
                Want to join them?
              </p>
              <Button
                size="lg"
                className="rounded-full"
                asChild
              >
                <a href="/auth">Sign Up – Free</a>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <ProfileModal
        profile={selectedProfile}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
