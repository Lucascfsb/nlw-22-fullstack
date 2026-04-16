function MetricsSkeleton() {
  return (
    <div className="flex items-center justify-center gap-4 text-xs text-text-tertiary">
      <span className="h-4 w-24 animate-pulse rounded-full bg-bg-surface" />
      <span className="font-mono">·</span>
      <span className="h-4 w-20 animate-pulse rounded-full bg-bg-surface" />
    </div>
  );
}

export { MetricsSkeleton };
