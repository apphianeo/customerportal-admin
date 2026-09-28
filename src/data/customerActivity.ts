// Customer Activity — audit trail of customer-initiated actions.
// Matches the "Activity Log › Customer Activity" tab in Figma: the customer is
// identified by email + NRIC (linked to their detail), activities limited to
// the spec-A set (login w/ mode, downloads, profile updates, etc.).

import { customers } from "./customers"

export interface CustomerActivityEntry {
  id: string
  timestamp: string // "DD/MM/YYYY, HH:mm:ss" (SGT)
  customerId?: string
  customerEmail: string
  customerNric: string
  activity: string
}

// Resolve a customer id by email so rows can deep-link to the detail page.
const idByEmail = new Map(customers.map((c) => [c.loginId, c.id]))
const link = (email: string) => idByEmail.get(email)

export const customerActivity: CustomerActivityEntry[] = [
  ["14/09/2026, 16:42:40", "tiffany.chew@example.com", "S9942073B", "Login successful via Singpass"],
  ["14/09/2026, 16:35:40", "quentin.loh@example.com", "S9846201F", "Download Policy Schedule - DHOM140029172600"],
  ["14/09/2026, 15:51:27", "nathan.chua@example.com", "S8126784L", "Login failed via Email"],
  ["14/09/2026, 15:23:01", "kavya.nair@example.com", "S9231058G", "Updated mobile no. 8888 1234 to 9999 1234"],
  ["14/09/2026, 15:10:22", "haruto.sato@example.com", "G1582037K", "Reset Password"],
  ["14/09/2026, 14:20:30", "elena.fernandez@example.com", "G1298456M", "Log Out"],
  ["14/09/2026, 13:47:25", "rachel.seah@example.com", "S9037186H", "Download Claim Summary - CLMT220087341500"],
  ["14/09/2026, 13:30:07", "olivia.wong@example.com", "S9413572C", "Login successful via Email"],
  ["14/09/2026, 12:35:36", "lucas.teo@example.com", "S8912467I", "Signed Up"],
  ["14/09/2026, 11:56:52", "isabelle.lee@example.com", "S9754102D", "Login failed via Singpass"],
  ["14/09/2026, 11:22:14", "samuel.yap@example.com", "S8314692J", "Download Policy Schedule - DHOM140029172600"],
  ["14/09/2026, 10:48:03", "priya.sharma@example.com", "G1092845P", "Updated email priya.old@example.com to priya.sharma@example.com"],
  ["14/09/2026, 10:15:39", "mei.lin@example.com", "G1729348N", "Login successful via Singpass"],
  ["14/09/2026, 09:40:12", "daniel.ong@example.com", "S8239045H", "Download Premium Notice - DHOM140029172600"],
].map(([timestamp, customerEmail, customerNric, activity], i) => ({
  id: String(i + 1),
  timestamp,
  customerEmail,
  customerNric,
  activity,
  customerId: link(customerEmail),
}))
