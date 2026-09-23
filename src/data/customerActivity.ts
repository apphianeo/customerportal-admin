// Customer Activity overview — a global feed of customer-initiated events
// across the portal (logins, downloads, self-service changes). Drills into a
// single customer via the detail page. Swap for a real API later; the screens
// only depend on the exported shape below.

import { customers } from "./customers"

export type ActivityChannel = "Web" | "Mobile app"

export interface CustomerActivityEntry {
  id: string
  timestamp: string // "DD/MM/YYYY, HH:mm:ss" (SGT)
  activity: string
  customerId: string
  customerName: string
  customerNric: string
  channel: ActivityChannel
}

// Failed / security-relevant events surface a red dot; routine actions green.
export const CUSTOMER_RED_ACTIONS = new Set(["Login failed", "Account locked"])

const ACTIVITIES = [
  "Login",
  "Viewed dashboard",
  "Viewed policy details",
  "Downloaded Policy Schedule",
  "Downloaded Claim Summary",
  "Made a payment",
  "Submitted a claim",
  "Updated contact details",
  "Updated marketing consent",
  "Requested password reset",
  "Login failed",
  "Account locked",
  "Log Out",
]

const CHANNELS: ActivityChannel[] = ["Web", "Mobile app"]

const pad = (n: number) => String(n).padStart(2, "0")

function fmt(d: Date): string {
  return (
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}, ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  )
}

// Deterministic generator so the feed is stable across reloads.
function generate(count: number): CustomerActivityEntry[] {
  const pool = customers.slice(0, 16)
  const out: CustomerActivityEntry[] = []
  let t = new Date(2026, 8, 14, 16, 42, 40).getTime() // 14/09/2026 16:42:40

  for (let i = 0; i < count; i++) {
    const c = pool[(i * 3) % pool.length]
    out.push({
      id: String(i + 1),
      timestamp: fmt(new Date(t)),
      activity: ACTIVITIES[(i * 5) % ACTIVITIES.length],
      customerId: c.id,
      customerName: c.fullName,
      customerNric: c.nric,
      channel: CHANNELS[i % 2],
    })
    // Step back a deterministic, uneven amount so timestamps look organic.
    t -= (7 + ((i * 37) % 53)) * 60_000 + ((i * 13) % 60) * 1_000
  }
  return out
}

export const customerActivity: CustomerActivityEntry[] = generate(64)
