import { Github, Linkedin } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ContributorCardProps {
  name: string;
  username: string;
  tier: "active" | "contributor" | "builder" | "core";
  points: number;
  contributions: number;
  githubUrl?: string;
  linkedinUrl?: string;
  rank: number;
}

export const ContributorCard = ({
  name,
  username,
  tier,
  points,
  contributions,
  githubUrl,
  linkedinUrl,
  rank,
}: ContributorCardProps) => {
  return (
    <div className="group relative bg-gradient-card border border-border rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-glow">
        #{rank}
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link to={`/u/${username}`}>
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
              {name}
            </h3>
          </Link>
          <Badge tier={tier} />
        </div>
        
        {/* Social Links */}
        <div className="flex gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-elevated hover:bg-primary/20 flex items-center justify-center transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-elevated hover:bg-primary/20 flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold text-primary">{points}</div>
          <div className="text-sm text-muted-foreground">Points</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{contributions}</div>
          <div className="text-sm text-muted-foreground">PRs Merged</div>
        </div>
      </div>
    </div>
  );
};
