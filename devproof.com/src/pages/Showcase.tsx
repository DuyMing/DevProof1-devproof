import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Showcase = () => {
  const experimentalProjects = [
    {
      title: "Typing Speed Test",
      description: "A fun mini-project that teaches timers, UI state management, and interaction logic.",
      status: "Coming Soon"
    },
    {
      title: "CSS Art Gallery",
      description: "A gallery for contributors to showcase pure CSS artwork and animations.",
      status: "Coming Soon"
    },
    {
      title: "Code Snippet Vault",
      description: "A searchable library of reusable code patterns built by the community.",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <Sparkles className="w-10 h-10" />
                Experimental Projects Showcase
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                Creative mini-projects built by DevProof contributors.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A space for fun ideas, experiments, and student-driven tools.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-muted-foreground mb-4">
                This section highlights experimental builds created by contributors.
                Some are learning projects, some are internal tools, and some are just fun ideas — all verified and linked to real code.
              </p>
              <p className="text-muted-foreground">
                New experimental projects will appear here automatically when contributors complete Showcase tasks.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {experimentalProjects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🔹 {project.title}
                      <span className="text-sm font-normal text-muted-foreground">({project.status})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-muted-foreground">
                This section will grow as contributors build new creative features for DevProof.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Showcase;
