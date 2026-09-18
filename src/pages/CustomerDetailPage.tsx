import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronRight, CircleCheck, CircleX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ConfirmStatusDialog } from "@/components/ConfirmStatusDialog"
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
  const [dialogOpen, setDialogOpen] = useState(false)
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

  const isActive = status === "Active"

  function confirmToggle() {
    const next: CustomerStatus = isActive ? "Deactivated" : "Active"
    setStatus(next)
    setDialogOpen(false)
    setToast(
      `${customer!.loginId} has been ${next === "Active" ? "activated" : "deactivated"}.`
    )
  }

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

        {/* Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
            {customer.fullName}
          </h1>
          <Badge tone={STATUS_TONE[status]}>{status}</Badge>
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
                    <th className="w-[220px] px-4 py-3 text-sm font-medium text-text-tertiary">
                      Timestamp (SGT)
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-text-tertiary">
                      Activity
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

        {/* Status action — plain text button, no hover fill */}
        <div className="border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className={cn(
              "inline-flex items-center gap-2 bg-transparent text-base font-medium",
              isActive ? "text-destructive" : "text-success"
            )}
          >
            {isActive ? (
              <CircleX className="h-5 w-5" />
            ) : (
              <CircleCheck className="h-5 w-5" />
            )}
            {isActive ? "Deactivate account" : "Activate account"}
          </button>
        </div>
      </div>

      <ConfirmStatusDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        action={isActive ? "deactivate" : "activate"}
        email={customer.loginId}
        onConfirm={confirmToggle}
      />
    </div>
  )
}
