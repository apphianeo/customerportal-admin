import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SortIcon } from "@/components/icons"
import { Pagination } from "./CustomersPage"
import { adminActivity } from "@/data/activity"
import { customerActivity } from "@/data/customerActivity"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 20
type Tab = "admin" | "customer"

function toTime(d: string): number {
  const [datePart, timePart] = d.split(", ")
  const [dd, mm, yy] = datePart.split("/").map(Number)
  let h = 0, mi = 0, s = 0
  if (timePart) [h, mi, s] = timePart.split(":").map(Number)
  return new Date(yy, mm - 1, dd, h, mi, s).getTime()
}

// Renders an action string with its target substring as a link to the customer.
function ActionText({
  text,
  target,
  targetId,
}: {
  text: string
  target?: string
  targetId?: string
}) {
  if (!target || !text.includes(target)) return <span>{text}</span>
  const [before, after] = text.split(target)
  return (
    <span>
      {before}
      {targetId ? (
        <Link to={`/customers/${targetId}`} className="text-primary hover:underline">
          {target}
        </Link>
      ) : (
        <span className="text-primary">{target}</span>
      )}
      {after}
    </span>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-white"
          : "border border-border bg-white text-text-secondary hover:bg-muted"
      )}
    >
      {children}
    </button>
  )
}

export function ActivityLogPage() {
  const [tab, setTab] = useState<Tab>("admin")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  function switchTab(next: Tab) {
    setTab(next)
    setQuery("")
    setPage(1)
    setSortDir("desc")
  }

  const q = query.trim().toLowerCase()

  const adminRows = useMemo(() => {
    const rows = adminActivity.filter(
      (e) =>
        !q ||
        e.action.toLowerCase().includes(q) ||
        e.admin.name.toLowerCase().includes(q) ||
        e.admin.email.toLowerCase().includes(q) ||
        e.admin.role.toLowerCase().includes(q)
    )
    rows.sort((a, b) => {
      const diff = toTime(a.timestamp) - toTime(b.timestamp)
      return sortDir === "asc" ? diff : -diff
    })
    return rows
  }, [q, sortDir])

  const customerRows = useMemo(() => {
    const rows = customerActivity.filter(
      (e) =>
        !q ||
        e.activity.toLowerCase().includes(q) ||
        e.customerEmail.toLowerCase().includes(q) ||
        e.customerNric.toLowerCase().includes(q)
    )
    rows.sort((a, b) => {
      const diff = toTime(a.timestamp) - toTime(b.timestamp)
      return sortDir === "asc" ? diff : -diff
    })
    return rows
  }, [q, sortDir])

  const filtered = tab === "admin" ? adminRows : customerRows
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const colCount = 3

  return (
    <div className="bg-bg-page p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Activity Log
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          <TabButton active={tab === "admin"} onClick={() => switchTab("admin")}>
            Admin Activity
          </TabButton>
          <TabButton active={tab === "customer"} onClick={() => switchTab("customer")}>
            Customer Activity
          </TabButton>
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
              placeholder={
                tab === "admin"
                  ? "Search admin, role or action"
                  : "Search customer, activity or NRIC/FIN"
              }
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            className="ml-auto h-12 border-primary text-primary hover:bg-info-bg"
          >
            Export Log
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[220px]" />
                <col className="w-[320px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-text-tertiary">
                    <button
                      type="button"
                      onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                      className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary"
                    >
                      Timestamp (SGT)
                      <SortIcon dir={sortDir} className="h-4 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">
                    {tab === "admin" ? "Admin" : "Customer"}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Activity</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={colCount}
                      className="h-[360px] px-4 text-center align-middle text-sm text-text-secondary"
                    >
                      {q ? `No results for '${query.trim()}'` : "No activity yet"}
                    </td>
                  </tr>
                )}

                {tab === "admin" &&
                  rows.length > 0 &&
                  (rows as typeof adminActivity).map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                      <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                        {e.timestamp}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium uppercase text-foreground">
                              {e.admin.name}
                            </span>
                            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-text-secondary">
                              {e.admin.role}
                            </span>
                          </span>
                          <span className="truncate text-xs text-text-tertiary">{e.admin.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-foreground">
                        <ActionText text={e.action} target={e.target} targetId={e.targetId} />
                      </td>
                    </tr>
                  ))}

                {tab === "customer" &&
                  rows.length > 0 &&
                  (rows as typeof customerActivity).map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                      <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                        {e.timestamp}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {e.customerId ? (
                          <Link to={`/customers/${e.customerId}`} className="flex min-w-0 flex-col">
                            <span className="truncate text-sm text-primary hover:underline">
                              {e.customerEmail}
                            </span>
                            <span className="truncate text-xs text-text-tertiary">{e.customerNric}</span>
                          </Link>
                        ) : (
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm text-foreground">{e.customerEmail}</span>
                            <span className="truncate text-xs text-text-tertiary">{e.customerNric}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-foreground">{e.activity}</td>
                    </tr>
                  ))}
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
            {filtered.length > 0 && (
              <Pagination page={current} totalPages={totalPages} onChange={setPage} />
            )}
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
