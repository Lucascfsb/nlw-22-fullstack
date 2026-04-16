"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const initialCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

type HeroSectionClientProps = {
  metricsSlot?: ReactNode;
};

function HeroSectionClient({ metricsSlot }: HeroSectionClientProps) {
  const [code, setCode] = useState(initialCode);
  const maxCodeLength = 2000;
  const isDisabled = code.trim().length === 0 || code.length > maxCodeLength;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-3xl font-bold text-accent-green">
            $
          </span>
          <h1 className="font-mono text-3xl font-bold">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-mono text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it — brutally honest or full roast mode"
          }
        </p>
      </div>

      <CodeEditor value={code} onChange={setCode} maxLength={maxCodeLength} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Toggle defaultChecked label="roast mode" />
            <span className="font-mono text-xs text-text-tertiary">
              {"// maximum sarcasm enabled"}
            </span>
          </div>
          <Button variant="primary" disabled={isDisabled}>
            $ roast_my_code
          </Button>
        </div>

        {metricsSlot}
      </div>
    </section>
  );
}

export { HeroSectionClient };
