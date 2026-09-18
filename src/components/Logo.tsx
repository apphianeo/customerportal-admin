import uoiLogo from "@/assets/uoi-logo.svg"
import { cn } from "@/lib/utils"

// Real UOI wordmark, shared with the customer portal.
export function Logo({
  className,
  width = 100,
  height = 51,
}: {
  className?: string
  width?: number
  height?: number
}) {
  return (
    <img
      src={uoiLogo}
      alt="UOI — United Overseas Insurance"
      width={width}
      height={height}
      className={cn("shrink-0 object-contain", className)}
    />
  )
}
