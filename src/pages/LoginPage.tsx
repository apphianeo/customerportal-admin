import { useNavigate, useSearchParams } from "react-router-dom"
import { Plane, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/Logo"
import { MicrosoftLogo } from "@/components/MicrosoftLogo"
import { Footer } from "@/components/Footer"
import errorNotice from "@/assets/icons/error-notice.svg"

export function LoginPage() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const hasError = params.get("error") === "1"

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left — login */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12">
          <div className="flex w-full max-w-[420px] flex-col">
            {hasError && (
              <div className="mb-6 flex items-start gap-2 rounded-md bg-destructive-bg px-4 py-3">
                <img src={errorNotice} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm leading-[1.5] text-destructive">
                  This account is not authorised for the Admin Console. Contact
                  IT support if you believe this is a mistake.
                </p>
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <Logo className="mb-[74px]" />
              <h1 className="text-[32px] font-semibold leading-[1.2] text-foreground">
                Customer Portal | Admin
              </h1>
              <p className="mt-3 text-base leading-[1.5] text-text-secondary">
                SSO login for UOI staff only
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/auth/outlook")}
              className="mt-12 flex h-12 w-full items-center justify-center gap-3 rounded-md border border-input bg-white text-base font-medium text-foreground shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
            >
              <MicrosoftLogo className="h-[18px] w-[18px]" />
              Sign in with Microsoft
            </button>

            <button
              type="button"
              onClick={() => setParams(hasError ? {} : { error: "1" })}
              className="mt-6 text-center text-xs text-text-tertiary underline-offset-4 hover:underline"
            >
              {hasError ? "Reset" : "Preview unauthorised-account error"}
            </button>

            <p className="mt-10 text-center text-xs leading-[1.4] text-text-tertiary">
              By continuing, you agree to our T&amp;Cs and Privacy Notice.
            </p>
          </div>
        </div>

        {/* Right — brand panel (Figma placeholder recreated) */}
        <div className="relative hidden flex-1 overflow-hidden bg-primary lg:block">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.20), transparent 50%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <ShieldCheck className="h-5 w-5" />
              UOI Internal
            </div>
            <div className="max-w-[420px]">
              <Plane className="mb-6 h-10 w-10 opacity-90" />
              <p className="text-[28px] font-semibold leading-[1.25]">
                Manage customer accounts across the UOI Customer Portal.
              </p>
              <p className="mt-4 text-base leading-[1.5] text-white/80">
                A single console for customer records, account activity and
                access management.
              </p>
            </div>
            <div className="text-sm text-white/70">Member of the UOB Group</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
