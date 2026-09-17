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
| `/` | Admin login (SSO) — with an unauthorised-account error preview |
| `/auth/outlook` | Microsoft/Outlook SSO handoff (mock) |
| `/customers` | Customer list — search, status filter, stat cards, pagination |
| `/customers/:id` | Customer detail — profile, account activity, linked policies, activate/deactivate |
| `/activity-log` | Global admin activity log — search, pagination |

The customer detail page drives the **activate / deactivate** flow: a
confirmation dialog toggles the account status and shows a success banner.

## Design system

Tokens live in `src/index.css` (`:root`) and are wired through
`tailwind.config.ts` (`bg-primary`, `text-text-secondary`, `bg-success-bg`,
etc.), mirroring the customer portal's palette:

- Primary `#005EB8` · text `#212121 / #6E6E6E / #949494`
- Status — success `#08754F` on `#ECFDF5`, error `#DC2626` on `#FEF2F2`
- Page background `#F6F8FC`, cards `#FFFFFF`, radius 8–12px

## Notes / next steps

- The **UOI logo** (`src/assets/uoi-logo.svg`) is the real asset from the
  customer portal repo. The login **hero panel** is a branded placeholder — the
  Figma frame is itself a placeholder rectangle, so swap in the final artwork
  when available.
- Mock data (`src/data/customers.ts`, `src/data/activity.ts`) mirrors the values
  in the Figma design. Replace these modules with API calls to wire up a
  backend; the screens only depend on the exported shapes.
- SSO is mocked. Real Microsoft SSO (MSAL / OIDC) plugs in at
  `src/pages/OutlookAuthPage.tsx`.
