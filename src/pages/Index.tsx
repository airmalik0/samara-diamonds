const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border">
        <span className="text-lg font-semibold tracking-tight">Brand</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">Your headline goes here</h1>
        <p className="mt-4 text-muted-foreground max-w-lg">A short description of what this product does and why it matters.</p>
        <div className="mt-8 flex gap-3">
          <button className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
            Primary action
          </button>
          <button className="px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors active:scale-[0.97]">
            Secondary
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 md:py-24 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight text-center">Features</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border p-6">
                <div className="h-10 w-10 rounded-md bg-muted mb-4" />
                <h3 className="font-medium">Feature {i}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Brief explanation of this feature and its benefit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-6 py-20 md:py-24 bg-muted/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-4 text-muted-foreground">A paragraph about your product, team, or mission. Replace with real content.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-8 py-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 Brand. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
