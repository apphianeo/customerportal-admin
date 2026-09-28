// Admin Activity — audit trail of actions taken by UOI admin staff.
// Matches the "Activity Log › Admin Activity" tab in Figma: the affected
// party is embedded in the action string (spec B), no separate customer column.

export type AdminRole = "Master Admin" | "UOI Admin"

export interface Admin {
  name: string
  email: string
  role: AdminRole
}

export interface AdminActivityEntry {
  id: string
  timestamp: string // "DD/MM/YYYY, HH:mm:ss" (SGT)
  admin: Admin
  action: string // e.g. "Deactivated rachel.seah@example.com"
  target?: string // the substring (email / name) to highlight as a link
}

export const ADMINS: Record<string, Admin> = {
  priya: { name: "Priya Menon", email: "priya.menon@uoi.com.sg", role: "Master Admin" },
  marcus: { name: "Marcus Lee", email: "marcus.lee@uoi.com.sg", role: "UOI Admin" },
  aisha: { name: "Aisha Rahman", email: "aisha.rahman@uoi.com.sg", role: "UOI Admin" },
  daniel: { name: "Daniel Koh", email: "daniel.koh@uoi.com.sg", role: "UOI Admin" },
  sophie: { name: "Sophie Tan", email: "sophie.tan@uoi.com.sg", role: "UOI Admin" },
}

// The signed-in staff member (mock).
export const currentAdmin: Admin = ADMINS.priya

export const adminActivity: AdminActivityEntry[] = [
  { id: "1", timestamp: "14/09/2026, 16:42:40", admin: ADMINS.priya, action: "Deactivated rachel.seah@example.com", target: "rachel.seah@example.com" },
  { id: "2", timestamp: "14/09/2026, 15:18:00", admin: ADMINS.marcus, action: "Verified samuel.yap@example.com", target: "samuel.yap@example.com" },
  { id: "3", timestamp: "14/09/2026, 13:56:12", admin: ADMINS.aisha, action: "Activated quentin.loh@example.com", target: "quentin.loh@example.com" },
  { id: "4", timestamp: "14/09/2026, 11:27:52", admin: ADMINS.daniel, action: "Login" },
  { id: "5", timestamp: "14/09/2026, 09:04:40", admin: ADMINS.sophie, action: "Verified priya.sharma@example.com", target: "priya.sharma@example.com" },
  { id: "6", timestamp: "13/09/2026, 17:39:28", admin: ADMINS.priya, action: "Added Marcus Lee (UOI Admin)", target: "Marcus Lee" },
  { id: "7", timestamp: "13/09/2026, 14:22:24", admin: ADMINS.marcus, action: "Logout" },
  { id: "8", timestamp: "13/09/2026, 10:48:44", admin: ADMINS.aisha, action: "Deactivated nathan.chua@example.com", target: "nathan.chua@example.com" },
  { id: "9", timestamp: "12/09/2026, 16:11:48", admin: ADMINS.priya, action: "Added Sophie Tan (UOI Admin)", target: "Sophie Tan" },
  { id: "10", timestamp: "12/09/2026, 12:35:36", admin: ADMINS.daniel, action: "Activated olivia.wong@example.com", target: "olivia.wong@example.com" },
  { id: "11", timestamp: "12/09/2026, 08:57:20", admin: ADMINS.sophie, action: "Login" },
  { id: "12", timestamp: "11/09/2026, 18:03:04", admin: ADMINS.marcus, action: "Verified mei.lin@example.com", target: "mei.lin@example.com" },
  { id: "13", timestamp: "11/09/2026, 15:46:36", admin: ADMINS.priya, action: "Deactivated isabelle.lee@example.com", target: "isabelle.lee@example.com" },
  { id: "14", timestamp: "11/09/2026, 11:09:12", admin: ADMINS.aisha, action: "Logout" },
  { id: "15", timestamp: "10/09/2026, 17:52:48", admin: ADMINS.daniel, action: "Activated farhan.rahman@example.com", target: "farhan.rahman@example.com" },
  { id: "16", timestamp: "10/09/2026, 14:31:20", admin: ADMINS.priya, action: "Added Daniel Koh (UOI Admin)", target: "Daniel Koh" },
  { id: "17", timestamp: "10/09/2026, 10:18:56", admin: ADMINS.marcus, action: "Verified chloe.ng@example.com", target: "chloe.ng@example.com" },
  { id: "18", timestamp: "09/09/2026, 16:44:32", admin: ADMINS.sophie, action: "Login" },
]
