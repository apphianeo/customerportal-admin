import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronRight, CircleCheck, CircleX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  getCustomer,
  STATUS_TONE,
  type CustomerStatus,
} from "@/data/customers"
import successCircle from "@/assets/icons/success-circle.svg"

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
  const [banner, setBanner] = useState<string | null>(null)

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
    setBanner(
      next === "Active"
        ? `${customer!.fullName}'s account has been activated.`
        : `${customer!.fullName}'s account has been deactivated.`
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

        {banner && (
          <div className="flex items-start gap-2 rounded-md bg-success-bg px-4 py-3">
            <img src={successCircle} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm leading-[1.5] text-success">{banner}</p>
          </div>
        )}

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

        <div className="border-t border-border pt-6">
          <Button
            variant={isActive ? "danger" : "ghost"}
            className={isActive ? "" : "text-success hover:bg-success-bg"}
            onClick={() => setDialogOpen(true)}
          >
            {isActive ? (
              <CircleX className="h-5 w-5" />
            ) : (
              <CircleCheck className="h-5 w-5" />
            )}
            {isActive ? "Deactivate account" : "Activate account"}
          </Button>
        </div>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Deactivate account?" : "Activate account?"}
            </DialogTitle>
            <DialogDescription>
              {isActive ? (
                <>
                  <span className="font-medium text-foreground">
                    {customer.fullName}
                  </span>{" "}
                  will lose access to the Customer Portal and will not be able to
                  sign in until the account is reactivated.
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {customer.fullName}
                  </span>{" "}
                  will regain access to the Customer Portal and be able to sign in
                  again.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={isActive ? "destructive" : "default"}
              onClick={confirmToggle}
            >
              {isActive ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
