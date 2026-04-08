import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LeaderboardRowCode,
  LeaderboardRowLanguage,
  LeaderboardRowRank,
  LeaderboardRowRoot,
  LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";

const leaderboardEntries = [
  {
    rank: "#1",
    score: 2.1,
    code: "function calculateTotal(items) { var total = 0; ...",
    language: "javascript",
  },
  {
    rank: "#2",
    score: 3.4,
    code: "let sum = 0; for (let i = 0; i < cart.length; i++) { ...",
    language: "typescript",
  },
  {
    rank: "#3",
    score: 4.2,
    code: "const data = fetchData().then((res) => res.json());",
    language: "python",
  },
];

function LeaderboardPreview() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-accent-green">
            {"//"}
          </span>
          <h2 className="font-mono text-sm font-bold text-text-primary">
            shame_leaderboard
          </h2>
        </div>
        <Link href="/leaderboard">
          <Button variant="ghost" size="sm">
            $ view_all &gt;&gt;
          </Button>
        </Link>
      </div>

      <p className="font-mono text-sm text-text-tertiary">
        {"// the worst code on the internet, ranked by shame"}
      </p>

      <div className="flex flex-col overflow-hidden border border-border-primary">
        <div className="flex items-center gap-6 border-b border-border-primary bg-bg-surface px-5 py-2 text-xs text-text-tertiary">
          <span className="w-10 font-mono">rank</span>
          <span className="w-[60px] font-mono">score</span>
          <span className="flex-1 font-mono">code</span>
          <span className="w-[100px] text-right font-mono">lang</span>
        </div>
        {leaderboardEntries.map((entry) => (
          <LeaderboardRowRoot key={entry.rank}>
            <LeaderboardRowRank>{entry.rank}</LeaderboardRowRank>
            <LeaderboardRowScore value={entry.score} />
            <LeaderboardRowCode>{entry.code}</LeaderboardRowCode>
            <LeaderboardRowLanguage>{entry.language}</LeaderboardRowLanguage>
          </LeaderboardRowRoot>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 font-mono text-xs text-text-tertiary">
        <span>showing top 3 of 2,847</span>
        <span>·</span>
        <Link
          className="transition-colors hover:text-text-primary"
          href="/leaderboard"
        >
          view full leaderboard &gt;&gt;
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="warning">warning</Badge>
        <Badge variant="critical">critical</Badge>
        <Badge variant="good">good</Badge>
      </div>
    </section>
  );
}

export { LeaderboardPreview };
