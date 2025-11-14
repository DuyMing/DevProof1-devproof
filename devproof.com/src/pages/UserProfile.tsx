import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LinkedInShareBox } from "@/components/LinkedInShareBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Copy } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  university: string;
  github_url: string | null;
  github_username: string | null;
  linkedin_url: string | null;
  points: number;
  features_shipped: number;
  is_founding_member: boolean;
  created_at: string;
}

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<any>(null);

  const { data: profile, isLoading } = useQuery<UserProfile | null>({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      // @ts-ignore - Temporary workaround for deep type recursion
      const response = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (response?.error) throw response.error;
      return (response?.data || null) as unknown as UserProfile | null;
    },
  });

  const { data: completedTasks } = useQuery<any[]>({
    queryKey: ["user-completed-tasks", profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      // @ts-ignore - Temporary workaround for deep type recursion
      const response = await supabase
        .from("submissions")
        .select("*, tasks(*)")
        .eq("user_id", profile.id)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (response?.error) throw response.error;
      return response?.data || [];
    },
    enabled: !!profile?.id,
  });

  const copyProfileUrl = () => {
    const url = `devproof.com/u/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Profile URL copied to clipboard!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGithubUsername = (url: string | null) => {
    if (!url) return null;
    const match = url.match(/github\.com\/([^/]+)/);
    return match ? match[1] : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-muted-foreground">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h1 className="text-2xl font-semibold">Profile not found</h1>
          <Button onClick={() => navigate("/leaderboard")}>
            View Leaderboard
          </Button>
        </div>
      </div>
    );
  }

  const githubUsername = profile?.github_username || getGithubUsername(profile?.github_url);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
            <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            {githubUsername && (
              <div className="flex items-center justify-center gap-2">
                <a
                  href={profile.github_url || `https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  @{githubUsername}
                </a>
                <Badge variant="outline" className="text-xs">
                  GitHub Verified
                </Badge>
              </div>
            )}
            {profile.university && (
              <p className="text-muted-foreground mt-1">{profile.university}</p>
            )}
          </div>

          {profile.is_founding_member && (
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              💎 Pioneer Contributor
            </Badge>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-16 p-8 bg-gradient-card border border-border rounded-2xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">
              {profile.features_shipped}
            </div>
            <div className="text-sm text-muted-foreground">Completed Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">
              {profile.points}
            </div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-1">
              {format(new Date(profile.created_at), "MMM yyyy")}
            </div>
            <div className="text-sm text-muted-foreground">Joined</div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Completed Tasks</h2>
          {completedTasks && completedTasks.length > 0 ? (
            <div className="space-y-4">
              {completedTasks.map((submission) => (
                <div
                  key={submission.id}
                  className="p-6 bg-gradient-card border border-border rounded-xl hover:shadow-medium transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {submission.tasks.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {submission.tasks.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="capitalize"
                        >
                          {submission.tasks.difficulty}
                        </Badge>
                        <span className="text-sm font-medium text-primary">
                          {submission.tasks.points} points
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTaskForShare(submission.tasks)}
                        className="mt-3 text-xs"
                      >
                        Share on LinkedIn
                      </Button>
                    </div>
                    {submission.tasks.github_link && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a
                          href={submission.tasks.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No completed tasks yet
            </div>
          )}
        </div>

        {/* LinkedIn Share Box */}
        {selectedTaskForShare && (
          <div className="mb-12">
            <LinkedInShareBox
              taskTitle={selectedTaskForShare.title}
              githubLink={selectedTaskForShare.github_link}
            />
          </div>
        )}

        {/* Share Profile Button */}
        <div className="flex justify-center">
          <Button
            onClick={copyProfileUrl}
            className="gap-2"
            size="lg"
          >
            <Copy className="w-4 h-4" />
            Share Profile
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
