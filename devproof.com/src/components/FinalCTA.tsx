import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="px-6 py-28 md:py-32 bg-foreground text-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-semibold mb-8">
          Build work that matters
        </h2>
        <p className="text-2xl md:text-3xl mb-16 text-background/70">
          Build your future.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button 
            size="lg" 
            className="rounded-full h-14 px-10 text-base shadow-cta bg-background text-foreground hover:bg-background/90"
          >
            Start building today
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-background/70">
            Free · For students · By Students
          </p>
        </div>
      </div>
    </section>
  );
};
