import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Vyaparify Blank Home Page</h1>
        <p className="text-muted-foreground mb-8">This is a placeholder for the new homepage.</p>
        <a href="/retail-local-shops">
          <Button>Go to Retail & Local Shops</Button>
        </a>
      </div>
    </div>
  );
}