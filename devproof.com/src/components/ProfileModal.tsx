import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { LeaderboardEntry } from "@/hooks/useLeaderboard";

interface ProfileModalProps {
  profile: LeaderboardEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getTier = (points: number) => {
  if (points >= 2000) return "core" as const;
  if (points >= 1000) return "builder" as const;
  if (points >= 500) return "contributor" as const;
  return "active" as const;
};

export const ProfileModal = ({ profile, open, onOpenChange }: ProfileModalProps) => {
  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{profile.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Tier and Stats */}
          <div className="flex items-center gap-4">
            <Badge tier={getTier(profile.points)} />
            <div className="text-sm text-muted-foreground">
              {profile.features_shipped} PRs merged · {profile.points} points
            </div>
          </div>

          {/* University */}
          {profile.university && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">University</h4>
              <p className="text-base">{profile.university}</p>
            </div>
          )}

          {/* Founding Member Badge */}
          {profile.is_founding_member && (
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-xl">🌟</span>
              <span className="text-sm font-medium text-primary">Founding Member</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {profile.github_url && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
            {profile.linkedin_url && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
