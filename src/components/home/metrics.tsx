import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { MetricsClient } from "./metrics-client";

async function Metrics() {
  prefetch(trpc.roast.getStats.queryOptions());

  return (
    <HydrateClient>
      <MetricsClient />
    </HydrateClient>
  );
}

export { Metrics };
