// Filled icons matching the Figma sidebar (solid, not outline).

export function CustomersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v1.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V18c0-2.66-5.33-4-8-4Z" />
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
