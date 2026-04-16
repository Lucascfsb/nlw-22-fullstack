import { Suspense } from "react";
import { Metrics } from "@/components/home/metrics";
import { MetricsSkeleton } from "@/components/home/metrics-skeleton";
import { HeroSectionClient } from "./hero-section-client";

function HeroSection() {
  return (
    <HeroSectionClient
      metricsSlot={
        <Suspense fallback={<MetricsSkeleton />}>
          <Metrics />
        </Suspense>
      }
    />
  );
}

export { HeroSection };
