import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Download, MoreVertical, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  customers as ALL,
  STATUS_TONE,
  type CustomerStatus,
} from "@/data/customers"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10
const COLUMNS = [
  "Login ID (email address)",
  "Full Name",
  "NRIC/FIN",
  "Mobile no.",
  "Status",
  "Creation Date",
  "Last Login (SGT)",
  "",
]

export function CustomersPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<CustomerStatus | "all">("all")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL.filter((c) => {
      if (status !== "all" && c.status !== status) return false
      if (!q) return true
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.loginId.toLowerCase().includes(q) ||
        c.nric.toLowerCase().includes(q)
      )
    })
  }, [query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  const stats = [
    { label: "Total Customers", value: ALL.length },
    { label: "Active", value: ALL.filter((c) => c.status === "Active").length },
    { label: "Deactivated", value: ALL.filter((c) => c.status === "Deactivated").length },
    { label: "Disabled", value: ALL.filter((c) => c.status === "Disabled").length },
  ]

  function resetTo(fn: () => void) {
    fn()
    setPage(1)
  }

  return (
    <div className="p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Customers
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[12px] border border-border bg-white p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
            >
              <p className="text-sm text-text-secondary">{s.label}</p>
              <p className="mt-2 text-[32px] font-semibold leading-[1.2] text-foreground">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Toolbar + table */}
        <div className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <Input
                value={query}
                onChange={(e) => resetTo(() => setQuery(e.target.value))}
                placeholder="Search by name, email or NRIC"
                className="pl-9"
              />
            </div>
            <div className="w-[180px]">
              <Select
                value={status}
                onValueChange={(v) => resetTo(() => setStatus(v as CustomerStatus | "all"))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Deactivated">Deactivated</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="h-12 px-4">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted">
                  {COLUMNS.map((c, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap px-4 py-3 text-sm font-medium text-text-tertiary"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/customers/${c.id}`)}
                    className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/60"
                  >
                    <td className="px-4 py-3 text-sm text-primary">{c.loginId}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                      {c.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{c.nric}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-text-secondary">
                      {c.mobile}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-text-secondary">
                      {c.creationDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-text-secondary">
                      {c.lastLogin}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="grid size-8 place-items-center rounded-md text-text-tertiary outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => navigate(`/customers/${c.id}`)}>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={cn(
                              c.status === "Active"
                                ? "text-destructive focus:bg-destructive-bg"
                                : "text-success focus:bg-success-bg"
                            )}
                            onSelect={() => navigate(`/customers/${c.id}`)}
                          >
                            {c.status === "Active" ? "Deactivate account" : "Activate account"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={COLUMNS.length}
                      className="px-4 py-16 text-center text-sm text-text-secondary"
                    >
                      No customers match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-text-tertiary">
              {filtered.length === 0
                ? "No results"
                : `Showing ${(current - 1) * PAGE_SIZE + 1}-${Math.min(
                    current * PAGE_SIZE,
                    filtered.length
                  )} of ${filtered.length}`}
            </p>
            <Pagination page={current} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="grid size-10 place-items-center rounded-md text-text-secondary hover:bg-muted disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "size-10 rounded-md text-sm",
            p === page
              ? "bg-primary text-white"
              : "text-foreground hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="grid size-10 place-items-center rounded-md text-text-secondary hover:bg-muted disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
