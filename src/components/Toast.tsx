import { useEffect } from "react"
import successCircle from "@/assets/icons/success-circle.svg"

// Floating success banner, mirrors the customer portal: fixed near the top,
// centered, auto-dismisses.
export function Toast({
  message,
  onClose,
  duration = 5000,
}: {
  message: string
  onClose: () => void
  duration?: number
}) {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [message, onClose, duration])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[85px] z-50 px-4">
      <div className="mx-auto flex max-w-[980px] justify-center">
        <div className="pointer-events-auto flex items-center gap-2 rounded-[8px] bg-success-bg px-4 py-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <img src={successCircle} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p className="m-0 text-sm leading-[1.5] text-foreground">{message}</p>
        </div>
      </div>
    </div>
  )
}
