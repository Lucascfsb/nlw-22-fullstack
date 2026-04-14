import type { Metadata } from "next";
import type { BundledLanguage } from "shiki";
import { CodeBlock } from "@/components/ui/code-block";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shame Leaderboard | DevRoast",
  description: "The most roasted code on the internet, ranked by shame.",
};

type LeaderboardEntry = {
  rank: number;
  score: number;
  language: BundledLanguage;
  code: string;
};

const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    score: 1.2,
    language: "javascript",
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ].join("\n"),
  },
  {
    rank: 2,
    score: 2.6,
    language: "typescript",
    code: [
      "function chargeCard(amount: any) {",
      "  return fetch('/charge', { method: 'POST', body: amount });",
      "}",
    ].join("\n"),
  },
  {
    rank: 3,
    score: 3.9,
    language: "sql",
    code: [
      "SELECT * FROM users WHERE email = '<input>'",
      "-- sanitize later",
    ].join("\n"),
  },
  {
    rank: 4,
    score: 4.4,
    language: "java",
    code: [
      'String query = "SELECT * FROM logs";',
      "System.out.println(query + userInput);",
      "// debugging in prod",
    ].join("\n"),
  },
  {
    rank: 5,
    score: 5.7,
    language: "python",
    code: [
      "def parse(payload):",
      "    return eval(payload)",
      "# what could go wrong",
    ].join("\n"),
  },
];

function scoreColor(score: number) {
  if (score <= 3) return "text-accent-red";
  if (score <= 6) return "text-accent-amber";
  return "text-accent-green";
}

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-bg-page text-text-primary">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-20">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-bold text-accent-green">
              {">"}
            </span>
            <h1 className="font-mono text-3xl font-bold">shame_leaderboard</h1>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            {"// the most roasted code on the internet"}
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
            <span>2,847 submissions</span>
            <span>·</span>
            <span>avg score: 4.2/10</span>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          {leaderboardEntries.map((entry) => {
            const lines = entry.code.split("\n").length;

            return (
              <div
                key={`entry-${entry.rank.toString()}`}
                className="border border-border-primary"
              >
                <div className="flex items-center justify-between gap-6 border-b border-border-primary px-5 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] text-text-tertiary">
                        #
                      </span>
                      <span className="font-mono text-[13px] font-bold text-accent-amber">
                        {entry.rank}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-text-tertiary">
                        score:
                      </span>
                      <span
                        className={[
                          "font-mono text-[13px] font-bold",
                          scoreColor(entry.score),
                        ].join(" ")}
                      >
                        {entry.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-secondary">
                      {entry.language}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">
                      {lines} lines
                    </span>
                  </div>
                </div>
                <CodeBlock
                  code={entry.code}
                  lang={entry.language}
                  className="border-0"
                />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
