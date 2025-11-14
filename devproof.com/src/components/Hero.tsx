import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContributorsCount } from "@/hooks/useLeaderboard";

export const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: contributorsCount } = useContributorsCount();
  const isFoundingMemberSpotAvailable = (contributorsCount || 0) < 100;

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="px-6 py-40 md:py-48">
      <div className="max-w-5xl mx-auto">
        {/* Status Badge */}
        {isFoundingMemberSpotAvailable && (
          <div className="flex justify-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              🚀 Pioneer Contributor · First 100 only · Permanent recognition
            </div>
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-center mb-16 leading-tight text-foreground">
          Real code.
          <br />
          Real experience.
        </h1>

        {/* Subheadline */}
        <p className="text-2xl md:text-3xl text-center text-muted-foreground mb-20 leading-relaxed max-w-3xl mx-auto">
          Build features for this platform. Ship to production.
          <br />
          Get hired.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4 mb-32">
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="rounded-full h-14 px-10 text-base shadow-cta bg-foreground text-background hover:bg-foreground/90"
          >
            {user ? "Go to Dashboard" : "Start building today"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Free for students · Requires .edu email
          </p>
        </div>

        {/* Visual Card - "Be the first" */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl shadow-card p-12">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Be the first
          </h2>
          
          <div className="space-y-6">
            {[
              "Pick a task",
              "Write code, submit PR",
              "Code goes live in 24hrs",
              "Add to LinkedIn"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
