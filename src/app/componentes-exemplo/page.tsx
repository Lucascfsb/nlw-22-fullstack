import {
  AnalysisCardBadge,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import {
  LeaderboardRowCode,
  LeaderboardRowLanguage,
  LeaderboardRowRank,
  LeaderboardRowRoot,
  LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

export default function ComponentesExemploPage() {
  return (
    <main className="min-h-screen bg-bg-page px-8 py-10 text-text-primary">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="font-mono text-2xl font-bold">Component Library</h1>
          <p className="text-sm text-text-secondary">
            UI components replicating the Pencil Component Library patterns.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Buttons
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">$ roast_my_code</Button>
            <Button variant="secondary">$ share_roast</Button>
            <Button variant="ghost">$ view_all &gt;&gt;</Button>
            <Button variant="danger">$ delete_roast</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">$ size_sm</Button>
            <Button size="md">$ size_md</Button>
            <Button size="lg">$ size_lg</Button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Toggle
          </span>
          <div className="flex flex-wrap items-center gap-8">
            <Toggle defaultChecked label="roast mode" />
            <Toggle label="roast mode" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Badge Status
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <Badge variant="critical">critical</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="good">good</Badge>
            <Badge variant="verdict">needs_serious_help</Badge>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Analysis Card
          </span>
          <AnalysisCardRoot className="max-w-md">
            <AnalysisCardBadge variant="critical">critical</AnalysisCardBadge>
            <AnalysisCardTitle>
              using var instead of const/let
            </AnalysisCardTitle>
            <AnalysisCardDescription>
              the var keyword is function-scoped rather than block-scoped, which
              can lead to unexpected behavior and bugs. modern javascript uses
              const for immutable bindings and let for mutable ones.
            </AnalysisCardDescription>
          </AnalysisCardRoot>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Code Block
          </span>
          <CodeBlock
            code={
              "function calculateTotal(items) {\n  var total = 0;\n  for (var i = 0; ...) {\n    total = total + items[i].price;\n  }\n}"
            }
            lang="javascript"
            filename="calculate.js"
            className="max-w-xl"
          />
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Diff Line
          </span>
          <div className="flex w-full max-w-xl flex-col">
            <DiffLine type="removed">var total = 0;</DiffLine>
            <DiffLine type="added">const total = 0;</DiffLine>
            <DiffLine type="context">
              for (let i = 0; i &lt; items.length; i++) {"{"}
            </DiffLine>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Leaderboard Row
          </span>
          <LeaderboardRowRoot className="max-w-4xl">
            <div className="flex w-10">
              <LeaderboardRowRank>#1</LeaderboardRowRank>
            </div>
            <div className="flex w-14">
              <LeaderboardRowScore value={2.1} />
            </div>
            <div className="flex flex-1">
              <LeaderboardRowCode>
                function calculateTotal(items) {"{"} var total = 0; ...
              </LeaderboardRowCode>
            </div>
            <div className="flex w-24 justify-end">
              <LeaderboardRowLanguage>javascript</LeaderboardRowLanguage>
            </div>
          </LeaderboardRowRoot>
        </section>

        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs font-bold text-text-tertiary">
            Score Ring
          </span>
          <ScoreRing score={3.5} total={10} />
        </section>
      </div>
    </main>
  );
}
