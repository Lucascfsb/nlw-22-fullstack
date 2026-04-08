import { HeroSection } from "@/components/home/hero-section";
import { LeaderboardPreview } from "@/components/home/leaderboard-preview";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-page text-text-primary">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <HeroSection />
        <LeaderboardPreview />
      </div>
    </main>
  );
}
