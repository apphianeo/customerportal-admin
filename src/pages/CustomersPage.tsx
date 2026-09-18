import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckboxSquare, SortIcon } from "@/components/icons"
import {
  customers as ALL,
  STATUS_TONE,
  type CustomerStatus,
} from "@/data/customers"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 20
const STATUSES: CustomerStatus[] = ["Active", "Deactivated", "Disabled"]
type SortKey = "creationDate" | "lastLogin"
type SortDir = "asc" | "desc"

function toTime(d: string): number {
  const [datePart, timePart] = d.split(", ")
  const [dd, mm, yy] = datePart.split("/").map(Number)
  let h = 0, mi = 0, s = 0
  if (timePart) [h, mi, s] = timePart.split(":").map(Number)
  return new Date(yy, mm - 1, dd, h, mi, s).getTime()
}

export function CustomersPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Set<CustomerStatus>>(new Set(STATUSES))
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const allSelected = selected.size === STATUSES.length

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = ALL.filter((c) => {
      if (!allSelected && !selected.has(c.status)) return false
      if (!q) return true
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.loginId.toLowerCase().includes(q) ||
        c.nric.toLowerCase().includes(q)
      )
    })
    if (sortKey) {
      rows.sort((a, b) => {
        const diff = toTime(a[sortKey]) - toTime(b[sortKey])
        return sortDir === "asc" ? diff : -diff
      })
    }
    return rows
  }, [query, selected, allSelected, sortKey, sortDir])

  const newThisMonth = useMemo(() => {
    const key = (d: string) => {
      const [, mm, yy] = d.split("/")
      return `${yy}${mm}`
    }
    const max = ALL.reduce((m, c) => (key(c.creationDate) > m ? key(c.creationDate) : m), "")
    return ALL.filter((c) => key(c.creationDate) === max).length
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function toggleStatus(s: CustomerStatus) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
    setPage(1)
  }

  function sortBy(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const statusLabel = allSelected
    ? "All"
    : selected.size === 0
    ? "None"
    : STATUSES.filter((s) => selected.has(s)).join(", ")

  return (
    <div className="bg-bg-page p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Customers
        </h1>

        {/* Stat card */}
        <div className="w-[266px] rounded-[12px] border border-border bg-white p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <p className="text-sm text-text-secondary">Total users</p>
          <p className="mt-1 text-[32px] font-semibold leading-[1.2] text-foreground">
            {ALL.length.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            <span className="font-medium text-success">+{newThisMonth}</span> this
            month
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-[360px] max-w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="Search name, email or NRIC/FIN"
              className="pl-9"
            />
          </div>

          {/* Status multi-select */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-12 w-[360px] max-w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="truncate text-text-secondary">
                Status: <span className="text-foreground">{statusLabel}</span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[360px] max-w-[calc(100vw-2rem)] p-2"
            >
              {STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onSelect={(e) => {
                    e.preventDefault()
                    toggleStatus(s)
                  }}
                  className="gap-3 px-2 py-2.5"
                >
                  <CheckboxSquare checked={selected.has(s)} className="h-5 w-5 shrink-0" />
                  <span className={cn("text-sm", selected.has(s) ? "font-medium text-primary" : "text-foreground")}>
                    {s}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="ml-auto h-12 border-primary text-primary hover:bg-info-bg"
          >
            Export Excel
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[210px]" />
                <col className="w-[170px]" />
                <col className="w-[120px]" />
                <col className="w-[140px]" />
                <col className="w-[120px]" />
                <col className="w-[140px]" />
                <col className="w-[150px]" />
                <col className="w-[70px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-muted">
                  <Th>Login ID (email address)</Th>
                  <Th>Full Name</Th>
                  <Th>NRIC/FIN</Th>
                  <Th>Mobile no.</Th>
                  <Th>Status</Th>
                  <Th
                    sort={sortKey === "creationDate" ? sortDir : null}
                    onSort={() => sortBy("creationDate")}
                  >
                    Creation Date
                  </Th>
                  <Th
                    sort={sortKey === "lastLogin" ? sortDir : null}
                    onSort={() => sortBy("lastLogin")}
                  >
                    Last Login (SGT)
                  </Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/customers/${c.id}`)}
                    className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/60"
                  >
                    <td className="truncate px-3 py-3 text-sm text-text-secondary">
                      {c.loginId}
                    </td>
                    <td className="truncate px-3 py-3 text-sm text-foreground">
                      {c.fullName}
                    </td>
                    <td className="truncate px-3 py-3 text-sm text-text-secondary">{c.nric}</td>
                    <td className="truncate px-3 py-3 text-sm text-text-secondary">
                      {c.mobile}
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="truncate px-3 py-3 text-sm text-text-secondary">
                      {c.creationDate}
                    </td>
                    <td className="truncate px-3 py-3 text-sm text-text-secondary">
                      {c.lastLogin}
                    </td>
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="grid size-8 place-items-center rounded-md text-text-tertiary outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                          <MoreHorizontal className="h-4 w-4" />
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
                      colSpan={8}
                      className="px-4 py-16 text-center text-sm text-text-secondary"
                    >
                      No customers match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer — pagination centered, count on the left */}
          <div className="flex items-center border-t border-border p-4">
            <p className="flex-1 text-sm text-text-tertiary">
              {filtered.length === 0
                ? "No results"
                : `Showing ${(current - 1) * PAGE_SIZE + 1}-${Math.min(
                    current * PAGE_SIZE,
                    filtered.length
                  )} of ${filtered.length.toLocaleString()}`}
            </p>
            <Pagination page={current} totalPages={totalPages} onChange={setPage} />
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Th({
  children,
  sort,
  onSort,
}: {
  children: React.ReactNode
  sort?: SortDir | null
  onSort?: () => void
}) {
  return (
    <th className="whitespace-nowrap px-3 py-3 text-sm font-medium text-text-tertiary">
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary"
        >
          {children}
          <SortIcon dir={sort} className="h-4 w-3" />
        </button>
      ) : (
        children
      )}
    </th>
  )
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  // Show a window of up to 7 page buttons around the current page.
  const window = 7
  let start = Math.max(1, page - Math.floor(window / 2))
  const end = Math.min(totalPages, start + window - 1)
  start = Math.max(1, end - window + 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

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
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "size-10 rounded-md text-sm",
            p === page ? "bg-primary text-white" : "text-foreground hover:bg-muted"
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
