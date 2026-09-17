# Customer Portal — Admin (Prototype)

Click-through prototype of the UOI **Customer Portal | Admin** console,
translated from Figma. It shares the design language, tokens and the real UOI
logo with the customer portal (`apphianeo/customerportal`).

> This is an interactive prototype: all data is mock (`src/data/`), navigation
> is client-side, and there is no backend. "Sign in with Microsoft" simulates
> the SSO handoff and drops you into the console.

## Stack

Vite + React 18 + TypeScript · Tailwind CSS · Radix UI (shadcn-style
primitives) · lucide-react · react-router. Noto Sans throughout.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Screens & flows

| Route | Screen |
|---|---|
| `/` | Admin login (SSO) |
| `/auth/outlook` | Microsoft/Outlook SSO handoff (mock) |
| `/customers` | Customer list — search, status filter, stat card, pagination |
| `/customers/:id` | Customer detail — profile, account activity, linked policies, activate/deactivate |
| `/activity-log` | Global admin activity log — search, pagination |

## Deploying on Vercel

- Framework preset: **Vite**. Build: `npm run build`, output: `dist`.
- `vercel.json` rewrites all paths to `index.html` so client-side deep links
  resolve on refresh.

## Notes

- The **UOI logo** (`src/assets/uoi-logo.svg`) is the real asset from the
  customer portal repo. The login screen is intentionally minimal per the Figma.
- Mock data (`src/data/customers.ts`, `src/data/activity.ts`) mirrors the values
  in the Figma design. Replace these modules with API calls to wire up a
  backend; the screens only depend on the exported shapes.
- SSO is mocked. Real Microsoft SSO (MSAL / OIDC) plugs in at
  `src/pages/OutlookAuthPage.tsx`.
