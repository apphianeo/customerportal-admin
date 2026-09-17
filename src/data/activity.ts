// Global activity log — actions taken by UOI admin staff against customer
// accounts. Mirrors the Figma "Activity Log" screen.

export type AdminRole = "Master Admin" | "UOI Admin"

export interface Admin {
  name: string
  email: string
  role: AdminRole
}

export interface ActivityLogEntry {
  id: string
  timestamp: string // "DD/MM/YYYY, HH:mm:ss" (SGT)
  activity: string
  customerName: string
  customerNric: string
  admin: Admin
}

export const ADMINS: Record<string, Admin> = {
  priya: { name: "Priya Menon", email: "priya.menon@uoi.com.sg", role: "Master Admin" },
  marcus: { name: "Marcus Lee", email: "marcus.lee@uoi.com.sg", role: "UOI Admin" },
  aisha: { name: "Aisha Rahman", email: "aisha.rahman@uoi.com.sg", role: "UOI Admin" },
  daniel: { name: "Daniel Koh", email: "daniel.koh@uoi.com.sg", role: "UOI Admin" },
  sophie: { name: "Sophie Tan", email: "sophie.tan@uoi.com.sg", role: "UOI Admin" },
}

export const activityLog: ActivityLogEntry[] = [
  { id: "1", timestamp: "14/09/2026, 16:42:40", activity: "Deactivated account", customerName: "Tiffany Chew Xin Hui", customerNric: "S9942073B", admin: ADMINS.priya },
  { id: "2", timestamp: "14/09/2026, 15:18:00", activity: "Updated profile", customerName: "Samuel Yap Jun Wei", customerNric: "S8314692J", admin: ADMINS.marcus },
  { id: "3", timestamp: "14/09/2026, 13:56:12", activity: "Reset password", customerName: "Rachel Seah Hui Ting", customerNric: "S9037186H", admin: ADMINS.aisha },
  { id: "4", timestamp: "14/09/2026, 11:27:52", activity: "Changed email address", customerName: "Quentin Loh Yi Xuan", customerNric: "S9846201F", admin: ADMINS.daniel },
  { id: "5", timestamp: "14/09/2026, 09:04:40", activity: "Updated marketing consent", customerName: "Priya Sharma", customerNric: "G1092845P", admin: ADMINS.sophie },
  { id: "6", timestamp: "13/09/2026, 17:39:28", activity: "Activated account", customerName: "Olivia Wong Shi Min", customerNric: "S9413572C", admin: ADMINS.priya },
  { id: "7", timestamp: "13/09/2026, 14:22:24", activity: "Reset password", customerName: "Nathan Chua Wei Jie", customerNric: "S8126784L", admin: ADMINS.marcus },
  { id: "8", timestamp: "13/09/2026, 10:48:44", activity: "Verified customer details", customerName: "Mei Lin", customerNric: "G1729348N", admin: ADMINS.aisha },
  { id: "9", timestamp: "12/09/2026, 16:11:48", activity: "Updated mobile number", customerName: "Lucas Teo Ming Jie", customerNric: "S8912467I", admin: ADMINS.daniel },
  { id: "10", timestamp: "12/09/2026, 12:35:36", activity: "Updated profile", customerName: "Kavya Nair", customerNric: "S9231058G", admin: ADMINS.sophie },
  { id: "11", timestamp: "12/09/2026, 08:57:20", activity: "Reset password", customerName: "Jeremy Goh Zhi Hao", customerNric: "S8437619E", admin: ADMINS.priya },
  { id: "12", timestamp: "11/09/2026, 18:03:04", activity: "Deactivated account", customerName: "Isabelle Lee Jia En", customerNric: "S9754102D", admin: ADMINS.marcus },
  { id: "13", timestamp: "11/09/2026, 15:46:36", activity: "Changed login ID", customerName: "Haruto Sato", customerNric: "G1582037K", admin: ADMINS.aisha },
  { id: "14", timestamp: "11/09/2026, 11:09:12", activity: "Updated profile", customerName: "Grace Koh Hui Min", customerNric: "S9345821B", admin: ADMINS.daniel },
  { id: "15", timestamp: "10/09/2026, 17:52:48", activity: "Disabled account", customerName: "Farhan Rahman", customerNric: "S8872314J", admin: ADMINS.priya },
  { id: "16", timestamp: "10/09/2026, 14:31:20", activity: "Verified customer details", customerName: "Elena Fernandez", customerNric: "G1298456M", admin: ADMINS.sophie },
  { id: "17", timestamp: "10/09/2026, 10:18:56", activity: "Updated marketing consent", customerName: "Daniel Ong Kai Wen", customerNric: "S8239045H", admin: ADMINS.marcus },
  { id: "18", timestamp: "09/09/2026, 16:44:32", activity: "Reset password", customerName: "Chloe Ng Jia Yi", customerNric: "S9528314A", admin: ADMINS.aisha },
  { id: "19", timestamp: "09/09/2026, 12:07:08", activity: "Changed email address", customerName: "Samuel Yap Jun Wei", customerNric: "S8314692J", admin: ADMINS.daniel },
  { id: "20", timestamp: "09/09/2026, 09:33:44", activity: "Updated profile", customerName: "Tiffany Chew Xin Hui", customerNric: "S9942073B", admin: ADMINS.priya },
]

// The signed-in staff member (mock).
export const currentAdmin: Admin = ADMINS.priya
