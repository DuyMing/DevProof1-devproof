import { ContributorCard } from "./ContributorCard";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Skeleton } from "@/components/ui/skeleton";

const getTier = (points: number) => {
  if (points >= 2000) return "core" as const;
  if (points >= 1000) return "builder" as const;
  if (points >= 500) return "contributor" as const;
  return "active" as const;
};

export const Leaderboard = () => {
  const { data: contributors, isLoading } = useLeaderboard(6);

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-transparent to-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top Contributors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the talented developers building the future of DevProof. 
            <span className="block mt-2 text-primary font-medium">
              Verified contributors are eligible for recommendations.
            </span>
          </p>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-3xl" />
            ))
          ) : contributors && contributors.length > 0 ? (
            contributors.map((contributor, index) => (
              <ContributorCard
                key={contributor.id}
                name={contributor.name}
                username={contributor.username}
                tier={getTier(contributor.points)}
                points={contributor.points}
                contributions={contributor.features_shipped}
                githubUrl={contributor.github_url || undefined}
                rank={index + 1}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">
                No contributors yet. Be the first!
              </p>
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View Full Leaderboard
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
