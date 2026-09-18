// Mock customer accounts. Data mirrors the values in the Figma design so the
// prototype reads realistically. Swap this module for a real API later — the
// screens only depend on the exported shapes below.

export type CustomerStatus = "Active" | "Deactivated" | "Disabled"

export interface AccountActivity {
  timestamp: string // "DD/MM/YYYY, HH:mm:ss" (SGT)
  activity: string
}

export interface Customer {
  id: string
  loginId: string // email address
  salutation: string
  fullName: string
  nric: string
  dob: string
  mobile: string
  email: string
  residentialAddress: string
  mailingAddress: string
  marketingConsent: "Yes" | "No"
  status: CustomerStatus
  creationDate: string
  lastLogin: string
  accountActivity: AccountActivity[]
}

const ADDRESS = "123 Pasir Ris St 21, #03-21, Singapore 645123"

// Full account-activity trail shown on the customer detail page (Tiffany).
const SAMPLE_ACTIVITY: AccountActivity[] = [
  { timestamp: "14/09/2026, 16:42:40", activity: "Clicked Policy Coverage - View All link" },
  { timestamp: "14/09/2026, 16:38:12", activity: "Download Policy Schedule - DHOM140029172600" },
  { timestamp: "14/09/2026, 16:35:07", activity: "Clicked Dashboard link" },
  { timestamp: "14/09/2026, 16:34:51", activity: "Login" },
  { timestamp: "14/09/2026, 09:04:22", activity: "Log Out" },
  { timestamp: "14/09/2026, 08:57:33", activity: "Download Claim Summary - CLMT220087341500" },
  { timestamp: "14/09/2026, 08:51:49", activity: "Clicked Claims - View Details link" },
  { timestamp: "14/09/2026, 08:44:15", activity: "Clicked UOI Personal Products link" },
  { timestamp: "14/09/2026, 08:42:08", activity: "Login" },
  { timestamp: "13/09/2026, 17:39:56", activity: "Log Out" },
  { timestamp: "13/09/2026, 17:36:41", activity: "Download Policy Certificate - DHOM140029172600" },
  { timestamp: "13/09/2026, 17:31:28", activity: "Clicked Policy Coverage - View All link" },
  { timestamp: "13/09/2026, 17:28:03", activity: "Clicked Dashboard link" },
  { timestamp: "13/09/2026, 17:27:44", activity: "Login" },
  { timestamp: "13/09/2026, 10:48:19", activity: "Password Reset Emailed to tiffany.chew@example.com" },
  { timestamp: "13/09/2026, 10:47:52", activity: "Reset Password" },
  { timestamp: "12/09/2026, 16:11:37", activity: "Log Out" },
  { timestamp: "12/09/2026, 15:58:24", activity: "Download Premium Notice - DHOM140029172600" },
  { timestamp: "12/09/2026, 15:42:09", activity: "Clicked Payments - View History link" },
  { timestamp: "12/09/2026, 15:40:33", activity: "Signed Up" },
]

interface Seed {
  loginId: string
  fullName: string
  nric: string
  mobile: string
  status: CustomerStatus
  creationDate: string
  lastLogin: string
  salutation?: string
  dob?: string
}

