import { useNavigate } from "react-router-dom"
import { Logo } from "@/components/Logo"
import { MicrosoftLogo } from "@/components/MicrosoftLogo"
import { Footer } from "@/components/Footer"

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="flex w-full max-w-[420px] flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 whitespace-nowrap text-[32px] font-semibold leading-[1.2] text-foreground">
            Customer Portal | Admin
          </h1>
          <p className="mt-3 text-base leading-[1.5] text-text-secondary">
            SSO login for UOI staff only
          </p>

          <button
            type="button"
            onClick={() => navigate("/auth/outlook")}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-md border border-border bg-white text-base font-medium text-foreground shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
          >
            <MicrosoftLogo className="h-[18px] w-[18px]" />
            Sign in with Microsoft
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
