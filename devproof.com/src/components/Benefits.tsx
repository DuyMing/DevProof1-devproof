export const Benefits = () => {
  const benefits = [
    {
      emoji: "💻",
      title: "Production code",
      description: "Not another todo app. Work on features used by real students every day.",
    },
    {
      emoji: "✓",
      title: "Proof that matters",
      description: "Companies see your work. Your GitHub shows real contributions. No more empty portfolios.",
    },
    {
      emoji: "🚀",
      title: "Get hired faster",
      description: "Real experience beats class projects. Every time. In every interview.",
    },
  ];

  return (
    <section className="px-6 py-28 md:py-32 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-6">{benefit.emoji}</div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-xl leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
