import { NavLink, useNavigate } from "react-router-dom"
import { PanelLeft } from "lucide-react"
import { Logo } from "./Logo"
import { CustomersIcon, ActivityLogIcon } from "./icons"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/customers", label: "Customers", icon: CustomersIcon },
  { to: "/activity-log", label: "Activity Log", icon: ActivityLogIcon },
]

export function Sidebar({
  collapsed,
  onToggleCollapse,
}: {
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  const navigate = useNavigate()

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col gap-6 border-r border-border bg-white px-4 py-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      {collapsed ? (
        <div className="flex flex-col items-start gap-4">
          <button
            type="button"
            onClick={() => navigate("/customers")}
            aria-label="Go to dashboard"
            className="cursor-pointer border-0 bg-transparent p-0"
          >
            <Logo width={48} height={24} className="h-6 w-12" />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="grid h-10 w-12 place-items-center text-text-tertiary hover:text-text-secondary"
          >
            <PanelLeft className="h-[18px] w-[18px]" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => navigate("/customers")}
            aria-label="Go to dashboard"
            className="cursor-pointer border-0 bg-transparent p-0"
          >
            <Logo />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="grid h-5 w-5 place-items-center text-text-tertiary hover:text-text-secondary"
          >
            <PanelLeft className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}

      <nav className="flex flex-col gap-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                collapsed ? "justify-center" : "gap-3",
                isActive
                  ? "bg-info-bg font-medium text-primary"
                  : "text-text-secondary hover:bg-muted"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-text-secondary"
                  )}
                />
                {!collapsed && label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