const SEEDS: Seed[] = [
  { loginId: "tiffany.chew@example.com", fullName: "Tiffany Chew Xin Hui", nric: "S9942073B", mobile: "+65 8821 9364", status: "Active", creationDate: "30/11/2024", lastLogin: "22/08/2026, 09:56:27", salutation: "Ms", dob: "01/01/1989" },
  { loginId: "samuel.yap@example.com", fullName: "Samuel Yap Jun Wei", nric: "S8314692J", mobile: "+65 8365 1490", status: "Active", creationDate: "12/11/2024", lastLogin: "23/08/2026, 18:22:40", salutation: "Mr", dob: "14/03/1983" },
  { loginId: "rachel.seah@example.com", fullName: "Rachel Seah Hui Ting", nric: "S9037186H", mobile: "+65 9136 5082", status: "Active", creationDate: "24/10/2024", lastLogin: "24/08/2026, 10:31:36", salutation: "Ms", dob: "09/07/1990" },
  { loginId: "quentin.loh@example.com", fullName: "Quentin Loh Yi Xuan", nric: "S9846201F", mobile: "+65 8942 7705", status: "Active", creationDate: "07/10/2024", lastLogin: "25/08/2026, 16:59:16", salutation: "Mr", dob: "22/12/1998" },
  { loginId: "priya.sharma@example.com", fullName: "Priya Sharma", nric: "G1092845P", mobile: "+65 9683 2147", status: "Active", creationDate: "20/09/2024", lastLogin: "26/08/2026, 11:14:08", salutation: "Ms", dob: "30/05/1992" },
  { loginId: "olivia.wong@example.com", fullName: "Olivia Wong Shi Min", nric: "S9413572C", mobile: "+65 8217 6059", status: "Active", creationDate: "01/09/2024", lastLogin: "27/08/2026, 08:47:32", salutation: "Ms", dob: "18/02/1994" },
  { loginId: "nathan.chua@example.com", fullName: "Nathan Chua Wei Jie", nric: "S8126784L", mobile: "+65 9098 4376", status: "Active", creationDate: "16/08/2024", lastLogin: "28/08/2026, 17:36:04", salutation: "Mr", dob: "05/11/1981" },
  { loginId: "mei.lin@example.com", fullName: "Mei Lin", nric: "G1729348N", mobile: "+65 8750 9241", status: "Active", creationDate: "02/08/2024", lastLogin: "29/08/2026, 14:28:12", salutation: "Ms", dob: "27/09/1995" },
  { loginId: "lucas.teo@example.com", fullName: "Lucas Teo Ming Jie", nric: "S8912467I", mobile: "+65 9472 3160", status: "Active", creationDate: "17/07/2024", lastLogin: "30/08/2026, 20:12:08", salutation: "Mr", dob: "12/06/1989" },
  { loginId: "kavya.nair@example.com", fullName: "Kavya Nair", nric: "S9231058G", mobile: "+65 8119 6382", status: "Active", creationDate: "04/07/2024", lastLogin: "31/08/2026, 09:05:48", salutation: "Ms", dob: "03/04/1992" },
  { loginId: "jeremy.goh@example.com", fullName: "Jeremy Goh Zhi Hao", nric: "S8437619E", mobile: "+65 9328 0744", status: "Active", creationDate: "21/06/2024", lastLogin: "01/09/2026, 15:51:32", salutation: "Mr", dob: "19/08/1984" },
  { loginId: "isabelle.lee@example.com", fullName: "Isabelle Lee Jia En", nric: "S9754102D", mobile: "+65 8864 5513", status: "Active", creationDate: "06/06/2024", lastLogin: "02/09/2026, 12:09:48", salutation: "Ms", dob: "25/10/1997" },
  { loginId: "haruto.sato@example.com", fullName: "Haruto Sato", nric: "G1582037K", mobile: "+65 9187 4620", status: "Deactivated", creationDate: "19/05/2024", lastLogin: "03/09/2026, 19:44:04", salutation: "Mr", dob: "08/01/1986" },
  { loginId: "grace.koh@example.com", fullName: "Grace Koh Hui Min", nric: "S9345821B", mobile: "+65 8334 7902", status: "Active", creationDate: "08/05/2024", lastLogin: "04/09/2026, 10:18:28", salutation: "Ms", dob: "16/07/1993" },
  { loginId: "farhan.rahman@example.com", fullName: "Farhan Rahman", nric: "S8872314J", mobile: "+65 9675 1128", status: "Disabled", creationDate: "22/04/2024", lastLogin: "05/09/2026, 13:37:56", salutation: "Mr", dob: "29/03/1982" },
  { loginId: "elena.fernandez@example.com", fullName: "Elena Fernandez", nric: "G1298456M", mobile: "+65 8891 2475", status: "Active", creationDate: "11/04/2024", lastLogin: "06/09/2026, 08:54:56", salutation: "Ms", dob: "02/12/1991" },
  { loginId: "daniel.ong@example.com", fullName: "Daniel Ong Kai Wen", nric: "S8239045H", mobile: "+65 9012 6638", status: "Active", creationDate: "29/03/2024", lastLogin: "07/09/2026, 16:03:44", salutation: "Mr", dob: "21/05/1985" },
  { loginId: "chloe.ng@example.com", fullName: "Chloe Ng Jia Yi", nric: "S9528314A", mobile: "+65 8467 9210", status: "Active", creationDate: "15/03/2024", lastLogin: "08/09/2026, 11:42:19", salutation: "Ms", dob: "07/08/1996" },
]

