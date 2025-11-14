import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskDifficulty = "easy" | "medium" | "hard";
type TaskStatus = "available" | "claimed" | "completed";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim: (taskId: string) => void;
  isClaimDisabled: boolean;
  isClaimed: boolean;
  currentUserId?: string;
}

export const TaskDetailModal = ({
  task,
  open,
  onOpenChange,
  onClaim,
  isClaimDisabled,
  isClaimed,
  currentUserId,
}: TaskDetailModalProps) => {
  if (!task) return null;

  const getDifficultyColor = (difficulty: TaskDifficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "available":
        return "bg-primary/10 text-primary border-primary/20";
      case "claimed":
        return "bg-muted text-muted-foreground border-border";
      case "completed":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      default:
        return "";
    }
  };

  const isClaimedByCurrentUser = task.assigned_to === currentUserId;
  const isClaimedByOther = task.assigned_to && !isClaimedByCurrentUser;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{task.title}</DialogTitle>
            <div className="flex gap-2 shrink-0">
              <Badge className={getDifficultyColor(task.difficulty as TaskDifficulty)}>
                {task.difficulty}
              </Badge>
              <Badge className={getStatusColor(task.status as TaskStatus)}>
                {task.status}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {task.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              <span className="text-primary">{task.points} points</span>
            </div>
            {task.github_link && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={task.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="flex justify-end">
            {isClaimedByCurrentUser ? (
              <Button disabled variant="secondary" className="w-full sm:w-auto">
                Claimed by You
              </Button>
            ) : isClaimedByOther ? (
              <Button disabled variant="outline" className="w-full sm:w-auto">
                Claimed by Another User
              </Button>
            ) : (
              <Button
                onClick={() => onClaim(task.id)}
                disabled={isClaimDisabled}
                className="w-full sm:w-auto"
              >
                {isClaimed ? "Claimed" : "Claim Task"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
