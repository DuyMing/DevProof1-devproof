import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface LinkedInShareBoxProps {
  taskTitle: string;
  githubLink?: string;
}

export const LinkedInShareBox = ({ taskTitle, githubLink }: LinkedInShareBoxProps) => {
  const [copied, setCopied] = useState(false);

  const shareMessage = `I just shipped a contribution to DevProof — a student-built platform where CS students improve real production features.

✔ Task: ${taskTitle}
🔗 Code: ${githubLink || "Link coming soon"}

Every contribution strengthens my public portfolio and shows employers real, verifiable experience.`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="border-border/50 shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Share on LinkedIn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={shareMessage}
          readOnly
          className="min-h-[140px] resize-none font-mono text-sm"
        />
        <Button
          onClick={handleCopy}
          className="w-full gap-2"
          variant={copied ? "secondary" : "default"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
