# Import Fixes Script

This file documents the import path changes needed across the project.

## Pattern Replacements

### Icons (from public/svg)

- `from "../../../../public/svg"` → `from "@/components/shared/icons"`
- `from "../../../../../public/svg"` → `from "@/components/shared/icons"`

### Images (from public/)

- `from "../../../../public/check.svg"` → `from "@/public/check.svg"`
- `from "../../../../public/images/*"` → `from "@/public/images/*"`

### Components

- `@/components/dashboard/*` → `@/components/features/dashboard/*`
- `@/components/contracts/*` → `@/components/features/contracts/*`
- `@/components/finance/*` → `@/components/features/finance/*`
- `@/components/invoices/*` → `@/components/features/invoices/*`
- `@/components/modal/*` → `@/components/shared/modal/*`
- `@/components/table/*` → `@/components/shared/table/*`

### Routes

- `@/app/routes/routesPath` → `@/lib/routes`

### Utils

- `@/util/constant` → `@/lib/constants`

## Files to Update

1. All dashboard feature components
2. All modal components
3. Finance pages and components
4. Invoice pages and components
5. Payroll pages
