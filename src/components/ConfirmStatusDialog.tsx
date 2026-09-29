import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export type StatusAction = "deactivate" | "activate" | "verify" | "reject"

const COPY: Record<
  StatusAction,
  {
    title: string
    body: (email: React.ReactNode) => React.ReactNode
    confirm: string
    variant: "default" | "destructive"
  }
> = {
  deactivate: {
    title: "Deactivate customer account?",
    body: (email) => (
      <>
        {email} will not be able to log in to the UOI Customer Portal until an
        admin reactivates the account. Their policies and personal data will be
        unaffected.
      </>
    ),
    confirm: "Deactivate Account",
    variant: "destructive",
  },
  activate: {
    title: "Activate customer account?",
    body: (email) => (
      <>
        {email} will be activated and the user will be able to log in to the UOI
        Customer Portal immediately.
      </>
    ),
    confirm: "Confirm",
    variant: "default",
  },
  verify: {
    title: "Verify customer account?",
    body: (email) => (
      <>
        Confirm that {email} has been reviewed and meets our requirements. They
        will gain full access to the UOI Customer Portal.
      </>
    ),
    confirm: "Verify",
    variant: "default",
  },
  reject: {
    title: "Reject verification?",
    body: () => (
      <>
        Before rejecting this request, please confirm that the manual
        verification has been reviewed and does not meet our requirements.
      </>
    ),
    confirm: "Reject",
    variant: "destructive",
  },
}

// Confirmation dialog for the customer status actions. Copy matches the Figma flows.
export function ConfirmStatusDialog({
  open,
  onOpenChange,
  action,
  email,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: StatusAction
  email: string
  onConfirm: () => void
}) {
  const copy = COPY[action]
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>
            {copy.body(<span className="font-medium text-foreground">{email}</span>)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant={copy.variant} onClick={onConfirm}>
            {copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
