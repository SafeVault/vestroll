# Quick Reference Guide

## Common Import Paths

### Components

```typescript
// Layout Components
import AppShell from "@/components/layout/app-shell";
import Sidebar from "@/components/layout/sidebar";
import DesktopHeader from "@/components/layout/desktop-header";
import MobileHeader from "@/components/layout/mobile-header";

// Feature Components
import LoginPage from "@/components/features/auth/login-page";
import TitleHeader from "@/components/features/dashboard/TitleHeader";
import Contracts from "@/components/features/contracts";
import FinanceClient from "@/components/features/finance/finance-client";

// Shared Components
import Modal from "@/components/shared/modal/Modal";
import Table from "@/components/shared/table/Table";
import Avatar from "@/components/shared/Avatar";
import { ThemeProvider } from "@/components/shared/theme-provider";

// Icons
import {
  HeadPhoneIcon,
  UsdtIcon,
  ArrowRightIcon,
} from "@/components/shared/icons";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

### Routes

```typescript
import { RoutePaths } from "@/lib/routes";

// Usage
router.push(RoutePaths.DASHBOARD);
router.push(RoutePaths.LOGIN);
router.push(RoutePaths.CONTRACTS);
```

### Utils & Constants

```typescript
import { cn } from "@/lib/utils";
import { invoiceMetricsData } from "@/lib/constants";
import { MOCK_ASSETS } from "@/lib/mock-data";
```

### Types

```typescript
import type { Transaction } from "@/types/finance.types";
import type { Invoice } from "@/types/invoice.types";
import type { SupportedAssetSymbol } from "@/types/address-types";
```

### Hooks

```typescript
import { usePagination } from "@/hooks/use-pagination";
```

### Public Assets

```typescript
// Images
import avatar from "@/public/avatar/avatar.png";
import logo from "@/public/logo.svg";
import bgImage from "@/public/images/onboarding_bg.png";

// Direct usage in JSX
<Image src="/logo.svg" alt="Logo" width={100} height={100} />
<img src="/user-avatar.svg" alt="Avatar" />
```

## Page Structure

### Auth Pages

```
src/app/(auth)/
├── login/page.tsx
├── register/page.tsx
├── forgot-password/page.tsx
├── reset-password/page.tsx
└── verify-email/page.tsx
```

### Dashboard Pages

```
src/app/(dashboard)/
├── layout.tsx              # Wraps all pages with AppShell
├── dashboard/page.tsx
├── contracts/page.tsx
├── finance/page.tsx
├── payroll/page.tsx
├── transactions/page.tsx
├── invoices/page.tsx
├── settings/page.tsx
└── team-management/page.tsx
```

### API Routes

```
src/app/api/
├── auth/route.ts
├── users/route.ts
├── payroll/route.ts
├── contracts/route.ts
└── transactions/route.ts
```

## Navigation Examples

### Using Link

```typescript
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

<Link href={RoutePaths.DASHBOARD}>Dashboard</Link>
<Link href={RoutePaths.CONTRACTS}>Contracts</Link>
<Link href="/dashboard">Dashboard</Link>
```

### Using Router

```typescript
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/lib/routes";

const router = useRouter();
router.push(RoutePaths.LOGIN);
router.push(RoutePaths.DASHBOARD);
```

### Redirects

```typescript
import { redirect } from "next/navigation";
import { RoutePaths } from "@/lib/routes";

export default function Page() {
  redirect(RoutePaths.LOGIN);
}
```

## Component Creation Guidelines

### Feature Component

Place in `src/components/features/{feature-name}/`

```typescript
// src/components/features/dashboard/MyComponent.tsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

### Shared Component

Place in `src/components/shared/`

```typescript
// src/components/shared/MySharedComponent.tsx
export default function MySharedComponent() {
  return <div>Shared Component</div>;
}
```

### Layout Component

Place in `src/components/layout/`

```typescript
// src/components/layout/MyLayout.tsx
export default function MyLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

## API Route Example

```typescript
// src/app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body });
}
```

## File Naming Conventions

- **Pages**: `page.tsx`
- **Layouts**: `layout.tsx`
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `user.types.ts`)
- **Constants**: `kebab-case.ts` (e.g., `api-endpoints.ts`)

## Common Patterns

### Page with Layout

```typescript
// src/app/(dashboard)/my-page/page.tsx
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      {/* Content */}
    </div>
  );
}
// Layout is automatically applied from (dashboard)/layout.tsx
```

### Client Component

```typescript
"use client";

import { useState } from "react";

export default function MyClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Server Component (default)

```typescript
import { getData } from "@/lib/api";

export default async function MyServerComponent() {
  const data = await getData();
  return <div>{data}</div>;
}
```
