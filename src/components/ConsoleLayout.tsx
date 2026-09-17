import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { Footer } from "./Footer"

// Shared shell for every authenticated admin screen: fixed sidebar + sticky
// top bar + scrolling content + footer.
export function ConsoleLayout() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
