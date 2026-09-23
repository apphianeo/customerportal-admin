// Filled icons matching the Figma sidebar (solid, not outline).

export function CustomersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v1.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V18c0-2.66-5.33-4-8-4Z" />
    </svg>
  )
}

// Activity feed (dots + lines) — distinguishes the customer activity list
// from the admin clock icon.
export function CustomerActivityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="5" cy="6" r="1.6" />
      <rect x="9" y="5" width="11" height="2" rx="1" />
      <circle cx="5" cy="12" r="1.6" />
      <rect x="9" y="11" width="11" height="2" rx="1" />
      <circle cx="5" cy="18" r="1.6" />
      <rect x="9" y="17" width="11" height="2" rx="1" />
    </svg>
  )
}

export function ActivityLogIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3Z" />
    </svg>
  )
}

// Stacked up/down triangles for sortable table headers. `dir` highlights the
// active direction; the inactive triangle stays muted.
export function SortIcon({
  dir,
  className,
}: {
  dir?: "asc" | "desc" | null
  className?: string
}) {
  const active = "currentColor"
  const muted = "#C9CED6"
  return (
    <svg viewBox="0 0 12 16" className={className} aria-hidden="true">
      <path d="M6 2.5 9 6.5H3L6 2.5Z" fill={dir === "asc" ? active : muted} />
      <path d="M6 13.5 9 9.5H3L6 13.5Z" fill={dir === "desc" ? active : muted} />
    </svg>
  )
}

// Filled checkbox square used by the status filter (matches the Figma dropdown).
export function CheckboxSquare({
  checked,
  className,
}: {
  checked: boolean
  className?: string
}) {
  if (checked) {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="hsl(var(--primary))" />
        <path
          d="M5.5 10.2 8.5 13l6-6.5"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" fill="#fff" stroke="#C9CED6" strokeWidth="1.5" />
    </svg>
  )
}
