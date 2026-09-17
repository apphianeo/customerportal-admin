import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { MicrosoftLogo } from "@/components/MicrosoftLogo"
import { currentAdmin } from "@/data/activity"

// Mock Microsoft/Outlook SSO handoff. In production this is the redirect to the
// corporate IdP (MSAL / OIDC); here it just simulates picking an account.
export function OutlookAuthPage() {
  const navigate = useNavigate()
  const [signingIn, setSigningIn] = useState(false)

  function pickAccount() {
    setSigningIn(true)
    setTimeout(() => navigate("/customers"), 1100)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4">
      <div className="w-full max-w-[440px] bg-white px-11 py-9 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
        <div className="mb-6 flex items-center gap-2">
          <MicrosoftLogo className="h-5 w-5" />
          <span className="text-[15px] font-semibold text-[#5e5e5e]">
            Microsoft
          </span>
        </div>

        {!signingIn ? (
          <>
            <h1 className="mb-5 text-[24px] font-semibold text-[#1b1b1b]">
              Pick an account
            </h1>
            <button
              type="button"
              onClick={pickAccount}
              className="flex w-full items-center gap-3 border-b border-[#eaeaea] px-1 py-3 text-left hover:bg-[#f5f5f5]"
            >
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-medium text-white">
                {currentAdmin.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-[#1b1b1b]">
                  {currentAdmin.name}
                </span>
                <span className="text-xs text-[#605e5c]">
                  {currentAdmin.email}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/?error=1")}
              className="flex w-full items-center gap-3 px-1 py-3 text-left text-sm text-[#605e5c] hover:bg-[#f5f5f5]"
            >
              <span className="grid size-9 place-items-center rounded-full border border-[#d1d1d1] text-[#605e5c]">
                +
              </span>
              Use another account
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-primary text-base font-medium text-white">
              {currentAdmin.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
            <p className="text-sm text-[#1b1b1b]">{currentAdmin.email}</p>
            <p className="flex items-center gap-2 text-sm text-[#605e5c]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing you in…
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
