import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LinkedInShareBox } from "@/components/LinkedInShareBox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const difficultyColors = {
  easy: "bg-green-500/10 text-green-400 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function Me() {
  const { user, loading } = useAuth();
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<any>(null);

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user?.id)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as { username: string } | null;
    },
    enabled: !!user,
  });

  // Fetch claimed tasks
  const { data: claimedTasks = [] } = useQuery({
    queryKey: ["claimed-tasks", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("assigned_to", user?.id)
        .eq("status", "claimed");

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch completed tasks (approved submissions)
  const { data: completedSubmissions = [] } = useQuery({
    queryKey: ["completed-submissions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*, tasks(*)")
        .eq("user_id", user?.id)
        .eq("status", "approved");

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">My Contributions</h1>
          <p className="text-xl text-muted-foreground">
            Your tasks, progress, and public profile.
          </p>
        </div>

        {/* Claimed Tasks */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Claimed Tasks</h2>
          {claimedTasks.length === 0 ? (
            <p className="text-muted-foreground">No claimed tasks yet. Visit the Tasks page to claim one!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {claimedTasks.map((task) => (
                <Card key={task.id} className="border-border/50 hover:border-border transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className={difficultyColors[task.difficulty as keyof typeof difficultyColors]}>
                        {task.difficulty}
                      </Badge>
                      <Badge variant="outline">Claimed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{task.points} points</span>
                      {task.github_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={task.github_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Completed Tasks */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Completed Tasks</h2>
          {completedSubmissions.length === 0 ? (
            <p className="text-muted-foreground">No completed tasks yet. Keep working on your claimed tasks!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedSubmissions.map((submission) => (
                <Card key={submission.id} className="border-border/50 hover:border-border transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{submission.tasks.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className={difficultyColors[submission.tasks.difficulty as keyof typeof difficultyColors]}>
                        {submission.tasks.difficulty}
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{submission.tasks.points} points earned</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTaskForShare(submission.tasks)}
                        className="w-full"
                      >
                        Share on LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* LinkedIn Share Box */}
        {selectedTaskForShare && (
          <section className="mb-20">
            <LinkedInShareBox
              taskTitle={selectedTaskForShare.title}
              githubLink={selectedTaskForShare.github_link}
            />
          </section>
        )}

        {/* Public Profile Link */}
        <section className="mb-20">
          <Card className="border-border/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your public profile:</p>
                <code className="text-sm">devproof.com/u/{profile?.username || "loading"}</code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(`devproof.com/u/${profile?.username || ""}`)}
                disabled={!profile?.username}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
