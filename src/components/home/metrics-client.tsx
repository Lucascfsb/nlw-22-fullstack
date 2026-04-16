"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NumberFlowValue } from "@/components/ui/number-flow";
import { useTRPC } from "@/trpc/client";

function MetricsClient() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.roast.getStats.queryOptions());
  const totalRoasts = data.totalRoasts ?? 0;
  const avgScore = Math.round(data.avgScore * 10) / 10;
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayAvg, setDisplayAvg] = useState(0);

  useEffect(() => {
    setDisplayTotal(totalRoasts);
    setDisplayAvg(avgScore);
  }, [totalRoasts, avgScore]);

  return (
    <div className="flex items-center justify-center gap-4 text-xs text-text-tertiary">
      <span className="font-mono">
        <NumberFlowValue
          value={displayTotal}
          format={{ notation: "compact" }}
          className="tabular-nums"
        />{" "}
        codes roasted
      </span>
      <span className="font-mono">·</span>
      <span className="font-mono">
        avg score:{" "}
        <NumberFlowValue
          value={displayAvg}
          format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          suffix="/10"
          className="tabular-nums"
        />
      </span>
    </div>
  );
}

export { MetricsClient };
