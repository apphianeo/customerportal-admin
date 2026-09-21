import { useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { currentAdmin } from "@/data/activity"

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TopBar() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 flex h-[62px] items-center justify-end border-b border-border bg-white px-6">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="grid size-8 place-items-center rounded-lg bg-info-bg text-sm font-medium text-foreground">
            {initials(currentAdmin.name)}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-foreground">
              {currentAdmin.name}
            </span>
            <span className="text-xs text-text-tertiary">{currentAdmin.role}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-text-tertiary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] p-[12px] shadow-[0px_10px_35px_0px_rgba(0,94,184,0.06)]"
        >
          <DropdownMenuItem
            className="rounded-[8px] p-[8px] text-[14px] font-normal leading-[1.5] text-[#dc2626] focus:bg-[#f6f6f6] focus:text-[#dc2626]"
            onSelect={() => navigate("/")}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
