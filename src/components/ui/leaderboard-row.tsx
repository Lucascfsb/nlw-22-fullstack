import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const leaderboardRow = tv({
  base: [
    "flex items-center gap-6 px-5 py-4 w-full font-mono",
    "border-b border-border-primary",
  ],
});

const leaderboardRowRank = tv({
  base: "w-10 text-[13px] text-text-tertiary",
});

const leaderboardRowScore = tv({
  base: "w-[60px] text-[13px] font-bold",
});

const leaderboardRowCode = tv({
  base: "flex-1 text-xs text-text-secondary truncate",
});

const leaderboardRowLanguage = tv({
  base: "w-[100px] text-xs text-text-tertiary text-right",
});

type LeaderboardRowRootProps = ComponentProps<"div">;

function LeaderboardRowRoot({ className, ...props }: LeaderboardRowRootProps) {
  return <div className={leaderboardRow({ className })} {...props} />;
}

type LeaderboardRowRankProps = ComponentProps<"span">;

function LeaderboardRowRank({ className, ...props }: LeaderboardRowRankProps) {
  return <span className={leaderboardRowRank({ className })} {...props} />;
}

function scoreColor(score: number): string {
  if (score <= 3) return "text-accent-red";
  if (score <= 6) return "text-accent-amber";
  return "text-accent-green";
}

type LeaderboardRowScoreProps = ComponentProps<"span"> & {
  value: number;
};

function LeaderboardRowScore({
  value,
  className,
  ...props
}: LeaderboardRowScoreProps) {
  const scoreClassName = twMerge(scoreColor(value), className);

  return (
    <span
      className={leaderboardRowScore({ className: scoreClassName })}
      {...props}
    >
      {value.toFixed(1)}
    </span>
  );
}

type LeaderboardRowCodeProps = ComponentProps<"span">;

function LeaderboardRowCode({ className, ...props }: LeaderboardRowCodeProps) {
  return <span className={leaderboardRowCode({ className })} {...props} />;
}

type LeaderboardRowLanguageProps = ComponentProps<"span">;

function LeaderboardRowLanguage({
  className,
  ...props
}: LeaderboardRowLanguageProps) {
  return <span className={leaderboardRowLanguage({ className })} {...props} />;
}

export {
  LeaderboardRowCode,
  type LeaderboardRowCodeProps,
  LeaderboardRowLanguage,
  type LeaderboardRowLanguageProps,
  LeaderboardRowRank,
  type LeaderboardRowRankProps,
  LeaderboardRowRoot,
  type LeaderboardRowRootProps,
  LeaderboardRowScore,
  type LeaderboardRowScoreProps,
  leaderboardRow,
  leaderboardRowCode,
  leaderboardRowLanguage,
  leaderboardRowRank,
  leaderboardRowScore,
};
