import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Task = Database['public']['Tables']['tasks']['Row'];

type TaskDifficulty = "easy" | "medium" | "hard";
type TaskStatus = "available" | "claimed" | "completed";

const TasksPage = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<TaskDifficulty | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const claimTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (!user) throw new Error("You must be logged in to claim a task");
      
      const { error } = await supabase
        .from("tasks")
        .update({ 
          assigned_to: user.id,
          status: "claimed"
        })
        .eq("id", taskId)
        .is("assigned_to", null);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Task claimed!",
        description: "You've successfully claimed this task.",
      });
      setModalOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to claim task",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredTasks = tasks?.filter((task) => {
    const matchesDifficulty = difficultyFilter === "all" || task.difficulty === difficultyFilter;
    
    let matchesStatus = true;
    if (statusFilter === "available") {
      matchesStatus = !task.assigned_to;
    } else if (statusFilter === "claimed") {
      matchesStatus = task.assigned_to === user?.id;
    } else if (statusFilter === "completed") {
      matchesStatus = task.status === "completed";
    }
    
    return matchesDifficulty && matchesStatus;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleClaimTask = (taskId: string) => {
    claimTaskMutation.mutate(taskId);
  };

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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6">Available Tasks</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a task, submit your PR, and level up your developer profile
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
            <TabsTrigger value="all" onClick={() => setDifficultyFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="easy" onClick={() => setDifficultyFilter("easy")}>
              Easy
            </TabsTrigger>
            <TabsTrigger value="medium" onClick={() => setDifficultyFilter("medium")}>
              Medium
            </TabsTrigger>
            <TabsTrigger value="hard" onClick={() => setDifficultyFilter("hard")}>
              Hard
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3 justify-center mb-12">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              All Status
            </Button>
            <Button
              variant={statusFilter === "available" ? "default" : "outline"}
              onClick={() => setStatusFilter("available")}
              size="sm"
            >
              Available
            </Button>
            <Button
              variant={statusFilter === "claimed" ? "default" : "outline"}
              onClick={() => setStatusFilter("claimed")}
              size="sm"
            >
              Claimed
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              onClick={() => setStatusFilter("completed")}
              size="sm"
            >
              Completed
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Loading tasks...</p>
              </div>
            ) : filteredTasks && filteredTasks.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredTasks.map((task) => {
                  const isClaimedByCurrentUser = task.assigned_to === user?.id;
                  const isClaimedByOther = task.assigned_to && !isClaimedByCurrentUser;
                  
                  return (
                    <Card 
                      key={task.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleTaskClick(task)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <CardTitle className="text-xl">{task.title}</CardTitle>
                          <div className="flex gap-2 shrink-0">
                            <Badge className={getDifficultyColor(task.difficulty as TaskDifficulty)}>
                              {task.difficulty}
                            </Badge>
                            <Badge className={getStatusColor(task.status as TaskStatus)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {task.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-sm font-medium">
                            <span className="text-primary">{task.points} points</span>
                          </div>
                          <Button
                            variant={isClaimedByCurrentUser ? "secondary" : "default"}
                            size="sm"
                            disabled={isClaimedByOther || isClaimedByCurrentUser || !user}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isClaimedByCurrentUser && !isClaimedByOther) {
                                handleClaimTask(task.id);
                              }
                            }}
                          >
                            {isClaimedByCurrentUser 
                              ? "Claimed" 
                              : isClaimedByOther 
                              ? "Unavailable" 
                              : "Claim Task"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No tasks found matching your filters.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <TaskDetailModal
        task={selectedTask}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onClaim={handleClaimTask}
        isClaimDisabled={claimTaskMutation.isPending || !user}
        isClaimed={selectedTask?.assigned_to === user?.id}
        currentUserId={user?.id}
      />

      <Footer />
    </div>
  );
};

export default TasksPage;
