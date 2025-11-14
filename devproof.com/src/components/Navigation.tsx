import { Code, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BadgeSystemDialog } from "@/components/BadgeSystemDialog";
import { useState } from "react";
import { NavLink } from "@/components/NavLink";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6" />
            <span className="font-semibold text-lg">DevProof</span>
          </div>
          <div className="flex items-center gap-6">
            <NavLink 
              to="/showcase" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Showcase
            </NavLink>
            <NavLink 
              to="/tasks" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Tasks
            </NavLink>
            <NavLink 
              to="/me" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              My Contributions
            </NavLink>
            <button 
              onClick={() => setBadgeDialogOpen(true)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Progression
            </button>
            <NavLink 
              to="/leaderboard" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Leaderboard
            </NavLink>
            {user ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
      <BadgeSystemDialog open={badgeDialogOpen} onOpenChange={setBadgeDialogOpen} />
    </nav>
  );
};
