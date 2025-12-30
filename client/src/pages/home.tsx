import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Vyaparify | All-in-One-Platform";
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Vyaparify All-in-One Platform</h1>
      </div>
    </div>
  );
}
