import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms of Service – Simplified</DialogTitle>
          <DialogDescription>
            <em>Last updated: November 13, 2025</em>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <p className="text-foreground">Welcome to DevProof.</p>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">1. Ownership</h3>
              <p className="text-muted-foreground">
                DevProof is created and maintained by Aditya Upadhyay. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">2. Contributions</h3>
              <p className="text-muted-foreground mb-2">By contributing code or content:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>You grant DevProof the right to use, display, and modify your contributions.</li>
                <li>You retain credit for your work.</li>
                <li>You do <strong>not</strong> gain ownership, employment, or partnership status.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">3. Contributor Credit</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Your GitHub username or name will be publicly credited on the Contributors page.</li>
                <li>You're welcome to showcase your contributions in your portfolio or LinkedIn.</li>
                <li>Appropriate credit: "Open Source Contributor to DevProof"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">4. No Warranties</h3>
              <p className="text-muted-foreground">
                This is an open-source student platform run by volunteers. There are no guarantees 
                regarding availability, performance, or support. Use at your own discretion.
              </p>
            </div>

            <hr className="my-4 border-border" />

            <p className="text-muted-foreground">
              <strong>Questions or feedback?</strong>
              <br />
              Contact Aditya Upadhyay:{" "}
              <a 
                href="mailto:upadhyayaditya19@gmail.com"
                className="text-primary hover:underline"
              >
                upadhyayaditya19@gmail.com
              </a>
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
