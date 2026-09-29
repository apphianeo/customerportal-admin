import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmStatusDialog, type StatusAction } from "@/components/ConfirmStatusDialog"
import { Toast } from "@/components/Toast"
import {
  getCustomer,
  STATUS_TONE,
  type CustomerStatus,
} from "@/data/customers"
import { cn } from "@/lib/utils"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm leading-[1.5] text-text-secondary">{label}</span>
      <span className="text-base leading-[1.5] text-foreground">{value || "—"}</span>
    </div>
  )
}

export function CustomerDetailPage() {
  const { id } = useParams()
  const customer = id ? getCustomer(id) : undefined

  const [status, setStatus] = useState<CustomerStatus>(customer?.status ?? "Active")
  const [dialog, setDialog] = useState<StatusAction | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  if (!customer) {
    return (
      <div className="p-8">
        <p className="text-sm text-text-secondary">
          Customer not found.{" "}
          <Link to="/customers" className="text-primary hover:underline">
            Back to customers
          </Link>
        </p>
      </div>
    )
  }

  function confirmAction() {
    if (!dialog) return
    const next: CustomerStatus =
      dialog === "deactivate" || dialog === "reject" ? "Deactivated" : "Active"
    const verb =
      dialog === "deactivate"
        ? "deactivated"
        : dialog === "reject"
        ? "rejected"
        : dialog === "approve"
        ? "approved"
        : "reactivated"
    setStatus(next)
    setToast(`${customer!.loginId} has been ${verb}.`)
    setDialog(null)
  }

  // Status-driven actions, rendered top-right. Safe/recovery actions are the
  // prominent primary; the destructive one is a quieter red outline.
  const actions: Array<{ label: string; action: StatusAction; danger?: boolean }> =
    status === "Pending"
      ? [
          { label: "Approve", action: "approve" },
          { label: "Reject", action: "reject", danger: true },
        ]
      : status === "Active"
      ? [{ label: "Deactivate", action: "deactivate", danger: true }]
      : [{ label: "Reactivate", action: "reactivate" }]

  const profile: Array<[string, string]> = [
    ["Salutation", customer.salutation],
    ["Name", customer.fullName],
    ["Date of Birth", customer.dob],
    ["NRIC/FIN", customer.nric],
    ["Mobile No.", customer.mobile],
    ["Email address", customer.email],
    ["Residential Address", customer.residentialAddress],
    ["Mailing Address", customer.mailingAddress],
    ["Marketing Consent", customer.marketingConsent],
    ["Creation Date", customer.creationDate],
    ["Last Login", customer.lastLogin],
  ]

  return (
    <div className="bg-bg-page p-8">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs">
          <Link to="/customers" className="text-text-tertiary hover:underline">
            Customers
          </Link>
          <ChevronRight className="h-3 w-3 text-text-tertiary" />
          <span className="font-semibold text-primary">{customer.fullName}</span>
        </nav>

        {/* Title + status action(s) */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
            {customer.fullName}
          </h1>
          <Badge tone={STATUS_TONE[status]}>{status}</Badge>
          <div className="ml-auto flex items-center gap-3">
            {actions.map((a) => (
              <Button
                key={a.action}
                variant={a.danger ? "outline" : "default"}
                onClick={() => setDialog(a.action)}
                className={cn(
                  a.danger &&
                    "border-destructive text-destructive hover:bg-destructive-bg"
                )}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Customer Profile */}
        <section className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <header className="border-b border-border px-6 py-4">
            <h2 className="text-[18px] font-semibold leading-[1.5] text-foreground">
              Customer Profile
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
            {profile.map(([label, value]) => (
              <Field key={label} label={label} value={value} />
            ))}
          </div>
        </section>

        {/* Account Activity */}
        <section className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <header className="border-b border-border px-6 py-4">
            <h2 className="text-[18px] font-semibold leading-[1.5] text-foreground">
              Account Activity
            </h2>
          </header>
          <div className="p-4">
            <div className="overflow-hidden rounded-[12px] border border-border">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-muted">
                    <th className="w-[200px] px-4 py-3 text-sm font-medium text-text-tertiary">
                      Timestamp (SGT)
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-text-tertiary">
                      Activity
                    </th>
                    <th className="w-[280px] px-4 py-3 text-sm font-medium text-text-tertiary">
                      Performed By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer.accountActivity.map((a, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-text-secondary">
                        {a.timestamp}
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {a.activity}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-sm text-foreground">
                            {a.actor ? a.actor.name : customer.fullName}
                          </span>
                          <span
                            className={cn(
                              "shrink-0 rounded-full px-2 py-0.5 text-xs",
                              a.actor
                                ? "bg-info-bg text-primary"
                                : "bg-muted text-text-secondary"
                            )}
                          >
                            {a.actor ? a.actor.role : "Customer"}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-border px-4 py-3">
                <p className="text-sm text-text-tertiary">
                  Showing 1-{customer.accountActivity.length} of{" "}
                  {customer.accountActivity.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Linked policies (empty) */}
        <section className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <header className="border-b border-border px-6 py-4">
            <h2 className="text-[18px] font-semibold leading-[1.5] text-foreground">
              Linked policies
            </h2>
          </header>
          <div className="p-4">
            <div className="flex min-h-[160px] items-center justify-center rounded-[10px] border border-dashed border-border px-6 py-10">
              <p className="text-base font-medium text-text-secondary">
                Linked policies coming soon
              </p>
            </div>
          </div>
        </section>
      </div>

      <ConfirmStatusDialog
        open={dialog !== null}
        onOpenChange={(o) => !o && setDialog(null)}
        action={dialog ?? "deactivate"}
        email={customer.loginId}
        onConfirm={confirmAction}
      />
    </div>
  )
}
