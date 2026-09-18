import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Confirmation dialog for activating / deactivating a customer account.
// Copy matches the Figma flows.
export function ConfirmStatusDialog({
  open,
  onOpenChange,
  action,
  email,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: "deactivate" | "activate"
  email: string
  onConfirm: () => void
}) {
  const isDeactivate = action === "deactivate"
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isDeactivate ? "Deactivate customer account?" : "Activate customer account?"}
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{email}</span>{" "}
            {isDeactivate ? (
              <>
                will not be able to log in to the UOI Customer Portal until an
                admin reactivates the account. Their policies and personal data
                will be unaffected.
              </>
            ) : (
              <>
                will be activated and user will be able to log in to the UOI
                Customer Portal immediately.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={isDeactivate ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {isDeactivate ? "Deactivate Account" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
