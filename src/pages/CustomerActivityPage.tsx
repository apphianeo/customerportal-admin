import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SortIcon } from "@/components/icons"
import { Pagination } from "./CustomersPage"
import {
  customerActivity as ALL,
  CUSTOMER_RED_ACTIONS,
} from "@/data/customerActivity"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 20

function toTime(d: string): number {
  const [datePart, timePart] = d.split(", ")
  const [dd, mm, yy] = datePart.split("/").map(Number)
  let h = 0, mi = 0, s = 0
  if (timePart) [h, mi, s] = timePart.split(":").map(Number)
  return new Date(yy, mm - 1, dd, h, mi, s).getTime()
}

export function CustomerActivityPage() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = ALL.filter(
      (e) =>
        !q ||
        e.activity.toLowerCase().includes(q) ||
        e.customerName.toLowerCase().includes(q) ||
        e.customerNric.toLowerCase().includes(q) ||
        e.channel.toLowerCase().includes(q)
    )
    rows.sort((a, b) => {
      const diff = toTime(a.timestamp) - toTime(b.timestamp)
      return sortDir === "asc" ? diff : -diff
    })
    return rows
  }, [query, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <div className="bg-bg-page p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
          Customer Activity
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
              placeholder="Search customer, activity or NRIC/FIN"
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
            <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[200px]" />
                <col className="w-[300px]" />
                <col className="w-[280px]" />
                <col className="w-[140px]" />
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
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Activity</th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Customer</th>
                  <th className="px-4 py-3 text-sm font-medium text-text-tertiary">Channel</th>
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
                            CUSTOMER_RED_ACTIONS.has(e.activity) ? "bg-destructive" : "bg-success"
                          )}
                        />
                        {e.activity}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Link
                        to={`/customers/${e.customerId}`}
                        className="flex min-w-0 flex-col"
                      >
                        <span className="truncate text-sm text-primary hover:underline">
                          {e.customerName}
                        </span>
                        <span className="truncate text-xs text-text-tertiary">{e.customerNric}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-text-secondary">
                      {e.channel}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-16 text-center text-sm text-text-secondary">
                      No activity matches your search.
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
