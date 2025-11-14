export const HowItWorks = () => {
  return (
    <section className="px-6 py-28 md:py-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-semibold text-center mb-28">
          How it works
        </h2>

        {/* Step 1: Pick a task */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="text-primary text-xl font-semibold mb-6">Step 1</div>
            <h3 className="text-4xl font-semibold mb-8">Pick a task</h3>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Choose from real features that need to be built. Start with easy tasks, work your way up to complex features.
            </p>
          </div>
          <div className="space-y-5">
            {[
              { title: "Add dark mode toggle", difficulty: "Easy", color: "bg-green-500" },
              { title: "Build user profile page", difficulty: "Medium", color: "bg-blue-500" },
              { title: "Create notification system", difficulty: "Medium", color: "bg-blue-500" },
            ].map((task, index) => (
              <div key={index} className="bg-card border border-border rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${task.color}`} />
                    <span className="text-lg font-medium">{task.title}</span>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {task.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Build it */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <div className="bg-foreground text-background rounded-3xl p-8 font-mono text-sm">
              <div className="space-y-2">
                <div><span className="text-green-400">$</span> git checkout -b feature/dark-mode</div>
                <div><span className="text-green-400">$</span> npm run dev</div>
                <div className="text-muted-foreground"># Write your code...</div>
                <div><span className="text-green-400">$</span> git add .</div>
                <div><span className="text-green-400">$</span> git commit -m <span className="text-yellow-400">"Add dark mode"</span></div>
                <div><span className="text-green-400">$</span> git push origin feature/dark-mode</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-primary text-xl font-semibold mb-6">Step 2</div>
            <h3 className="text-4xl font-semibold mb-8">Build it</h3>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Write clean code, submit a PR. Our team reviews and helps you improve. Learn from experienced developers.
            </p>
          </div>
        </div>

        {/* Step 3: Watch it go live */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-primary text-xl font-semibold mb-6">Step 3</div>
            <h3 className="text-4xl font-semibold mb-8">Watch it go live</h3>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Your code ships to production within 24 hours. Add it to your profile, share it on LinkedIn, show it to recruiters.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-muted" />
              <div>
                <h4 className="text-xl font-semibold">Your Profile</h4>
                <p className="text-sm text-muted-foreground">Student Developer</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Completed Features</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Dark mode toggle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>User profile page</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Notification system</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-primary">Used by 500+ students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
