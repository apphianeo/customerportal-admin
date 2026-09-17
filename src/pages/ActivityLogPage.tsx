import { useMemo, useState } from "react"
import { ChevronsUpDown, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination } from "./CustomersPage"
import { activityLog as ALL } from "@/data/activity"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 20

// Actions that reduce or reset access show a red dot; routine updates show green.
const RED_ACTIONS = new Set([
  "Deactivated account",
  "Disabled account",
  "Reset password",
])

export function ActivityLogPage() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL
    return ALL.filter(
      (e) =>
        e.activity.toLowerCase().includes(q) ||
        e.customerName.toLowerCase().includes(q) ||
        e.customerNric.toLowerCase().includes(q) ||
        e.admin.name.toLowerCase().includes(q) ||
        e.admin.email.toLowerCase().includes(q)
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <div className="bg-bg-page p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Activity Log
        </h1>

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
              placeholder="Search admin, action or customer"
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
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-text-tertiary">
                    <span className="inline-flex cursor-pointer items-center gap-1">
                      Timestamp (SGT)
                      <ChevronsUpDown className="h-3.5 w-3.5" />
                    </span>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Activity</th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Customer</th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Admin</th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Role</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                      {e.timestamp}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-foreground">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 shrink-0 rounded-full",
                            RED_ACTIONS.has(e.activity) ? "bg-destructive" : "bg-success"
                          )}
                        />
                        {e.activity}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">{e.customerName}</span>
                        <span className="text-xs text-text-tertiary">{e.customerNric}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">{e.admin.name}</span>
                        <span className="text-xs text-text-tertiary">{e.admin.email}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                      {e.admin.role}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center text-sm text-text-secondary">
                      No activity matches your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-text-tertiary">
              {filtered.length === 0
                ? "No results"
                : `Showing ${(current - 1) * PAGE_SIZE + 1}-${Math.min(
                    current * PAGE_SIZE,
                    filtered.length
                  )} of ${filtered.length.toLocaleString()}`}
            </p>
            <Pagination page={current} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
