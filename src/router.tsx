import { createBrowserRouter } from "react-router-dom"
import { ConsoleLayout } from "@/components/ConsoleLayout"
import { LoginPage } from "@/pages/LoginPage"
import { OutlookAuthPage } from "@/pages/OutlookAuthPage"
import { CustomersPage } from "@/pages/CustomersPage"
import { CustomerDetailPage } from "@/pages/CustomerDetailPage"
import { CustomerActivityPage } from "@/pages/CustomerActivityPage"
import { ActivityLogPage } from "@/pages/ActivityLogPage"

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/auth/outlook", element: <OutlookAuthPage /> },
  {
    element: <ConsoleLayout />,
    children: [
      { path: "/customers", element: <CustomersPage /> },
      { path: "/customers/:id", element: <CustomerDetailPage /> },
      { path: "/customer-activity", element: <CustomerActivityPage /> },
      { path: "/admin-activity", element: <ActivityLogPage /> },
    ],
  },
])
