import * as React from "react"
import { cn } from "@/lib/utils"

type Tone = "success" | "caution" | "error" | "neutral" | "info"

const TONES: Record<Tone, string> = {
  success: "bg-success-bg text-success",
  caution: "bg-caution-bg text-caution",
  error: "bg-destructive-bg text-destructive",
  neutral: "bg-neutral-bg text-neutral",
  info: "bg-info-bg text-info",
}

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[16px] px-3 py-0.5 text-xs font-medium leading-[1.4] whitespace-nowrap",
        TONES[tone],
        className
      )}
      {...props}
    />
  )
}
