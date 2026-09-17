import uoiLogo from "@/assets/uoi-logo.svg"
import { cn } from "@/lib/utils"

// Real UOI wordmark, shared with the customer portal.
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={uoiLogo}
      alt="UOI — United Overseas Insurance"
      className={cn("h-[51px] w-[100px] object-contain", className)}
    />
  )
}
