import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const analysisCard = tv({
  base: ["flex flex-col gap-3 p-5", "border border-border-primary"],
});

const analysisCardBadge = tv({
  base: "inline-flex items-center gap-2 font-mono text-xs",
  variants: {
    variant: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
    },
  },
  defaultVariants: {
    variant: "critical",
  },
});

const analysisCardBadgeDot = tv({
  base: "inline-flex h-2 w-2 rounded-full",
  variants: {
    variant: {
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-accent-green",
    },
  },
  defaultVariants: {
    variant: "critical",
  },
});

type AnalysisCardRootProps = ComponentProps<"div">;
type AnalysisCardBadgeVariants = VariantProps<typeof analysisCardBadge>;
type AnalysisCardBadgeProps = ComponentProps<"span"> &
  AnalysisCardBadgeVariants;

function AnalysisCardRoot({ className, ...props }: AnalysisCardRootProps) {
  return <div className={analysisCard({ className })} {...props} />;
}

function AnalysisCardBadge({
  variant,
  className,
  children,
  ...props
}: AnalysisCardBadgeProps) {
  return (
    <span className={analysisCardBadge({ variant, className })} {...props}>
      <span className={analysisCardBadgeDot({ variant })} aria-hidden="true" />
      {children}
    </span>
  );
}

type AnalysisCardTitleProps = ComponentProps<"p">;

function AnalysisCardTitle({ className, ...props }: AnalysisCardTitleProps) {
  return (
    <p
      className={tv({
        base: "font-mono text-[13px] text-text-primary",
      })({ className })}
      {...props}
    />
  );
}

type AnalysisCardDescriptionProps = ComponentProps<"p">;

function AnalysisCardDescription({
  className,
  ...props
}: AnalysisCardDescriptionProps) {
  return (
    <p
      className={tv({
        base: "text-xs leading-relaxed text-text-secondary",
      })({ className })}
      {...props}
    />
  );
}

export {
  AnalysisCardBadge,
  type AnalysisCardBadgeProps,
  type AnalysisCardBadgeVariants,
  AnalysisCardDescription,
  type AnalysisCardDescriptionProps,
  AnalysisCardRoot,
  type AnalysisCardRootProps,
  AnalysisCardTitle,
  type AnalysisCardTitleProps,
  analysisCard,
  analysisCardBadge,
};
