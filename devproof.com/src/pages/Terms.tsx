import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            Terms of Service – Simplified
          </h1>
          <p className="text-muted-foreground mb-12">
            <em>Last updated: November 13, 2025</em>
          </p>

          <p className="text-lg mb-8">Welcome to DevProof.</p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            1. Ownership
          </h2>
          <p className="text-muted-foreground mb-6">
            DevProof is created and maintained by Aditya Upadhyay. All rights reserved.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            2. Contributions
          </h2>
          <p className="text-muted-foreground mb-2">By contributing code or content:</p>
          <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
            <li>You grant DevProof the right to use, display, and modify your contributions.</li>
            <li>You retain credit for your work.</li>
            <li>You do <strong>not</strong> gain ownership, employment, or partnership status.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            3. Contributor Credit
          </h2>
          <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
            <li>Your GitHub username or name will be publicly credited on the Contributors page.</li>
            <li>You're welcome to showcase your contributions in your portfolio or LinkedIn.</li>
            <li>Appropriate credit: "Open Source Contributor to DevProof"</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            4. No Warranties
          </h2>
          <p className="text-muted-foreground mb-12">
            This is an open-source student platform run by volunteers. There are no guarantees 
            regarding availability, performance, or support. Use at your own discretion.
          </p>

          <hr className="my-12 border-border" />

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
        </article>
      </div>
    </div>
  );
};

export default Terms;
