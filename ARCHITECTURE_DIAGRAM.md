# VestRoll Project Architecture Diagram

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         USER ACCESS                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Root Page (/)  │
                    │   Redirects to   │
                    │     /login       │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
    ┌───────────────────┐       ┌───────────────────┐
    │  (auth) Routes    │       │ (dashboard) Routes│
    │  No Layout        │       │  With AppShell    │
    └───────────────────┘       └───────────────────┘
                │                           │
                ▼                           ▼
    ┌───────────────────┐       ┌───────────────────┐
    │ - /login          │       │ - /dashboard      │
    │ - /register       │       │ - /contracts      │
    │ - /forgot-password│       │ - /finance        │
    │ - /reset-password │       │ - /payroll        │
    │ - /verify-email   │       │ - /transactions   │
    └───────────────────┘       │ - /invoices       │
                                │ - /settings       │
                                │ - /team-management│
                                └───────────────────┘
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      src/components/                         │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   features/   │    │    layout/    │    │    shared/    │
│               │    │               │    │               │
│ Feature-      │    │ App structure │    │ Reusable      │
│ specific      │    │ components    │    │ components    │
│ components    │    │               │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ - auth/       │    │ - app-shell   │    │ - modal/      │
│ - dashboard/  │    │ - sidebar     │    │ - table/      │
│ - contracts/  │    │ - desktop-    │    │ - icons       │
│ - finance/    │    │   header      │    │ - Avatar      │
│ - invoices/   │    │ - mobile-     │    │ - theme-      │
│ - expenses/   │    │   header      │    │   provider    │
│ - permissions/│    └───────────────┘    └───────────────┘
│ - preferences/│
│ - profile-    │
│   settings/   │
│ - hiring-     │
│   template/   │
└───────────────┘
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (src/app/api/)                 │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   auth/  │  │  users/  │  │ payroll/ │  │contracts/│   │
│  │          │  │          │  │          │  │          │   │
│  │ - login  │  │ - CRUD   │  │ - process│  │ - CRUD   │   │
│  │ - register│ │ - profile│  │ - list   │  │ - sign   │   │
│  │ - logout │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Database Queries
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Database                             │
│                    (To be implemented)                       │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                      Application State                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Redux Store  │    │  React Query  │    │  Local State  │
│               │    │               │    │               │
│ Global app    │    │ Server state  │    │ Component     │
│ state         │    │ & caching     │    │ state         │
│               │    │               │    │               │
│ - User        │    │ - API data    │    │ - Forms       │
│ - Auth        │    │ - Mutations   │    │ - UI state    │
│ - Settings    │    │ - Queries     │    │ - Toggles     │
└───────────────┘    └───────────────┘    └───────────────┘
```

## File Organization Pattern

```
Feature Module Example: Contracts
─────────────────────────────────

src/
├── app/
│   └── (dashboard)/
│       └── contracts/
│           └── page.tsx                    ← Route entry point
│
├── components/
│   └── features/
│       └── contracts/
│           ├── index.tsx                   ← Main component
│           ├── ContractForm.tsx            ← Sub-components
│           ├── ContractDetails.tsx
│           ├── ContractOptions.tsx
│           └── ui/
│               └── stepper.tsx             ← Feature-specific UI
│
├── types/
│   └── contract.types.ts                   ← Type definitions
│
└── lib/
    └── contracts-utils.ts                  ← Utility functions
```

## Import Resolution

```
Alias Mapping:
──────────────

@/components/*     →  src/components/*
@/lib/*           →  src/lib/*
@/types/*         →  src/types/*
@/hooks/*         →  src/hooks/*
@/public/*        →  public/*
@/app/*           →  src/app/*

Example:
────────

// Old (relative)
import Icon from "../../../../public/svg";
import Component from "../../components/dashboard/Component";

// New (alias)
import { Icon } from "@/components/shared/icons";
import Component from "@/components/features/dashboard/Component";
```

## Route Structure

```
URL Structure:
──────────────

Authentication Routes (No Layout):
├── /login
├── /register
├── /forgot-password
├── /reset-password
└── /verify-email

Dashboard Routes (With AppShell):
├── /dashboard
├── /contracts
├── /finance
├── /payroll
├── /transactions
├── /invoices
├── /settings
│   ├── /settings/permissions
│   ├── /settings/preferences
│   └── /settings/profile
└── /team-management

API Routes:
├── /api/auth
├── /api/users
├── /api/payroll
├── /api/contracts
└── /api/transactions
```

## Navigation Flow

```
User Journey:
─────────────

1. Landing (/)
   │
   ├─→ Redirect to /login
   │
2. Login (/login)
   │
   ├─→ Authenticate
   │
3. Dashboard (/dashboard)
   │
   ├─→ Sidebar Navigation
   │   ├─→ Contracts
   │   ├─→ Finance
   │   ├─→ Payroll
   │   ├─→ Transactions
   │   ├─→ Invoices
   │   ├─→ Settings
   │   └─→ Team Management
   │
   └─→ Logout → Back to /login
```

---

**Legend:**

- `┌─┐` = Container/Group
- `│` = Connection/Flow
- `▼` = Direction of flow
- `─→` = Navigation/Action
