import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { activityLog as ALL } from "@/data/activity"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10
const COLUMNS = ["Timestamp (SGT)", "Activity", "Customer", "Admin", "Role"]

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
    <div className="p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Activity Log
        </h1>

        <div className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <div className="relative min-w-[260px] flex-1">
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
            <Button variant="outline" size="sm" className="h-12 px-4">
              <Download className="h-4 w-4" />
              Export Log
            </Button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted">
                  {COLUMNS.map((c) => (
                    <th
                      key={c}
                      className="whitespace-nowrap px-4 py-3 text-sm font-medium text-text-tertiary"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                      {e.timestamp}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-foreground">
                      {e.activity}
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
                    <td className="px-4 py-3 align-top">
                      <Badge tone={e.admin.role === "Master Admin" ? "info" : "neutral"}>
                        {e.admin.role}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={COLUMNS.length}
                      className="px-4 py-16 text-center text-sm text-text-secondary"
                    >
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
                  )} of ${filtered.length}`}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={current <= 1}
                onClick={() => setPage(current - 1)}
                className="grid size-10 place-items-center rounded-md text-text-secondary hover:bg-muted disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={cn(
                    "size-10 rounded-md text-sm",
                    p === current ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={current >= totalPages}
                onClick={() => setPage(current + 1)}
                className="grid size-10 place-items-center rounded-md text-text-secondary hover:bg-muted disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
