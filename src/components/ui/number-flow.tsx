"use client";

import NumberFlow, { type NumberFlowProps } from "@number-flow/react";

type NumberFlowValueProps = {
  value: number;
  format?: NumberFlowProps["format"];
  suffix?: NumberFlowProps["suffix"];
  className?: string;
};

function NumberFlowValue({
  value,
  format,
  suffix,
  className,
}: NumberFlowValueProps) {
  return (
    <NumberFlow
      value={value}
      format={format}
      suffix={suffix}
      className={className}
    />
  );
}

export { NumberFlowValue };
