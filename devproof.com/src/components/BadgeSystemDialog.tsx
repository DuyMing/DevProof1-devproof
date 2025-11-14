import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BadgeSystemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BadgeSystemDialog = ({ open, onOpenChange }: BadgeSystemDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">The Progression (Badge System)</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4">
          <h3 className="text-center text-lg font-semibold text-muted-foreground">
            YOUR PATH TO RECOGNITION
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟢</span>
                <h4 className="text-lg font-semibold text-foreground">ACTIVE (1 merged PR)</h4>
              </div>
              <p className="text-muted-foreground pl-9">
                Your first contribution ships to production
              </p>
            </div>

            <div className="text-center text-2xl text-muted-foreground">↓</div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔵</span>
                <h4 className="text-lg font-semibold text-foreground">CONTRIBUTOR (3 merged PRs)</h4>
              </div>
              <div className="text-muted-foreground pl-9 space-y-1">
                <p>Add to LinkedIn: "Open Source Contributor - DevProof"</p>
                <p className="text-sm">Unlock: Public profile with verified work</p>
              </div>
            </div>

            <div className="text-center text-2xl text-muted-foreground">↓</div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟣</span>
                <h4 className="text-lg font-semibold text-foreground">BUILDER (10 merged PRs)</h4>
              </div>
              <div className="text-muted-foreground pl-9 space-y-1">
                <p>Add to LinkedIn: "Software Developer - DevProof"</p>
                <p className="text-sm">Unlock: Featured in monthly newsletter</p>
              </div>
            </div>

            <div className="text-center text-2xl text-muted-foreground">↓</div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <h4 className="text-lg font-semibold text-foreground">CORE TEAM (25+ merged PRs)</h4>
              </div>
              <div className="text-muted-foreground pl-9 space-y-1">
                <p>Add to LinkedIn: "Core Team Member - DevProof"</p>
                <p className="text-sm">Unlock: Personal recommendation from founder</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