// ── Generate additional rows so the table paginates like the real system ──
const FIRST = [
  "Aaron", "Bryan", "Cheryl", "Damien", "Evelyn", "Felicia", "Gerald", "Hazel",
  "Ivan", "Joanne", "Kelvin", "Larissa", "Melvin", "Natalie", "Oscar", "Pamela",
  "Ryan", "Serena", "Terrence", "Ursula", "Victor", "Wendy", "Xavier", "Yvonne",
  "Zachary", "Amira", "Benedict", "Clarissa", "Dylan", "Esther", "Fabian",
  "Geraldine", "Harith", "Irene", "Jonas", "Karthik", "Lydia", "Manoj", "Nadia",
  "Owen", "Priscilla", "Qiang", "Rebecca", "Siva", "Trish", "Umar", "Valerie",
]
const LAST = [
  "Tan", "Lim", "Lee", "Ng", "Wong", "Chan", "Goh", "Ong", "Teo", "Koh",
  "Yeo", "Sim", "Chua", "Low", "Foo", "Ho", "Toh", "Ang", "Chong", "Neo",
  "Nair", "Kumar", "Rahman", "Fernandez", "Sharma", "Menon", "Das", "Iqbal",
  "Sato", "Kimura", "Lin", "Fang", "Zhang", "Wang", "Chen", "Liu",
]
const STATUS_CYCLE: CustomerStatus[] = [
  "Active", "Active", "Active", "Active", "Active", "Active", "Active",
  "Deactivated", "Active", "Active", "Disabled", "Active",
]
const PREFIX = ["S", "S", "S", "S", "G", "T"]

function pad(n: number, len: number) {
  return String(n).padStart(len, "0")
}

function generate(count: number, startId: number): Seed[] {
  const out: Seed[] = []
  for (let i = 0; i < count; i++) {
    const first = FIRST[i % FIRST.length]
    const last = LAST[(i * 7 + 3) % LAST.length]
    const fullName = `${first} ${last}`
    const login = `${first}.${last}${i}`.toLowerCase()
    const nric = `${PREFIX[i % PREFIX.length]}${pad(1000000 + ((i * 48271) % 8999999), 7)}${"ABCDEFGHJKLZ"[i % 12]}`
    const mobile = `+65 ${8 + (i % 2)}${pad((i * 317) % 1000, 3)} ${pad((i * 719) % 10000, 4)}`
    const yy = 2023 + (i % 2)
    const monthN = (i % 12) + 1
    const dayN = ((i * 3) % 27) + 1
    const mm = pad(monthN, 2)
    const dd = pad(dayN, 2)
    const hh = pad((i * 5) % 24, 2)
    const mi = pad((i * 13) % 60, 2)
    const ss = pad((i * 7) % 60, 2)
    out.push({
      loginId: `${login}@example.com`,
      fullName,
      nric,
      mobile,
      status: STATUS_CYCLE[i % STATUS_CYCLE.length],
      creationDate: `${dd}/${mm}/${yy}`,
      lastLogin: `${pad((dayN % 28) + 1, 2)}/${mm}/2026, ${hh}:${mi}:${ss}`,
      salutation: i % 2 === 0 ? "Mr" : "Ms",
      dob: `${pad(((i * 2) % 27) + 1, 2)}/${pad(((i * 5) % 12) + 1, 2)}/${1980 + (i % 20)}`,
    })
  }
  return out
}

const ALL_SEEDS: Seed[] = [...SEEDS, ...generate(190, SEEDS.length + 1)]

export const customers: Customer[] = ALL_SEEDS.map((s, i) => ({
  id: String(i + 1),
  loginId: s.loginId,
  salutation: s.salutation ?? "Mr",
  fullName: s.fullName,
  nric: s.nric,
  dob: s.dob ?? "01/01/1990",
  mobile: s.mobile,
  email: s.loginId,
  residentialAddress: ADDRESS,
  mailingAddress: ADDRESS,
  marketingConsent: i % 3 === 0 ? "Yes" : "No",
  status: s.status,
  creationDate: s.creationDate,
  lastLogin: s.lastLogin,
  accountActivity: i === 0 ? SAMPLE_ACTIVITY : SAMPLE_ACTIVITY.slice(0, 8),
}))

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}

export const STATUS_TONE: Record<CustomerStatus, "success" | "error" | "neutral"> = {
  Active: "success",
  Deactivated: "error",
  Disabled: "neutral",
}
