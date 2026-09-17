import { NavLink } from "react-router-dom"
import { Clock, HelpCircle, PanelLeftClose, Users } from "lucide-react"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/activity-log", label: "Activity Log", icon: Clock },
]

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col gap-6 border-r border-border bg-white px-4 py-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between px-1">
        <Logo />
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="grid h-5 w-5 place-items-center text-text-tertiary hover:text-text-secondary"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-info-bg font-medium text-primary"
                  : "text-text-secondary hover:bg-muted"
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <a
        href="#"
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary hover:bg-muted"
      >
        <HelpCircle className="h-5 w-5 shrink-0" />
        Help &amp; Support
      </a>
    </aside>
  )
}
