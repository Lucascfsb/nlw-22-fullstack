import type { Metadata } from "next";
import { AnalysisCardBadge } from "@/components/ui/analysis-card";
import {
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Roast Results | DevRoast",
  description: "Detailed roast results with score, analysis, and fixes.",
};

type RoastIssue = {
  id: string;
  variant: "critical" | "warning" | "good";
  title: string;
  description: string;
};

const roastCode = [
  "function calculateTotal(items) {",
  "  var total = 0;",
  "  for (var i = 0; i < items.length; i++) {",
  "    total = total + items[i].price;",
  "  }",
  "  return total;",
  "}",
  "// TODO: handle tax calculation",
  "// TODO: handle currency conversion",
].join("\n");

const roastIssues: RoastIssue[] = [
  {
    id: "issue-1",
    variant: "critical",
    title: "using var instead of const/let",
    description:
      "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
  },
  {
    id: "issue-2",
    variant: "warning",
    title: "imperative loop pattern",
    description:
      "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
  },
  {
    id: "issue-3",
    variant: "good",
    title: "clear naming conventions",
    description:
      "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
  },
  {
    id: "issue-4",
    variant: "good",
    title: "single responsibility",
    description:
      "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
  },
];

const diffLines = [
  { type: "context", text: "function calculateTotal(items) {" },
  { type: "removed", text: "  var total = 0;" },
  { type: "removed", text: "  for (var i = 0; i < items.length; i++) {" },
  { type: "removed", text: "    total = total + items[i].price;" },
  { type: "removed", text: "  }" },
  { type: "removed", text: "  return total;" },
  {
    type: "added",
    text: "  return items.reduce((sum, item) => sum + item.price, 0);",
  },
  { type: "context", text: "}" },
] as const;

type RoastPageProps = {
  params: {
    id: string;
  };
};

export default function RoastResultsPage({ params }: RoastPageProps) {
  const lineCount = roastCode.split("\n").length;

  return (
    <main className="min-h-screen bg-bg-page text-text-primary">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-20">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <ScoreRing score={3.5} />

          <div className="flex flex-1 flex-col gap-4">
            <AnalysisCardBadge variant="critical">
              verdict: needs_serious_help
            </AnalysisCardBadge>

            <p className="font-mono text-xl text-text-primary">
              "this code looks like it was written during a power outage... in
              2005."
            </p>

            <div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
              <span>lang: javascript</span>
              <span>·</span>
              <span>{lineCount} lines</span>
              <span className="hidden">{params.id}</span>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" variant="secondary">
                $ share_roast
              </Button>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-sm font-bold text-text-primary">
              your_submission
            </h2>
          </div>

          <CodeBlock code={roastCode} lang="javascript" />
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-sm font-bold text-text-primary">
              detailed_analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {roastIssues.map((issue) => (
              <AnalysisCardRoot key={issue.id}>
                <AnalysisCardBadge variant={issue.variant}>
                  {issue.variant}
                </AnalysisCardBadge>
                <AnalysisCardTitle>{issue.title}</AnalysisCardTitle>
                <AnalysisCardDescription>
                  {issue.description}
                </AnalysisCardDescription>
              </AnalysisCardRoot>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-sm font-bold text-text-primary">
              suggested_fix
            </h2>
          </div>

          <div className="border border-border-primary bg-bg-input">
            <div className="flex items-center gap-3 border-b border-border-primary px-4 py-3">
              <span className="font-mono text-xs text-text-secondary">
                your_code.ts → improved_code.ts
              </span>
            </div>
            <div className="flex flex-col">
              {diffLines.map((line) => (
                <DiffLine key={`${line.type}-${line.text}`} type={line.type}>
                  {line.text}
                </DiffLine>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
